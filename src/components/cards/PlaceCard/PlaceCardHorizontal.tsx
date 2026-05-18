import { LightCard } from "../LightCard"
import { HeartButton, BookmarkButton } from "@/components/atoms/icons"
import { P1, P3 } from "@/components/typography/Paragraph"
import { Button } from "@/components/atoms/Button";

type PlaceCardHorizontalProps = {
  title: string;
  description: string;
  img: string;
};

export function PlaceCardHorizontal({
  title,
  description,
  img,
}: PlaceCardHorizontalProps) {
  return (
    <LightCard className="flex gap-4 items-start p-4">
      <div className="w-80 aspect-square rounded-lg overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <section className="space-y-2">
        <header className="flex items-center justify-between gap-x-1">
          <P1 className="font-semibold">{title}</P1>

          <div className="flex gap-1">
            <HeartButton defaultLiked={false} />
            <BookmarkButton defaultLiked={false} />
          </div>
        </header>

        <P3>{description}</P3>

        <Button plain>Pokaż szczegóły</Button>
      </section>
    </LightCard>
  )
}
