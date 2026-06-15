import { cn } from "@/components/utils";
import { Link, type LinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { motion } from "framer-motion";

interface Props extends Omit<LinkProps, "className"> {
  current?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavbarItemMobile = forwardRef<HTMLAnchorElement, Props>(
  function NavbarItemMobile({ current, children, onClick, ...props }, ref) {
    return (
      <span className="relative">
        {current && (
          <motion.span
            layoutId="mobile-indicator"
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-contentPrimary"
          />
        )}

        <Link
          {...props}
          ref={ref}
          onClick={onClick}
          className={cn(
            "block w-full rounded-lg px-3 py-2 text-left text-base transition-colors",
            current
              ? "text-contentPrimary"
              : "text-contentSecondary hover:text-contentPrimary",
          )}
        >
          {children}
        </Link>
      </span>
    );
  },
);
