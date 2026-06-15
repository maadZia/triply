import { useState } from "react";
import type { GeneratedPlan } from "@/types/plan";

export function usePlanDaySelection(editablePlan: GeneratedPlan) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = editablePlan.days[selectedDayIndex];

  return {
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay,
  };
}
