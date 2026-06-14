import type { Place } from "@/types/places";
import type {
  PlanFilters,
  GeneratedPlan,
  DayPlan,
  PlanPlace,
} from "@/types/plan";
import { TRAVEL_STYLE } from "@/types/places";
import { getPlacesByCity } from "@/mock/places";
import { calculateDate } from "@/types/plan";

// Konwertuj Place na PlanPlace (uproszczony format)
function placeToPlanPlace(place: Place): PlanPlace {
  return {
    id: place.id,
    name: place.name,
    description: place.description,
    mainImage: place.mainImage,
    rating: place.rating,
    location: {
      address: place.location.address,
      lat: place.location.coordinates!.lat,
      lng: place.location.coordinates!.lng,
    },
    price: place.price,
    estimatedVisitTime: place.estimatedVisitTime ?? 60,
    type: place.type,
    categories: place.categories,
  };
}

// Oblicz centroid (średnią pozycję) grupy miejsc
function calculateCentroid(places: Place[]): { lat: number; lng: number } {
  const sum = places.reduce(
    (acc, p) => ({
      lat: acc.lat + p.location.coordinates!.lat,
      lng: acc.lng + p.location.coordinates!.lng,
    }),
    { lat: 0, lng: 0 },
  );
  return { lat: sum.lat / places.length, lng: sum.lng / places.length };
}

