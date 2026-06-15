import { useState, useMemo } from "react";
import type { PlanFilters } from "@/types/plan";
import type { FilterFormState } from "@/features/home/utils/filterDefaults";
import {
  createInitialFilterState,
  hasFilterChanges,
  toPlanFilters,
  toggleArrayValue,
} from "@/features/home/utils/filterHelpers";

export function usePlanFilters(initialFilters?: Partial<PlanFilters>) {
  const [state, setState] = useState<FilterFormState>(() =>
    createInitialFilterState(initialFilters),
  );

  const hasChanges = useMemo(() => hasFilterChanges(state), [state]);

  const reset = () => {
    setState(createInitialFilterState());
  };

  const patchState = (patch: Partial<FilterFormState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  return {
    selectedCity: state.selectedCity,
    setSelectedCity: (selectedCity: string) => patchState({ selectedCity }),
    selectedDays: state.selectedDays,
    setSelectedDays: (selectedDays: number) => patchState({ selectedDays }),
    startDate: state.startDate,
    setStartDate: (startDate: string) => patchState({ startDate }),
    selectedTypes: state.selectedTypes,
    setSelectedTypes: (selectedTypes: string[]) =>
      patchState({ selectedTypes }),
    minRating: state.minRating,
    setMinRating: (minRating: number) => patchState({ minRating }),
    priceRange: state.priceRange,
    setPriceRange: (priceRange: [number, number]) => patchState({ priceRange }),
    selectedCrowdLevels: state.selectedCrowdLevels,
    setSelectedCrowdLevels: (selectedCrowdLevels: string[]) =>
      patchState({ selectedCrowdLevels }),
    selectedTargetGroups: state.selectedTargetGroups,
    setSelectedTargetGroups: (selectedTargetGroups: string[]) =>
      patchState({ selectedTargetGroups }),
    selectedStyle: state.selectedStyle,
    setSelectedStyle: (selectedStyle: FilterFormState["selectedStyle"]) =>
      patchState({ selectedStyle }),
    selectedCategories: state.selectedCategories,
    setSelectedCategories: (selectedCategories: string[]) =>
      patchState({ selectedCategories }),
    foodAvailable: state.foodAvailable,
    setFoodAvailable: (foodAvailable: boolean) => patchState({ foodAvailable }),
    selectedFoodTypes: state.selectedFoodTypes,
    setSelectedFoodTypes: (selectedFoodTypes: string[]) =>
      patchState({ selectedFoodTypes }),
    selectedCuisines: state.selectedCuisines,
    setSelectedCuisines: (selectedCuisines: string[]) =>
      patchState({ selectedCuisines }),
    toggleArrayValue,
    reset,
    hasChanges,
    getPlanFilters: () => toPlanFilters(state),
  };
}
