import { type ReactNode } from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";

import { cn } from "@/components/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Dialog({ open, onClose, children }: DialogProps) {
  return (
    <HeadlessDialog
      as="div"
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* wrapper */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {children}
        </div>
      </div>
    </HeadlessDialog>
  );
}

type DialogPanelProps = {
  children: ReactNode;
  className?: string;
};

export function DialogPanel({ children, className }: DialogPanelProps) {
  return (
    <HeadlessDialog.Panel
      className={cn(
        "w-full max-w-lg rounded-2xl border border-borderSecondary bg-backgroundPrimary p-6 shadow-xl",
        className,
      )}
    >
      {children}
    </HeadlessDialog.Panel>
  );
}

type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <HeadlessDialog.Title
      className={cn("text-xl font-semibold text-contentPrimary", className)}
    >
      {children}
    </HeadlessDialog.Title>
  );
}

type DialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function DialogDescription({
  children,
  className,
}: DialogDescriptionProps) {
  return (
    <p className={cn("mt-2 text-sm text-contentSecondary", className)}>
      {children}
    </p>
  );
}
