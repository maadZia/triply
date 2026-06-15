import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { placeTypeOptions } from "@/features/home/utils/filterOptions";

interface FilterPlaceTypeFieldProps {
  selectedTypes: string[];
  onToggleType: (value: string) => void;
}

export function FilterPlaceTypeField({
  selectedTypes,
  onToggleType,
}: FilterPlaceTypeFieldProps) {
  return (
    <Field>
      <Label>Typ atrakcji</Label>
      <div data-slot="control" className="flex flex-wrap gap-2">
        {placeTypeOptions.map((option) => (
          <CheckboxButton
            key={option.value}
            label={option.label}
            checked={selectedTypes.includes(option.value)}
            onChange={() => onToggleType(option.value)}
          />
        ))}
      </div>
    </Field>
  );
}
