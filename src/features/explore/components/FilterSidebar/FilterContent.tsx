import { Fragment } from "react";
import { Divider } from "@/components/design-system/atoms/Divider";
import { FilterSection } from "./FilterSection";
import { DESKTOP_SECTIONS, MOBILE_SECTIONS } from "./_utils/config";
import { useFilterFields } from "./_utils/useFilterFields";
import type { FilterSidebarProps } from "./_utils/types";

export function FilterContent({
  layout,
  ...p
}: FilterSidebarProps & { layout: "mobile" | "desktop" }) {
  const fields = useFilterFields(p);
  const sections = layout === "mobile" ? MOBILE_SECTIONS : DESKTOP_SECTIONS;

  return (
    <div
      className={
        layout === "mobile" ? "grid grid-cols-2 gap-x-3 gap-y-2" : "space-y-3"
      }
    >
      {sections.map(({ title, field, className, dividerAfter }) => (
        <Fragment key={field}>
          <FilterSection title={title} className={className}>
            {fields[field]}
          </FilterSection>
          {layout === "desktop" && dividerAfter && <Divider soft />}
        </Fragment>
      ))}
    </div>
  );
}
