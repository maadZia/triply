import type { DayPlan } from "@/types/plan";
import { formatTime, formatDateForDisplay } from "@/types/plan";
import { PlaceCard } from "./PlaceCard";
import {
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface DayContainerProps {
  day: DayPlan;
  onRemovePlace?: (placeId: string) => void;
  onReorderPlace?: (placeId: string, direction: "up" | "down") => void;
  onDetailsClick?: (placeId: string) => void;
}

export function DayContainer({
  day,
  onRemovePlace,
  onReorderPlace,
  onDetailsClick,
}: DayContainerProps) {
  const formattedDate = formatDateForDisplay(day.date);

  return (
    <div className="space-y-3 p-3">
      <header className="border-b border-gray-100 p-4">
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
      </header>

      {/* Lista atrakcji */}
      <div className="space-y-4">
        {day.places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={index + 1}
            onRemove={onRemovePlace ? () => onRemovePlace(place.id) : undefined}
            onReorder={
              onReorderPlace
                ? () => onReorderPlace(place.id, index > 0 ? "up" : "down")
                : undefined
            }
            onDetailsClick={
              onDetailsClick ? () => onDetailsClick(place.id) : undefined
            }
          />
        ))}
      </div>

      {/* Footer ze statystykami */}
      {day.places.length > 0 && (
        <div className="mt-4 rounded-lg bg-backgroundSecondary p-3 text-sm text-contentSecondary">
          <p>
            <strong>Podsumowanie dnia:</strong> {day.stats.totalPlaces}{" "}
            atrakcji, {formatTime(day.stats.totalTime)}, około{" "}
            {day.stats.totalPrice} PLN
          </p>
        </div>
      )}
    </div>
  );
}
