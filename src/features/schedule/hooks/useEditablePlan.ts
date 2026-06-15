import { useState, useEffect, useRef, useCallback } from "react";
import type { GeneratedPlan } from "@/types/plan";

export function useEditablePlan(plan: GeneratedPlan) {
  const [editablePlan, setEditablePlan] = useState<GeneratedPlan>(plan);
  const [hasModifications, setHasModifications] = useState(false);
  const prevPlanIdRef = useRef(plan.id);

  useEffect(() => {
    if (prevPlanIdRef.current !== plan.id) {
      setEditablePlan(plan);
      setHasModifications(false);
      prevPlanIdRef.current = plan.id;
    }
  }, [plan]);

  const updatePlan = useCallback(
    (
      updater: GeneratedPlan | ((prev: GeneratedPlan) => GeneratedPlan),
      options?: { markModified?: boolean },
    ) => {
      setEditablePlan((prev) =>
        typeof updater === "function" ? updater(prev) : updater,
      );
      if (options?.markModified !== false) {
        setHasModifications(true);
      }
    },
    [],
  );

  return {
    editablePlan,
    updatePlan,
    hasModifications,
    setHasModifications,
  };
}
