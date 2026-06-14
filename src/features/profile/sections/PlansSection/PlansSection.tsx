import { useState, useMemo } from "react";
import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlanCard } from "@/features/profile/sections/PlansSection/PlanCard";
import { getMockPlansForUser } from "@/mock/plans";
import {
  INTEREST_CATEGORY_LABELS,
  type INTEREST_CATEGORY,
} from "@/types/places";

type Trip = {
  id: string;
  planId: string;
  title: string;
  days: string;
  tags: string;
  img: string;
};

type Group = { city: string; defaultOpen: boolean; trips: Trip[] };

function getPlanTitle(planName: string | undefined): string {
  return planName || "Plan bez nazwy";
}

function generateTags(plan: {
  filters: { categories: INTEREST_CATEGORY[] };
}): string {
  const categories = plan.filters.categories;
  if (categories.length === 0) return "Zwiedzanie";
  return categories
    .slice(0, 3)
    .map((c) => INTEREST_CATEGORY_LABELS[c] || c)
    .join(", ");
}

export function PlansSection() {
  const mockPlans = useMemo(() => getMockPlansForUser(), []);

  const initialGroups = useMemo<Group[]>(() => {
    const plansByCity = new Map<string, typeof mockPlans>();

    mockPlans.forEach((plan) => {
      const cityPlans = plansByCity.get(plan.city) || [];
      cityPlans.push(plan);
      plansByCity.set(plan.city, cityPlans);
    });

    return Array.from(plansByCity.entries()).map(([city, plans]) => ({
      city,
      defaultOpen: false,
      trips: plans.map((plan) => {
        const firstDay = plan.days[0];
        const firstPlace = firstDay?.places[0];
        const img = firstPlace?.mainImage || "/places/default.jpg";

        return {
          id: plan.id,
          planId: plan.id,
          title: getPlanTitle(plan.name),
          days: `${plan.stats.totalDays} ${plan.stats.totalDays === 1 ? "dzień" : plan.stats.totalDays < 5 ? "dni" : "dni"}`,
          tags: generateTags(plan),
          img,
        };
      }),
    }));
  }, [mockPlans]);

  const [groups, setGroups] = useState<Group[]>(initialGroups);

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
