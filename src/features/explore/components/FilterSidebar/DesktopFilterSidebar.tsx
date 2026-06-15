import { H2 } from "@/components/design-system/typography/Heading";
import { Button } from "@/components/design-system/atoms/Button";
import { Divider } from "@/components/design-system/atoms/Divider";
import { LightCard } from "@/components/design-system/cards/LightCard";
import { countActiveFilters } from "../../utils/config";
import { FilterContent } from "./FilterContent";
import type { FilterSidebarProps } from "../../utils/types";

export function DesktopFilterSidebar(p: FilterSidebarProps) {
  const active = countActiveFilters(p);

  return (
    <LightCard className="sticky top-4 hidden max-h-[85vh] w-64 space-y-2 overflow-y-auto p-4 scrollbar-none lg:block">
      <div className="flex justify-between">
        <header className="flex items-center gap-2">
          <H2 className="text-base">Filtry</H2>
          {active > 0 && (
            <span className="bg-accentLight text-accentDark rounded-full px-2 py-1 text-xs font-semibold">
              {active}
            </span>
          )}
        </header>
        <Button plain onClick={p.resetFilters} className="p-0">
          Resetuj
        </Button>
      </div>

      <Divider soft />
      <FilterContent {...p} layout="desktop" />
    </LightCard>
  );
}
