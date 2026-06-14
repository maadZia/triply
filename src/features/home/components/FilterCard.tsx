import { useState } from "react";
import { DarkCard } from "@/components/design-system/cards/DarkCard";
import { H1, H2 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { Divider } from "@/components/design-system/atoms/Divider";
import { Fieldset, Field } from "@/components/design-system/forms/Fieldset.tsx";
import { Label } from "@/components/design-system/typography/Label";
import { Input } from "@/components/design-system/forms/Input";
import { Button } from "@/components/design-system/atoms/Button";
import { Switch } from "@/components/design-system/forms/Switch";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { Combobox } from "@/components/design-system/forms/Combobox";
import { RadioButton } from "@/components/design-system/forms/RadioButton";
import { Slider } from "@/components/design-system/forms/Slider";
import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
  CROWD_LEVEL_LABELS,
  TRAVEL_STYLE_LABELS,
  INTEREST_CATEGORY_LABELS,
  TARGET_GROUP_LABELS,
  FOOD_TYPE_LABELS,
  CUISINE_TYPE_LABELS,
  PLACE_TYPE_LABELS,
} from "@/types/places";
import type { PlanFilters } from "@/types/plan";
import { useGeneratedPlan } from "@/context/GeneratedPlanContext";
import { GeneratingModal } from "@/features/home/components/GeneratingModal";
import { validateFilters } from "@/utils/planGenerator";
import { getUniqueCities } from "@/mock/places";

const cities = getUniqueCities();

const cityOptions = cities.map((c) => ({ value: c, label: c }));

const interestOptions = Object.values(INTEREST_CATEGORY).map((value) => ({
  value,
  label: INTEREST_CATEGORY_LABELS[value],
}));

const targetGroupOptions = Object.values(TARGET_GROUP).map((value) => ({
  value,
  label: TARGET_GROUP_LABELS[value],
}));

const crowdOptions = Object.values(CROWD_LEVEL).map((value) => ({
  value,
  label: CROWD_LEVEL_LABELS[value],
}));

const foodTypeOptions = Object.values(FOOD_TYPE)
  .filter((v) => v !== FOOD_TYPE.NONE)
  .map((value) => ({
    value,
    label: FOOD_TYPE_LABELS[value],
  }));

const cuisineOptions = Object.values(CUISINE_TYPE)
  .filter((v) => v !== CUISINE_TYPE.NONE)
  .map((value) => ({
    value,
    label: CUISINE_TYPE_LABELS[value],
  }));

import { useLocation } from "react-router-dom";

