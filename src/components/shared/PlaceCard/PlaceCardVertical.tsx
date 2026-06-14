import { StarIcon } from "@heroicons/react/24/solid";
import { LightCard } from "@/components/design-system/cards/LightCard";
import { P1, P3 } from "@/components/design-system/typography/Paragraph";
import { Button } from "@/components/design-system/atoms/Button";

type PlaceCardVerticalProps = {
  title: string;
  description: string;
  img: string;
  rating?: { score: number; reviews: number };
  actionButtons?: React.ReactNode;
  onDetailsClick?: () => void;
};

export function PlaceCardVertical({
  title,
  description,
  img,
  rating,
  actionButtons,
  onDetailsClick,
}: PlaceCardVerticalProps) {
  return (
    <LightCard className="w-full overflow-hidden flex flex-col p-0">
      {/* IMAGE */}
      <div className="w-full aspect-4/3 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
        <header className="flex items-start justify-between gap-2">
          <P1 className="font-semibold leading-snug">{title}</P1>
          {rating && (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500 shrink-0">
              <StarIcon className="h-3.5 w-3.5" />
              {rating.score.toFixed(1)}
            </span>
          )}
        </header>

        <P3 className="line-clamp-3">{description}</P3>

        <div className="flex w-full justify-between items-center gap-1 px-1 mt-1">
          <Button
            plain
            className="mt-auto self-start px-0"
            onClick={onDetailsClick}
          >
            Pokaż szczegóły
          </Button>
          {actionButtons}
        </div>
      </div>
    </LightCard>
  );
}
