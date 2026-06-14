import { useState } from "react";
import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlaceCardVertical } from "@/components/shared/PlaceCard/PlaceCardVertical";
import { HeartButton } from "@/components/design-system/atoms/icons/HeartButton";

// Mock data — resets on page reload
const INITIAL_PLACES = [
  {
    city: "Paryż",
    defaultOpen: false,
    attractions: [
      {
        id: "paris-1",
        title: "Wieża Eiffla",
        description:
          "Ikoniczny metalowy wieżowiec na Champ de Mars – symbol Paryża i całej Francji.",
        img: "/eifell.jpeg",
        rating: { score: 4.7, reviews: 45230 },
      },
      {
        id: "paris-2",
        title: "Luwr",
        description:
          "Największe muzeum sztuki na świecie, dom Mony Lisy i tysięcy innych arcydzieł.",
        img: "places/paris/louvre.jpg",
        rating: { score: 4.8, reviews: 38290 },
      },
      {
        id: "paris-3",
        title: "Katedra Notre-Dame",
        description:
          "Zabytkowa katedra gotycka, jedna z najbardziej znanych świątyń na świecie.",
        img: "places/paris/notre.jpg",
        rating: { score: 4.7, reviews: 28450 },
      },
      {
        id: "paris-4",
        title: "Pola Elizejskie",
        description:
          "Słynna paryska aleja pełna luksusowych sklepów, kawiarni i teatrów, łącząca Plac Zgody z Łukiem Triumfalnym.",
        img: "places/paris/pola_elizejskie.jpg",
        rating: { score: 4.6, reviews: 32180 },
      },
      {
        id: "paris-5",
        title: "Bazylika Sacré-Cœur",
        description:
          "Biała bazylika na szczycie wzgórza Montmartre, skąd roztacza się zapierający dech w piersiach widok na cały Paryż.",
        img: "places/paris/sacre-couer.jpg",
        rating: { score: 4.7, reviews: 29860 },
      },
      {
        id: "paris-6",
        title: "Montmartre",
        description:
          "Historyczna dzielnica artystów, pełna wąskich brukowanych uliczek, urokliwych kawiarni i malarzy ulicznych.",
        img: "places/paris/montmare.jpeg",
        rating: { score: 4.8, reviews: 15640 },
      },
    ],
  },
  {
    city: "Kraków",
    defaultOpen: false,
    attractions: [
      {
        id: "krakow-1",
        title: "Zamek Królewski na Wawelu",
        description:
          "Jeden z najważniejszych zabytków Polski, będący przez stulecia siedzibą królów.",
        img: "places/cracow/wawel-4.png",
        rating: { score: 4.9, reviews: 12540 },
      },
    ],
  },
];

type Attraction = (typeof INITIAL_PLACES)[number]["attractions"][number];
type Group = { city: string; defaultOpen: boolean; attractions: Attraction[] };

export function PlacesSection() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_PLACES);

  const handleUnheart = (city: string, attractionId: string) => {
    setGroups((prev) =>
      prev
        .map((group) => {
          if (group.city !== city) return group;
          return {
            ...group,
            attractions: group.attractions.filter((a) => a.id !== attractionId),
          };
        })
        .filter((group) => group.attractions.length > 0),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <ExpandableCard
          key={group.city}
          title={group.city}
          defaultOpen={group.defaultOpen}
        >
          <div className="flex flex-wrap gap-4">
            {group.attractions.map((place) => (
              <div key={place.id} className="w-60 shrink-0">
                <PlaceCardVertical
                  title={place.title}
                  description={place.description}
                  img={place.img}
                  rating={place.rating}
                  actionButtons={
                    <HeartButton
                      defaultLiked={true}
                      onToggle={(liked) => {
                        if (!liked) handleUnheart(group.city, place.id);
                      }}
                    />
                  }
                />
              </div>
            ))}
          </div>
        </ExpandableCard>
      ))}
    </div>
  );
}
