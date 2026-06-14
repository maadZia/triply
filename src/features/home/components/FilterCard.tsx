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
import { Slider } from "@/components/design-system/forms/Slider";
import {
  MapPinIcon,
  StarIcon,
  WalletIcon,
  UsersIcon,
  SunIcon,
  BuildingOfficeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
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

export function FilterCard() {
  // Local UI state - no functionality
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(5);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCrowdLevels, setSelectedCrowdLevels] = useState<string[]>([]);
  const [selectedTargetGroups, setSelectedTargetGroups] = useState<string[]>(
    [],
  );
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [foodAvailable, setFoodAvailable] = useState<boolean>(false);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

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
    setSelectedTypes([]);
    setMinRating(0);
    setMaxRating(5);
    setPriceRange([0, 500]);
    setSelectedCrowdLevels([]);
    setSelectedTargetGroups([]);
    setSelectedStyle("");
    setSelectedCategories([]);
    setFoodAvailable(false);
    setSelectedFoodTypes([]);
    setSelectedCuisines([]);
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
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-accentBase" />
            <Label>Miasto</Label>
          </div>
          <Combobox
            value={selectedCity}
            onChange={setSelectedCity}
            options={cityOptions}
            placeholder="Wybierz miasto..."
          />
        </Field>

        {/* Place Type */}
        <Field>
          <div className="flex items-center gap-2">
            <BuildingOfficeIcon className="h-5 w-5 text-accentBase" />
            <Label>Typ atrakcji</Label>
          </div>
          <div className="flex flex-wrap gap-2">
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
          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-accentBase" />
            <Label>Ocena (min-max)</Label>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-20"
            />
            <Slider
              variant="double"
              min={0}
              max={5}
              step={0.1}
              value={[minRating, maxRating]}
              onChange={([min, max]) => {
                setMinRating(min);
                setMaxRating(max);
              }}
              showValues
            />
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </Field>

        {/* Price Range - Double Slider */}
        <Field>
          <div className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5 text-accentBase" />
            <Label>Zakres ceny (PLN)</Label>
          </div>
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
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-accentBase" />
            <Label>Poziom zatłoczenia</Label>
          </div>
          <div className="flex flex-wrap gap-2">
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
          <div className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5 text-accentBase" />
            <Label>Dopasowanie do grupy</Label>
          </div>
          <div className="flex flex-wrap gap-2">
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

        {/* Travel Style - Combobox */}
        <Field>
          <div className="flex items-center gap-2">
            <SunIcon className="h-5 w-5 text-accentBase" />
            <Label>Styl podróży</Label>
          </div>
          <Combobox
            value={selectedStyle}
            onChange={setSelectedStyle}
            options={Object.values(TRAVEL_STYLE).map((v) => ({
              value: v,
              label: TRAVEL_STYLE_LABELS[v],
            }))}
            placeholder="Wybierz styl..."
          />
        </Field>

        {/* Interest Categories */}
        <Field>
          <div className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5 text-accentBase" />
            <Label>Zainteresowania</Label>
          </div>
          <div className="flex flex-wrap gap-2">
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
        <Field>
          <div className="flex items-center gap-2">
            <Label>Jedzenie dostępne</Label>
            <Switch checked={foodAvailable} onChange={setFoodAvailable} />
          </div>
        </Field>

        {foodAvailable && (
          <>
            <Field className="pl-4">
              <Label className="text-xs text-contentTertiary">Typ lokalu</Label>
              <div className="flex flex-wrap gap-2">
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

            <Field className="pl-4">
              <Label className="text-xs text-contentTertiary">
                Rodzaj kuchni
              </Label>
              <div className="flex flex-wrap gap-2">
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

      <section className="flex w-full justify-center gap-4">
        <Button outline onClick={handleReset}>
          Resetuj filtry
        </Button>
        <Button>Zastosuj filtry</Button>
      </section>
    </DarkCard>
  );
}
