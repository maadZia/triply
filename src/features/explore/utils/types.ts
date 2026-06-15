import type { ExploreFilterState } from "@/features/explore/hooks/useExploreFilters";

export type FilterSidebarProps = Pick<
  ExploreFilterState,
  | "selectedCity"
  | "setSelectedCity"
  | "selectedTypes"
  | "setSelectedTypes"
  | "minRating"
  | "setMinRating"
  | "priceRange"
  | "setPriceRange"
  | "selectedCrowdLevels"
  | "setSelectedCrowdLevels"
  | "selectedTargetGroups"
  | "setSelectedTargetGroups"
  | "selectedCategories"
  | "setSelectedCategories"
  | "selectedFoodTypes"
  | "setSelectedFoodTypes"
  | "resetFilters"
> & { variant?: "mobile" | "desktop" };

export type FilterFieldKey =
  | "city"
  | "type"
  | "crowd"
  | "rating"
  | "price"
  | "target"
  | "category";

export type LayoutSection = {
  title: string;
  field: FilterFieldKey;
  className?: string;
  dividerAfter?: boolean;
};
