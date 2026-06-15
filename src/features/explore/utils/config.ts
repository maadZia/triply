import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TARGET_GROUP,
  FOOD_TYPE,
  INTEREST_CATEGORY,
  FOOD_TYPE_LABELS,
  INTEREST_CATEGORY_LABELS,
} from "@/types/places";
import { getUniqueCities } from "@/mock/places";
import type { FilterSidebarProps, LayoutSection } from "./types";
import { categoryKey } from "./categories";

export const CITY_OPTIONS = getUniqueCities().map((c) => ({
  value: c,
  label: c,
}));

export const opt = <T extends string>(obj: Record<string, T>) =>
  Object.values(obj).map((v) => ({ value: v, label: v }));

export const PLACE_TYPE_OPTIONS = opt(PLACE_TYPE);
export const CROWD_LEVEL_OPTIONS = opt(CROWD_LEVEL);
export const TARGET_GROUP_OPTIONS = opt(TARGET_GROUP);

export const CATEGORY_OPTIONS = [
  ...Object.values(FOOD_TYPE)
    .filter((v) => v !== FOOD_TYPE.NONE)
    .map((v) => ({
      value: categoryKey({ kind: "food", value: v }),
      label: FOOD_TYPE_LABELS[v],
    })),
  ...Object.values(INTEREST_CATEGORY).map((v) => ({
    value: categoryKey({ kind: "interest", value: v }),
    label: INTEREST_CATEGORY_LABELS[v],
  })),
];

export const MOBILE_SECTIONS: LayoutSection[] = [
  { title: "Miasto", field: "city", className: "col-span-2" },
  { title: "Typ miejsca", field: "type", className: "min-w-0" },
  { title: "Poziom zatłoczenia", field: "crowd", className: "min-w-0" },
  { title: "Minimalna ocena", field: "rating", className: "min-w-0" },
  { title: "Cena (zł)", field: "price", className: "min-w-0" },
  { title: "Dla kogo", field: "target", className: "min-w-0" },
  { title: "Kategoria", field: "category", className: "min-w-0" },
];

export const DESKTOP_SECTIONS: LayoutSection[] = [
  { title: "Miasto", field: "city" },
  { title: "Typ miejsca", field: "type" },
  { title: "Minimalna ocena", field: "rating", dividerAfter: true },
  { title: "Cena (zł)", field: "price" },
  { title: "Poziom zatłoczenia", field: "crowd" },
  { title: "Dla kogo", field: "target" },
  { title: "Kategoria", field: "category" },
];

export function countActiveFilters(p: FilterSidebarProps): number {
  return [
    !!p.selectedCity,
    p.selectedTypes.length > 0,
    p.minRating > 0,
    p.priceRange[0] > 0 || p.priceRange[1] < 500,
    p.selectedCrowdLevels.length > 0,
    p.selectedTargetGroups.length > 0,
    p.selectedCategories.length > 0,
    p.selectedFoodTypes.length > 0,
  ].filter(Boolean).length;
}
