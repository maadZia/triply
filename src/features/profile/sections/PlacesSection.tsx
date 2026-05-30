import { ExpandableCard } from "@/components/cards/ExpandableCard/ExpandableCard";
import { PlaceCardVertical } from "@/components/cards/PlaceCard/PlaceCardVertical";
import { HeartButton } from "@/components/atoms/icons/HeartButton";
import { Button } from "@/components/atoms/Button";

// Mock data
const PLACES = [
  {
    city: "Paryż",
    defaultOpen: true,
    attractions: [
      {
        id: "paris-1",
        title: "Wieża Eiffla",
        description:
          "Ikoniczny metalowy wieżowiec na Champ de Mars – symbol Paryża i całej Francji.",
        img: "/eifell.jpeg",
      },
      {
        id: "paris-2",
        title: "Luwr",
        description:
          "Największe muzeum sztuki na świecie, dom Mony Lisy i tysięcy innych arcydzieł.",
        img: "/louvre.jpg",
      },
      {
        id: "paris-3",
        title: "Katedra Notre-Dame",
        description:
          "Zabytkowa katedra gotycka, jedna z najbardziej znanych świątyń na świecie.",
        img: "/notre.jpg",
      },
      {
        id: "paris-4",
        title: "Pola Elizejskie",
        description:
          "Słynna paryska aleja pełna luksusowych sklepów, kawiarni i teatrów, łącząca Plac Zgody z Łukiem Triumfalnym.",
        img: "/pola_elizejskie.jpg",
      },
      {
        id: "paris-5",
        title: "Bazylika Sacré-Cœur",
        description:
          "Biała bazylika na szczycie wzgórza Montmartre, skąd roztacza się zapierający dech w piersiach widok na cały Paryż.",
        img: "/sacre-couer.jpg",
      },
      {
        id: "paris-4",
        title: "Montmartre",
        description:
          "Historyczna dzielnica artystów, pełna wąskich brukowanych uliczek, urokliwych kawiarni i malarzy ulicznych.",
        img: "/montmare.jpeg",
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
        img: "/wawel.png",
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
