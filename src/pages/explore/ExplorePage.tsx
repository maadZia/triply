import { useState, useMemo } from "react";
import { H1 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { useExploreFilters } from "@/features/explore/hooks/useExploreFilters";
import { ExploreSidebar } from "@/features/explore/components/ExploreSidebar";
import { ExploreSearchBar } from "@/features/explore/components/ExploreSearchBar";
import { ExploreResultsGrid } from "@/features/explore/components/ExploreResultsGrid";
import { filterPlaces, allPlaces } from "@/mock/places";
import type { Place as MockPlace } from "@/types/places";
import {
  PlaceDetailsDialog,
  type Place as DialogPlace,
} from "@/components/shared/PlaceDetails/PlaceDetailsDialog";

function toDialogPlace(place: MockPlace): DialogPlace {
  return {
    title: place.name,
    description: place.description,
    img: place.mainImage,
    images: place.images,
    category: place.categories[0] ?? undefined,
    rating: place.rating,
    hours: place.hoursSummary,
    location: place.location.address,
    price: {
      normal: place.price.normal,
      reduced: place.price.reduced ?? 0,
      currency: place.price.currency,
    },
  };
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<MockPlace | undefined>();


  const filters = useExploreFilters();

  const displayedPlaces = useMemo(() => {
    const filtered = filterPlaces(filters.activeFilters);

    if (!searchQuery.trim()) return filtered;

    const q = searchQuery.toLowerCase();
    return filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [filters.activeFilters, searchQuery]);

  return (
    <>
      <main className="flex gap-8 items-start">
        {/* Sidebar */}
        <ExploreSidebar
          selectedCity={filters.selectedCity}
          setSelectedCity={filters.setSelectedCity}
          selectedTypes={filters.selectedTypes}
          setSelectedTypes={filters.setSelectedTypes}
          minRating={filters.minRating}
          setMinRating={filters.setMinRating}
          priceRange={filters.priceRange}
          setPriceRange={filters.setPriceRange}
          selectedCrowdLevels={filters.selectedCrowdLevels}
          setSelectedCrowdLevels={filters.setSelectedCrowdLevels}
          selectedTargetGroups={filters.selectedTargetGroups}
          setSelectedTargetGroups={filters.setSelectedTargetGroups}
          selectedStyle={filters.selectedStyle}
          setSelectedStyle={filters.setSelectedStyle}
          selectedCategories={filters.selectedCategories}
          setSelectedCategories={filters.setSelectedCategories}
          foodAvailable={filters.foodAvailable}
          setFoodAvailable={filters.setFoodAvailable}
          selectedFoodTypes={filters.selectedFoodTypes}
          setSelectedFoodTypes={filters.setSelectedFoodTypes}
          selectedCuisines={filters.selectedCuisines}
          setSelectedCuisines={filters.setSelectedCuisines}
          resetFilters={filters.resetFilters}
        />

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-6 min-w-0">
          {/* Page heading */}
          <header className="space-y-1">
            <H1>Eksploruj miejsca</H1>
            <P1 className="text-contentSecondary">
              Zainspiruj się i zaplanuj swoją kolejną podróż
            </P1>
          </header>

          {/* Search bar */}
          <ExploreSearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Results count */}
          <p className="text-sm text-contentSecondary">
            Znaleziono{" "}
            <span className="font-semibold text-contentPrimary">
              {displayedPlaces.length}
            </span>{" "}
            {displayedPlaces.length === 1
              ? "miejsce"
              : displayedPlaces.length < 5
                ? "miejsca"
                : "miejsc"}{" "}
            z {allPlaces.length}
          </p>

          {/* Results grid */}
          <ExploreResultsGrid
            places={displayedPlaces}
            onDetailsClick={setSelectedPlace}
          />
        </div>
      </main>

      {/* Place details overlay */}
      <PlaceDetailsDialog
        place={selectedPlace ? toDialogPlace(selectedPlace) : undefined}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
        showAddToPlan={false}
      />
    </>
  );
}
