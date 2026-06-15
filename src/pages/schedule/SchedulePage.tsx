import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useGeneratedPlan } from "@/context/plan/GeneratedPlanContext";
import { useToast } from "@/context/toast/ToastContext";
import { PlanView } from "@/features/schedule/components/PlanView";
import { EmptyPlanState } from "@/features/schedule/components/EmptyPlanState";
import { getMockPlanById } from "@/mock/plans";
import type { GeneratedPlan } from "@/types/plan";

export default function SchedulePage() {
  const { id } = useParams<{ id: string }>();
  const { currentPlan, markAsSaved } = useGeneratedPlan();
  const { showSuccessToast } = useToast();
  const navigate = useNavigate();
  // plan z profilu (ma ID) czy wygenerowany
  const isProfilePlan = id !== "generated";

  // pobierz plan na podstawie ID
  const plan = useMemo<GeneratedPlan | null>(() => {
    if (!id) return null;
    // jeśli to wygenerowany plan, użyj Context
    if (id === "generated") {
      return currentPlan;
    }
    // w przeciwnym razie pobierz z mock backendu
    // Future: tutaj będzie fetch z API
    return getMockPlanById(id);
  }, [id, currentPlan]);

  const handleSavePlan = () => {
    // Future: tutaj będzie zapis do backendu
    if (!isProfilePlan) {
      markAsSaved();
    }
    showSuccessToast(
      isProfilePlan ? "Zmiany zapisane!" : "Plan zapisany w profilu!",
    );
    navigate("/profile");
  };

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
