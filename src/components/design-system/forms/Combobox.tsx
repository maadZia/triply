"use client";

import { cn } from "@/components/utils";
import * as Headless from "@headlessui/react";
import { useMemo, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

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
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  return (
    <Headless.Combobox
      value={value}
      onChange={(v) => {
        if (v !== null) {
          onChange(v);
        }
      }}
    >
      <div className={cn("relative", className)}>
        <div className="relative">
          <Headless.ComboboxInput
            className="w-full rounded-full border border-stone-400 bg-white/80 px-4 py-1 pr-10 text-contentPrimary outline-none transition-all placeholder:text-stone-400 hover:border-stone-500 focus:border-borderPrimary"
            displayValue={() => selectedOption?.label || ""}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            placeholder={placeholder}
          />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-stone-100"
          >
            <ChevronUpDownIcon className="h-4 w-4 text-stone-600" />
          </button>
        </div>

        {open && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="px-4 py-2 text-contentSecondary">
                Nie znaleziono
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;

                return (
                  <Headless.ComboboxOption
                    key={option.value}
                    value={option.value}
                    className="flex cursor-pointer items-center py-2 px-2 text-contentPrimary hover:bg-accentLight/50"
                  >
                    <span className="w-4">
                      {isSelected && (
                        <CheckIcon className="h-4 w-4 text-accentBase" />
                      )}
                    </span>

                    <span className="ml-2">{option.label}</span>
                  </Headless.ComboboxOption>
                );
              })
            )}
          </div>
        )}
      </div>
    </Headless.Combobox>
  );
}
