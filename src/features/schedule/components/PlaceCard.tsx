import { ArrowsUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { PlanPlace } from "@/types/plan";
import { Button } from "@/components/design-system/atoms/Button";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";

interface PlaceCardProps {
  place: PlanPlace;
  index: number;
  onRemove?: () => void;
  onReorder?: () => void;
}

export function PlaceCard({
  place,
  index,
  onRemove,
  onReorder,
}: PlaceCardProps) {
  const actionButtons = (
    <>
      {onReorder && (
        <Button
          plain
          onClick={onReorder}
          className="h-8 w-8 p-0"
          title="Zmień kolejność"
        >
          <ArrowsUpDownIcon className="h-4 w-4" />
        </Button>
      )}
      {onRemove && (
        <Button
          plain
          onClick={onRemove}
          className="h-8 w-8 p-0 text-contentError hover:bg-red-50"
          title="Usuń z planu"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  );

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accentBase text-sm font-bold text-white shadow-sm">
        {index}
      </div>

      <PlaceCardHorizontal
        title={place.name}
        description={place.description}
        img={place.mainImage}
        actionButtons={actionButtons}
      />
    </div>
  );
}
