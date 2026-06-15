import { lazy, Suspense } from "react";
import type { MapMarker } from "@/components/design-system/atoms/Map";
import { cn } from "@/components/utils";

const Map = lazy(() =>
  import("@/components/design-system/atoms/Map").then((module) => ({
    default: module.Map,
  })),
);

interface PlanMapPanelProps {
  mapCenter: [number, number];
  mapMarkers: MapMarker[];
  onMarkerClick: (marker: MapMarker) => void;
  multiDay: boolean;
  className?: string;
}

export function PlanMapPanel({
  mapCenter,
  mapMarkers,
  onMarkerClick,
  multiDay,
  className,
}: PlanMapPanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden relative rounded-xl border border-borderSecondary",
        className,
      )}
    >
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Ładowanie mapy…
          </div>
        }
      >
        <Map
          center={mapCenter}
          zoom={14}
          markers={mapMarkers}
          onMarkerClick={onMarkerClick}
        />
      </Suspense>

      <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 p-3 shadow-md backdrop-blur">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-[13px] shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 41"
                className="h-5 w-[13px]"
                aria-hidden="true"
              >
                <path
                  fill="#ef4444"
                  d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.333 12.5 28.5 12.5 28.5S25 21.833 25 12.5C25 5.596 19.404 0 12.5 0z"
                />
                <path
                  fill="#dc2626"
                  d="M12.5 2C6.701 2 2 6.701 2 12.5c0 7.8 10.5 24.5 10.5 24.5S23 20.3 23 12.5C23 6.701 18.299 2 12.5 2z"
                />
                <circle cx="12.5" cy="12.5" r="5" fill="white" />
              </svg>
              <span className="absolute left-1/2 top-[3px] -translate-x-1/2 text-[5px] font-bold leading-none text-contentError">
                {multiDay ? "D1:1" : "1"}
              </span>
            </div>
            <span>W planie</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="map-marker__dot map-marker__dot--legend"
              aria-hidden="true"
            />
            <span>Dostępne</span>
          </div>
        </div>
      </div>
    </div>
  );
}
