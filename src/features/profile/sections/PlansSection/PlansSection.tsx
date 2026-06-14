import { useState } from "react";
import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlanCard } from "@/features/profile/sections/PlansSection/PlanCard";

// Mock data — resets on page reload. London and Rome removed (empty).
// planId maps each trip to its GeneratedPlan in mock/plans.ts → /schedule/:planId
const INITIAL_PLANS = [
  {
    city: "Paryż",
    defaultOpen: false,
    trips: [
      {
        id: "paris-1",
        planId: "mock-paris-001",
        title: "Weekend w Paryżu",
        days: "3 dni",
        tags: "Relaks i sztuka",
        img: "/places/paris/eiffel/eiffel-2.jpeg",
      },
      {
        id: "paris-2",
        planId: "mock-paris-002",
        title: "Śladami sztuki",
        days: "5 dni",
        tags: "Luwr, d'Orsay, Montmartre",
        img: "/places/paris/montmare/montmare-1.jpeg",
      },
    ],
  },
  {
    city: "Kraków",
    defaultOpen: false,
    trips: [
      {
        id: "krakow-1",
        planId: "mock-krakow-001",
        title: "Królewskie Miasto",
        days: "2 dni",
        tags: "Wawel, Rynek, Kazimierz",
        img: "/places/cracow/wawel/wawel-1.png",
      },
      {
        id: "krakow-2",
        planId: "mock-krakow-002",
        title: "Smak Krakowa",
        days: "3 dni",
        tags: "Kuchnia, historia, kultura",
        img: "/places/cracow/rynek/rynek-1.jpg",
      },
    ],
  },
];

type Trip = (typeof INITIAL_PLANS)[number]["trips"][number];
type Group = { city: string; defaultOpen: boolean; trips: Trip[] };

export function PlansSection() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_PLANS);

  const handleDelete = (city: string, tripId: string) => {
    setGroups((prev) =>
      prev
        .map((group) => {
          if (group.city !== city) return group;
          return {
            ...group,
            trips: group.trips.filter((t) => t.id !== tripId),
          };
        })
        // Remove groups that have no trips left
        .filter((group) => group.trips.length > 0),
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
            {group.trips.map((trip) => (
              <PlanCard
                key={trip.id}
                title={trip.title}
                days={trip.days}
                tags={trip.tags}
                img={trip.img}
                to={`/schedule/${trip.planId}`}
                onDelete={() => handleDelete(group.city, trip.id)}
              />
            ))}
          </div>
        </ExpandableCard>
      ))}
    </div>
  );
}
