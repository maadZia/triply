import type { FOOD_TYPE, INTEREST_CATEGORY } from "@/types/places";
import { toggle } from "./filters";
import type { FilterSidebarProps } from "./types";

type Category =
  | { kind: "food"; value: FOOD_TYPE }
  | { kind: "interest"; value: INTEREST_CATEGORY };

export function categoryKey(c: Category): string {
  return `${c.kind}:${c.value}`;
}

function parseCategoryKey(key: string): Category {
  const sep = key.indexOf(":");

  if (key.slice(0, sep) === "food") {
    return { kind: "food", value: key.slice(sep + 1) as FOOD_TYPE };
  }

  return { kind: "interest", value: key.slice(sep + 1) as INTEREST_CATEGORY };
}

export function useCategoryFilters(p: FilterSidebarProps) {
  const selectedCategoryKeys = [
    ...p.selectedFoodTypes.map((v) => categoryKey({ kind: "food", value: v })),
    ...p.selectedCategories.map((v) =>
      categoryKey({ kind: "interest", value: v }),
    ),
  ];

  const onToggleCategoryKey = (key: string) => {
    const c = parseCategoryKey(key);

    if (c.kind === "food") {
      toggle(c.value, p.selectedFoodTypes, p.setSelectedFoodTypes);
    } else {
      toggle(c.value, p.selectedCategories, p.setSelectedCategories);
    }
  };

  return { selectedCategoryKeys, onToggleCategoryKey };
}
