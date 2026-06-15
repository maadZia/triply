import { useState, useMemo, useCallback } from "react";
import type { Place } from "@/types/places";
import type { GeneratedPlan } from "@/types/plan";
import type { MapMarker } from "@/components/design-system/atoms/Map";
import { toDialogPlace } from "@/utils/placeMapper";
import {
  addPlaceToPlan,
  removePlaceFromPlan,
  placeToPlanPlace,
} from "@/features/schedule/utils/planMutations";

interface UsePlanPlaceDialogParams {
  selectedDayIndex: number;
  updatePlan: (
    updater: GeneratedPlan | ((prev: GeneratedPlan) => GeneratedPlan),
    options?: { markModified?: boolean },
  ) => void;
  allCityPlaces: Place[];
  selectedPlaceIds: Set<string>;
}

export function usePlanPlaceDialog({
  selectedDayIndex,
  updatePlan,
  allCityPlaces,
  selectedPlaceIds,
}: UsePlanPlaceDialogParams) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMarkerClick = useCallback(
    (marker: MapMarker) => {
      const place = allCityPlaces.find((p) => p.id === marker.id);
      if (place) {
        setSelectedPlace(place);
        setIsDialogOpen(true);
      }
    },
    [allCityPlaces],
  );

  const handleDetailsClick = useCallback(
    (placeId: string) => {
      const place = allCityPlaces.find((p) => p.id === placeId);
      if (place) {
        setSelectedPlace(place);
        setIsDialogOpen(true);
      }
    },
    [allCityPlaces],
  );

  const isSelectedPlaceInPlan = useMemo(() => {
    if (!selectedPlace) return false;
    return selectedPlaceIds.has(selectedPlace.id);
  }, [selectedPlace, selectedPlaceIds]);

  const placeForDialog = useMemo(() => {
    if (!selectedPlace) return undefined;
    return toDialogPlace(selectedPlace);
  }, [selectedPlace]);

  const handleAddToPlan = useCallback(() => {
    if (!selectedPlace) return;

    const newPlace = placeToPlanPlace(selectedPlace);
    updatePlan((prev) => addPlaceToPlan(prev, selectedDayIndex, newPlace));
    setIsDialogOpen(false);
  }, [selectedPlace, selectedDayIndex, updatePlan]);

  const handleRemovePlace = useCallback(
    (placeId: string) => {
      updatePlan((prev) =>
        removePlaceFromPlan(prev, selectedDayIndex, placeId),
      );
    },
    [selectedDayIndex, updatePlan],
  );

  return {
    selectedPlace,
    isDialogOpen,
    setIsDialogOpen,
    handleMarkerClick,
    handleDetailsClick,
    handleAddToPlan,
    handleRemovePlace,
    isSelectedPlaceInPlan,
    placeForDialog,
  };
}
