import { H2 } from "@/components/design-system/typography/Heading";
import { Button } from "@/components/design-system/atoms/Button";

interface FilterFieldsHeaderProps {
  onReset: () => void;
  disabled?: boolean;
}

export function FilterFieldsHeader({
  onReset,
  disabled,
}: FilterFieldsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <H2 className="text-contentTertiary">Filtry</H2>
      <Button plain onClick={onReset} disabled={disabled} className="p-0">
        Resetuj filtry
      </Button>
    </div>
  );
}
