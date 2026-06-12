import { lazy, Suspense, useState, useEffect } from "react";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/design-system/atoms/Button";
import { PlaceDetailsDialog, type Place } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";

const Map = lazy(() =>
  import("@/components/design-system/atoms/Map").then((module) => ({
    default: module.Map,
  })),
);

const INITIAL_PLACES: Place[] = [
  {
    title: "Zamek Królewski na Wawelu",
    description:
      "Zamek na Wawelu to jeden z najważniejszych zabytków Polski. Jego historia sięga XIII wieku, kiedy to stał się rezydencją książąt krakowskich. W XVI wieku Zygmunt III Waza przenosi tu swoją siedzibę z Wilna. Dziś Zamek przyciąga turystów z całego świata zabytkową architekturą i bogatą kolekcją sztuki.",
    img: "./places/cracow/wawel-1.png",
    images: [
      "./places/cracow/wawel-1.png",
      "./places/cracow/wawel-2.png",
      "./places/cracow/wawel-3.png",
      "./places/cracow/wawel-4.png",
      "./places/cracow/wawel-5.png",
    ],
    category: "ZABYTKI",
    rating: { score: 4.9, reviews: 2450 },
    hours: "9:00 - 17:00",
    location: "Wawel 5, 31-001 Kraków",
    price: { normal: 30, reduced: 20, currency: "PLN" },
  },
  {
    title: "Rynek Główny",
    description:
      "Rynek Główny w Krakowie to jedno z największych i najpiękniejszych miast w Europie. W jego centrum znajduje się wspaniały Sukiennice z XVI wieku. Otoczony zabytkową zabudową, stanowi serce starego miasta i jest wpisany na listę światowego dziedzictwa UNESCO.",
    img: "./places/cracow/wawel-1.png",
    images: [
      "./places/cracow/wawel-1.png",
      "./places/cracow/wawel-1.png",
      "./places/cracow/wawel-1.png",
    ],
    category: "OBIEKTY ZABYTKOWE",
    rating: { score: 4.8, reviews: 3120 },
    hours: "10:00 - 22:00",
    location: "Rynek Główny 1, 31-042 Kraków",
    price: { normal: 0, reduced: 0, currency: "PLN" },
  },
];

const MAP_MARKERS = [
  {
    id: 1,
    lat: 50.0541,
    lng: 19.9352,
    label: "Zamek Królewski na Wawelu",
  },
];

