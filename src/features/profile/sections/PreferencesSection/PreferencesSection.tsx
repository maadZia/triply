import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
} from "@/types/places";
import { PreferenceCard, type SavedPreference } from "./PreferenceCard";
import { P2 } from "@/components/design-system/typography/Paragraph";

// Hardcoded preferencje
const INITIAL_PREFERENCES: SavedPreference[] = [
  {
    id: "pref-1",
    // name: "Aktywny weekend z jedzeniem",
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
    // name: "Tania podróż studencka",
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
    // name: "Spokojne zwiedzanie sztuki",
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
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setPreferences((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReuse = (pref: SavedPreference) => {
    navigate("/", { state: { filters: pref } });
  };

  return (
    <div className="flex flex-col gap-4">
      {preferences.length === 0 && (
        <P2 className="rounded-lg border border-dashed border-borderSecondary p-8 text-center text-contentSecondary">
          Brak zapisanych preferencji.
        </P2>
      )}

      {preferences.map((pref) => (
        <PreferenceCard
          key={pref.id}
          pref={pref}
          onDelete={handleDelete}
          onReuse={handleReuse}
        />
      ))}
    </div>
  );
}
