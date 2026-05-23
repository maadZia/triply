import { useState } from "react";

import { FilterCard } from "@/features/home/components/FilterCard";
import { H2 } from "@/components/typography/Heading";
import { PlaceCardHorizontal } from "@/components/cards/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/atoms/Button";
import { HeartButton, BookmarkButton } from "@/components/atoms/icons";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@/components/overlays/Dialog";

type Place = {
  title: string;
  description: string;
  img: string;
};

export default function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const places: Place[] = [
    {
      title: "Zamek królewski na Wawelu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: "./wawel.png",
    },
    {
      title: "Rynek Główny",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "./wawel.png",
    },
    {
      title: "Kazimierz",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      img: "./wawel.png",
    },
  ];

  return (
    <>
      <main className="flex gap-8">
        <FilterCard />

        <div className="flex w-2/5 flex-col items-center gap-6">
          <H2 className="w-full text-left">Podpowiedzi</H2>

          <div className="w-full space-y-4">
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

          <Button outline to="/explore">
            Przeglądaj więcej miejsc
          </Button>
        </div>
      </main>

      {/* MODAL */}
      <Dialog open={!!selectedPlace} onClose={() => setSelectedPlace(null)}>
        <DialogPanel className="max-w-2xl p-0 overflow-hidden">
          {selectedPlace && (
            <>
              <img
                src={selectedPlace.img}
                alt={selectedPlace.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <DialogTitle>{selectedPlace.title}</DialogTitle>

                <DialogDescription>
                  {selectedPlace.description}
                </DialogDescription>

                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedPlace(null)}>
                    Zamknij
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogPanel>
      </Dialog>
    </>
  );
}
