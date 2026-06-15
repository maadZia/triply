import {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
  CROWD_LEVEL_LABELS,
  TRAVEL_STYLE_LABELS,
  INTEREST_CATEGORY_LABELS,
  TARGET_GROUP_LABELS,
  FOOD_TYPE_LABELS,
  CUISINE_TYPE_LABELS,
  PLACE_TYPE_LABELS,
} from "@/types/places";
import { getUniqueCities } from "@/mock/places";

const cities = getUniqueCities();

export const cityOptions = cities.map((c) => ({ value: c, label: c }));

export const interestOptions = Object.values(INTEREST_CATEGORY).map(
  (value) => ({
    value,
    label: INTEREST_CATEGORY_LABELS[value],
  }),
);

export const targetGroupOptions = Object.values(TARGET_GROUP).map((value) => ({
  value,
  label: TARGET_GROUP_LABELS[value],
}));

export const crowdOptions = Object.values(CROWD_LEVEL).map((value) => ({
  value,
  label: CROWD_LEVEL_LABELS[value],
}));

export const foodTypeOptions = Object.values(FOOD_TYPE)
  .filter((v) => v !== FOOD_TYPE.NONE)
  .map((value) => ({
    value,
    label: FOOD_TYPE_LABELS[value],
  }));

export const cuisineOptions = Object.values(CUISINE_TYPE)
  .filter((v) => v !== CUISINE_TYPE.NONE)
  .map((value) => ({
    value,
    label: CUISINE_TYPE_LABELS[value],
  }));

export const travelStyleOptions = Object.values(TRAVEL_STYLE).map((value) => ({
  value,
  label: TRAVEL_STYLE_LABELS[value],
}));

export const placeTypeOptions = [
  {
    value: PLACE_TYPE.OUTDOOR,
    label: PLACE_TYPE_LABELS[PLACE_TYPE.OUTDOOR],
  },
  {
    value: PLACE_TYPE.INDOOR,
    label: PLACE_TYPE_LABELS[PLACE_TYPE.INDOOR],
  },
];
