import { H2 } from "@/components/design-system/typography/Heading";
import { Button } from "@/components/design-system/atoms/Button";
import { Divider } from "@/components/design-system/atoms/Divider";
import { LightCard } from "@/components/design-system/cards/LightCard";
import { countActiveFilters } from "./_utils/config";
import { FilterContent } from "./FilterContent";
import type { FilterSidebarProps } from "./_utils/types";

export function DesktopFilterSidebar(p: FilterSidebarProps) {
  const active = countActiveFilters(p);

  return (
    <LightCard className="sticky top-4 hidden max-h-[85vh] w-64 space-y-2 overflow-y-auto p-4 scrollbar-none lg:block">
      <div className="flex justify-between">
        <H2 className="text-base">Filtry</H2>
        {active > 0 && <span>{active}</span>}
        <Button plain onClick={p.resetFilters} className="p-0">
          Resetuj
        </Button>
      </div>

      <Divider soft />
      <FilterContent {...p} layout="desktop" />
    </LightCard>
  );
}
