import { useState, lazy, Suspense, useMemo, useRef, useEffect } from "react";
import type { GeneratedPlan } from "@/types/plan";
import { formatDateForDisplay } from "@/types/plan";
import type { Place } from "@/types/places";
import { Button } from "@/components/design-system/atoms/Button";
import { DayContainer } from "./DayContainer";
import { EmptyPlanState } from "./EmptyPlanState";
import { PlaceDetailsDialog } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { getPlacesByCity } from "@/mock/places";
import { toDialogPlace } from "@/utils/placeMapper";
import type { MapMarker } from "@/components/design-system/atoms/Map";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Map = lazy(() =>
  import("@/components/design-system/atoms/Map").then((module) => ({
    default: module.Map,
  })),
);

interface PlanViewProps {
  plan: GeneratedPlan;
  isUnsaved?: boolean;
  onSavePlan?: () => void;
}

export function PlanView({ plan, isUnsaved, onSavePlan }: PlanViewProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editablePlan, setEditablePlan] = useState<GeneratedPlan>(plan);
  const prevPlanIdRef = useRef(plan.id);

  useEffect(() => {
    if (prevPlanIdRef.current !== plan.id) {
      setEditablePlan(plan);
      prevPlanIdRef.current = plan.id;
    }
  }, [plan]);

  const selectedDay = editablePlan.days[selectedDayIndex];

  const allCityPlaces = useMemo(() => {
    return getPlacesByCity(editablePlan.city);
  }, [editablePlan.city]);

  const selectedPlaceIds = useMemo(() => {
    const ids = new Set<string>();
    editablePlan.days.forEach((day) => {
      day.places.forEach((place) => ids.add(place.id));
    });
    return ids;
  }, [editablePlan.days]);

  const mapMarkers: MapMarker[] = useMemo(() => {
    return allCityPlaces.map((place) => ({
      id: place.id,
      lat: place.location.coordinates!.lat,
      lng: place.location.coordinates!.lng,
      label: place.name,
      selected: selectedPlaceIds.has(place.id),
    }));
  }, [allCityPlaces, selectedPlaceIds]);

  const mapCenter = useMemo(() => {
    if (!selectedDay || selectedDay.places.length === 0) {
      if (allCityPlaces.length > 0) {
        return [
          allCityPlaces[0].location.coordinates!.lat,
          allCityPlaces[0].location.coordinates!.lng,
        ] as [number, number];
      }
      return [50.0614, 19.9372] as [number, number]; // Default: Kraków
    }
    return [
      selectedDay.stats.centerPoint.lat,
      selectedDay.stats.centerPoint.lng,
    ] as [number, number];
  }, [selectedDay, allCityPlaces]);

  const handleMarkerClick = (marker: MapMarker) => {
    const place = allCityPlaces.find((p) => p.id === marker.id);
    if (place) {
      setSelectedPlace(place);
      setIsDialogOpen(true);
    }
  };

  const isSelectedPlaceInPlan = useMemo(() => {
    if (!selectedPlace) return false;
    return selectedPlaceIds.has(selectedPlace.id);
  }, [selectedPlace, selectedPlaceIds]);

  const handleAddToPlan = () => {
    if (!selectedPlace) return;

    setEditablePlan((prevPlan) => {
      const newDays = [...prevPlan.days];
      const targetDay = { ...newDays[selectedDayIndex] };

      const newPlace = {
        id: selectedPlace.id,
        name: selectedPlace.name,
        description: selectedPlace.description,
        mainImage: selectedPlace.mainImage,
        rating: selectedPlace.rating,
        location: {
          address: selectedPlace.location.address,
          lat: selectedPlace.location.coordinates!.lat,
          lng: selectedPlace.location.coordinates!.lng,
        },
        price: selectedPlace.price,
        estimatedVisitTime: selectedPlace.estimatedVisitTime ?? 60,
        type: selectedPlace.type,
        categories: selectedPlace.categories,
      };

      targetDay.places = [...targetDay.places, newPlace];
      targetDay.stats = {
        ...targetDay.stats,
        totalPlaces: targetDay.stats.totalPlaces + 1,
        totalTime:
          targetDay.stats.totalTime + (selectedPlace.estimatedVisitTime ?? 60),
        totalPrice: targetDay.stats.totalPrice + selectedPlace.price.normal,
      };

      newDays[selectedDayIndex] = targetDay;

      const newTotalPlaces = prevPlan.stats.totalPlaces + 1;
      const newTotalPrice =
        prevPlan.stats.totalPrice + selectedPlace.price.normal;

      return {
        ...prevPlan,
        days: newDays,
        stats: {
          ...prevPlan.stats,
          totalPlaces: newTotalPlaces,
          totalPrice: newTotalPrice,
        },
      };
    });

    setIsDialogOpen(false);
  };

  const handleDetailsClick = (placeId: string) => {
    const place = allCityPlaces.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
      setIsDialogOpen(true);
    }
  };

  const placeForDialog = useMemo(() => {
    if (!selectedPlace) return undefined;
    return toDialogPlace(selectedPlace);
  }, [selectedPlace]);

  if (!editablePlan.days.length) {
    return <EmptyPlanState message="Plan nie zawiera żadnych dni" />;
  }

  return (
    <div className="flex min-h-[80vh] overflow-hidden">
      {/* ── Column 1: Day picker ── */}
      <aside className="w-44 shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Dni podróży
          </h2>
          <p className="mt-1 text-sm text-contentSecondary">
            {editablePlan.city}
          </p>
        </div>

        <ul className="space-y-1 p-2">
          {editablePlan.days.map((day, index) => {
            const isSelected = index === selectedDayIndex;
            const formattedDate = formatDateForDisplay(day.date);

            return (
              <li key={day.day} className="flex">
                <Button
                  onClick={() => setSelectedDayIndex(index)}
                  className="w-full flex-col items-start gap-0 rounded-lg px-3 py-3"
                  {...(!isSelected ? { plain: true } : {})}
                >
                  <span className="text-sm font-semibold">Dzień {day.day}</span>
                  {formattedDate && (
                    <span className="mt-0.5 text-xs opacity-70">
                      {formattedDate}
                    </span>
                  )}
                  <span className="mt-1 text-xs opacity-60">
                    {day.stats.totalPlaces} atrakcji
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>

        {/* Statystyki planu */}
        <div className="mt-4 border-t border-gray-100 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Podsumowanie
          </h3>
          <div className="space-y-1 text-xs text-contentSecondary">
            <p>{editablePlan.stats.totalPlaces} atrakcji</p>
            <p>{editablePlan.stats.totalDays} dni</p>
            <p>{editablePlan.stats.totalPrice} PLN</p>
          </div>
        </div>
      </aside>

      {/* ── Column 2: Places list ── */}
      <section className="flex-1 overflow-y-auto border-r border-gray-200 bg-white">
        {/* Warning dla niezapisanego planu */}
        {isUnsaved && (
          <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 p-3">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-amber-800">
                Plan niezapisany - zostanie utracony po opuszczeniu strony
              </span>
            </div>
            {onSavePlan && (
              <Button
                onClick={onSavePlan}
                className="flex items-center gap-1 text-sm"
              >
                <CheckCircleIcon className="h-4 w-4" />
                Zapisz w profilu
              </Button>
            )}
          </div>
        )}

        <div className="border-b border-gray-100 p-4">
          <h1 className="text-base font-semibold text-gray-900">
            Harmonogram - Dzień {selectedDay.day}
          </h1>
          {selectedDay.date && (
            <p className="mt-0.5 text-xs text-gray-400">
              {formatDateForDisplay(selectedDay.date)}
            </p>
          )}
        </div>

        <DayContainer day={selectedDay} onDetailsClick={handleDetailsClick} />
      </section>

      {/* ── Column 3: Map ── */}
      <section className="flex-1 max-h-[calc(100vh-100px)] overflow-hidden relative">
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
            onMarkerClick={handleMarkerClick}
          />
        </Suspense>

        {/* Legenda mapy */}
        <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 p-3 shadow-md backdrop-blur">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-accentBase"></span>
              <span>W planie</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-gray-400"></span>
              <span>Dostępne</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog ze szczegółami miejsca */}
      <PlaceDetailsDialog
        place={placeForDialog}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        showAddToPlan={!isSelectedPlaceInPlan}
        onAddToPlan={handleAddToPlan}
      />
    </div>
  );
}
