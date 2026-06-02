import { cn } from "@/components/utils";
import type React from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";

export interface TabItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  function TabItem({ current, className, children, ...props }, ref) {
    const classes = cn(
      "relative pb-2 px-1 text-sm font-medium transition-colors",
      current
        ? "text-accentDark"
        : "text-contentSecondary hover:text-contentPrimary",
      className,
    );

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        className={classes}
        data-current={current ? "true" : undefined}
      >
        <span className="relative inline-block">
          {children}

          {current && (
            <motion.span
              layoutId="tabs-indicator"
              className="absolute left-0 -bottom-2 h-0.5 w-full rounded-full bg-accentDark"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
              }}
            />
          )}
        </span>
      </button>
    );
  },
);

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {
  return (
    <div
      className={cn("flex gap-8 border-b border-borderSecondary/60", className)}
    >
      {children}
    </div>
  );
}
