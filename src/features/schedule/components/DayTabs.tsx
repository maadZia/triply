import { cn } from "@/components/utils";
import type React from "react";
import { forwardRef } from "react";
import { useDroppable } from "@dnd-kit/core";
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
  isOver?: boolean;
}

export const DayTabItem = forwardRef<HTMLButtonElement, DayTabItemProps>(
  function DayTabItem({ current, className, children, isOver, ...props }, ref) {
    const classes = cn(
      "w-full rounded-lg px-3 py-2 text-left transition-colors duration-150 relative overflow-hidden",
      current
        ? "bg-accentBase/20 text-accentDark"
        : "text-contentPrimary hover:bg-accentLight/30",
      isOver && "ring-2 ring-accentBase ring-inset bg-accentBase/10",
      className,
    );

    return (
      <button {...props} ref={ref} type="button" className={classes}>
        {isOver && (
          <div className="absolute inset-0 bg-accentBase/5 animate-pulse" />
        )}
        <div className="relative z-10">{children}</div>
      </button>
    );
  },
);

export interface DayTabsItemProps {
  day: DayTab;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  isDragOver?: boolean;
}

function DayTabsItem({
  day,
  isSelected,
  onSelect,
  index,
  isDragOver,
}: DayTabsItemProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-tab-${index}`,
    data: {
      type: "DayTab",
      dayIndex: index,
    },
    disabled: isSelected, // Nie aktywuj drop na aktualnie wybranym dniu
  });

  return (
    <li className="flex" ref={setNodeRef}>
      <DayTabItem
        onClick={onSelect}
        current={isSelected}
        isOver={isDragOver || isOver}
      >
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
  dragOverDayIndex?: number | null;
}

export function DayTabs({
  days,
  selectedIndex,
  onSelect,
  className,
  dragOverDayIndex,
}: DayTabsProps) {
  return (
    <ul className={cn("space-y-1 p-2", className)}>
      {days.map((day, index) => (
        <DayTabsItem
          key={day.id}
          day={day}
          isSelected={index === selectedIndex}
          onSelect={() => onSelect(index)}
          index={index}
          isDragOver={dragOverDayIndex === index}
        />
      ))}
    </ul>
  );
}
