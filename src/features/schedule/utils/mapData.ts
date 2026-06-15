import type { MapMarker } from "@/components/design-system/atoms/Map";
import type { DayPlan } from "@/types/plan";
import type { Place } from "@/types/places";
import { DEFAULT_CENTER } from "./planMutations";

export function buildPlaceMarkerLabels(
  days: DayPlan[],
): globalThis.Map<string, string> {
  const labels = new globalThis.Map<string, string>();
  const multiDay = days.length > 1;

  days.forEach((day, dayIndex) => {
    day.places.forEach((place, placeIndex) => {
      labels.set(
        place.id,
        multiDay
          ? `D${dayIndex + 1}:${placeIndex + 1}`
          : String(placeIndex + 1),
      );
    });
  });

  return labels;
}

export function buildMapMarkers(
  allCityPlaces: Place[],
  selectedPlaceIds: Set<string>,
  placeMarkerLabels: globalThis.Map<string, string>,
): MapMarker[] {
  return allCityPlaces.map((place) => {
    const selected = selectedPlaceIds.has(place.id);

    return {
      id: place.id,
      lat: place.location.coordinates!.lat,
      lng: place.location.coordinates!.lng,
      label: place.name,
      selected,
      markerLabel: selected ? placeMarkerLabels.get(place.id) : undefined,
    };
  });
}

export function getMapCenter(
  selectedDay: DayPlan | undefined,
  allCityPlaces: Place[],
): [number, number] {
  if (!selectedDay || selectedDay.places.length === 0) {
    if (allCityPlaces.length > 0) {
      return [
        allCityPlaces[0].location.coordinates!.lat,
        allCityPlaces[0].location.coordinates!.lng,
      ];
    }
    return [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
  }

  return [selectedDay.stats.centerPoint.lat, selectedDay.stats.centerPoint.lng];
}
