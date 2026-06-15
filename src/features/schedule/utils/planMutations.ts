import { arrayMove } from "@dnd-kit/sortable";
import type { GeneratedPlan, DayPlan, PlanPlace } from "@/types/plan";
import { calculateDate } from "@/types/plan";
import type { Place } from "@/types/places";

export const DEFAULT_CENTER = { lat: 50.0614, lng: 19.9372 };

export function recalculateDayStats(places: PlanPlace[]) {
  return {
    totalPlaces: places.length,
    totalTime: places.reduce((sum, p) => sum + p.estimatedVisitTime, 0),
    totalPrice: places.reduce((sum, p) => sum + p.price.normal, 0),
  };
}

export function recalculatePlanStats(days: DayPlan[]): GeneratedPlan["stats"] {
  return {
    totalDays: days.length,
    totalPlaces: days.reduce((sum, day) => sum + day.stats.totalPlaces, 0),
    totalPrice: days.reduce((sum, day) => sum + day.stats.totalPrice, 0),
  };
}

export function findPlaceInPlan(
  days: DayPlan[],
  placeId: string,
): { dayIndex: number; placeIndex: number } | null {
  for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    const placeIndex = days[dayIndex].places.findIndex((p) => p.id === placeId);
    if (placeIndex !== -1) {
      return { dayIndex, placeIndex };
    }
  }
  return null;
}

export function getSelectedPlaceIds(days: DayPlan[]): Set<string> {
  const ids = new Set<string>();
  days.forEach((day) => {
    day.places.forEach((place) => ids.add(place.id));
  });
  return ids;
}

export function placeToPlanPlace(place: Place): PlanPlace {
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

export function addPlaceToPlan(
  plan: GeneratedPlan,
  dayIndex: number,
  place: PlanPlace,
): GeneratedPlan {
  const newDays = [...plan.days];
  const targetDay = { ...newDays[dayIndex] };

  targetDay.places = [...targetDay.places, place];
  targetDay.stats = {
    ...targetDay.stats,
    totalPlaces: targetDay.stats.totalPlaces + 1,
    totalTime: targetDay.stats.totalTime + place.estimatedVisitTime,
    totalPrice: targetDay.stats.totalPrice + place.price.normal,
  };

  newDays[dayIndex] = targetDay;

  return {
    ...plan,
    days: newDays,
    stats: {
      ...plan.stats,
      totalPlaces: plan.stats.totalPlaces + 1,
      totalPrice: plan.stats.totalPrice + place.price.normal,
    },
  };
}

export function removePlaceFromPlan(
  plan: GeneratedPlan,
  dayIndex: number,
  placeId: string,
): GeneratedPlan {
  const newDays = [...plan.days];
  const targetDay = { ...newDays[dayIndex] };

  const placeToRemove = targetDay.places.find((p) => p.id === placeId);
  if (!placeToRemove) return plan;

  targetDay.places = targetDay.places.filter((p) => p.id !== placeId);
  targetDay.stats = {
    ...targetDay.stats,
    totalPlaces: targetDay.stats.totalPlaces - 1,
    totalTime: targetDay.stats.totalTime - placeToRemove.estimatedVisitTime,
    totalPrice: targetDay.stats.totalPrice - placeToRemove.price.normal,
  };

  newDays[dayIndex] = targetDay;

  return {
    ...plan,
    days: newDays,
    stats: {
      ...plan.stats,
      totalPlaces: plan.stats.totalPlaces - 1,
      totalPrice: plan.stats.totalPrice - placeToRemove.price.normal,
    },
  };
}

export function reorderPlacesInPlan(
  plan: GeneratedPlan,
  dayIndex: number,
  oldIndex: number,
  newIndex: number,
): GeneratedPlan {
  const newDays = [...plan.days];
  const targetDay = { ...newDays[dayIndex] };

  targetDay.places = arrayMove(targetDay.places, oldIndex, newIndex);
  newDays[dayIndex] = targetDay;

  return { ...plan, days: newDays };
}

export function movePlaceBetweenDaysInPlan(
  plan: GeneratedPlan,
  sourceDayIndex: number,
  targetDayIndex: number,
  placeId: string,
  targetIndex?: number,
): GeneratedPlan {
  const newDays = plan.days.map((day) => ({
    ...day,
    places: [...day.places],
  }));

  const sourceDay = newDays[sourceDayIndex];
  const targetDay = newDays[targetDayIndex];

  const placeIndex = sourceDay.places.findIndex((p) => p.id === placeId);
  if (placeIndex === -1) return plan;

  const [place] = sourceDay.places.splice(placeIndex, 1);

  if (targetIndex !== undefined && targetIndex >= 0) {
    targetDay.places.splice(targetIndex, 0, place);
  } else {
    targetDay.places.push(place);
  }

  sourceDay.stats = {
    ...sourceDay.stats,
    ...recalculateDayStats(sourceDay.places),
  };

  targetDay.stats = {
    ...targetDay.stats,
    ...recalculateDayStats(targetDay.places),
  };

  const planStats = recalculatePlanStats(newDays);

  return {
    ...plan,
    days: newDays,
    stats: {
      ...plan.stats,
      ...planStats,
    },
  };
}

export function deleteDayFromPlan(
  plan: GeneratedPlan,
  dayIndex: number,
): GeneratedPlan {
  const newDays = plan.days
    .filter((_, idx) => idx !== dayIndex)
    .map((day, idx) => ({ ...day, day: idx + 1 }));

  const planStats = recalculatePlanStats(newDays);

  return {
    ...plan,
    days: newDays,
    stats: {
      ...plan.stats,
      ...planStats,
    },
  };
}

export function addDayToPlan(plan: GeneratedPlan): GeneratedPlan {
  const newDayNumber = plan.days.length + 1;
  const newDate = calculateDate(plan.filters.startDate, newDayNumber - 1);

  const lastDay = plan.days[plan.days.length - 1];
  const centerPoint = lastDay ? lastDay.stats.centerPoint : DEFAULT_CENTER;

  const newDay: DayPlan = {
    day: newDayNumber,
    date: newDate,
    places: [],
    stats: {
      totalPlaces: 0,
      totalTime: 0,
      totalPrice: 0,
      centerPoint,
    },
  };

  return {
    ...plan,
    days: [...plan.days, newDay],
    stats: {
      ...plan.stats,
      totalDays: newDayNumber,
    },
  };
}

export function updatePlanName(
  plan: GeneratedPlan,
  name: string,
): GeneratedPlan {
  const trimmedName = name.trim();
  return {
    ...plan,
    name: trimmedName || undefined,
  };
}
