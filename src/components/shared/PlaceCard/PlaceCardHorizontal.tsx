import { LightCard } from "@/components/design-system/cards/LightCard";
import { P1, P3 } from "@/components/design-system/typography/Paragraph";
import { Button } from "@/components/design-system/atoms/Button";

type PlaceCardHorizontalProps = {
  title: string;
  description: string;
  img: string;
  actionButtons?: React.ReactNode;
  onDetailsClick?: () => void;
};

export function PlaceCardHorizontal({
  title,
  description,
  img,
  actionButtons,
  onDetailsClick,
}: PlaceCardHorizontalProps) {
  return (
    <LightCard className="flex items-start gap-4 p-4 min-w-sm">
      {/* IMAGE */}
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex min-h-32 min-w-0 flex-1 flex-col space-y-2">
        <section className="space-y-2">
          <header className="flex items-start justify-between gap-x-1">
            <P1 className="font-semibold">{title}</P1>

            <div className="flex gap-1">{actionButtons}</div>
          </header>

          <P3 className="line-clamp-4 text-balance">{description}</P3>
        </section>

        <Button
          plain
          className="mt-auto self-start px-0"
          onClick={onDetailsClick}
        >
          Pokaż szczegóły
        </Button>
      </div>
    </LightCard>
  );
}
