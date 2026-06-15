import { LightCard } from "@/components/design-system/cards/LightCard";
import { P3 } from "@/components/design-system/typography/Paragraph";
import { DeleteButton } from "@/components/shared/DeleteButton";
import { Button } from "@/components/design-system/atoms/Button";
import {
  INTEREST_CATEGORY_LABELS,
  PLACE_TYPE_LABELS,
  TRAVEL_STYLE_LABELS,
  TARGET_GROUP_LABELS,
  CROWD_LEVEL_LABELS,
  FOOD_TYPE_LABELS,
  CUISINE_TYPE_LABELS,
} from "@/types/places";
import type { PlanFilters } from "@/types/plan";

export type SavedPreference = Omit<PlanFilters, "city"> & {
  id: string;
  // name: string;
  createdAt: string;
};

interface PreferenceCardProps {
  pref: SavedPreference;
  onDelete: (id: string) => void;
  onReuse: (pref: SavedPreference) => void;
}

export function PreferenceCard({
  pref,
  onDelete,
  onReuse,
}: PreferenceCardProps) {
  // Funkcja mapująca kategorie i inne enumy na czytelne tagi
  const renderTags = () => {
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
    <LightCard className="relative w-full mx-auto max-w-4xl p-5">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-1">
          {/* <P1 className="text-lg font-bold text-gray-900">{pref.name}</P1> */}
          <P3 className="text-contentSecondary">
            Zapisano: {new Date(pref.createdAt).toLocaleDateString("pl-PL")}
          </P3>
        </div>
        <DeleteButton
          onClick={() => onDelete(pref.id)}
          ariaLabel="Usuń preferencje"
        />
      </div>

      {/* Tags section */}
      <div className="mb-4 flex flex-wrap gap-2">{renderTags()}</div>

      <Button outline className="w-full" onClick={() => onReuse(pref)}>
        Użyj filtrów
      </Button>
    </LightCard>
  );
}
