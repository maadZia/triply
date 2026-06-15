import { useState, useCallback, useEffect, useRef } from "react";
import type { GeneratedPlan } from "@/types/plan";
import { updatePlanName } from "@/features/schedule/utils/planMutations";

export function usePlanNameEditing(
  plan: GeneratedPlan,
  editablePlan: GeneratedPlan,
  updatePlan: (
    updater: GeneratedPlan | ((prev: GeneratedPlan) => GeneratedPlan),
    options?: { markModified?: boolean },
  ) => void,
) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [planNameInput, setPlanNameInput] = useState(editablePlan.name || "");
  const prevPlanIdRef = useRef(plan.id);

  useEffect(() => {
    if (prevPlanIdRef.current !== plan.id) {
      setPlanNameInput(plan.name || "");
      setIsEditingName(false);
      prevPlanIdRef.current = plan.id;
    }
  }, [plan]);

  const handleStartEditingName = useCallback(() => {
    setIsEditingName(true);
    setPlanNameInput(editablePlan.name || "");
  }, [editablePlan.name]);

  const handleSaveName = useCallback(() => {
    updatePlan((prev) => updatePlanName(prev, planNameInput));
    setIsEditingName(false);
  }, [planNameInput, updatePlan]);

  const handleCancelEditName = useCallback(() => {
    setPlanNameInput(editablePlan.name || "");
    setIsEditingName(false);
  }, [editablePlan.name]);

  const handleNameInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSaveName();
      } else if (e.key === "Escape") {
        handleCancelEditName();
      }
    },
    [handleSaveName, handleCancelEditName],
  );

  return {
    isEditingName,
    planNameInput,
    setPlanNameInput,
    handleStartEditingName,
    handleSaveName,
    handleCancelEditName,
    handleNameInputKeyDown,
  };
}
