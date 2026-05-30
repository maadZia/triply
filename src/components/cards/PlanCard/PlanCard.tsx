import { LightCard } from "../LightCard";
import { P1, P3 } from "@/components/typography/Paragraph";
import { Button } from "@/components/atoms/Button";

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
}

export function PlanCard({
  title,
  days,
  tags,
  img,
  to,
  onViewPlan,
}: PlanCardProps) {
  return (
    <LightCard className="w-full max-w-[340px] overflow-hidden flex flex-col p-0">
      {/* Image */}
      <div className="w-full aspect-4/3 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <P1 className="font-bold">{title}</P1>
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
