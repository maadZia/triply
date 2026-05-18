import { LightCard } from "../LightCard";
import { P1, P3 } from "@/components/typography/Paragraph";

type PlaceCardVerticalProps = {
  title: string;
  description: string;
  img: string;
  actionButtons?: React.ReactNode;
};

export function PlaceCardVertical({
  title,
  description,
  img,
  actionButtons,
}: PlaceCardVerticalProps) {
  return (
    <LightCard className="w-full max-w-64 overflow-hidden flex flex-col p-0">
      {/* IMAGE */}
      {/* todo: add optional badge */}
      <div className="w-full aspect-4/3 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 p-4 flex-1 min-w-0">
        <header className="flex items-start justify-between gap-2">
          <P1 className="font-semibold">{title}</P1>
          {/* todo: add optional rating */}
        </header>

        <P3>{description}</P3>

        <div className="flex w-full justify-between items-center gap-1 px-1 mt-1">
          {actionButtons}
        </div>
      </div>
    </LightCard>
  );
}
