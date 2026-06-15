import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { Input } from "@/components/design-system/forms/Input";
import { Slider } from "@/components/design-system/forms/Slider";

interface FilterRatingFieldProps {
  minRating: number;
  onMinRatingChange: (value: number) => void;
}

export function FilterRatingField({
  minRating,
  onMinRatingChange,
}: FilterRatingFieldProps) {
  return (
    <Field>
      <Label>Minimalna ocena miejsca</Label>
      <div className="flex items-start gap-3">
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={onMinRatingChange}
          className="min-w-0 flex-1 py-2"
        />
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
          className="w-24 text-center"
        />
      </div>
    </Field>
  );
}
