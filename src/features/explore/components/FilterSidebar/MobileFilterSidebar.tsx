import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { Button } from "@/components/design-system/atoms/Button";
import { countActiveFilters } from "../../utils/config";
import { FilterContent } from "./FilterContent";
import type { FilterSidebarProps } from "../../utils/types";

export function MobileFilterSidebar(p: FilterSidebarProps) {
  const active = countActiveFilters(p);

  return (
    <ExpandableCard
      className="w-full shadow-sm lg:hidden bg-white"
      title={
        <>
          Filtry
          {active > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accentLight px-1.5 text-[11px] font-semibold text-accentDark">
              {active}
            </span>
          )}
        </>
      }
    >
      <div className="flex justify-end">
        <Button plain onClick={p.resetFilters} className="p-0">
          Resetuj
        </Button>
      </div>
      <FilterContent {...p} layout="mobile" />
    </ExpandableCard>
  );
}
