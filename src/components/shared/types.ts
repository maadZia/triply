import { type Place } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";

export interface TripDay {
  id: number;
  label: string;
  date: string;
  places: Place[];
}