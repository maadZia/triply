import type { Place as MockPlace } from "@/types/places";
import type { Place as DialogPlace } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";

export type Attraction = DialogPlace & { id: string };

export function toDialogPlace(place: MockPlace): Attraction {
  return {
    id: place.id,
    title: place.name,
    description: place.description,
    img: place.mainImage,
    images: place.images,
    category: place.categories[0] ?? undefined,
    rating: place.rating,
    hours: place.hoursSummary,
    location: place.location.address,
    price: {
      normal: place.price.normal,
      reduced: place.price.reduced ?? 0,
      currency: place.price.currency,
    },
  };
}
