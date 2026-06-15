import { CheckboxButton } from "@/components/design-system/forms/CheckboxButton";

export function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
      {options.map(({ value, label }) => (
        <CheckboxButton
          key={value}
          label={label}
          checked={selected.includes(value)}
          onChange={() => onToggle(value)}
          className="w-fit py-1 px-2"
        />
      ))}
    </div>
  );
}
