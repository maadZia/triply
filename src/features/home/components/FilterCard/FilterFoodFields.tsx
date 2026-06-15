import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { Switch } from "@/components/design-system/forms/Switch";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import {
  foodTypeOptions,
  cuisineOptions,
} from "@/features/home/utils/filterOptions";

interface FilterFoodFieldsProps {
  foodAvailable: boolean;
  onFoodAvailableChange: (value: boolean) => void;
  selectedFoodTypes: string[];
  onToggleFoodType: (value: string) => void;
  selectedCuisines: string[];
  onToggleCuisine: (value: string) => void;
}

export function FilterFoodFields({
  foodAvailable,
  onFoodAvailableChange,
  selectedFoodTypes,
  onToggleFoodType,
  selectedCuisines,
  onToggleCuisine,
}: FilterFoodFieldsProps) {
  return (
    <>
      <Field className="flex gap-2">
        <Label>Uwzględnij jedzenie</Label>
        <Switch checked={foodAvailable} onChange={onFoodAvailableChange} />
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
                  onChange={() => onToggleFoodType(option.value)}
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
                  onChange={() => onToggleCuisine(option.value)}
                />
              ))}
            </div>
          </Field>
        </>
      )}
    </>
  );
}
