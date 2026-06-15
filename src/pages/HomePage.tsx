import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { FilterCard } from "@/features/home/components/FilterCard";
import { H2 } from "@/components/design-system/typography/Heading";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/design-system/atoms/Button";
import {
  HeartButton,
  MappinButton,
} from "@/components/design-system/atoms/icons";
import { Tabs, TabItem } from "@/components/design-system/navigation/Tabs";
import {
  PlaceDetailsDialog,
  type Place,
} from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { allPlaces } from "@/mock/places";
import { toDialogPlace } from "@/utils/placeMapper";
import { HomepageHeader } from "@/features/home/components/HomepageHeader";

type MobileTab = "filters" | "suggestions";

export default function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place>();
  const [mobileTab, setMobileTab] = useState<MobileTab>("filters");
  const isLgUp = useMediaQuery("(min-width: 1024px)");

  const recommendedPlaceIds = ["krk-001", "krk-002", "krk-005"];
  const places: Place[] = recommendedPlaceIds
    .map((id) => allPlaces.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map(toDialogPlace);

  const suggestionsSection = (
    <div className="flex w-full flex-col items-center gap-6 lg:w-2/5">
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
                <MappinButton defaultLiked={false} />
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
  );

  return (
    <>
      <main className={isLgUp ? "flex gap-8" : "flex flex-col gap-4"}>
        {isLgUp ? (
          <>
            <FilterCard isLgUp={true} />
            {suggestionsSection}
          </>
        ) : (
          <>
            <HomepageHeader />
            <Tabs>
              <TabItem
                current={mobileTab === "filters"}
                onClick={() => setMobileTab("filters")}
              >
                Generator planu
              </TabItem>
              <TabItem
                current={mobileTab === "suggestions"}
                onClick={() => setMobileTab("suggestions")}
              >
                Podpowiedzi
              </TabItem>
            </Tabs>

            {mobileTab === "filters" ? (
              <FilterCard isLgUp={false} />
            ) : (
              suggestionsSection
            )}
          </>
        )}
      </main>

      <PlaceDetailsDialog
        place={selectedPlace ?? undefined}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
      />
    </>
  );
}
