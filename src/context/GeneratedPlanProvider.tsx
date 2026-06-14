import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { GeneratedPlanContext } from "./GeneratedPlanContext";
import type {
  PlanFilters,
  GeneratedPlan,
  GeneratedPlanContextType,
} from "@/types/plan";
import { generatePlan as generatePlanUtil } from "@/utils/planGenerator";

interface GeneratedPlanProviderProps {
  children: ReactNode;
}

export function GeneratedPlanProvider({
  children,
}: GeneratedPlanProviderProps) {
  const [currentPlan, setCurrentPlan] = useState<GeneratedPlan | null>(null);
  const [filters, setFilters] = useState<PlanFilters | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  // Generowanie planu
  const generatePlan = useCallback(
    async (newFilters: PlanFilters) => {
      setIsGenerating(true);
      setFilters(newFilters);

      try {
        const plan = await generatePlanUtil(newFilters);
        setCurrentPlan(plan);
        setHasUnsavedChanges(true);
        navigate("/schedule/generated");
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [navigate],
  );

  const clearPlan = useCallback(() => {
    setCurrentPlan(null);
    setFilters(null);
    setHasUnsavedChanges(false);
  }, []);

  const markAsSaved = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    if (hasUnsavedChanges) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue =
          "Masz niezapisany plan podróży. Czy na pewno chcesz opuścić stronę?";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [hasUnsavedChanges]);

  const value: GeneratedPlanContextType = {
    currentPlan,
    filters,
    isGenerating,
    hasUnsavedChanges,
    generatePlan,
    clearPlan,
    markAsSaved,
  };

  return (
    <GeneratedPlanContext.Provider value={value}>
      {children}
    </GeneratedPlanContext.Provider>
  );
}
