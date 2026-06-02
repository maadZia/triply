import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlanCard } from "@/features/profile/sections/PlansSection/PlanCard";

const PLANS = [
  {
    city: "Paryż",
    defaultOpen: true,
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
    trips: [],
  },
  {
    city: "Rzym",
    defaultOpen: false,
    trips: [],
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
