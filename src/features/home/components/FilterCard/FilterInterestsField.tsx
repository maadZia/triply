import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { interestOptions } from "@/features/home/utils/filterOptions";

interface FilterInterestsFieldProps {
  selectedCategories: string[];
  onToggleCategory: (value: string) => void;
}

export function FilterInterestsField({
  selectedCategories,
  onToggleCategory,
}: FilterInterestsFieldProps) {
  return (
    <Field>
      <Label>Zainteresowania</Label>
      <div data-slot="control" className="flex flex-wrap gap-2">
        {interestOptions.map((option) => (
          <CheckboxButton
            key={option.value}
            label={option.label}
            checked={selectedCategories.includes(option.value)}
            onChange={() => onToggleCategory(option.value)}
          />
        ))}
      </div>
    </Field>
  );
}
