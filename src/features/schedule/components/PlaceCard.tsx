import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PlanPlace } from "@/types/plan";
import { Button } from "@/components/design-system/atoms/Button";
import { DragHandleIcon } from "@/components/design-system/atoms/icons";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { cn } from "@/components/utils";

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
    <>
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
          className="h-8 w-8 p-0 text-contentError hover:bg-red-50"
          title="Usuń z planu"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex-1",
        isDragging && !isOverlay && "opacity-30",
        isOverlay && "opacity-100 z-50",
      )}
    >
      <PlaceCardHorizontal
        title={place.name}
        description={place.description}
        img={place.mainImage}
        actionButtons={actionButtons}
        onDetailsClick={onDetailsClick}
      />
    </div>
  );
}
