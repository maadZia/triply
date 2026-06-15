import type { Place } from "@/types/places";
import { allPlaces, getPlacesByCity } from "@/mock/places";

function compareByPopularity(a: Place, b: Place): number {
  if (b.rating.score !== a.rating.score) {
    return b.rating.score - a.rating.score;
  }
  return b.rating.reviews - a.rating.reviews;
}

export function getSuggestedPlaces(city?: string, limit = 3): Place[] {
  const pool = city ? getPlacesByCity(city) : allPlaces;
  return [...pool].sort(compareByPopularity).slice(0, limit);
}
