import { lazy, Suspense, useState } from "react";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/design-system/atoms/Button";
import { PlaceDetailsDialog, type Place } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import {
  HeartButton,
  BookmarkButton,
} from "@/components/design-system/atoms/icons";

const Map = lazy(() =>
  import("@/components/design-system/atoms/Map").then((module) => ({
    default: module.Map,
  })),
);

const DAYS = [
  { id: 1, label: "Dzień 1", date: "pon, 2 cze" },
  { id: 2, label: "Dzień 2", date: "wt, 3 cze" },
  { id: 3, label: "Dzień 3", date: "śr, 4 cze" },
  { id: 4, label: "Dzień 4", date: "czw, 5 cze" },
];

const SELECTED_DAY = 1;

const MAP_MARKERS = [
  {
    id: 1,
    lat: 50.0541,
    lng: 19.9352,
    label: "Zamek Królewski na Wawelu",
  },
];

export default function SchedulePage() {
  const places: Place[] = [
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
      rating: {
        score: 4.9,
        reviews: 2450,
      },
      hours: "9:00 - 17:00",
      location: "Wawel 5, 31-001 Kraków",
      price: {
        normal: 30,
        reduced: 20,
        currency: "PLN",
      },
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
      rating: {
        score: 4.8,
        reviews: 3120,
      },
      hours: "10:00 - 22:00",
      location: "Rynek Główny 1, 31-042 Kraków",
      price: {
        normal: 0,
        reduced: 0,
        currency: "PLN",
      },
    },
    {
      title: "Kazimierz",
      description:
        "Historyczna dzielnica Kazimierz przyciąga artystów, turystów i miłośników kultury. To miejsce pełne galerii, kawiarenek i restauracji, gdzie historia żydowska przeplatana jest współczesną sztuką. Bożnice, synagogi i stare domy tworzą wyjątkową atmosferę.",
      img: "./places/cracow/wawel-1.png",
      images: ["./places/cracow/wawel-1.png", "./places/cracow/wawel-1.png"],
      category: "DZIELNICE",
      rating: {
        score: 4.6,
        reviews: 1890,
      },
      hours: "Całą dobę otwarte",
      location: "Kazimierz, Kraków",
      price: {
        normal: 0,
        reduced: 0,
        currency: "PLN",
      },
    },
  ];

  const [selectedPlace, setSelectedPlace] = useState<Place>();
  return (
    <div className="flex min-h-[80vh] overflow-hidden">
      {/* ── Column 1: Day picker ── */}
      <aside className="w-40 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Dni podróży
          </h2>
        </div>

        <ul className="p-2 space-y-1">
          {DAYS.map((day) => {
            const isSelected = day.id === SELECTED_DAY;
            return (
              <li key={day.id} className="flex">
                <Button
                  className="w-full rounded-lg flex-col items-start px-3 py-3 gap-0"
                  {...(isSelected ? {} : { plain: true })}
                >
                  <span className="text-sm font-semibold">{day.label}</span>
                  <span className="text-xs mt-0.5 opacity-70">{day.date}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ── Column 2: Places list ── */}
      <section className="flex-1 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-base font-semibold text-gray-900">Harmonogram</h1>
          <p className="text-xs text-gray-400 mt-0.5">Dzień 1 - pon, 2 cze</p>
        </div>

        <div className="p-3 space-y-3">
          {places.map((place, index) => (
            <PlaceCardHorizontal
              key={index}
              title={place.title}
              description={place.description}
              img={place.img}
              actionButtons={
                <>
                  <HeartButton defaultLiked={false} />
                  <BookmarkButton defaultLiked={false} />
                </>
              }
              onDetailsClick={() => setSelectedPlace(place)}
            />
          ))}
        </div>
      </section>

      {/* ── Column 3: Map ── */}
      <section className="flex-1 max-h-[calc(100%-30px)] overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              Ładowanie mapy…
            </div>
          }
        >
          <div className={`h-full ${selectedPlace ? 'hidden' : 'block'}`}>
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
