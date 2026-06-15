import { useLocation } from "react-router-dom";
import { DarkCard } from "@/components/design-system/cards/DarkCard";
import { Divider } from "@/components/design-system/atoms/Divider";
import { Fieldset } from "@/components/design-system/forms/Fieldset";
import type { PlanFilters } from "@/types/plan";
import { useGeneratedPlan } from "@/context/plan/GeneratedPlanContext";
import { GeneratingModal } from "@/features/home/components/GeneratingModal";
import { HomepageHeader } from "@/features/home/components/HomepageHeader";
import { FilterFieldsHeader } from "@/features/home/components/FilterCard/FilterFieldsHeader";
import { FilterCardActions } from "@/features/home/components/FilterCard/FilterCardActions";
import { FilterBasicFields } from "@/features/home/components/FilterCard/FilterBasicFields";
import { FilterPlaceTypeField } from "@/features/home/components/FilterCard/FilterPlaceTypeField";
import { FilterRatingField } from "@/features/home/components/FilterCard/FilterRatingField";
import { FilterPriceRangeField } from "@/features/home/components/FilterCard/FilterPriceRangeField";
import { FilterCrowdLevelField } from "@/features/home/components/FilterCard/FilterCrowdLevelField";
import { FilterTargetGroupField } from "@/features/home/components/FilterCard/FilterTargetGroupField";
import { FilterTravelStyleField } from "@/features/home/components/FilterCard/FilterTravelStyleField";
import { FilterInterestsField } from "@/features/home/components/FilterCard/FilterInterestsField";
import { FilterFoodFields } from "@/features/home/components/FilterCard/FilterFoodFields";
import { usePlanFilters } from "@/features/home/hooks/usePlanFilters";
import { usePlanGeneration } from "@/features/home/hooks/usePlanGeneration";
import { useSavePreferences } from "@/features/home/hooks/useSavePreferences";

export function FilterCard({ isLgUp }: { isLgUp: boolean }) {
  const { generatePlan, isGenerating } = useGeneratedPlan();
  const location = useLocation();
  const initialFilters = location.state?.filters as
    | Partial<PlanFilters>
    | undefined;

  const filters = usePlanFilters(initialFilters);
  const generation = usePlanGeneration({
    generatePlan,
    getPlanFilters: filters.getPlanFilters,
  });
  const { handleSavePreferences } = useSavePreferences();

  const toggleType = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedTypes,
      filters.setSelectedTypes,
    );

  const toggleCrowdLevel = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedCrowdLevels,
      filters.setSelectedCrowdLevels,
    );

  const toggleTargetGroup = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedTargetGroups,
      filters.setSelectedTargetGroups,
    );

  const toggleCategory = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedCategories,
      filters.setSelectedCategories,
    );

  const toggleFoodType = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedFoodTypes,
      filters.setSelectedFoodTypes,
    );

  const toggleCuisine = (value: string) =>
    filters.toggleArrayValue(
      value,
      filters.selectedCuisines,
      filters.setSelectedCuisines,
    );

  return (
    <DarkCard className="w-full space-y-4 lg:w-3/5">
      {isLgUp && (
        <>
          <HomepageHeader />

          <Divider />
        </>
      )}

      <FilterFieldsHeader onReset={filters.reset} disabled={isGenerating} />

      <Fieldset>
        <FilterBasicFields
          selectedCity={filters.selectedCity}
          onCityChange={filters.setSelectedCity}
          selectedDays={filters.selectedDays}
          onDaysChange={filters.setSelectedDays}
          startDate={filters.startDate}
          onStartDateChange={filters.setStartDate}
        />

        <FilterPlaceTypeField
          selectedTypes={filters.selectedTypes}
          onToggleType={toggleType}
        />

        <FilterRatingField
          minRating={filters.minRating}
          onMinRatingChange={filters.setMinRating}
        />

        <FilterPriceRangeField
          priceRange={filters.priceRange}
          onPriceRangeChange={filters.setPriceRange}
        />

        <FilterCrowdLevelField
          selectedCrowdLevels={filters.selectedCrowdLevels}
          onToggleCrowdLevel={toggleCrowdLevel}
        />

        <FilterTargetGroupField
          selectedTargetGroups={filters.selectedTargetGroups}
          onToggleTargetGroup={toggleTargetGroup}
        />

        <FilterTravelStyleField
          selectedStyle={filters.selectedStyle}
          onStyleChange={filters.setSelectedStyle}
        />

        <FilterInterestsField
          selectedCategories={filters.selectedCategories}
          onToggleCategory={toggleCategory}
        />

        <FilterFoodFields
          foodAvailable={filters.foodAvailable}
          onFoodAvailableChange={filters.setFoodAvailable}
          selectedFoodTypes={filters.selectedFoodTypes}
          onToggleFoodType={toggleFoodType}
          selectedCuisines={filters.selectedCuisines}
          onToggleCuisine={toggleCuisine}
        />
      </Fieldset>

      <FilterCardActions
        onSavePreferences={handleSavePreferences}
        onGenerate={generation.handleGenerate}
        isGenerating={isGenerating}
        canSavePreferences={filters.hasChanges}
      />

      <GeneratingModal
        isOpen={generation.isModalOpen}
        onClose={
          generation.modalError ? generation.handleCloseModal : undefined
        }
        currentStep={generation.modalStep}
        error={generation.modalError}
      />
    </DarkCard>
  );
}
