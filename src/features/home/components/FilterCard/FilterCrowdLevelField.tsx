import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { crowdOptions } from "@/features/home/utils/filterOptions";

interface FilterCrowdLevelFieldProps {
  selectedCrowdLevels: string[];
  onToggleCrowdLevel: (value: string) => void;
}

export function FilterCrowdLevelField({
  selectedCrowdLevels,
  onToggleCrowdLevel,
}: FilterCrowdLevelFieldProps) {
  return (
    <Field>
      <Label>Poziom zatłoczenia</Label>
      <div data-slot="control" className="flex flex-wrap gap-2">
        {crowdOptions.map((option) => (
          <CheckboxButton
            key={option.value}
            label={option.label}
            checked={selectedCrowdLevels.includes(option.value)}
            onChange={() => onToggleCrowdLevel(option.value)}
          />
        ))}
      </div>
    </Field>
  );
}
