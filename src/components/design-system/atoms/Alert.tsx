import { cn } from "@/components/utils";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface AlertProps {
  variant?: "warning" | "info";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  warning: {
    container: "bg-amber-50 border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-800",
    text: "text-amber-700",
  },
  info: {
    container: "bg-accentLight/50 border-accentBase/30",
    icon: "text-accentDark",
    title: "text-accentDark",
    text: "text-contentSecondary",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  const styles = variantStyles[variant];
  const Icon =
    variant === "warning" ? ExclamationTriangleIcon : InformationCircleIcon;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        styles.container,
        className,
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", styles.icon)} />
      <div className="flex-1">
        {title && (
          <h4 className={cn("font-semibold text-sm mb-1", styles.title)}>
            {title}
          </h4>
        )}
        <div className={cn("text-sm", styles.text)}>{children}</div>
      </div>
    </div>
  );
}
