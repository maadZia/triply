import { LightCard } from "../LightCard";
import { P1, P3 } from "@/components/typography/Paragraph";
import { Button } from "@/components/atoms/Button";

type PlaceCardHorizontalProps = {
  title: string;
  description: string;
  img: string;
  actionButtons?: React.ReactNode;
};

export function PlaceCardHorizontal({
  title,
  description,
  img,
  actionButtons,
}: PlaceCardHorizontalProps) {
  return (
    <LightCard className="flex gap-4 items-start p-4">
      {/* IMAGE */}
      <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 space-y-2 min-w-0 min-h-32">
        <section className="space-y-2">
          <header className="flex items-start justify-between gap-x-1">
            <P1 className="font-semibold">{title}</P1>
            <div className="flex gap-1">{actionButtons}</div>
          </header>

          <P3>{description}</P3>
        </section>

        <Button className="mt-auto self-start" plain>
          Pokaż szczegóły
        </Button>
      </div>
    </LightCard>
  );
}
