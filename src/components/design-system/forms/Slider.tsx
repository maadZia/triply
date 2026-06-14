"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/components/utils";

type SingleProps = {
  variant?: "single";
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
  valueFormatter?: (value: number) => string;
};

type DoubleProps = {
  variant: "double";
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
  showValues?: boolean;
  valueFormatter?: (value: number) => string;
};

export type SliderProps = SingleProps | DoubleProps;

const trackClass =
  "relative h-2 w-full grow overflow-hidden rounded-full bg-accentMuted";

const rangeClass = "absolute h-full rounded-full bg-accentBase";

const thumbClass =
  "block h-4 w-4 rounded-full border-2 border-accentBase bg-white shadow transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-backgroundInverseTertiary focus-visible:ring-offset-2";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    variant = "single",
    min,
    max,
    step = 1,
    className,
    valueFormatter = (v: number) => String(v),
    ...props
  },
  ref,
) {
  const isDouble = variant === "double";

  const value: number[] = isDouble
    ? [...(props as DoubleProps).value]
    : [(props as SingleProps).value];

  const handleChange = (v: number[]) => {
    if (isDouble) {
      (props as DoubleProps).onChange([v[0], v[1]]);
    } else {
      (props as SingleProps).onChange(v[0]);
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleChange}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className={trackClass}>
          <SliderPrimitive.Range className={rangeClass} />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className={thumbClass} />

        {isDouble && <SliderPrimitive.Thumb className={thumbClass} />}
      </SliderPrimitive.Root>

      {!isDouble ? (
        <div className="mt-2 flex justify-between text-xs text-contentSecondary">
          <span>{valueFormatter(min)}</span>

          <span className="font-medium text-contentPrimary">
            {valueFormatter((props as SingleProps).value)}
          </span>

          <span>{valueFormatter(max)}</span>
        </div>
      ) : (
        <div className="mt-2 flex justify-between text-xs text-contentSecondary">
          <span>{valueFormatter(min)}</span>

          {(props as DoubleProps).showValues && (
            <span className="font-medium text-contentPrimary">
              {valueFormatter((props as DoubleProps).value[0])} -{" "}
              {valueFormatter((props as DoubleProps).value[1])}
            </span>
          )}

          <span>{valueFormatter(max)}</span>
        </div>
      )}
    </div>
  );
});
Slider.displayName = "Slider";
