import { useState } from "react";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { cn } from "@/components/utils";

type BookmarkButtonProps = {
  onToggle?: (clicked: boolean) => void;
  defaultLiked?: boolean;
  className?: string;
};

export function BookmarkButton({
  onToggle,
  defaultLiked = false,
  className,
}: BookmarkButtonProps) {
  const [clicked, setClicked] = useState<boolean>(defaultLiked);

  const handleClick = () => {
    const newState = !clicked;
    setClicked(newState);

    if (onToggle) {
      onToggle(newState);
    }
  };

  const Icon = clicked ? BookmarkSolid : BookmarkOutline;

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
