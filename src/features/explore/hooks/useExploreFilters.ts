import { useState, useMemo } from "react";
import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
  type FilterCriteria,
} from "@/types/places";

export interface ExploreFilterState {
  selectedCity: string;
  setSelectedCity: (v: string) => void;
  selectedTypes: PLACE_TYPE[];
  setSelectedTypes: (v: PLACE_TYPE[]) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedCrowdLevels: CROWD_LEVEL[];
  setSelectedCrowdLevels: (v: CROWD_LEVEL[]) => void;
  selectedTargetGroups: TARGET_GROUP[];
  setSelectedTargetGroups: (v: TARGET_GROUP[]) => void;
  selectedStyle: TRAVEL_STYLE | undefined;
  setSelectedStyle: (v: TRAVEL_STYLE | undefined) => void;
  selectedCategories: INTEREST_CATEGORY[];
  setSelectedCategories: (v: INTEREST_CATEGORY[]) => void;
  foodAvailable: boolean;
  setFoodAvailable: (v: boolean) => void;
  selectedFoodTypes: FOOD_TYPE[];
  setSelectedFoodTypes: (v: FOOD_TYPE[]) => void;
  selectedCuisines: CUISINE_TYPE[];
  setSelectedCuisines: (v: CUISINE_TYPE[]) => void;
  activeFilters: FilterCriteria;
  resetFilters: () => void;
}

export function useExploreFilters(): ExploreFilterState {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<PLACE_TYPE[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCrowdLevels, setSelectedCrowdLevels] = useState<CROWD_LEVEL[]>(
    [],
  );
  const [selectedTargetGroups, setSelectedTargetGroups] = useState<
    TARGET_GROUP[]
  >([]);
  const [selectedStyle, setSelectedStyle] = useState<TRAVEL_STYLE | undefined>(
    undefined,
  );
  const [selectedCategories, setSelectedCategories] = useState<
    INTEREST_CATEGORY[]
  >([]);
  const [foodAvailable, setFoodAvailable] = useState<boolean>(false);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<FOOD_TYPE[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<CUISINE_TYPE[]>([]);

  const activeFilters = useMemo<FilterCriteria>(
    () => ({
      city: selectedCity || undefined,
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      priceRange:
        priceRange[0] > 0 || priceRange[1] < 500
          ? { min: priceRange[0], max: priceRange[1] }
          : undefined,
      crowdLevels:
        selectedCrowdLevels.length > 0 ? selectedCrowdLevels : undefined,
      targetGroups:
        selectedTargetGroups.length > 0 ? selectedTargetGroups : undefined,
      style: selectedStyle,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      foodAvailable: foodAvailable || undefined,
      foodTypes: selectedFoodTypes.length > 0 ? selectedFoodTypes : undefined,
      cuisineTypes: selectedCuisines.length > 0 ? selectedCuisines : undefined,
    }),
    [
      selectedCity,
      selectedTypes,
      minRating,
      priceRange,
      selectedCrowdLevels,
      selectedTargetGroups,
      selectedStyle,
      selectedCategories,
      foodAvailable,
      selectedFoodTypes,
      selectedCuisines,
    ],
  );

  const resetFilters = () => {
    setSelectedCity("");
    setSelectedTypes([]);
    setMinRating(0);
    setPriceRange([0, 500]);
    setSelectedCrowdLevels([]);
    setSelectedTargetGroups([]);
    setSelectedStyle(undefined);
    setSelectedCategories([]);
    setFoodAvailable(false);
    setSelectedFoodTypes([]);
    setSelectedCuisines([]);
  };

  return {
    selectedCity,
    setSelectedCity,
    selectedTypes,
    setSelectedTypes,
    minRating,
    setMinRating,
    priceRange,
    setPriceRange,
    selectedCrowdLevels,
    setSelectedCrowdLevels,
    selectedTargetGroups,
    setSelectedTargetGroups,
    selectedStyle,
    setSelectedStyle,
    selectedCategories,
    setSelectedCategories,
    foodAvailable,
    setFoodAvailable,
    selectedFoodTypes,
    setSelectedFoodTypes,
    selectedCuisines,
    setSelectedCuisines,
    activeFilters,
    resetFilters,
  };
}
