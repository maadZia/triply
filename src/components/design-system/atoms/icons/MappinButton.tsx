import { useState } from "react";
import { MapPinIcon as MapPinSolid } from "@heroicons/react/24/solid";
import { MapPinIcon as MapPinOutline } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

type MappinButtonProps = {
  onToggle?: (clicked: boolean) => void;
  pinned?: boolean;
  defaultLiked?: boolean;
  className?: string;
};

export function MappinButton({
  onToggle,
  pinned,
  defaultLiked = false,
  className,
}: MappinButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [internalPinned, setInternalPinned] = useState<boolean>(defaultLiked);
  const isControlled = pinned !== undefined;
  const isPinned = isControlled ? pinned : internalPinned;

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const newState = !isPinned;

    if (!isControlled) {
      setInternalPinned(newState);
    }

    onToggle?.(newState);
  };

  const Icon = isPinned ? MapPinSolid : MapPinOutline;

  return (
    <button
      onClick={handleClick}
      className={cn("transition-colors cursor-pointer", className)}
      aria-pressed={isPinned}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          isPinned
            ? "text-accentDark fill-accentDark"
            : "text-contentSecondary",
        )}
      />
    </button>
  );
}
