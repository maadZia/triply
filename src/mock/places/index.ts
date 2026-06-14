import { cracowPlaces } from "./cracow";
import { parisPlaces } from "./paris";
import type { Place, FilterCriteria } from "@/types/places";

export const allPlaces: Place[] = [...cracowPlaces, ...parisPlaces];

export function getPlacesByCity(city: string): Place[] {
  return allPlaces.filter(
    (place) => place.city.toLowerCase() === city.toLowerCase(),
  );
}

export function filterPlaces(criteria: FilterCriteria): Place[] {
  return allPlaces.filter((place) => {
    // Filter by city
    if (criteria.city && place.city !== criteria.city) {
      return false;
    }

    // Filter by types
    if (criteria.types && criteria.types.length > 0) {
      if (!criteria.types.includes(place.type)) {
        return false;
      }
    }

    // Filter by rating range
    if (criteria.minRating !== undefined) {
      if (place.rating.score < criteria.minRating) {
        return false;
      }
    }
    if (criteria.maxRating !== undefined) {
      if (place.rating.score > criteria.maxRating) {
        return false;
      }
    }

    // Filter by price range
    if (criteria.priceRange) {
      const price = place.price.normal;
      if (price < criteria.priceRange.min || price > criteria.priceRange.max) {
        return false;
      }
    }

    // Filter by crowd levels
    if (criteria.crowdLevels && criteria.crowdLevels.length > 0) {
      if (!criteria.crowdLevels.includes(place.crowdLevel)) {
        return false;
      }
    }

    // Filter by target groups
    if (criteria.targetGroups && criteria.targetGroups.length > 0) {
      const hasMatchingGroup = criteria.targetGroups.some((group) =>
        place.targetGroups.includes(group),
      );
      if (!hasMatchingGroup) {
        return false;
      }
    }

    // Filter by style
    if (criteria.style && place.style !== criteria.style) {
      return false;
    }

    // Filter by categories (interests)
    if (criteria.categories && criteria.categories.length > 0) {
      const hasMatchingCategory = criteria.categories.some((cat) =>
        place.categories.includes(cat),
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // Filter by food availability
    if (criteria.foodAvailable !== undefined) {
      if (place.food.available !== criteria.foodAvailable) {
        return false;
      }
    }

    // Filter by food types
    if (criteria.foodTypes && criteria.foodTypes.length > 0) {
      if (!place.food.type || !criteria.foodTypes.includes(place.food.type)) {
        return false;
      }
    }

    // Filter by cuisine types
    if (criteria.cuisineTypes && criteria.cuisineTypes.length > 0) {
      if (
        !place.food.cuisine ||
        !criteria.cuisineTypes.includes(place.food.cuisine)
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getUniqueCities(): string[] {
  return [...new Set(allPlaces.map((place) => place.city))];
}

export { cracowPlaces, parisPlaces };
export * from "@/types/places";
