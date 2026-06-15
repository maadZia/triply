import { useState, useMemo } from "react";
import { H1 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { useExploreFilters } from "@/features/explore/hooks/useExploreFilters";
import { ExploreSearchBar } from "@/features/explore/components/ExploreSearchBar";
import { ExploreResultsGrid } from "@/features/explore/components/ExploreResultsGrid";
import { filterPlaces, allPlaces } from "@/mock/places";
import type { Place as MockPlace } from "@/types/places";
import { PlaceDetailsDialog } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { toDialogPlace } from "@/utils/placeMapper";
import { FilterSidebar } from "@/features/explore/components/FilterSidebar";

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

  const sidebarProps = {
    selectedCity: filters.selectedCity,
    setSelectedCity: filters.setSelectedCity,
    selectedTypes: filters.selectedTypes,
    setSelectedTypes: filters.setSelectedTypes,
    minRating: filters.minRating,
    setMinRating: filters.setMinRating,
    priceRange: filters.priceRange,
    setPriceRange: filters.setPriceRange,
    selectedCrowdLevels: filters.selectedCrowdLevels,
    setSelectedCrowdLevels: filters.setSelectedCrowdLevels,
    selectedTargetGroups: filters.selectedTargetGroups,
    setSelectedTargetGroups: filters.setSelectedTargetGroups,
    selectedCategories: filters.selectedCategories,
    setSelectedCategories: filters.setSelectedCategories,
    selectedFoodTypes: filters.selectedFoodTypes,
    setSelectedFoodTypes: filters.setSelectedFoodTypes,
    resetFilters: filters.resetFilters,
  };

  return (
    <>
      <main className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        {/* Main content */}
        <div className="order-1 flex min-w-0 flex-1 flex-col gap-5 lg:order-2">
          {/* Page heading */}
          <header className="space-y-1">
            <H1>Eksploruj miejsca</H1>
            <P1 className="text-contentSecondary">
              Zainspiruj się i zaplanuj swoją kolejną podróż
            </P1>
          </header>

          {/* Mobile filters — below heading, above search */}
          <FilterSidebar {...sidebarProps} variant="mobile" />

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

        {/* Desktop sidebar — direct flex child so sticky works */}
        <FilterSidebar {...sidebarProps} variant="desktop" />
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