export function FilterCard() {
  const { generatePlan, isGenerating } = useGeneratedPlan();
  const location = useLocation();
  const initialFilters = location.state?.filters as
    | Partial<PlanFilters>
    | undefined;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [modalError, setModalError] = useState<string | null>(null);

  // Local UI state
  const [selectedCity, setSelectedCity] = useState<string>(
    initialFilters?.city || "",
  );
  const [selectedDays, setSelectedDays] = useState<number>(
    initialFilters?.days || 3,
  );
  const [startDate, setStartDate] = useState<string>(
    initialFilters?.startDate || "",
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters?.types || [],
  );
  const [minRating, setMinRating] = useState<number>(
    initialFilters?.minRating || 4,
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 500],
  );
  const [selectedCrowdLevels, setSelectedCrowdLevels] = useState<string[]>(
    initialFilters?.crowdLevels || [],
  );
  const [selectedTargetGroups, setSelectedTargetGroups] = useState<string[]>(
    initialFilters?.targetGroups || [],
  );
  const [selectedStyle, setSelectedStyle] = useState<TRAVEL_STYLE>(
    initialFilters?.style || TRAVEL_STYLE.RELAXED,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || [],
  );
  const [foodAvailable, setFoodAvailable] = useState<boolean>(
    initialFilters?.foodAvailable || false,
  );
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>(
    initialFilters?.foodTypes || [],
  );
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    initialFilters?.cuisines || [],
  );

  const toggleArrayValue = (
    value: string,
    currentValues: string[],
    setter: (values: string[]) => void,
  ) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((v) => v !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  const handleReset = () => {
    setSelectedCity("");
    setSelectedDays(3);
    setStartDate("");
    setSelectedTypes([]);
    setMinRating(4);
    setPriceRange([0, 500]);
    setSelectedCrowdLevels([]);
    setSelectedTargetGroups([]);
    setSelectedStyle(TRAVEL_STYLE.RELAXED);
    setSelectedCategories([]);
    setFoodAvailable(false);
    setSelectedFoodTypes([]);
    setSelectedCuisines([]);
  };

  const handleGenerate = async () => {
    // Przygotuj filtry
    const filters: PlanFilters = {
      city: selectedCity,
      days: selectedDays,
      startDate: startDate || undefined,
      types: selectedTypes as PLACE_TYPE[],
      minRating,
      priceRange,
      crowdLevels: selectedCrowdLevels as CROWD_LEVEL[],
      targetGroups: selectedTargetGroups as TARGET_GROUP[],
      style: selectedStyle,
      categories: selectedCategories as INTEREST_CATEGORY[],
      foodAvailable,
      foodTypes: selectedFoodTypes as FOOD_TYPE[],
      cuisines: selectedCuisines as CUISINE_TYPE[],
    };

    // Walidacja
    const validationError = validateFilters(filters);
    if (validationError) {
      setModalError(validationError);
      setIsModalOpen(true);
      return;
    }

    // Otwórz modal
    setModalError(null);
    setModalStep(0);
    setIsModalOpen(true);

    // Symulacja kroków
    const stepInterval = setInterval(() => {
      setModalStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 250);

    try {
      await generatePlan(filters);
      clearInterval(stepInterval);
      setIsModalOpen(false);
    } catch (error) {
      clearInterval(stepInterval);
      setModalStep(0);
      setModalError(
        error instanceof Error
          ? error.message
          : "Nieznany błąd podczas generowania planu",
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalError(null);
    setModalStep(0);
  };

  return (
    <DarkCard className="w-3/5 space-y-4">
      <header className="space-y-2">
        <H1>Generator planu</H1>
        <P1 className="text-contentSecondary">
          Zdefiniuj swój wymarzony dzień. Nasz algorytm przygotuje dla Ciebie
          spersonalizowany plan zwiedzania w kilka sekund.
        </P1>
      </header>

      <Divider />

      <H2 className="text-contentTertiary">Filtry</H2>

      <Fieldset>
        {/* City Selection - Combobox */}
        <Field>
          <Label>Gdzie chcesz się wybrać?</Label>
          <Combobox
            value={selectedCity}
            onChange={setSelectedCity}
            options={cityOptions}
            placeholder="Wybierz miasto..."
          />
        </Field>

        <div className="flex gap-4 justify-between">
          <Field className="flex-1">
            <Label>Liczba dni</Label>
            <Input
              type="number"
              min={1}
              max={3}
              step={1}
              value={selectedDays}
              onChange={(e) => {
                let v = Number(e.target.value);
                if (isNaN(v) || v < 1) v = 1;
                if (v > 10) v = 10;
                setSelectedDays(v);
              }}
            />
          </Field>

          <Field className="flex-1">
            <Label>Data rozpoczęcia</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-black scheme-light"
            />
          </Field>
        </div>

        {/* Place Type */}
        <Field>
          <Label>Typ atrakcji</Label>
          <div data-slot="control" className="flex flex-wrap gap-2">
            <CheckboxButton
              label={PLACE_TYPE_LABELS[PLACE_TYPE.OUTDOOR]}
              checked={selectedTypes.includes(PLACE_TYPE.OUTDOOR)}
              onChange={() =>
                toggleArrayValue(
                  PLACE_TYPE.OUTDOOR,
                  selectedTypes,
                  setSelectedTypes,
                )
              }
            />
            <CheckboxButton
              label={PLACE_TYPE_LABELS[PLACE_TYPE.INDOOR]}
              checked={selectedTypes.includes(PLACE_TYPE.INDOOR)}
              onChange={() =>
                toggleArrayValue(
                  PLACE_TYPE.INDOOR,
                  selectedTypes,
                  setSelectedTypes,
                )
              }
            />
          </div>
        </Field>

        {/* Rating Range - Double Slider */}
        <Field>
          <Label>Minimalna ocena miejsca</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-30"
            />
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(value) => setMinRating(value)}
            />
          </div>
        </Field>

        {/* Price Range - Double Slider */}
        <Field>
          <Label>Zakres ceny</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={0}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20"
            />
            <Slider
              variant="double"
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              showValues
              valueFormatter={(v) => `${v} zł`}
            />
            <Input
              type="number"
              min={0}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20"
            />
          </div>
        </Field>

        {/* Crowd Level */}
        <Field>
          <Label>Poziom zatłoczenia</Label>
          <div data-slot="control" className="flex flex-wrap gap-2">
            {crowdOptions.map((option) => (
              <CheckboxButton
                key={option.value}
                label={option.label}
                checked={selectedCrowdLevels.includes(option.value)}
                onChange={() =>
                  toggleArrayValue(
                    option.value,
                    selectedCrowdLevels,
                    setSelectedCrowdLevels,
                  )
                }
              />
            ))}
          </div>
        </Field>

        {/* Target Groups */}
        <Field>
          <Label>Dopasowanie do grupy</Label>
          <div data-slot="control" className="flex flex-wrap gap-2">
            {targetGroupOptions.map((option) => (
              <CheckboxButton
                key={option.value}
                label={option.label}
                checked={selectedTargetGroups.includes(option.value)}
                onChange={() =>
                  toggleArrayValue(
                    option.value,
                    selectedTargetGroups,
                    setSelectedTargetGroups,
                  )
                }
              />
            ))}
          </div>
        </Field>

        {/* Travel Style - RadioButton */}
        <Field>
          <Label>Styl podróży</Label>
          <RadioButton
            value={selectedStyle}
            onChange={(value) => setSelectedStyle(value as TRAVEL_STYLE)}
            options={Object.values(TRAVEL_STYLE).map((v) => ({
              value: v,
              label: TRAVEL_STYLE_LABELS[v],
            }))}
            className="flex-row gap-4"
          />
        </Field>

        {/* Interest Categories */}
        <Field>
          <Label>Zainteresowania</Label>
          <div data-slot="control" className="flex flex-wrap gap-2">
            {interestOptions.map((option) => (
              <CheckboxButton
                key={option.value}
                label={option.label}
                checked={selectedCategories.includes(option.value)}
                onChange={() =>
                  toggleArrayValue(
                    option.value,
                    selectedCategories,
                    setSelectedCategories,
                  )
                }
              />
            ))}
          </div>
        </Field>

        {/* Food Section */}
        <Field className="flex gap-2">
          <Label>Uwzględnij jedzenie</Label>
          <Switch checked={foodAvailable} onChange={setFoodAvailable} />
        </Field>

        {foodAvailable && (
          <>
            <Field>
              <Label>Typ lokalu</Label>
              <div data-slot="control" className="flex flex-wrap gap-2">
                {foodTypeOptions.map((option) => (
                  <CheckboxButton
                    key={option.value}
                    label={option.label}
                    checked={selectedFoodTypes.includes(option.value)}
                    onChange={() =>
                      toggleArrayValue(
                        option.value,
                        selectedFoodTypes,
                        setSelectedFoodTypes,
                      )
                    }
                  />
                ))}
              </div>
            </Field>

            <Field>
              <Label>Rodzaj kuchni</Label>
              <div data-slot="control" className="flex flex-wrap gap-2">
                {cuisineOptions.map((option) => (
                  <CheckboxButton
                    key={option.value}
                    label={option.label}
                    checked={selectedCuisines.includes(option.value)}
                    onChange={() =>
                      toggleArrayValue(
                        option.value,
                        selectedCuisines,
                        setSelectedCuisines,
                      )
                    }
                  />
                ))}
              </div>
            </Field>
          </>
        )}
      </Fieldset>

      <section className="flex w-full justify-center gap-4 mt-8">
        <Button outline onClick={handleReset} disabled={isGenerating}>
          Resetuj filtry
        </Button>
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generowanie..." : "Generuj plan"}
        </Button>
      </section>

      {/* Modal generowania */}
      <GeneratingModal
        isOpen={isModalOpen}
        onClose={modalError ? handleCloseModal : undefined}
        currentStep={modalStep}
        error={modalError}
      />
    </DarkCard>
  );
}
