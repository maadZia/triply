import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlanCard } from "@/features/profile/sections/PlansSection/PlanCard";

const PLANS = [
  {
    city: "Paryż",
    defaultOpen: false,
    trips: [
      {
        id: "paris-1",
        title: "Weekend w Paryżu",
        days: "3 dni",
        tags: "Relaks i sztuka",
        img: "/places/paris/paris1.jpeg",
      },
      {
        id: "paris-2",
        title: "Śladami sztuki",
        days: "5 dni",
        tags: "Luwr, d'Orsay, Montmartre",
        img: "/places/paris/paris2.jpeg",
      },
    ],
  },
  {
    city: "Londyn",
    defaultOpen: false,
    trips: [
      {
        id: "london-1",
        title: "Klasyczny Londyn",
        days: "4 dni",
        tags: "Big Ben, Tower Bridge, Pałac",
        img: "/places/london/bigben.jpg",
      },
      {
        id: "london-2",
        title: "Muzea i galerie",
        days: "3 dni",
        tags: "British Museum, National Gallery",
        img: "/places/london/museum.jpg",
      },
    ],
  },
  {
    city: "Rzym",
    defaultOpen: false,
    trips: [
      {
        id: "rome-1",
        title: "Antyczne cuda",
        days: "5 dni",
        tags: "Koloseum, Forum, Panteon",
        img: "/places/rome/colosseum.jpg",
      },
    ],
  },
  {
    city: "Wenecja",
    defaultOpen: false,
    trips: [
      {
        id: "venice-1",
        title: "Magiczna Wenecja",
        days: "3 dni",
        tags: "Gondole, Plac św. Marka, Karnawal",
        img: "/places/venice/mark.jpg",
      },
    ],
  },
];

export function PlansSection() {
  return (
    <div className="flex flex-col gap-4">
      {PLANS.map((group) => (
        <ExpandableCard
          key={group.city}
          title={group.city}
          defaultOpen={group.defaultOpen}
        >
          {group.trips.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {group.trips.map((trip) => (
                <PlanCard
                  key={trip.id}
                  title={trip.title}
                  days={trip.days}
                  tags={trip.tags}
                  img={trip.img}
                  //to={} // add link to redirect on viewing a plan when it's implemented
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-contentSecondary">
              Brak zapisanych planów dla tego miejsca.
            </p>
          )}
        </ExpandableCard>
      ))}
    </div>
  );
}
