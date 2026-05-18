import { PlaceCardVertical } from "@/components/cards/PlaceCard/PlaceCardVertical";
import { Button } from "@/components/atoms/Button";
import { HeartButton } from "@/components/atoms/icons";

export default function ExplorePage() {
  return (
    <main className="space-y-4">
      <h1>Eksploruj</h1>

      <div className="w-md">
        <PlaceCardVertical
          title="Zamek królewski na Wawelu"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          img="./wawel.png"
          actionButtons={
            <>
              <Button className="mt-auto self-start px-0" plain>
                Pokaż szczegóły
              </Button>
              <HeartButton />
            </>
          }
        />
      </div>
    </main>
  );
}
