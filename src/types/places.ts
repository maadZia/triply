export enum PLACE_TYPE {
  OUTDOOR = "na zewnątrz",
  INDOOR = "wewnątrz",
}

export enum CROWD_LEVEL {
  QUIET = "spokojne",
  MODERATE = "umiarkowane",
  BUSY = "bardzo zatłoczone",
}

export enum TRAVEL_STYLE {
  RELAXED = "spokojny",
  INTENSIVE = "intensywny",
}

export enum INTEREST_CATEGORY {
  HISTORY = "historia",
  ART = "sztuka",
  NATURE = "natura",
  ARCHITECTURE = "architektura",
  ENTERTAINMENT = "rozrywka",
}

export enum TARGET_GROUP {
  STUDENTS = "studenci",
  FAMILIES = "rodziny z dziećmi",
  COUPLES = "pary",
  SENIORS = "seniorzy",
}

export enum FOOD_TYPE {
  NONE = "brak",
  CAFE = "kawiarnia",
  RESTAURANT = "restauracja",
  BAR = "bar",
  STREET_FOOD = "street food",
}

export enum CUISINE_TYPE {
  NONE = "brak",
  LOCAL = "kuchnia lokalna",
  ITALIAN = "włoska",
  ASIAN = "azjatycka",
  FAST_FOOD = "fast food",
  INTERNATIONAL = "międzynarodowa",
}

export enum PRICE_CATEGORY {
  FREE = "darmowe",
  CHEAP = "tanie",
  MODERATE = "średnie",
  EXPENSIVE = "droższe",
}

export interface Location {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  alwaysOpen?: boolean;
}

export interface TicketPrice {
  normal: number;
  reduced?: number;
  currency: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  images: string[];
  mainImage: string;
  rating: {
    score: number;
    reviews: number;
  };
  location: Location;
  price: TicketPrice;
  priceCategory: PRICE_CATEGORY;
  hours: OpeningHours;
  hoursSummary: string;

  // Filter properties
  type: PLACE_TYPE;
  crowdLevel: CROWD_LEVEL;
  style: TRAVEL_STYLE;
  categories: INTEREST_CATEGORY[];
  targetGroups: TARGET_GROUP[];
  food: {
    available: boolean;
    type?: FOOD_TYPE;
    cuisine?: CUISINE_TYPE;
  };

  // Additional metadata
  estimatedVisitTime?: number; // in minutes
  accessibility?: boolean;
  website?: string;
  phone?: string;
}

export interface FilterCriteria {
  city?: string;
  types?: PLACE_TYPE[];
  minRating?: number;
  maxRating?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  crowdLevels?: CROWD_LEVEL[];
  maxDistance?: number; // in km
  targetGroups?: TARGET_GROUP[];
  style?: TRAVEL_STYLE;
  categories?: INTEREST_CATEGORY[];
  foodAvailable?: boolean;
  foodTypes?: FOOD_TYPE[];
  cuisineTypes?: CUISINE_TYPE[];
}

export const CROWD_LEVEL_LABELS: Record<CROWD_LEVEL, string> = {
  [CROWD_LEVEL.QUIET]: "Spokojne",
  [CROWD_LEVEL.MODERATE]: "Umiarkowane",
  [CROWD_LEVEL.BUSY]: "Bardzo zatłoczone",
};

export const TRAVEL_STYLE_LABELS: Record<TRAVEL_STYLE, string> = {
  [TRAVEL_STYLE.INTENSIVE]: "Intensywny",
  [TRAVEL_STYLE.RELAXED]: "Spokojny",
};

export const INTEREST_CATEGORY_LABELS: Record<INTEREST_CATEGORY, string> = {
  [INTEREST_CATEGORY.HISTORY]: "Historia",
  [INTEREST_CATEGORY.ART]: "Sztuka",
  [INTEREST_CATEGORY.NATURE]: "Natura",
  [INTEREST_CATEGORY.ARCHITECTURE]: "Architektura",
  [INTEREST_CATEGORY.ENTERTAINMENT]: "Rozrywka",
};

export const TARGET_GROUP_LABELS: Record<TARGET_GROUP, string> = {
  [TARGET_GROUP.STUDENTS]: "Studenci",
  [TARGET_GROUP.FAMILIES]: "Rodziny z dziećmi",
  [TARGET_GROUP.COUPLES]: "Pary",
  [TARGET_GROUP.SENIORS]: "Seniorzy",
};

export const FOOD_TYPE_LABELS: Record<FOOD_TYPE, string> = {
  [FOOD_TYPE.NONE]: "Brak",
  [FOOD_TYPE.CAFE]: "Kawiarnia",
  [FOOD_TYPE.RESTAURANT]: "Restauracja",
  [FOOD_TYPE.BAR]: "Bar",
  [FOOD_TYPE.STREET_FOOD]: "Street food",
};

export const CUISINE_TYPE_LABELS: Record<CUISINE_TYPE, string> = {
  [CUISINE_TYPE.NONE]: "Brak",
  [CUISINE_TYPE.LOCAL]: "Kuchnia lokalna",
  [CUISINE_TYPE.ITALIAN]: "Włoska",
  [CUISINE_TYPE.ASIAN]: "Azjatycka",
  [CUISINE_TYPE.FAST_FOOD]: "Fast food",
  [CUISINE_TYPE.INTERNATIONAL]: "Międzynarodowa",
};

export const PLACE_TYPE_LABELS: Record<PLACE_TYPE, string> = {
  [PLACE_TYPE.OUTDOOR]: "Na zewnątrz",
  [PLACE_TYPE.INDOOR]: "Wewnątrz",
};

export const PRICE_CATEGORY_LABELS: Record<PRICE_CATEGORY, string> = {
  [PRICE_CATEGORY.FREE]: "Darmowe",
  [PRICE_CATEGORY.CHEAP]: "Tanie (do 30 zł)",
  [PRICE_CATEGORY.MODERATE]: "Średnie (30-100 zł)",
  [PRICE_CATEGORY.EXPENSIVE]: "Droższe (100+ zł)",
};
