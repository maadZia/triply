import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../design-system/atoms/Button";

interface DeleteButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

export function DeleteButton({
  onClick,
  ariaLabel = "Usuń",
  className = "",
}: DeleteButtonProps) {
  return (
    <Button
      outlineDestructive
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label={ariaLabel}
      className={`shrink-0 p-2 transition-colors ${className}`}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
