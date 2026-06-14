import { useState } from "react";
import { LightCard } from "@/components/design-system/cards/LightCard";
import { P3, P1 } from "@/components/design-system/typography/Paragraph";
import { DeleteButton } from "@/components/design-system/atoms/icons/DeleteButton";
import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
  INTEREST_CATEGORY_LABELS,
  PLACE_TYPE_LABELS,
  TRAVEL_STYLE_LABELS,
  TARGET_GROUP_LABELS,
  CROWD_LEVEL_LABELS,
  FOOD_TYPE_LABELS,
  CUISINE_TYPE_LABELS,
} from "@/types/places";
import type { PlanFilters } from "@/types/plan";

// Typ zapisanego filtru - Omit<PlanFilters, 'city'>
type SavedPreference = Omit<PlanFilters, "city"> & {
  id: string;
  name: string;
  createdAt: string;
};

// Hardcoded preferencje
const INITIAL_PREFERENCES: SavedPreference[] = [
  {
    id: "pref-1",
    name: "Aktywny weekend z jedzeniem",
    createdAt: "2025-05-10",
    days: 3,
    types: [PLACE_TYPE.OUTDOOR, PLACE_TYPE.INDOOR],
    minRating: 4.5,
    priceRange: [100, 300],
    crowdLevels: [CROWD_LEVEL.MODERATE],
    targetGroups: [TARGET_GROUP.COUPLES],
    style: TRAVEL_STYLE.INTENSIVE,
    categories: [INTEREST_CATEGORY.HISTORY, INTEREST_CATEGORY.FOOD],
    foodAvailable: true,
    foodTypes: [FOOD_TYPE.RESTAURANT, FOOD_TYPE.STREET_FOOD],
    cuisines: [CUISINE_TYPE.LOCAL],
  },
  {
    id: "pref-2",
    name: "Tania podróż studencka",
    createdAt: "2025-06-02",
    days: 5,
    types: [PLACE_TYPE.OUTDOOR],
    minRating: 3.5,
    priceRange: [0, 50],
    crowdLevels: [CROWD_LEVEL.BUSY, CROWD_LEVEL.MODERATE],
    targetGroups: [TARGET_GROUP.STUDENTS],
    style: TRAVEL_STYLE.INTENSIVE,
    categories: [INTEREST_CATEGORY.ENTERTAINMENT],
    foodAvailable: false,
    foodTypes: [],
    cuisines: [],
  },
  {
    id: "pref-3",
    name: "Spokojne zwiedzanie sztuki",
    createdAt: "2026-05-14",
    days: 2,
    types: [PLACE_TYPE.INDOOR],
    minRating: 4.0,
    priceRange: [0, 150],
    crowdLevels: [CROWD_LEVEL.QUIET],
    targetGroups: [TARGET_GROUP.SENIORS],
    style: TRAVEL_STYLE.RELAXED,
    categories: [
      INTEREST_CATEGORY.ART,
      INTEREST_CATEGORY.HISTORY,
      INTEREST_CATEGORY.ARCHITECTURE,
    ],
    foodAvailable: true,
    foodTypes: [FOOD_TYPE.CAFE],
    cuisines: [],
  },
];

export function PreferencesSection() {
  const [preferences, setPreferences] =
    useState<SavedPreference[]>(INITIAL_PREFERENCES);

  const handleDelete = (id: string) => {
    setPreferences((prev) => prev.filter((p) => p.id !== id));
  };

  // Funkcja mapująca kategorie i inne enumy na czytelne tagi
  const renderTags = (pref: SavedPreference) => {
    const tags: string[] = [];

    tags.push(`${pref.days} dni`);
    tags.push(TRAVEL_STYLE_LABELS[pref.style]);

    tags.push(`Ocena od ${pref.minRating}★`);

    if (pref.priceRange[1] > 0) {
      if (pref.priceRange[0] > 0) {
        tags.push(`Od ${pref.priceRange[0]} do ${pref.priceRange[1]} PLN`);
      } else {
        tags.push(`Do ${pref.priceRange[1]} PLN`);
      }
    } else {
      tags.push("Darmowe");
    }

    pref.categories.forEach((c) => tags.push(INTEREST_CATEGORY_LABELS[c]));
    pref.types.forEach((c) => tags.push(PLACE_TYPE_LABELS[c]));
    pref.targetGroups.forEach((c) => tags.push(TARGET_GROUP_LABELS[c]));
    pref.crowdLevels.forEach((c) => tags.push(CROWD_LEVEL_LABELS[c]));

    if (pref.foodAvailable) {
      tags.push("Z jedzeniem");
      pref.foodTypes.forEach((c) => tags.push(FOOD_TYPE_LABELS[c]));
      pref.cuisines.forEach((c) => tags.push(CUISINE_TYPE_LABELS[c]));
    }

    return tags.map((tag, idx) => (
      <span
        key={idx}
        className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm"
      >
        {tag}
      </span>
    ));
  };

  return (
    <div className="flex flex-col gap-4">
      {preferences.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-contentSecondary">
          Brak zapisanych preferencji.
        </div>
      )}

      {preferences.map((pref) => (
        <LightCard key={pref.id} className="relative w-full max-w-3xl p-5">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <P1 className="text-lg font-bold text-gray-900">{pref.name}</P1>
              <P3 className="mt-1 text-contentSecondary">
                Zapisano: {new Date(pref.createdAt).toLocaleDateString("pl-PL")}
              </P3>
            </div>
            <DeleteButton
              onClick={() => handleDelete(pref.id)}
              ariaLabel="Usuń preferencje"
            />
          </div>

          {/* Tags section */}
          <div className="flex flex-wrap gap-2">{renderTags(pref)}</div>
        </LightCard>
      ))}
    </div>
  );
}
