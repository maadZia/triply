import { PlaceCardHorizontal } from "@/components/cards/PlaceCard/PlaceCardHorizontal";
import { ArrowsUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SchedulePage() {
  return (
    <main className="space-y-4">
      <h1>Harmonogram</h1>

      <div className="w-lg">
        {/* place card example usage */}
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
    </main>
  );
}
