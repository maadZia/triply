import { TrashIcon } from "@heroicons/react/24/outline";
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
            <button
              type="button"
              onClick={onDelete}
              aria-label="Usuń plan"
              className="shrink-0 p-1 rounded-full text-contentSecondary hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
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
