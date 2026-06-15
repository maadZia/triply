import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { Input } from "@/components/design-system/forms/Input";
import { Combobox } from "@/components/design-system/forms/Combobox";
import { cityOptions } from "@/features/home/utils/filterOptions";

interface FilterBasicFieldsProps {
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedDays: number;
  onDaysChange: (value: number) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
}

export function FilterBasicFields({
  selectedCity,
  onCityChange,
  selectedDays,
  onDaysChange,
  startDate,
  onStartDateChange,
}: FilterBasicFieldsProps) {
  return (
    <>
      <Field>
        <Label>Gdzie chcesz się wybrać?</Label>
        <Combobox
          value={selectedCity}
          onChange={onCityChange}
          options={cityOptions}
          placeholder="Wybierz miasto..."
        />
      </Field>

      <div className="flex justify-between gap-4">
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
              onDaysChange(v);
            }}
          />
        </Field>

        <Field className="flex-1">
          <Label>Data rozpoczęcia</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="text-black scheme-light"
          />
        </Field>
      </div>
    </>
  );
}
