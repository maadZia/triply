import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";
import { targetGroupOptions } from "@/features/home/utils/filterOptions";

interface FilterTargetGroupFieldProps {
  selectedTargetGroups: string[];
  onToggleTargetGroup: (value: string) => void;
}

export function FilterTargetGroupField({
  selectedTargetGroups,
  onToggleTargetGroup,
}: FilterTargetGroupFieldProps) {
  return (
    <Field>
      <Label>Dopasowanie do grupy</Label>
      <div data-slot="control" className="flex flex-wrap gap-2">
        {targetGroupOptions.map((option) => (
          <CheckboxButton
            key={option.value}
            label={option.label}
            checked={selectedTargetGroups.includes(option.value)}
            onChange={() => onToggleTargetGroup(option.value)}
          />
        ))}
      </div>
    </Field>
  );
}
