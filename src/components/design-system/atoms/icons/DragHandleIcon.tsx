import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";
import React from "react";

interface DragHandleIconProps {
  className?: string;
  isDragging?: boolean;
}

export const DragHandleIcon = React.forwardRef<
  HTMLButtonElement,
  DragHandleIconProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DragHandleIcon({ className, isDragging, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      data-drag-handle
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg",
        "text-contentTertiary transition-colors duration-150",
        "hover:bg-accentLight/30 hover:text-contentPrimary",
        isDragging && "cursor-grabbing text-accentDark bg-accentBase/10",
        !isDragging && "cursor-grab",
        className,
      )}
      title="Przeciągnij, aby zmienić kolejność"
      {...props}
    >
      <ArrowsUpDownIcon className="h-4 w-4" />
    </button>
  );
});
