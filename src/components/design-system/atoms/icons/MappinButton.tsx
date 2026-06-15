import { useState } from "react";
import { MapPinIcon as MapPinSolid } from "@heroicons/react/24/solid";
import { MapPinIcon as MapPinOutline } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";

type MappinButtonProps = {
  onToggle?: (clicked: boolean) => void;
  defaultLiked?: boolean;
  className?: string;
};

export function MappinButton({
  onToggle,
  defaultLiked = false,
  className,
}: MappinButtonProps) {
  const [clicked, setClicked] = useState<boolean>(defaultLiked);

  const handleClick = () => {
    const newState = !clicked;
    setClicked(newState);

    if (onToggle) {
      onToggle(newState);
    }
  };

  const Icon = clicked ? MapPinSolid : MapPinOutline;

  return (
    <button
      onClick={handleClick}
      className={cn("transition-colors cursor-pointer", className)}
      aria-pressed={clicked}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          clicked ? "text-accentDark fill-accentDark" : "text-contentSecondary",
        )}
      />
    </button>
  );
}
