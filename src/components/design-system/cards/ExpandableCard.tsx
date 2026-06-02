import { cn } from "@/components/utils";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableCardProps {
  title: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ExpandableCard({
  title,
  defaultOpen = false,
  children,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-2xl border border-borderSecondary bg-backgroundSecondary overflow-hidden",
        className,
      )}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 hover:bg-backgroundSecondary/80 transition-colors"
      >
        <span className="text-lg font-semibold text-contentPrimary">
          {title}
        </span>
        {open ? (
          <ChevronUpIcon className="h-5 w-5 text-contentSecondary" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-contentSecondary" />
        )}
      </button>

      {/* Animated content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
