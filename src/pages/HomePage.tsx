import { useState } from "react";

import { FilterCard } from "@/features/home/components/FilterCard";
import { H2 } from "@/components/design-system/typography/Heading";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/design-system/atoms/Button";
import {
  HeartButton,
  BookmarkButton,
} from "@/components/design-system/atoms/icons";

import {
  PlaceDetailsDialog,
  type Place,
} from "@/components/shared/PlaceDetails/PlaceDetailsDialog";

import { allPlaces } from "@/mock/places";
import { toDialogPlace } from "@/utils/placeMapper";

export default function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  const recommendedPlaceIds = ["krk-001", "krk-002", "krk-005"];
  const places: Place[] = recommendedPlaceIds
    .map((id) => allPlaces.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map(toDialogPlace);

  return (
    <>
      <main className="flex gap-8">
        <FilterCard />

        <div className="flex w-2/5 flex-col items-center gap-6">
          <H2 className="w-full text-left">Podpowiedzi</H2>

          <div className="w-full space-y-4">
            {places.map((place, index) => (
              <PlaceCardHorizontal
                key={index}
                title={place.title}
                description={place.description}
                img={place.img}
                actionButtons={
                  <>
                    <HeartButton defaultLiked={false} />
                    <BookmarkButton defaultLiked={false} />
                  </>
                }
                onDetailsClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>

          <Button outline to="/explore">
            Przeglądaj więcej miejsc
          </Button>
        </div>
      </main>

      <PlaceDetailsDialog
        place={selectedPlace ?? undefined}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
      />
    </>
  );
}
