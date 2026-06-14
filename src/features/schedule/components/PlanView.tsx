import {
  useState,
  lazy,
  Suspense,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import type { GeneratedPlan, DayPlan } from "@/types/plan";
import { formatDateForDisplay, calculateDate } from "@/types/plan";
import type { Place } from "@/types/places";
import { Button } from "@/components/design-system/atoms/Button";
import { DayTabs } from "@/features/schedule/components/DayTabs";
import { DayContainer } from "./DayContainer";
import { EmptyPlanState } from "./EmptyPlanState";
import { PlaceDetailsDialog } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { getPlacesByCity } from "@/mock/places";
import { toDialogPlace } from "@/utils/placeMapper";
import type { MapMarker } from "@/components/design-system/atoms/Map";
import { H2 } from "@/components/design-system/typography/Heading";
import { P3 } from "@/components/design-system/typography/Paragraph";
import { Alert } from "@/components/design-system/atoms/Alert";
import { Popup } from "@/components/design-system/overlays/Popup";
import {
  PlusIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/design-system/forms/Input";

const Map = lazy(() =>
  import("@/components/design-system/atoms/Map").then((module) => ({
    default: module.Map,
  })),
);

interface PlanViewProps {
  plan: GeneratedPlan;
  onSavePlan?: () => void;
}

export function PlanView({ plan, onSavePlan }: PlanViewProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editablePlan, setEditablePlan] = useState<GeneratedPlan>(plan);
  const [hasModifications, setHasModifications] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dayToDeleteIndex, setDayToDeleteIndex] = useState<number | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [planNameInput, setPlanNameInput] = useState(editablePlan.name || "");
  const prevPlanIdRef = useRef(plan.id);

  useEffect(() => {
    if (prevPlanIdRef.current !== plan.id) {
      setEditablePlan(plan);
      setHasModifications(false);
      setPlanNameInput(plan.name || "");
      setIsEditingName(false);
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

    setHasModifications(true);
    setIsDialogOpen(false);
  };

  const handleRemovePlace = (placeId: string) => {
    setEditablePlan((prevPlan) => {
      const newDays = [...prevPlan.days];
      const targetDay = { ...newDays[selectedDayIndex] };

      const placeToRemove = targetDay.places.find((p) => p.id === placeId);
      if (!placeToRemove) return prevPlan;

      targetDay.places = targetDay.places.filter((p) => p.id !== placeId);
      targetDay.stats = {
        ...targetDay.stats,
        totalPlaces: targetDay.stats.totalPlaces - 1,
        totalTime: targetDay.stats.totalTime - placeToRemove.estimatedVisitTime,
        totalPrice: targetDay.stats.totalPrice - placeToRemove.price.normal,
      };

      newDays[selectedDayIndex] = targetDay;

      const newTotalPlaces = prevPlan.stats.totalPlaces - 1;
      const newTotalPrice =
        prevPlan.stats.totalPrice - placeToRemove.price.normal;

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

    setHasModifications(true);
  };

  const handleDetailsClick = (placeId: string) => {
    const place = allCityPlaces.find((p) => p.id === placeId);
    if (place) {
      setSelectedPlace(place);
      setIsDialogOpen(true);
    }
  };

  // Funkcje obsługi edycji nazwy planu
  const handleStartEditingName = useCallback(() => {
    setIsEditingName(true);
    setPlanNameInput(editablePlan.name || "");
  }, [editablePlan.name]);

  const handleSaveName = useCallback(() => {
    const trimmedName = planNameInput.trim();
    setEditablePlan((prev) => ({
      ...prev,
      name: trimmedName || undefined,
    }));
    setHasModifications(true);
    setIsEditingName(false);
  }, [planNameInput]);

  const handleCancelEditName = useCallback(() => {
    setPlanNameInput(editablePlan.name || "");
    setIsEditingName(false);
  }, [editablePlan.name]);

  const handleNameInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSaveName();
      } else if (e.key === "Escape") {
        handleCancelEditName();
      }
    },
    [handleSaveName, handleCancelEditName],
  );

  // Funkcja otwierająca dialog potwierdzenia usunięcia dnia
  const handleDeleteDayRequest = useCallback((dayIndex: number) => {
    setDayToDeleteIndex(dayIndex);
    setIsPopupOpen(true);
  }, []);

  // Funkcja potwierdzająca usunięcie dnia
  const handleConfirmDeleteDay = useCallback(() => {
    if (dayToDeleteIndex === null) return;

    const dayIndex = dayToDeleteIndex;

    setEditablePlan((prevPlan) => {
      // Usuwamy dzień i przenumerowujemy pozostałe
      const newDays = prevPlan.days
        .filter((_, idx) => idx !== dayIndex)
        .map((day, idx) => ({ ...day, day: idx + 1 }));

      // Przeliczamy statystyki planu
      const newTotalPlaces = newDays.reduce(
        (sum, day) => sum + day.stats.totalPlaces,
        0,
      );
      const newTotalPrice = newDays.reduce(
        (sum, day) => sum + day.stats.totalPrice,
        0,
      );

      return {
        ...prevPlan,
        days: newDays,
        stats: {
          ...prevPlan.stats,
          totalDays: newDays.length,
          totalPlaces: newTotalPlaces,
          totalPrice: newTotalPrice,
        },
      };
    });

    setHasModifications(true);
    setIsPopupOpen(false);
    setDayToDeleteIndex(null);

    // Jeśli usunięty dzień był wybrany, dostosuj selectedDayIndex
    if (selectedDayIndex >= dayIndex && selectedDayIndex > 0) {
      setSelectedDayIndex((prev) => prev - 1);
    } else if (
      selectedDayIndex >= dayIndex &&
      selectedDayIndex === 0 &&
      editablePlan.days.length > 1
    ) {
      // Pozostajemy na indeksie 0, bo to teraz następny dzień
    }
  }, [dayToDeleteIndex, selectedDayIndex, editablePlan.days.length]);

  // Funkcja anulująca usunięcie dnia
  const handleCancelDeleteDay = useCallback(() => {
    setIsPopupOpen(false);
    setDayToDeleteIndex(null);
  }, []);

  // Funkcja dodająca nowy pusty dzień
  const handleAddDay = useCallback(() => {
    setEditablePlan((prevPlan) => {
      const newDayNumber = prevPlan.days.length + 1;
      // Obliczamy datę dla nowego dnia na podstawie startDate
      const newDate = calculateDate(
        prevPlan.filters.startDate,
        newDayNumber - 1,
      );

      // Ustalamy centerPoint na podstawie ostatniego dnia lub domyślne
      const lastDay = prevPlan.days[prevPlan.days.length - 1];
      const centerPoint = lastDay
        ? lastDay.stats.centerPoint
        : { lat: 50.0614, lng: 19.9372 }; // Default: Kraków

      const newDay: DayPlan = {
        day: newDayNumber,
        date: newDate,
        places: [],
        stats: {
          totalPlaces: 0,
          totalTime: 0,
          totalPrice: 0,
          centerPoint,
        },
      };

      return {
        ...prevPlan,
        days: [...prevPlan.days, newDay],
        stats: {
          ...prevPlan.stats,
          totalDays: newDayNumber,
        },
      };
    });

    setHasModifications(true);
    // Przejdź do nowo dodanego dnia
    setSelectedDayIndex(editablePlan.days.length);
  }, [editablePlan.days.length]);

  const placeForDialog = useMemo(() => {
    if (!selectedPlace) return undefined;
    return toDialogPlace(selectedPlace);
  }, [selectedPlace]);

  if (!editablePlan.days.length) {
    return <EmptyPlanState message="Plan nie zawiera żadnych dni" />;
  }

  return (
    <div className="flex min-h-[80vh] overflow-hidden gap-4">
      {/* ── Column 1: Day picker ── */}
      <aside className="w-56 shrink-0 overflow-y-auto">
        <div className="p-4 space-y-1">
          {isEditingName ? (
            <div className="flex items-center gap-1">
              <Input
                value={planNameInput}
                onChange={(e) => setPlanNameInput(e.target.value)}
                onKeyDown={handleNameInputKeyDown}
                placeholder="Nazwa planu"
                autoFocus
                className="min-w-40"
              />
              <Button
                plain
                onClick={handleSaveName}
                className="p-0 shrink-0 text-accentDark"
                title="Zapisz nazwę"
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
              <Button
                plain
                onClick={handleCancelEditName}
                className="p-0 shrink-0 text-contentDesctructive"
                title="Anuluj"
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <H2 className="flex-1 truncate">
                {editablePlan.name ||
                  (plan.id === "generated" ? "Nowy plan" : "Plan bez nazwy")}
              </H2>
              <Button
                plain
                onClick={handleStartEditingName}
                className="h-7 w-7 p-0 shrink-0 text-contentSecondary hover:text-accentDark"
                title="Edytuj nazwę"
              >
                <PencilIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
          <P3 className="text-contentSecondary">{editablePlan.city}</P3>
        </div>

        <DayTabs
          days={editablePlan.days.map((day) => ({
            id: day.day,
            label: `Dzień ${day.day}`,
            date: day.date ? formatDateForDisplay(day.date) : undefined,
          }))}
          selectedIndex={selectedDayIndex}
          onSelect={setSelectedDayIndex}
        />

        <div className="px-4 pb-4">
          <Button
            outline
            onClick={handleAddDay}
            className="w-full flex items-center justify-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Dodaj dzień
          </Button>
        </div>
      </aside>

      {/* ── Column 2: Places list ── */}
      <section className="max-w-xl overflow-y-auto">
        {/* Alert dla generated planu - zawsze pokazujemy */}
        {plan.id === "generated" && (
          <Alert variant="warning" className="mb-4" title="Niezapisany plan">
            Zapisz plan, aby móc do niego później wrócić.
          </Alert>
        )}
        {/* Alert dla zapisanego planu - tylko gdy są zmiany */}
        {plan.id !== "generated" && hasModifications && (
          <Alert variant="warning" className="mb-4" title="Niezapisane zmiany">
            Wprowadzono zmiany w planie. Zapisz zmiany, aby nie utracić
            modyfikacji.
          </Alert>
        )}
        <DayContainer
          day={selectedDay}
          onDetailsClick={handleDetailsClick}
          onRemovePlace={handleRemovePlace}
          onDeleteDay={
            editablePlan.days.length > 1
              ? () => handleDeleteDayRequest(selectedDayIndex)
              : undefined
          }
        />
      </section>

      {/* ── Column 3: Map ── */}
      <section className="flex flex-col flex-1 max-h-[calc(100vh-100px)] gap-8">
        {/* Przycisk zapisywania */}
        <div className="flex items-center justify-end">
          {onSavePlan && (
            <Button
              onClick={onSavePlan}
              disabled={plan.id !== "generated" && !hasModifications}
              className="flex items-center gap-1 text-sm"
            >
              {plan.id === "generated" ? "Zapisz plan" : "Zapisz zmiany"}
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-hidden relative rounded-xl border border-borderSecondary">
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

      {/* Dialog potwierdzenia usunięcia dnia */}
      <Popup
        open={isPopupOpen}
        onClose={handleCancelDeleteDay}
        onConfirm={handleConfirmDeleteDay}
        title="Usunąć dzień z planu?"
        description={`Czy na pewno chcesz usunąć Dzień ${dayToDeleteIndex !== null ? dayToDeleteIndex + 1 : ""} z planu? Tej operacji nie można cofnąć.`}
        confirmText="Usuń"
        cancelText="Anuluj"
        variant="destructive"
      />
    </div>
  );
}
