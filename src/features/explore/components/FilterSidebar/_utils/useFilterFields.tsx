import { useMemo } from "react";
import { Combobox } from "@/components/design-system/forms/Combobox";
import { Slider } from "@/components/design-system/forms/Slider";
import { ChipGroup } from "../ChipGroup";
import { toggle } from "./filters";
import { useCategoryFilters } from "./categories";
import {
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  CROWD_LEVEL_OPTIONS,
  PLACE_TYPE_OPTIONS,
  TARGET_GROUP_OPTIONS,
} from "./config";
import type { FilterFieldKey, FilterSidebarProps } from "./types";

export function useFilterFields(p: FilterSidebarProps) {
  const { selectedCategoryKeys, onToggleCategoryKey } = useCategoryFilters(p);

  return useMemo(
    () =>
      ({
        city: (
          <Combobox
            value={p.selectedCity}
            onChange={p.setSelectedCity}
            options={[
              { value: "", label: "Wszystkie miasta" },
              ...CITY_OPTIONS,
            ]}
            placeholder="Wybierz miasto..."
          />
        ),
        type: (
          <ChipGroup
            options={PLACE_TYPE_OPTIONS}
            selected={p.selectedTypes}
            onToggle={(v) => toggle(v, p.selectedTypes, p.setSelectedTypes)}
          />
        ),
        crowd: (
          <ChipGroup
            options={CROWD_LEVEL_OPTIONS}
            selected={p.selectedCrowdLevels}
            onToggle={(v) =>
              toggle(v, p.selectedCrowdLevels, p.setSelectedCrowdLevels)
            }
          />
        ),
        rating: (
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={p.minRating}
            onChange={p.setMinRating}
            valueFormatter={(v) =>
              v === 0 ? "Wszystkie" : `${v.toFixed(1)} ★`
            }
          />
        ),
        price: (
          <Slider
            variant="double"
            min={0}
            max={500}
            step={10}
            value={p.priceRange}
            onChange={p.setPriceRange}
            showValues
            valueFormatter={(v) => `${v} zł`}
          />
        ),
        target: (
          <ChipGroup
            options={TARGET_GROUP_OPTIONS}
            selected={p.selectedTargetGroups}
            onToggle={(v) =>
              toggle(v, p.selectedTargetGroups, p.setSelectedTargetGroups)
            }
          />
        ),
        category: (
          <ChipGroup
            options={CATEGORY_OPTIONS}
            selected={selectedCategoryKeys}
            onToggle={onToggleCategoryKey}
          />
        ),
      }) satisfies Record<FilterFieldKey, React.ReactNode>,
    [p, selectedCategoryKeys, onToggleCategoryKey],
  );
}
