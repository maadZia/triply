import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlaceCardVertical } from "@/components/shared/PlaceCard/PlaceCardVertical";
import { HeartButton } from "@/components/design-system/atoms/icons/HeartButton";
import { Button } from "@/components/design-system/atoms/Button";

// Mock data
const PLACES = [
  {
    city: "Paryż",
    defaultOpen: false,
    attractions: [
      {
        id: "paris-1",
        title: "Wieża Eiffla",
        description:
          "Ikoniczny metalowy wieżowiec na Champ de Mars – symbol Paryża i całej Francji.",
        img: "places/paris/eifell.jpeg",
      },
      {
        id: "paris-2",
        title: "Luwr",
        description:
          "Największe muzeum sztuki na świecie, dom Mony Lisy i tysięcy innych arcydzieł.",
        img: "places/paris/louvre.jpg",
      },
      {
        id: "paris-3",
        title: "Katedra Notre-Dame",
        description:
          "Zabytkowa katedra gotycka, jedna z najbardziej znanych świątyń na świecie.",
        img: "places/paris/notre.jpg",
      },
      {
        id: "paris-4",
        title: "Pola Elizejskie",
        description:
          "Słynna paryska aleja pełna luksusowych sklepów, kawiarni i teatrów, łącząca Plac Zgody z Łukiem Triumfalnym.",
        img: "places/paris/pola_elizejskie.jpg",
      },
      {
        id: "paris-5",
        title: "Bazylika Sacré-Cœur",
        description:
          "Biała bazylika na szczycie wzgórza Montmartre, skąd roztacza się zapierający dech w piersiach widok na cały Paryż.",
        img: "places/paris/sacre-couer.jpg",
      },
      {
        id: "paris-4",
        title: "Montmartre",
        description:
          "Historyczna dzielnica artystów, pełna wąskich brukowanych uliczek, urokliwych kawiarni i malarzy ulicznych.",
        img: "places/paris/montmare.jpeg",
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
      },
    ],
  },
];

export function PlacesSection() {
  return (
    <div className="flex flex-col gap-4">
      {PLACES.map((group) => (
        <ExpandableCard
          key={group.city}
          title={group.city}
          defaultOpen={group.defaultOpen}
        >
          {group.attractions.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {group.attractions.map((place) => (
                <PlaceCardVertical
                  key={place.id}
                  title={place.title}
                  description={place.description}
                  img={place.img}
                  actionButtons={
                    <>
                      <Button className="mt-auto self-start px-0" plain>
                        Pokaż szczegóły
                      </Button>
                      <HeartButton defaultLiked={true} />
                    </>
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-contentSecondary">
              Brak zapisanych miejsc dla tego miasta.
            </p>
          )}
        </ExpandableCard>
      ))}
    </div>
  );
}
