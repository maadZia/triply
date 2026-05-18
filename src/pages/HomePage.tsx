import { FilterCard } from "@/frontend/Home/FilterCard";
import { H2 } from "@/components/typography/Heading";
import { PlaceCardHorizontal } from "@/components/cards/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/atoms/Button";

export default function HomePage() {
  return (
    <main className="flex gap-8">
      <FilterCard />

      <div className="w-2/5 flex flex-col gap-6 items-center">
        <H2 className="w-full text-left">Podpowiedzi</H2>

        <div className="space-y-4">
          {new Array(3).fill(0).map((_, index) => (
            <PlaceCardHorizontal
              key={index}
              title="Zamek królewski na Wawelu"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              img="./wawel.png"
            />
          ))}
        </div>

        <Button outline to={"/explore"}>
          Przeglądaj więcej miejsc
        </Button>
      </div>
    </main>
  );
}
