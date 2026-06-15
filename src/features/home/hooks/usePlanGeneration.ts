import { useState } from "react";
import type { PlanFilters } from "@/types/plan";
import { validateFilters } from "@/utils/planGenerator";

interface UsePlanGenerationOptions {
  generatePlan: (filters: PlanFilters) => Promise<void>;
  getPlanFilters: () => PlanFilters;
}

export function usePlanGeneration({
  generatePlan,
  getPlanFilters,
}: UsePlanGenerationOptions) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalError(null);
    setModalStep(0);
  };

  const handleGenerate = async () => {
    const filters = getPlanFilters();
    const validationError = validateFilters(filters);

    if (validationError) {
      setModalError(validationError);
      setIsModalOpen(true);
      return;
    }

    setModalError(null);
    setModalStep(0);
    setIsModalOpen(true);

    const stepInterval = setInterval(() => {
      setModalStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 250);

    try {
      await generatePlan(filters);
      clearInterval(stepInterval);
      setIsModalOpen(false);
    } catch (error) {
      clearInterval(stepInterval);
      setModalStep(0);
      setModalError(
        error instanceof Error
          ? error.message
          : "Nieznany błąd podczas generowania planu",
      );
    }
  };

  return {
    isModalOpen,
    modalStep,
    modalError,
    handleGenerate,
    handleCloseModal,
  };
}
