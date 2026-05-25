import { lazy, Suspense } from "react";
import { PlaceCardHorizontal } from "@/components/cards/PlaceCard/PlaceCardHorizontal";
import { ArrowsUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline"; // FIXME
import { Button } from "@/components/atoms/Button";

const Map = lazy(() => import("@/components/atoms/Map/Map").then(module => ({ default: module.Map })));

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
  return (
    <div className="flex h-full overflow-hidden">
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
          <PlaceCardHorizontal
            title="Zamek królewski na Wawelu"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="./wawel.png"
            actionButtons={
              <>
                <ArrowsUpDownIcon className="w-5 h-5" />
                <XMarkIcon className="w-5 h-5" />
              </>
            }
          />
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
          <Map
            center={[MAP_MARKERS[0].lat, MAP_MARKERS[0].lng]}
            zoom={14}
            markers={MAP_MARKERS}
          />
        </Suspense>
      </section>
    </div>
  );
}
