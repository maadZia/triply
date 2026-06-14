import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useGeneratedPlan } from "@/context/GeneratedPlanContext";
import { PlanView } from "@/features/schedule/components/PlanView";
import { EmptyPlanState } from "@/features/schedule/components/EmptyPlanState";
import { getMockPlanById } from "@/mock/plans";
import type { GeneratedPlan } from "@/types/plan";

export default function SchedulePage() {
  const { id } = useParams<{ id: string }>();
  const { currentPlan, markAsSaved } = useGeneratedPlan();

  // Określ czy to plan z profilu (ma ID) czy wygenerowany
  const isProfilePlan = id !== "generated";

  // Pobierz plan na podstawie ID
  const plan = useMemo<GeneratedPlan | null>(() => {
    if (!id) return null;

    // Jeśli to wygenerowany plan, użyj Context
    if (id === "generated") {
      return currentPlan;
    }

    // W przeciwnym razie pobierz z mock backendu
    // Future: tutaj będzie fetch z API
    return getMockPlanById(id);
  }, [id, currentPlan]);

  // Obsługa zapisu planu
  const handleSavePlan = () => {
    // Future: tutaj będzie zapis do backendu
    // Na razie tylko oznacz jako zapisane
    if (!isProfilePlan) {
      markAsSaved();
    }
    alert(isProfilePlan ? "Zmiany zapisane!" : "Plan zapisany w profilu!");
  };

  // Jeśli brak planu, pokaż empty state
  if (!plan) {
    return (
      <EmptyPlanState
        message={
          id === "generated"
            ? "Brak wygenerowanego planu"
            : "Nie znaleziono planu"
        }
      />
    );
  }

  return <PlanView plan={plan} onSavePlan={handleSavePlan} />;
}
