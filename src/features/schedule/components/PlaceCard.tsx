import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PlanPlace } from "@/types/plan";
import { Button } from "@/components/design-system/atoms/Button";
import { DragHandleIcon } from "@/components/design-system/atoms/icons";
import { useMediaQuery } from "usehooks-ts";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { PlaceCardVertical } from "@/components/shared/PlaceCard/PlaceCardVertical";
import { cn } from "@/components/utils";

interface PlaceCardContentProps {
  place: PlanPlace;
  actionButtons?: React.ReactNode;
  onDetailsClick?: () => void;
}

function PlaceCardContent({
  place,
  actionButtons,
  onDetailsClick,
}: PlaceCardContentProps) {
  const isSmUp = useMediaQuery("(min-width: 640px)");

  const cardProps = {
    title: place.name,
    description: place.description,
    img: place.mainImage,
    actionButtons,
    onDetailsClick,
  };

  return isSmUp ? (
    <PlaceCardHorizontal {...cardProps} />
  ) : (
    <PlaceCardVertical {...cardProps} rating={place.rating} />
  );
}

interface PlaceCardProps {
  place: PlanPlace;
  onRemove?: () => void;
  onDetailsClick?: () => void;
  isOverlay?: boolean;
}

export function PlaceCard({
  place,
  onRemove,
  onDetailsClick,
  isOverlay = false,
}: PlaceCardProps) {
  if (isOverlay) {
    return (
      <div className="opacity-100 z-50">
        <PlaceCardContent place={place} onDetailsClick={onDetailsClick} />
      </div>
    );
  }

  return (
    <SortablePlaceCard
      place={place}
      onRemove={onRemove}
      onDetailsClick={onDetailsClick}
    />
  );
}

function SortablePlaceCard({
  place,
  onRemove,
  onDetailsClick,
}: Omit<PlaceCardProps, "isOverlay">) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: place.id,
    data: {
      place,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const actionButtons = (
    <div>
      <DragHandleIcon
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        isDragging={isDragging}
      />
      {onRemove && (
        <Button
          plain
          onClick={onRemove}
          className="p-0 text-contentError"
          title="Usuń z planu"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex-1 min-w-0", isDragging && "opacity-30")}
    >
      <PlaceCardContent
        place={place}
        actionButtons={actionButtons}
        onDetailsClick={onDetailsClick}
      />
    </div>
  );
}
