import { cn } from "@/components/utils";
import type React from "react";
import { forwardRef } from "react";
import { P2, P3 } from "../../../components/design-system/typography/Paragraph";

export interface DayTab {
  id: string | number;
  label: string;
  date?: string;
}

export interface DayTabItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const DayTabItem = forwardRef<HTMLButtonElement, DayTabItemProps>(
  function DayTabItem({ current, className, children, ...props }, ref) {
    const classes = cn(
      "w-full rounded-lg px-3 py-2 text-left transition-colors duration-150",
      current
        ? "bg-accentBase/20 text-accentDark"
        : "text-contentPrimary hover:bg-accentLight/30",
      className,
    );

    return (
      <button {...props} ref={ref} type="button" className={classes}>
        {children}
      </button>
    );
  },
);

export interface DayTabsItemProps {
  day: DayTab;
  isSelected: boolean;
  onSelect: () => void;
}

function DayTabsItem({ day, isSelected, onSelect }: DayTabsItemProps) {
  return (
    <li className="flex">
      <DayTabItem onClick={onSelect} current={isSelected}>
        <P2
          className={cn(
            "text-sm font-semibold",
            isSelected ? "text-accentDark" : "text-contentPrimary",
          )}
        >
          {day.label}
        </P2>
        {day.date && <P3 className="text-contentTertiary">{day.date}</P3>}
      </DayTabItem>
    </li>
  );
}

export interface DayTabsProps {
  days: DayTab[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function DayTabs({
  days,
  selectedIndex,
  onSelect,
  className,
}: DayTabsProps) {
  return (
    <ul className={cn("space-y-1 p-2", className)}>
      {days.map((day, index) => (
        <DayTabsItem
          key={day.id}
          day={day}
          isSelected={index === selectedIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </ul>
  );
}
