import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
import { PlaceDetailsDialog } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { getPlacesByCity } from "@/mock/places";
import { toDialogPlace, type Attraction } from "@/utils/placeMapper";
import { getSuggestedPlaces } from "@/utils/suggestedPlaces";
import { HomepageHeader } from "@/features/home/components/HomepageHeader";
import { usePlanFilters } from "@/features/home/hooks/usePlanFilters";
import type { PlanFilters } from "@/types/plan";

type MobileTab = "filters" | "suggestions";

export default function HomePage() {
  const location = useLocation();
  const initialFilters = location.state?.filters as
    | Partial<PlanFilters>
    | undefined;

  const filters = usePlanFilters(initialFilters);
  const [selectedPlace, setSelectedPlace] = useState<Attraction>();
  const [mobileTab, setMobileTab] = useState<MobileTab>("filters");
  const [pinnedPlaceIds, setPinnedPlaceIds] = useState<string[]>([]);
  const isLgUp = useMediaQuery("(min-width: 1024px)");

  const effectivePinnedIds = useMemo(() => {
    if (!filters.selectedCity) return [];
    const cityIds = new Set(
      getPlacesByCity(filters.selectedCity).map((p) => p.id),
    );
    return pinnedPlaceIds.filter((id) => cityIds.has(id));
  }, [filters.selectedCity, pinnedPlaceIds]);

  const suggestedPlaces = useMemo<Attraction[]>(
    () =>
      getSuggestedPlaces(filters.selectedCity || undefined).map(toDialogPlace),
    [filters.selectedCity],
  );

  const handlePinToggle = (placeId: string, pinned: boolean) => {
    setPinnedPlaceIds((prev) => {
      if (pinned) {
        if (prev.includes(placeId) || prev.length >= 3) return prev;
        return [...prev, placeId];
      }
      return prev.filter((id) => id !== placeId);
    });
  };

  const suggestionsSection = (
    <div className="flex w-full flex-col items-center gap-6 lg:w-2/5">
      <H2 className="w-full text-left">Podpowiedzi</H2>

      <div className="w-full space-y-4">
        {suggestedPlaces.map((place) => (
          <PlaceCardHorizontal
            key={place.id}
            title={place.title}
            description={place.description}
            img={place.img}
            actionButtons={
              <>
                <HeartButton defaultLiked={false} />
                <MappinButton
                  pinned={pinnedPlaceIds.includes(place.id)}
                  onToggle={(isPinned) => handlePinToggle(place.id, isPinned)}
                />
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
            <FilterCard
              isLgUp={true}
              filters={filters}
              pinnedPlaceIds={effectivePinnedIds}
            />
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
              <FilterCard
                isLgUp={false}
                filters={filters}
                pinnedPlaceIds={effectivePinnedIds}
              />
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
