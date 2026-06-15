import { useState, useCallback } from "react";
import type { GeneratedPlan } from "@/types/plan";
import {
  addDayToPlan,
  deleteDayFromPlan,
} from "@/features/schedule/utils/planMutations";

interface UsePlanDayManagementParams {
  editablePlan: GeneratedPlan;
  updatePlan: (
    updater: GeneratedPlan | ((prev: GeneratedPlan) => GeneratedPlan),
    options?: { markModified?: boolean },
  ) => void;
  selectedDayIndex: number;
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function usePlanDayManagement({
  editablePlan,
  updatePlan,
  selectedDayIndex,
  setSelectedDayIndex,
}: UsePlanDayManagementParams) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dayToDeleteIndex, setDayToDeleteIndex] = useState<number | null>(null);

  const handleDeleteDayRequest = useCallback((dayIndex: number) => {
    setDayToDeleteIndex(dayIndex);
    setIsPopupOpen(true);
  }, []);

  const handleConfirmDeleteDay = useCallback(() => {
    if (dayToDeleteIndex === null) return;

    const dayIndex = dayToDeleteIndex;

    updatePlan((prev) => deleteDayFromPlan(prev, dayIndex));

    setIsPopupOpen(false);
    setDayToDeleteIndex(null);

    if (selectedDayIndex >= dayIndex && selectedDayIndex > 0) {
      setSelectedDayIndex((prev) => prev - 1);
    }
  }, [dayToDeleteIndex, selectedDayIndex, updatePlan, setSelectedDayIndex]);

  const handleCancelDeleteDay = useCallback(() => {
    setIsPopupOpen(false);
    setDayToDeleteIndex(null);
  }, []);

  const handleAddDay = useCallback(() => {
    updatePlan((prev) => addDayToPlan(prev));
    setSelectedDayIndex(editablePlan.days.length);
  }, [editablePlan.days.length, updatePlan, setSelectedDayIndex]);

  return {
    isPopupOpen,
    dayToDeleteIndex,
    handleAddDay,
    handleDeleteDayRequest,
    handleConfirmDeleteDay,
    handleCancelDeleteDay,
  };
}
