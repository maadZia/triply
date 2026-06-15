import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";
import { P1 } from "../typography/Paragraph";

const DEFAULT_DURATION_MS = 3000;

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export function Toast({
  open,
  message,
  onClose,
  duration = DEFAULT_DURATION_MS,
  className,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, onClose, duration]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, x: 16 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 8, x: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "fixed bottom-4 right-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-accentBase/40 bg-accentLight px-4 py-3 shadow-lg",
            className,
          )}
        >
          <CheckCircleIcon className="h-5 w-5 shrink-0 text-accentDark" />
          <P1 className="font-medium text-accentDark">{message}</P1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
