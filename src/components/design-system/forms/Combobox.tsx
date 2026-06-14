"use client";

import { cn } from "@/components/utils";
import * as Headless from "@headlessui/react";
import { useState } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  className?: string;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder,
  className,
}: ComboboxProps) {
  const [query, setQuery] = useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Headless.Combobox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <Headless.ComboboxInput
          className="border outline-none transition-all duration-200 bg-white/80 placeholder:text-stone-400 mt-0.5 w-full rounded-full px-4 py-1 border-stone-400 text-contentPrimary focus:border-borderPrimary hover:border-stone-500"
          displayValue={() => selectedOption?.label || ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <Headless.ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none px-4 py-2 text-contentSecondary">
              Nie znaleziono
            </div>
          ) : (
            filteredOptions.map((option) => (
              <Headless.ComboboxOption
                key={option.value}
                value={option.value}
                className="relative cursor-pointer select-none py-2 pl-4 pr-4 text-contentPrimary hover:bg-accentLight/50 data-selected:bg-accentLight data-selected:text-accentDark"
              >
                {option.label}
              </Headless.ComboboxOption>
            ))
          )}
        </Headless.ComboboxOptions>
      </div>
    </Headless.Combobox>
  );
}
