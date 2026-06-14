"use client";

import { cn } from "@/components/utils";

export interface CheckboxButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function CheckboxButton({
  label,
  checked,
  onChange,
  className,
}: CheckboxButtonProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        checked
          ? "border-accentBase bg-accentLight text-accentDark"
          : "border-borderSecondary bg-white text-contentSecondary hover:border-borderPrimary",
        className,
      )}
    >
      {label}
    </button>
  );
}