// Oblicz dystans od punktu do centroidu
function distanceToCentroid(
  place: Place,
  centroid: { lat: number; lng: number },
): number {
  const latDiff = place.location.coordinates!.lat - centroid.lat;
  const lngDiff = place.location.coordinates!.lng - centroid.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

// Określ liczbę miejsc na dzień na podstawie stylu podróży
function getPlacesPerDay(style: TRAVEL_STYLE): number {
  // RELAXED = 3 atrakcje
  // INTENSIVE = losowo 5 lub 6 atrakcji
  if (style === TRAVEL_STYLE.RELAXED) return 3;
  return Math.random() > 0.5 ? 5 : 6;
}

// Filtrowanie miejsc na podstawie kryteriów planu
function filterPlacesByCriteria(
  places: Place[],
  filters: PlanFilters,
): Place[] {
  return places.filter((place) => {
    // Filtruj po typie (jeśli wybrane)
    if (filters.types.length > 0) {
      if (!filters.types.includes(place.type)) {
        return false;
      }
    }

    // Filtruj po minimalnej ocenie
    if (place.rating.score < filters.minRating) {
      return false;
    }

    // Filtruj po zakresie ceny
    const price = place.price.normal;
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    // Filtruj po poziomie zatłoczenia
    if (filters.crowdLevels.length > 0) {
      if (!filters.crowdLevels.includes(place.crowdLevel)) {
        return false;
      }
    }

    // Filtruj po grupach docelowych (przynajmniej jedna musi pasować)
    if (filters.targetGroups.length > 0) {
      const hasMatchingGroup = filters.targetGroups.some((group) =>
        place.targetGroups.includes(group),
      );
      if (!hasMatchingGroup) {
        return false;
      }
    }

    // UWAGA: Styl podróży (RELAXED/INTENSIVE) decyduje o liczbie miejsc na dzień
    // ale NIE filtruje miejsc - wszystkie pasujące miejsca są używane
    // Niezależnie od stylu podróży użytkownika, możemy używać wszystkich miejsc
    // Styl podróży place.style jest ignorowany przy filtrowaniu

    // Filtruj po kategoriach zainteresowań (przynajmniej jedna musi pasować)
    if (filters.categories.length > 0) {
      const hasMatchingCategory = filters.categories.some((cat) =>
        place.categories.includes(cat),
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // Filtruj po jedzeniu (jeśli włączone)
    if (filters.foodAvailable) {
      if (!place.food.available) {
        return false;
      }

      // Filtruj po typie lokalu
      if (filters.foodTypes.length > 0) {
        if (!place.food.type || !filters.foodTypes.includes(place.food.type)) {
          return false;
        }
      }

      // Filtruj po kuchni
      if (filters.cuisines.length > 0) {
        if (
          !place.food.cuisine ||
          !filters.cuisines.includes(place.food.cuisine)
        ) {
          return false;
        }
      }
    }

    return true;
  });
}

// Grupowanie miejsc geograficznie (centroid-based clustering)
function groupPlacesByProximity(
  places: Place[],
  days: number,
  placesPerDay: number,
): Place[][] {
  const groups: Place[][] = [];
  const usedPlaceIds = new Set<string>();

  for (let day = 0; day < days; day++) {
    const availablePlaces = places.filter((p) => !usedPlaceIds.has(p.id));

    if (availablePlaces.length === 0) break;

    // Znajdź "najlepszy" starting point (najwyżej oceniane nieużyte miejsce)
    const startPlace = availablePlaces.reduce((best, p) =>
      p.rating.score > best.rating.score ? p : best,
    );

    // Znajdź N-1 najbliższych miejsc do centroidu
    const dayGroup: Place[] = [startPlace];
    usedPlaceIds.add(startPlace.id);

    while (
      dayGroup.length < placesPerDay &&
      availablePlaces.length > dayGroup.length
    ) {
      const currentCentroid = calculateCentroid(dayGroup);

      // Znajdź najbliższe nieużyte miejsce do centroidu
      let closest: Place | null = null;
      let minDistance = Infinity;

      for (const place of availablePlaces) {
        if (usedPlaceIds.has(place.id)) continue;

        const dist = distanceToCentroid(place, currentCentroid);

        if (dist < minDistance) {
          minDistance = dist;
          closest = place;
        }
      }

      if (closest) {
        dayGroup.push(closest);
        usedPlaceIds.add(closest.id);
      } else {
        break;
      }
    }

    groups.push(dayGroup);
  }

  return groups;
}

// Oblicz statystyki dnia
function calculateDayStats(places: Place[]): DayPlan["stats"] {
  const totalPlaces = places.length;
  const totalTime = places.reduce(
    (sum, p) => sum + (p.estimatedVisitTime ?? 60),
    0,
  );
  const totalPrice = places.reduce((sum, p) => sum + p.price.normal, 0);
  const centerPoint = calculateCentroid(places);

  return {
    totalPlaces,
    totalTime,
    totalPrice,
    centerPoint,
  };
}

// Główna funkcja generująca plan
export async function generatePlan(
  filters: PlanFilters,
): Promise<GeneratedPlan> {
  // Symulacja opóźnienia (dla UX - pokazanie loadera)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 1. Pobierz wszystkie miejsca dla miasta
  const cityPlaces = getPlacesByCity(filters.city);

  if (cityPlaces.length === 0) {
    throw new Error(`Brak miejsc w mieście: ${filters.city}`);
  }

  // 2. Filtruj
  const filtered = filterPlacesByCriteria(cityPlaces, filters);

  // 3. Określ liczbę miejsc na dzień
  const placesPerDay = getPlacesPerDay(filters.style);

  // 4. Sprawdź czy mamy wystarczająco miejsc
  if (filtered.length < placesPerDay) {
    throw new Error(
      `Za mało miejsc pasujących do filtrów. Znaleziono: ${filtered.length}, ` +
        `wymagane minimum: ${placesPerDay} na dzień. Spróbuj złagodzić filtry.`,
    );
  }

  // 5. Dostosuj liczbę dni jeśli za mało miejsc
  const actualDays = Math.min(
    filters.days,
    Math.floor(filtered.length / placesPerDay),
  );

  if (actualDays === 0) {
    throw new Error(
      `Za mało miejsc pasujących do filtrów. Znaleziono: ${filtered.length}. ` +
        `Spróbuj: zwiększyć zakres ceny, zmniejszyć minimalną ocenę, ` +
        `lub wybrać więcej kategorii zainteresowań.`,
    );
  }

  // 6. Grupuj geograficznie
  const dayGroups = groupPlacesByProximity(filtered, actualDays, placesPerDay);

  // 7. Zbuduj strukturę GeneratedPlan
  const plan: GeneratedPlan = {
    id: "generated",
    city: filters.city,
    days: dayGroups.map((group, index) => ({
      day: index + 1,
      date: calculateDate(filters.startDate, index),
      places: group.map(placeToPlanPlace),
      stats: calculateDayStats(group),
    })),
    createdAt: new Date(),
    filters,
    stats: {
      totalPlaces: dayGroups.reduce((sum, group) => sum + group.length, 0),
      totalDays: dayGroups.length,
      totalPrice: dayGroups.reduce(
        (sum, group) =>
          sum + group.reduce((gSum, p) => gSum + p.price.normal, 0),
        0,
      ),
    },
  };

  return plan;
}

// Funkcja walidująca filtry przed generowaniem
export function validateFilters(filters: PlanFilters): string | null {
  if (!filters.city) {
    return "Wybierz miasto";
  }

  if (filters.days < 1 || filters.days > 10) {
    return "Liczba dni musi być między 1 a 10";
  }

  if (filters.minRating < 0 || filters.minRating > 5) {
    return "Ocena musi być między 0 a 5";
  }

  if (
    filters.priceRange[0] < 0 ||
    filters.priceRange[1] < filters.priceRange[0]
  ) {
    return "Nieprawidłowy zakres ceny";
  }

  return null;
}
