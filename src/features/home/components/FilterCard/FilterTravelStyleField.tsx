import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { RadioButton } from "@/components/design-system/forms/RadioButton";
import { travelStyleOptions } from "@/features/home/utils/filterOptions";
import type { TRAVEL_STYLE } from "@/types/places";

interface FilterTravelStyleFieldProps {
  selectedStyle: TRAVEL_STYLE;
  onStyleChange: (value: TRAVEL_STYLE) => void;
}

export function FilterTravelStyleField({
  selectedStyle,
  onStyleChange,
}: FilterTravelStyleFieldProps) {
  return (
    <Field>
      <Label>Styl podróży</Label>
      <RadioButton
        value={selectedStyle}
        onChange={(value) => onStyleChange(value as TRAVEL_STYLE)}
        options={travelStyleOptions}
        className="flex-row gap-4"
      />
    </Field>
  );
}
