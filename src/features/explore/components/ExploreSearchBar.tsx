import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/design-system/forms/Input";
import { InputGroup } from "@/components/design-system/forms/Input/InputGroup";

interface ExploreSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExploreSearchBar({ value, onChange }: ExploreSearchBarProps) {
  return (
    <InputGroup>
      <MagnifyingGlassIcon data-slot="icon" />
      <Input
        type="text"
        placeholder="Szukaj miejsca po nazwie lub opisie..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full"
      />
    </InputGroup>
  );
}
