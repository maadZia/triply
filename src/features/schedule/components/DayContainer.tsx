import type { DayPlan } from "@/types/plan";
import { formatTime, formatDateForDisplay } from "@/types/plan";
import { PlaceCard } from "./PlaceCard";
import {
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@/components/design-system/atoms/Divider";
import { Button } from "@/components/design-system/atoms/Button";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DayContainerProps {
  day: DayPlan;
  onRemovePlace?: (placeId: string) => void;
  onDetailsClick?: (placeId: string) => void;
  onDeleteDay?: () => void;
}

export function DayContainer({
  day,
  onRemovePlace,
  onDetailsClick,
  onDeleteDay,
}: DayContainerProps) {
  const formattedDate = formatDateForDisplay(day.date);

  return (
    <div className="space-y-4 p-3">
      <header className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-contentPrimary">
              Dzień {day.day}
              {formattedDate && (
                <span className="ml-2 text-sm font-normal text-contentSecondary">
                  - {formattedDate}
                </span>
              )}
            </h2>
            <div className="mt-1 flex flex-wrap gap-4 text-xs text-contentSecondary">
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {day.stats.totalPlaces} atrakcji
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3.5 w-3.5" />
                {formatTime(day.stats.totalTime)}
              </span>
              <span className="flex items-center gap-1">
                <CurrencyDollarIcon className="h-3.5 w-3.5" />
                {day.stats.totalPrice} PLN
              </span>
            </div>
          </div>
          {onDeleteDay && (
            <Button
              destructive
              onClick={onDeleteDay}
              className="px-2 shrink-0"
              title="Usuń dzień z planu"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <Divider soft />

      {/* Lista atrakcji */}
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-borderSecondary" />

        <SortableContext
          items={day.places.map((place) => place.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {day.places.map((place, index) => (
              <div key={place.id} className="flex items-start gap-2">
                {/* Numer osobno - nie przenosi się podczas DnD */}
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accentBase text-sm font-bold text-white shadow-sm">
                  {index + 1}
                </div>
                <PlaceCard
                  place={place}
                  onRemove={
                    onRemovePlace ? () => onRemovePlace(place.id) : undefined
                  }
                  onDetailsClick={
                    onDetailsClick ? () => onDetailsClick(place.id) : undefined
                  }
                />
              </div>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
