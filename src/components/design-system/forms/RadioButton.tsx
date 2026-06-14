"use client";

import { cn } from "@/components/utils";
import * as Headless from "@headlessui/react";

export interface RadioButtonOption {
  value: string;
  label: string;
}

export interface RadioButtonProps {
  options: RadioButtonOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioButton({
  options,
  value,
  onChange,
  className,
}: RadioButtonProps) {
  return (
    <Headless.RadioGroup data-slot="control" value={value} onChange={onChange}>
      <div className={cn("flex flex-col gap-2", className)}>
        {options.map((option) => (
          <Headless.Radio
            key={option.value}
            value={option.value}
            className={cn(
              "group flex cursor-pointer items-center gap-3 focus:outline-none",
            )}
          >
            {/* Radio circle */}
            <span
              className={cn(
                "relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                "border-stone-400 bg-white",
                "group-data-checked:border-accentBase group-data-checked:bg-accentLight",
                "group-hover:border-stone-500",
                "group-focus-visible:ring-2 group-focus-visible:ring-accentBase/50",
              )}
            >
              {/* Inner dot (visible when checked) */}
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  "bg-transparent group-data-checked:bg-accentBase",
                  "scale-0 group-data-checked:scale-100",
                )}
              />
            </span>
            {/* Label */}
            <span className="text-sm text-contentPrimary">{option.label}</span>
          </Headless.Radio>
        ))}
      </div>
    </Headless.RadioGroup>
  );
}
