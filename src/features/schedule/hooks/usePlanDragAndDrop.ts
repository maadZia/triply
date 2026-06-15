import { useState, useCallback } from "react";
import {
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type DropAnimation,
} from "@dnd-kit/core";
import type { GeneratedPlan, PlanPlace } from "@/types/plan";
import {
  findPlaceInPlan,
  reorderPlacesInPlan,
  movePlaceBetweenDaysInPlan,
} from "@/features/schedule/utils/planMutations";

interface UsePlanDragAndDropParams {
  editablePlan: GeneratedPlan;
  updatePlan: (
    updater: GeneratedPlan | ((prev: GeneratedPlan) => GeneratedPlan),
    options?: { markModified?: boolean },
  ) => void;
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function usePlanDragAndDrop({
  editablePlan,
  updatePlan,
  setSelectedDayIndex,
}: UsePlanDragAndDropParams) {
  const [activeDrag, setActiveDrag] = useState<{
    placeId: string;
    sourceDayIndex: number;
    place: PlanPlace;
  } | null>(null);
  const [dragOverDayIndex, setDragOverDayIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const placeId = active.id as string;

      const location = findPlaceInPlan(editablePlan.days, placeId);
      if (!location) return;

      const place =
        editablePlan.days[location.dayIndex].places[location.placeIndex];

      setActiveDrag({
        placeId,
        sourceDayIndex: location.dayIndex,
        place,
      });
    },
    [editablePlan.days],
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
      setDragOverDayIndex(null);
      return;
    }

    const overId = over.id.toString();

    if (overId.startsWith("day-tab-")) {
      const dayIndex = parseInt(overId.replace("day-tab-", ""), 10);
      setDragOverDayIndex(dayIndex);
    } else {
      setDragOverDayIndex(null);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveDrag(null);
      setDragOverDayIndex(null);

      if (!over) return;

      const placeId = active.id as string;
      const overId = over.id.toString();

      const location = findPlaceInPlan(editablePlan.days, placeId);
      if (!location) return;

      const { dayIndex: sourceDayIndex, placeIndex: sourcePlaceIndex } =
        location;

      if (overId.startsWith("day-tab-")) {
        const targetDayIndex = parseInt(overId.replace("day-tab-", ""), 10);

        if (targetDayIndex !== sourceDayIndex) {
          updatePlan((prev) =>
            movePlaceBetweenDaysInPlan(
              prev,
              sourceDayIndex,
              targetDayIndex,
              placeId,
            ),
          );
          setSelectedDayIndex(targetDayIndex);
        }
        return;
      }

      const targetPlaceId = overId;
      const targetLocation = findPlaceInPlan(editablePlan.days, targetPlaceId);

      if (!targetLocation) return;

      const { dayIndex: targetDayIndex, placeIndex: targetPlaceIndex } =
        targetLocation;

      if (sourceDayIndex === targetDayIndex) {
        if (sourcePlaceIndex !== targetPlaceIndex) {
          updatePlan((prev) =>
            reorderPlacesInPlan(
              prev,
              sourceDayIndex,
              sourcePlaceIndex,
              targetPlaceIndex,
            ),
          );
        }
      } else {
        updatePlan((prev) =>
          movePlaceBetweenDaysInPlan(
            prev,
            sourceDayIndex,
            targetDayIndex,
            placeId,
            targetPlaceIndex,
          ),
        );
      }
    },
    [editablePlan.days, updatePlan, setSelectedDayIndex],
  );

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return {
    sensors,
    activeDrag,
    dragOverDayIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropAnimation,
  };
}
