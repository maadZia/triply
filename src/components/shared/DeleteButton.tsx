import { TrashIcon } from "@heroicons/react/24/outline";

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
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label={ariaLabel}
      className={`shrink-0 rounded-full p-2 text-contentSecondary transition-colors hover:bg-red-50 hover:text-red-500 ${className}`}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
}
