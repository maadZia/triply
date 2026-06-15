import type {
  PLACE_TYPE,
  CROWD_LEVEL,
  TARGET_GROUP,
  INTEREST_CATEGORY,
  FOOD_TYPE,
  CUISINE_TYPE,
} from "@/types/places";
import type { PlanFilters } from "@/types/plan";
import {
  DEFAULT_FILTER_VALUES,
  type FilterFormState,
} from "@/features/home/utils/filterDefaults";

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
}

export function toggleArrayValue(
  value: string,
  currentValues: string[],
  setter: (values: string[]) => void,
) {
  if (currentValues.includes(value)) {
    setter(currentValues.filter((v) => v !== value));
  } else {
    setter([...currentValues, value]);
  }
}

export function createInitialFilterState(
  initialFilters?: Partial<PlanFilters>,
): FilterFormState {
  return {
    selectedCity: initialFilters?.city ?? DEFAULT_FILTER_VALUES.selectedCity,
    selectedDays: initialFilters?.days ?? DEFAULT_FILTER_VALUES.selectedDays,
    startDate: initialFilters?.startDate ?? DEFAULT_FILTER_VALUES.startDate,
    selectedTypes: initialFilters?.types ?? [
      ...DEFAULT_FILTER_VALUES.selectedTypes,
    ],
    minRating: initialFilters?.minRating ?? DEFAULT_FILTER_VALUES.minRating,
    priceRange: initialFilters?.priceRange
      ? [...initialFilters.priceRange]
      : [...DEFAULT_FILTER_VALUES.priceRange],
    selectedCrowdLevels: initialFilters?.crowdLevels ?? [
      ...DEFAULT_FILTER_VALUES.selectedCrowdLevels,
    ],
    selectedTargetGroups: initialFilters?.targetGroups ?? [
      ...DEFAULT_FILTER_VALUES.selectedTargetGroups,
    ],
    selectedStyle: initialFilters?.style ?? DEFAULT_FILTER_VALUES.selectedStyle,
    selectedCategories: initialFilters?.categories ?? [
      ...DEFAULT_FILTER_VALUES.selectedCategories,
    ],
    foodAvailable:
      initialFilters?.foodAvailable ?? DEFAULT_FILTER_VALUES.foodAvailable,
    selectedFoodTypes: initialFilters?.foodTypes ?? [
      ...DEFAULT_FILTER_VALUES.selectedFoodTypes,
    ],
    selectedCuisines: initialFilters?.cuisines ?? [
      ...DEFAULT_FILTER_VALUES.selectedCuisines,
    ],
  };
}

export function hasFilterChanges(state: FilterFormState): boolean {
  const defaults = DEFAULT_FILTER_VALUES;

  return (
    state.selectedCity !== defaults.selectedCity ||
    state.selectedDays !== defaults.selectedDays ||
    state.startDate !== defaults.startDate ||
    !arraysEqual(state.selectedTypes, defaults.selectedTypes) ||
    state.minRating !== defaults.minRating ||
    state.priceRange[0] !== defaults.priceRange[0] ||
    state.priceRange[1] !== defaults.priceRange[1] ||
    !arraysEqual(state.selectedCrowdLevels, defaults.selectedCrowdLevels) ||
    !arraysEqual(state.selectedTargetGroups, defaults.selectedTargetGroups) ||
    state.selectedStyle !== defaults.selectedStyle ||
    !arraysEqual(state.selectedCategories, defaults.selectedCategories) ||
    state.foodAvailable !== defaults.foodAvailable ||
    !arraysEqual(state.selectedFoodTypes, defaults.selectedFoodTypes) ||
    !arraysEqual(state.selectedCuisines, defaults.selectedCuisines)
  );
}

export function toPlanFilters(state: FilterFormState): PlanFilters {
  return {
    city: state.selectedCity,
    days: state.selectedDays,
    startDate: state.startDate || undefined,
    types: state.selectedTypes as PLACE_TYPE[],
    minRating: state.minRating,
    priceRange: state.priceRange,
    crowdLevels: state.selectedCrowdLevels as CROWD_LEVEL[],
    targetGroups: state.selectedTargetGroups as TARGET_GROUP[],
    style: state.selectedStyle,
    categories: state.selectedCategories as INTEREST_CATEGORY[],
    foodAvailable: state.foodAvailable,
    foodTypes: state.selectedFoodTypes as FOOD_TYPE[],
    cuisines: state.selectedCuisines as CUISINE_TYPE[],
  };
}
