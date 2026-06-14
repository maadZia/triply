import { useState } from "react";
import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlaceCardVertical } from "@/components/shared/PlaceCard/PlaceCardVertical";
import { HeartButton } from "@/components/design-system/atoms/icons/HeartButton";
import {
  PlaceDetailsDialog,
  type Place,
} from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { allPlaces } from "@/mock/places";
import { toDialogPlace, type Attraction } from "@/utils/placeMapper";
type Group = {
  city: string;
  defaultOpen: boolean;
  attractions: Attraction[];
};

// Mock data — resets on page reload
const INITIAL_PLACES: Group[] = [
  {
    city: "Paryż",
    defaultOpen: false,
    attractions: allPlaces
      .filter((p) => p.city === "Paryż")
      .slice(0, 6)
      .map(toDialogPlace),
  },
  {
    city: "Kraków",
    defaultOpen: false,
    attractions: allPlaces
      .filter((p) => p.city === "Kraków")
      .slice(0, 1)
      .map(toDialogPlace),
  },
];

export function PlacesSection() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>();

  const handleUnheart = (city: string, attractionId: string) => {
    setGroups((prev) =>
      prev
        .map((group) => {
          if (group.city !== city) return group;
          return {
            ...group,
            attractions: group.attractions.filter((a) => a.id !== attractionId),
          };
        })
        .filter((group) => group.attractions.length > 0),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <ExpandableCard
          key={group.city}
          title={group.city}
          defaultOpen={group.defaultOpen}
        >
          <div className="flex flex-wrap gap-4">
            {group.attractions.map((place) => (
              <div key={place.id} className="w-60 shrink-0">
                <PlaceCardVertical
                  title={place.title}
                  description={place.description}
                  img={place.img}
                  rating={place.rating}
                  onDetailsClick={() => setSelectedPlace(place)}
                  actionButtons={
                    <HeartButton
                      defaultLiked={true}
                      onToggle={(liked) => {
                        if (!liked) handleUnheart(group.city, place.id);
                      }}
                    />
                  }
                />
              </div>
            ))}
          </div>
        </ExpandableCard>
      ))}

      <PlaceDetailsDialog
        place={selectedPlace}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
      />
    </div>
  );
}
