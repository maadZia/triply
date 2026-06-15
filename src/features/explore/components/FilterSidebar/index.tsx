import { DesktopFilterSidebar } from "./DesktopFilterSidebar";
import { MobileFilterSidebar } from "./MobileFilterSidebar";
import type { FilterSidebarProps } from "./_utils/types";

export type { FilterSidebarProps } from "./_utils/types";

export function FilterSidebar(p: FilterSidebarProps) {
  if (p.variant === "mobile") return <MobileFilterSidebar {...p} />;
  return <DesktopFilterSidebar {...p} />;
}
