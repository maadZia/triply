import { Field } from "@/components/design-system/forms/Fieldset";
import { Label } from "@/components/design-system/typography/Label";
import { cn } from "@/components/utils";

export function FilterSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Field className={cn("space-y-1", className)}>
      <Label className="text-contentSecondary">{title}</Label>
      {children}
    </Field>
  );
}
