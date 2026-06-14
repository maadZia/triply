"use client";

import { cn } from "@/components/utils";
import { useCallback } from "react";

// Base slider styles matching the design system
const sliderTrackClasses = "absolute h-1.5 w-full rounded-full bg-accentMuted";
const sliderRangeClasses = "absolute h-1.5 rounded-full bg-accentBase";

// Props for single value slider
export interface SliderSingleProps {
  variant: "single";
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

// Props for double/range slider
export interface SliderDoubleProps {
  variant: "double";
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
  showValues?: boolean;
  valueFormatter?: (value: number) => string;
}

export type SliderProps = SliderSingleProps | SliderDoubleProps;

// Single value slider component
function SliderSingle({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
  showValue,
  valueFormatter = (v) => String(v),
}: Omit<SliderSingleProps, "variant">) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative w-full py-4", className)}>
      <div className="relative h-1.5">
        {/* Track background */}
        <div className={sliderTrackClasses} />

        {/* Filled range */}
        <div
          className={sliderRangeClasses}
          style={{ width: `${percentage}%` }}
        />

        {/* Native range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "absolute top-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accentBase [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accentBase [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110",
          )}
        />
      </div>

      {/* Labels */}
      <div className="mt-2 flex justify-between text-xs text-contentSecondary">
        <span>{valueFormatter(min)}</span>
        {showValue && (
          <span className="font-medium text-contentPrimary">
            {valueFormatter(value)}
          </span>
        )}
        <span>{valueFormatter(max)}</span>
      </div>
    </div>
  );
}

// Double/range slider component
function SliderDouble({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
  showValues,
  valueFormatter = (v) => String(v),
}: Omit<SliderDoubleProps, "variant">) {
  const [start, end] = value;
  const startPercentage = ((start - min) / (max - min)) * 100;
  const endPercentage = ((end - min) / (max - min)) * 100;

  const handleStartChange = useCallback(
    (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), end - step);
      onChange([clampedValue, end]);
    },
    [end, min, step, onChange],
  );

  const handleEndChange = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(Math.min(newValue, max), start + step);
      onChange([start, clampedValue]);
    },
    [start, max, step, onChange],
  );

  return (
    <div className={cn("relative w-full py-4", className)}>
      <div className="relative h-1.5">
        {/* Track background */}
        <div className={sliderTrackClasses} />

        {/* Filled range between thumbs */}
        <div
          className={sliderRangeClasses}
          style={{
            left: `${startPercentage}%`,
            width: `${endPercentage - startPercentage}%`,
          }}
        />

        {/* Start thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={start}
          onChange={(e) => handleStartChange(Number(e.target.value))}
          className="pointer-events-none absolute top-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accentBase [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accentBase [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110"
        />

        {/* End thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={end}
          onChange={(e) => handleEndChange(Number(e.target.value))}
          className="pointer-events-none absolute top-0 h-1.5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accentBase [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accentBase [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110"
        />
      </div>

      {/* Labels */}
      <div className="mt-2 flex justify-between text-xs text-contentSecondary">
        <span>{valueFormatter(min)}</span>
        {showValues && (
          <span className="font-medium text-contentPrimary">
            {valueFormatter(start)} - {valueFormatter(end)}
          </span>
        )}
        <span>{valueFormatter(max)}</span>
      </div>
    </div>
  );
}

// Main Slider component with variant selection
export function Slider(props: SliderProps) {
  if (props.variant === "single") {
    return <SliderSingle {...props} />;
  }
  return <SliderDouble {...props} />;
}
