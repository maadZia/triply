import { cn } from "@/components/utils";

export const LightCard = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-white border border-borderSecondary h-fit w-fyll rounded-xl p-6 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