export default function SchedulePage() {
  const [days, setDays] = useState<TripDay[]>(() => {
    if (typeof window !== "undefined") {
      const savedDays = localStorage.getItem("trip_schedule_days");
      if (savedDays) {
        try {
          return JSON.parse(savedDays);
        } catch (e) {
          console.error("Błąd parsowania danych z localStorage", e);
        }
      }
    }
    return [
      { id: 1, label: "Dzień 1", date: "pon, 2 cze", places: [...INITIAL_PLACES] },
      { id: 2, label: "Dzień 2", date: "wt, 3 cze", places: [] },
      { id: 3, label: "Dzień 3", date: "śr, 4 cze", places: [] },
      { id: 4, label: "Dzień 4", date: "czw, 5 cze", places: [] },
    ];
  });

  const [selectedDayId, setSelectedDayId] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedId = localStorage.getItem("trip_schedule_selected_day");
      if (savedId) return Number(savedId);
    }
    return days[0]?.id || 1;
  });

  const [selectedPlace, setSelectedPlace] = useState<Place>();
  useEffect(() => {
    localStorage.setItem("trip_schedule_days", JSON.stringify(days));
  }, [days]);

  useEffect(() => {
    localStorage.setItem("trip_schedule_selected_day", selectedDayId.toString());
  }, [selectedDayId]);

  const currentDay = days.find((d) => d.id === selectedDayId) || days[0];

  const handleAddDay = () => {
    const nextId = days.length > 0 ? Math.max(...days.map((d) => d.id)) + 1 : 1;
    const newDayNumber = days.length + 1;

    const newDay: TripDay = {
      id: nextId,
      label: `Dzień ${newDayNumber}`,
      date: "Planowany",
      places: [],
    };

    setDays([...days, newDay]);
    setSelectedDayId(nextId);
  };

  const handleRemoveDay = () => {
    if (days.length <= 1) return;

    const remainingDays = days.filter((d) => d.id !== selectedDayId);
    const updatedDays = remainingDays.map((day, index) => ({
      ...day,
      label: `Dzień ${index + 1}`,
    }));

    setDays(updatedDays);

    const currentIndex = days.findIndex((d) => d.id === selectedDayId);
    const fallbackIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setSelectedDayId(updatedDays[fallbackIndex]?.id || updatedDays[0].id);
  };

  const handleRemovePlace = (placeIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id !== selectedDayId) return day;
        const updatedPlaces = [...day.places];
        updatedPlaces.splice(placeIndex, 1);
        return { ...day, places: updatedPlaces };
      })
    );
  };

  const handleMovePlace = (index: number, direction: "up" | "down") => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id !== selectedDayId) return day;

        const updatedPlaces = [...day.places];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= updatedPlaces.length) return day;

        const temp = updatedPlaces[index];
        updatedPlaces[index] = updatedPlaces[targetIndex];
        updatedPlaces[targetIndex] = temp;

        return { ...day, places: updatedPlaces };
      })
    );
  };

  return (
    <div className="flex min-h-[80vh] overflow-hidden">
      <aside className="w-46 shrink-0 border-r border-gray-200 flex-col justify-between">
        <div className="overflow-y-auto flex-2">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Dni podróży
            </h2>
          </div>

          <ul className="p-2 space-y-1">
            {days.map((day) => {
              const isSelected = day.id === selectedDayId;
              return (
                <li key={day.id} className="flex">
                  <Button
                    className="w-full rounded-lg flex-col items-start px-3 py-3 gap-0"
                    {...(isSelected ? {} : { plain: true })}
                    onClick={() => setSelectedDayId(day.id)}
                  >
                    <span className="text-sm font-semibold">{day.label}</span>
                    <span className="text-xs mt-0.5 opacity-70">{day.date}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
          <Button
            outline
            className="w-full text-xs py-2"
            onClick={handleAddDay}
          >
            Dodaj
          </Button>
          <Button
            plain
            className="w-full text-xs py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg"
            onClick={handleRemoveDay}
            disabled={days.length <= 1}
          >
            Usuń
          </Button>
        </div>
      </aside>

      <section className="flex-1 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-base font-semibold text-gray-900">Harmonogram</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {currentDay?.label} {currentDay?.date ? `— ${currentDay.date}` : ""}
          </p>
        </div>

        <div className="p-3 space-y-3">
          {currentDay?.places.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">
              Brak zaplanowanych miejsc na ten dzień.
            </div>
          ) : (
            currentDay?.places.map((place, index) => (
              <PlaceCardHorizontal
                key={`${selectedDayId}-${index}`}
                title={place.title}
                description={place.description}
                img={place.img}
                actionButtons={
                  <div className="flex items-center gap-1">
                    <Button
                      plain
                      disabled={index === 0}
                      onClick={() => handleMovePlace(index, "up")}
                      className="p-1.5 min-w-0 text-gray-500 disabled:opacity-30"
                      title="Przesuń w górę"
                    >
                      ▲
                    </Button>
                    <Button
                      plain
                      disabled={index === currentDay.places.length - 1}
                      onClick={() => handleMovePlace(index, "down")}
                      className="p-1.5 min-w-0 text-gray-500 disabled:opacity-30"
                      title="Przesuń w dół"
                    >
                      ▼
                    </Button>
                    <Button
                      plain
                      onClick={() => handleRemovePlace(index)}
                      className="p-1.5 min-w-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Usuń z planu"
                    >
                      ✕
                    </Button>
                  </div>
                }
                onDetailsClick={() => setSelectedPlace(place)}
              />
            ))
          )}
        </div>
      </section>

      <section className="flex-1 max-h-[calc(100%-30px)] overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              Ładowanie mapy...
            </div>
          }
        >
          <div className={`h-full ${selectedPlace ? "hidden" : "block"}`}>
            <Map
              center={[MAP_MARKERS[0].lat, MAP_MARKERS[0].lng]}
              zoom={14}
              markers={MAP_MARKERS}
            />
          </div>
        </Suspense>
      </section>
      <PlaceDetailsDialog
        place={selectedPlace ?? undefined}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
        showActions={false}
      />
    </div>
  );
}
