import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { Input } from "@/components/design-system/forms/Input";
import { Slider } from "@/components/design-system/forms/Slider";

interface FilterPriceRangeFieldProps {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
}

export function FilterPriceRangeField({
  priceRange,
  onPriceRangeChange,
}: FilterPriceRangeFieldProps) {
  return (
    <Field>
      <Label>Zakres ceny</Label>
      <div className="flex flex-wrap items-start gap-3">
        <Slider
          variant="double"
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onChange={onPriceRangeChange}
          valueFormatter={(v) => `${v} zł`}
          className="min-w-40 flex-1 py-2"
        />
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={(e) =>
              onPriceRangeChange([Number(e.target.value), priceRange[1]])
            }
            className="h-fit w-24 text-center"
          />
          <span>–</span>
          <Input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="h-fit w-24 text-center"
          />
        </div>
      </div>
    </Field>
  );
}
