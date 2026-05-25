import { useState } from "react";

import { FilterCard } from "@/features/home/components/FilterCard";
import { H2 } from "@/components/design-system/typography/Heading";
import { PlaceCardHorizontal } from "@/components/shared/PlaceCard/PlaceCardHorizontal";
import { Button } from "@/components/design-system/atoms/Button";
import {
  HeartButton,
  BookmarkButton,
} from "@/components/design-system/atoms/icons";

import {
  PlaceDetailsDialog,
  type Place,
} from "@/components/shared/PlaceDetailsDialog";

export default function HomePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  const places: Place[] = [
    {
      title: "Zamek Królewski na Wawelu",
      description:
        "Zamek na Wawelu to jeden z najważniejszych zabytków Polski. Jego historia sięga XIII wieku, kiedy to stał się rezydencją książąt krakowskich. W XVI wieku Zygmunt III Waza przenosi tu swoją siedzibę z Wilna. Dziś Zamek przyciąga turystów z całego świata zabytkową architekturą i bogatą kolekcją sztuki.",
      img: "./places/wawel-1.png",
      images: [
        "./places/wawel-1.png",
        "./places/wawel-2.png",
        "./places/wawel-3.png",
        "./places/wawel-4.png",
        "./places/wawel-5.png",
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
      img: "./places/wawel-1.png",
      images: [
        "./places/wawel-1.png",
        "./places/wawel-1.png",
        "./places/wawel-1.png",
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
      img: "./places/wawel-1.png",
      images: ["./places/wawel-1.png", "./places/wawel-1.png"],
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

      <PlaceDetailsDialog
        place={selectedPlace ?? undefined}
        open={!!selectedPlace}
        onClose={() => setSelectedPlace(undefined)}
      />
    </>
  );
}
