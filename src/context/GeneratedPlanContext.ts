import { createContext, useContext } from "react";
import type { GeneratedPlanContextType } from "@/types/plan";

export const GeneratedPlanContext =
  createContext<GeneratedPlanContextType | null>(null);

export function useGeneratedPlan(): GeneratedPlanContextType {
  const context = useContext(GeneratedPlanContext);
  if (!context) {
    throw new Error(
      "useGeneratedPlan must be used within a GeneratedPlanProvider",
    );
  }
  return context;
}
