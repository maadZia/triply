import { cn } from "@/components/utils";
import type React from "react";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { motion } from "framer-motion";

export interface NavbarItemProps extends Omit<LinkProps, "className"> {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  function NavbarItem({ current, className, children, ...props }, ref) {
    const classes = cn(
      "relative flex min-w-0 items-center gap-4 rounded-lg text-center text-base transition-colors",
      current ? "text-contentPrimary" : "text-contentSecondary",
      className,
    );

    return (
      <Link
        {...props}
        className={classes}
        data-current={current ? "true" : undefined}
        ref={ref}
      >
        <span className="relative inline-block">
          {children}

          {/* shared animated underline */}
          {current && (
            <motion.span
              layoutId="navbar-indicator"
              className="absolute left-0 -bottom-px h-0.5 w-full rounded-full bg-contentPrimary"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
              }}
            />
          )}
        </span>
      </Link>
    );
  },
);
