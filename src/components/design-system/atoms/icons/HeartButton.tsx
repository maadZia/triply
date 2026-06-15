import { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { cn } from "@/components/utils";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

type HeartButtonProps = {
  onToggle?: (clicked: boolean) => void;
  defaultLiked?: boolean;
  className?: string;
};

export function HeartButton({
  onToggle,
  defaultLiked = false,
  className,
}: HeartButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clicked, setClicked] = useState<boolean>(defaultLiked);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const newState = !clicked;
    setClicked(newState);

    if (!user) navigate("/login");

    if (onToggle) {
      onToggle(newState);
    }
  };

  const Icon = clicked ? HeartSolid : HeartOutline;

  return (
    <button
      onClick={handleClick}
      className={cn("transition-colors cursor-pointer", className)}
      aria-pressed={clicked}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          clicked ? "text-red-600 fill-red-600" : "text-contentSecondary",
        )}
      />
    </button>
  );
}
