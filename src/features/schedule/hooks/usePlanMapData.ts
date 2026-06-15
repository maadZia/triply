import { useMemo } from "react";
import { getPlacesByCity } from "@/mock/places";
import type { GeneratedPlan, DayPlan } from "@/types/plan";
import { getSelectedPlaceIds } from "@/features/schedule/utils/planMutations";
import {
  buildPlaceMarkerLabels,
  buildMapMarkers,
  getMapCenter,
} from "@/features/schedule/utils/mapData";

export function usePlanMapData(
  editablePlan: GeneratedPlan,
  selectedDay: DayPlan | undefined,
) {
  const allCityPlaces = useMemo(
    () => getPlacesByCity(editablePlan.city),
    [editablePlan.city],
  );

  const selectedPlaceIds = useMemo(
    () => getSelectedPlaceIds(editablePlan.days),
    [editablePlan.days],
  );

  const placeMarkerLabels = useMemo(
    () => buildPlaceMarkerLabels(editablePlan.days),
    [editablePlan.days],
  );

  const mapMarkers = useMemo(
    () => buildMapMarkers(allCityPlaces, selectedPlaceIds, placeMarkerLabels),
    [allCityPlaces, selectedPlaceIds, placeMarkerLabels],
  );

  const mapCenter = useMemo(
    () => getMapCenter(selectedDay, allCityPlaces),
    [selectedDay, allCityPlaces],
  );

  return {
    allCityPlaces,
    selectedPlaceIds,
    mapMarkers,
    mapCenter,
  };
}
