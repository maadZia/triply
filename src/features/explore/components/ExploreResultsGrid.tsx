import type { Place } from "@/types/places";
import { PlaceCardVertical } from "@/components/shared/PlaceCard/PlaceCardVertical";
import { HeartButton } from "@/components/design-system/atoms/icons";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ExploreResultsGridProps {
  places: Place[];
  onDetailsClick: (place: Place) => void;
}

export function ExploreResultsGrid({
  places,
  onDetailsClick,
}: ExploreResultsGridProps) {
  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
          <MagnifyingGlassIcon className="h-8 w-8 text-stone-400" />
        </div>
        <div className="space-y-1">
          <P1 className="font-semibold text-contentPrimary">Brak wyników</P1>
          <P1 className="text-contentSecondary text-sm">
            Spróbuj zmienić filtry lub wpisz inną frazę.
          </P1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <PlaceCardVertical
          key={place.id}
          title={place.name}
          description={place.description}
          img={place.mainImage}
          rating={place.rating}
          onDetailsClick={() => onDetailsClick(place)}
          actionButtons={<HeartButton />}
        />
      ))}
    </div>
  );
}
