import { DeleteButton } from "@/components/design-system/atoms/icons/DeleteButton";
import { LightCard } from "@/components/design-system/cards/LightCard";
import { P1, P3 } from "@/components/design-system/typography/Paragraph";
import { Button } from "@/components/design-system/atoms/Button";

interface PlanCardProps {
  title: string;
  /** e.g. "3 dni" */
  days: string;
  /** e.g. "Relaks i sztuka" or "Luwr, d'Orsay, Montmartre" */
  tags: string;
  img: string;
  /** Route to navigate to when button is clicked */
  to?: string;
  onViewPlan?: () => void;
  onDelete?: () => void;
}

export function PlanCard({
  title,
  days,
  tags,
  img,
  to,
  onViewPlan,
  onDelete,
}: PlanCardProps) {
  return (
    <LightCard className="w-full max-w-[330px] overflow-hidden flex flex-col p-0">
      {/* Image */}
      <div className="w-full aspect-4/3 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <header className="flex items-start justify-between gap-2">
          <P1 className="font-bold leading-snug">{title}</P1>
          {onDelete && (
            <DeleteButton
              onClick={onDelete}
              ariaLabel="Usuń plan"
              className="p-1.5"
            />
          )}
        </header>

        <P3 className="text-contentSecondary">
          {days} &bull; {tags}
        </P3>

        <div className="mt-2">
          {to ? (
            <Button to={to} className="w-full">
              Wyświetl plan
            </Button>
          ) : (
            <Button onClick={onViewPlan} className="w-full">
              Wyświetl plan
            </Button>
          )}
        </div>
      </div>
    </LightCard>
  );
}
