import { TRAVEL_STYLE } from "@/types/places";

export const DEFAULT_FILTER_VALUES = {
  selectedCity: "",
  selectedDays: 3,
  startDate: "",
  selectedTypes: [] as string[],
  minRating: 4,
  priceRange: [0, 500] as [number, number],
  selectedCrowdLevels: [] as string[],
  selectedTargetGroups: [] as string[],
  selectedStyle: TRAVEL_STYLE.RELAXED,
  selectedCategories: [] as string[],
  foodAvailable: false,
  selectedFoodTypes: [] as string[],
  selectedCuisines: [] as string[],
} as const;

export type FilterFormState = {
  selectedCity: string;
  selectedDays: number;
  startDate: string;
  selectedTypes: string[];
  minRating: number;
  priceRange: [number, number];
  selectedCrowdLevels: string[];
  selectedTargetGroups: string[];
  selectedStyle: TRAVEL_STYLE;
  selectedCategories: string[];
  foodAvailable: boolean;
  selectedFoodTypes: string[];
  selectedCuisines: string[];
};
