import {
  PLACE_TYPE,
  CROWD_LEVEL,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CROWD_LEVEL_LABELS,
  INTEREST_CATEGORY_LABELS,
  TARGET_GROUP_LABELS,
  FOOD_TYPE_LABELS,
  PLACE_TYPE_LABELS,
} from "@/types/places";
import { H2 } from "@/components/design-system/typography/Heading";

import { Divider } from "@/components/design-system/atoms/Divider";
import { Button } from "@/components/design-system/atoms/Button";
import { Combobox } from "@/components/design-system/forms/Combobox";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { Slider } from "@/components/design-system/forms/Slider";
import { getUniqueCities } from "@/mock/places";
import type { ExploreFilterState } from "@/features/explore/hooks/useExploreFilters";

const cityOptions = getUniqueCities().map((c) => ({ value: c, label: c }));

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-contentSecondary">
        {title}
      </p>
      {children}
    </div>
  );
}

function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <CheckboxButton
          key={opt.value}
          label={opt.label}
          checked={selected.includes(opt.value)}
          onChange={() => onToggle(opt.value)}
        />
      ))}
    </div>
  );
}

type ExploreSidebarProps = Pick<
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
>;

function toggleItem<T>(value: T, current: T[], set: (v: T[]) => void) {
  if (current.includes(value)) {
    set(current.filter((v) => v !== value));
  } else {
    set([...current, value]);
  }
}

export function ExploreSidebar({
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
  selectedCategories,
  setSelectedCategories,
  selectedFoodTypes,
  setSelectedFoodTypes,
  resetFilters,
}: ExploreSidebarProps) {
  return (
    <aside className="sticky top-6 h-fit w-72 shrink-0 space-y-5 rounded-2xl border border-borderSecondary bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <H2 className="text-lg">Filtry</H2>
        <Button plain onClick={resetFilters} className="text-xs py-0.5 px-2">
          Resetuj
        </Button>
      </div>

      <Divider />

      {/* City */}
      <SidebarSection title="Miasto">
        <Combobox
          value={selectedCity}
          onChange={setSelectedCity}
          options={[{ value: "", label: "Wszystkie miasta" }, ...cityOptions]}
          placeholder="Wybierz miasto..."
        />
      </SidebarSection>

      <Divider />

      {/* Place Type */}
      <SidebarSection title="Typ miejsca">
        <ChipGroup
          options={Object.values(PLACE_TYPE).map((v) => ({
            value: v,
            label: PLACE_TYPE_LABELS[v],
          }))}
          selected={selectedTypes}
          onToggle={(v) => toggleItem(v, selectedTypes, setSelectedTypes)}
        />
      </SidebarSection>

      <Divider />

      {/* Min Rating */}
      <SidebarSection title="Minimalna ocena">
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={setMinRating}
          valueFormatter={(v) => (v === 0 ? "Wszystkie" : `${v.toFixed(1)} ★`)}
        />
      </SidebarSection>

      <Divider />

      {/* Price Range */}
      <SidebarSection title="Cena (zł)">
        <Slider
          variant="double"
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
          showValues
          valueFormatter={(v) => `${v} zł`}
        />
      </SidebarSection>

      <Divider />

      {/* Crowd Level */}
      <SidebarSection title="Poziom zatłoczenia">
        <ChipGroup
          options={Object.values(CROWD_LEVEL).map((v) => ({
            value: v,
            label: CROWD_LEVEL_LABELS[v],
          }))}
          selected={selectedCrowdLevels}
          onToggle={(v) =>
            toggleItem(v, selectedCrowdLevels, setSelectedCrowdLevels)
          }
        />
      </SidebarSection>

      <Divider />

      {/* Target Groups */}
      <SidebarSection title="Dla kogo">
        <ChipGroup
          options={Object.values(TARGET_GROUP).map((v) => ({
            value: v,
            label: TARGET_GROUP_LABELS[v],
          }))}
          selected={selectedTargetGroups}
          onToggle={(v) =>
            toggleItem(v, selectedTargetGroups, setSelectedTargetGroups)
          }
        />
      </SidebarSection>

      <Divider />

      <SidebarSection title="Typ miejsca">
        <ChipGroup
          options={[
            ...Object.values(FOOD_TYPE)
              .filter((v) => v !== FOOD_TYPE.NONE)
              .map((v) => ({ value: v, label: FOOD_TYPE_LABELS[v] })),
            ...Object.values(INTEREST_CATEGORY).map((v) => ({
              value: v,
              label: INTEREST_CATEGORY_LABELS[v],
            })),
          ]}
          selected={[...selectedFoodTypes, ...selectedCategories]}
          onToggle={(v: FOOD_TYPE | INTEREST_CATEGORY) => {
            if (selectedFoodTypes.includes(v as FOOD_TYPE)) {
              toggleItem(
                v as FOOD_TYPE,
                selectedFoodTypes,
                setSelectedFoodTypes,
              );
            } else {
              toggleItem(
                v as INTEREST_CATEGORY,
                selectedCategories,
                setSelectedCategories,
              );
            }
          }}
        />
      </SidebarSection>
    </aside>
  );
}
