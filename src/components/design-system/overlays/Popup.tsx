import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "@/components/design-system/atoms/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "default";
  isLoading?: boolean;
}

export function Popup({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Potwierdź",
  cancelText = "Anuluj",
  variant = "default",
  isLoading = false,
}: PopupProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel className="max-w-md">
        <DialogTitle
          className={cn(
            variant === "destructive" && "text-contentDesctructive",
          )}
        >
          <div className="flex items-center gap-2">
            {variant === "destructive" && (
              <ExclamationTriangleIcon className="h-6 w-6 text-contentDesctructive" />
            )}
            {title}
          </div>
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <div className="mt-6 flex justify-end gap-3">
          <Button plain onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            {...(variant === "destructive"
              ? { destructive: true as const }
              : {})}
          >
            {confirmText}
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
