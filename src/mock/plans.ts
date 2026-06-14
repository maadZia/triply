import type { GeneratedPlan, PlanPlace } from "@/types/plan";
import {
  TRAVEL_STYLE,
  PLACE_TYPE,
  CROWD_LEVEL,
  INTEREST_CATEGORY,
  TARGET_GROUP,
} from "@/types/places";

import { allPlaces } from "@/mock/places";

function toPlanPlace(
  id: string,
  estimatedVisitTimeOverride?: number,
): PlanPlace {
  const realPlace = allPlaces.find((p) => p.id === id);
  if (!realPlace) {
    throw new Error(`Place ${id} not found in allPlaces!`);
  }
  return {
    id: realPlace.id,
    name: realPlace.name,
    description: realPlace.description,
    mainImage: realPlace.mainImage,
    rating: realPlace.rating,
    location: {
      address: realPlace.location.address,
      lat: realPlace.location.coordinates?.lat ?? 0,
      lng: realPlace.location.coordinates?.lng ?? 0,
    },
    price: {
      normal: realPlace.price.normal,
      currency: realPlace.price.currency,
    },
    estimatedVisitTime:
      estimatedVisitTimeOverride ?? realPlace.estimatedVisitTime ?? 120,
    type: realPlace.type,
    categories: realPlace.categories,
  };
}

const mockKrakowPlan: GeneratedPlan = {
  id: "mock-krakow-001",
  city: "Kraków",
  days: [
    {
      day: 1,
      date: "2024-06-15",
      places: [
        toPlanPlace("krk-001", 180),
        toPlanPlace("krk-002", 120),
        toPlanPlace("krk-009", 45),
      ],
      stats: {
        totalPlaces: 3,
        totalTime: 345,
        totalPrice: 45,
        centerPoint: { lat: 50.059, lng: 19.937 },
      },
    },
    {
      day: 2,
      date: "2024-06-16",
      places: [
        toPlanPlace("krk-005", 180),
        toPlanPlace("krk-008", 90),
        toPlanPlace("krk-010", 90),
      ],
      stats: {
        totalPlaces: 3,
        totalTime: 360,
        totalPrice: 20,
        centerPoint: { lat: 50.0486, lng: 19.9375 },
      },
    },
    {
      day: 3,
      date: "2024-06-17",
      places: [toPlanPlace("krk-003", 150)],
      stats: {
        totalPlaces: 1,
        totalTime: 150,
        totalPrice: 89,
        centerPoint: { lat: 49.9829, lng: 20.0556 },
      },
    },
  ],
  createdAt: new Date("2024-06-10"),
  filters: {
    city: "Kraków",
    days: 3,
    startDate: "2024-06-15",
    types: [PLACE_TYPE.INDOOR, PLACE_TYPE.OUTDOOR],
    minRating: 4.0,
    priceRange: [0, 200],
    crowdLevels: [CROWD_LEVEL.QUIET, CROWD_LEVEL.MODERATE],
    targetGroups: [TARGET_GROUP.COUPLES, TARGET_GROUP.STUDENTS],
    style: TRAVEL_STYLE.RELAXED,
    categories: [
      INTEREST_CATEGORY.HISTORY,
      INTEREST_CATEGORY.ART,
      INTEREST_CATEGORY.ARCHITECTURE,
    ],
    foodAvailable: false,
    foodTypes: [],
    cuisines: [],
  },
  stats: {
    totalPlaces: 7,
    totalDays: 3,
    totalPrice: 154,
  },
};

const mockParisPlan: GeneratedPlan = {
  id: "mock-paris-001",
  city: "Paryż",
  days: [
    {
      day: 1,
      date: "2024-07-20",
      places: [toPlanPlace("par-001", 120), toPlanPlace("par-002", 180)],
      stats: {
        totalPlaces: 2,
        totalTime: 300,
        totalPrice: 42,
        centerPoint: { lat: 48.8595, lng: 2.316 },
      },
    },
    {
      day: 2,
      date: "2024-07-21",
      places: [toPlanPlace("par-003", 60), toPlanPlace("par-004", 120)],
      stats: {
        totalPlaces: 2,
        totalTime: 180,
        totalPrice: 20,
        centerPoint: { lat: 48.86, lng: 2.33 },
      },
    },
    {
      day: 3,
      date: "2024-07-22",
      places: [toPlanPlace("par-005", 150), toPlanPlace("par-006", 180)],
      stats: {
        totalPlaces: 2,
        totalTime: 330,
        totalPrice: 40,
        centerPoint: { lat: 48.87, lng: 2.32 },
      },
    },
  ],
  createdAt: new Date("2024-07-15"),
  filters: {
    city: "Paryż",
    days: 3,
    startDate: "2024-07-20",
    types: [],
    minRating: 4.0,
    priceRange: [0, 100],
    crowdLevels: [],
    targetGroups: [],
    style: TRAVEL_STYLE.RELAXED,
    categories: [INTEREST_CATEGORY.ART, INTEREST_CATEGORY.ARCHITECTURE],
    foodAvailable: false,
    foodTypes: [],
    cuisines: [],
  },
  stats: {
    totalPlaces: 6,
    totalDays: 3,
    totalPrice: 102,
  },
};

const mockParisPlan2: GeneratedPlan = {
  id: "mock-paris-002",
  city: "Paryż",
  days: [
    {
      day: 1,
      date: "2024-08-10",
      places: [
        toPlanPlace("par-003", 60),
        toPlanPlace("par-006", 180),
        toPlanPlace("par-009", 90),
      ],
      stats: {
        totalPlaces: 3,
        totalTime: 330,
        totalPrice: 29,
        centerPoint: { lat: 48.853, lng: 2.3408 },
      },
    },
    {
      day: 2,
      date: "2024-08-11",
      places: [toPlanPlace("par-001", 120), toPlanPlace("par-007", 90)],
      stats: {
        totalPlaces: 2,
        totalTime: 210,
        totalPrice: 35,
        centerPoint: { lat: 48.86, lng: 2.32 },
      },
    },
  ],
  createdAt: new Date("2024-07-20"),
  filters: {
    city: "Paryż",
    days: 2,
    startDate: "2024-08-10",
    types: [],
    minRating: 4.0,
    priceRange: [0, 100],
    crowdLevels: [],
    targetGroups: [],
    style: TRAVEL_STYLE.RELAXED,
    categories: [INTEREST_CATEGORY.ART, INTEREST_CATEGORY.ARCHITECTURE],
    foodAvailable: false,
    foodTypes: [],
    cuisines: [],
  },
  stats: {
    totalPlaces: 5,
    totalDays: 2,
    totalPrice: 64,
  },
};

const mockKrakowPlan2: GeneratedPlan = {
  id: "mock-krakow-002",
  city: "Kraków",
  days: [
    {
      day: 1,
      date: "2024-09-01",
      places: [
        toPlanPlace("krk-010", 120),
        toPlanPlace("krk-006", 120),
        toPlanPlace("krk-007", 90),
      ],
      stats: {
        totalPlaces: 3,
        totalTime: 330,
        totalPrice: 180,
        centerPoint: { lat: 50.0669, lng: 19.9625 },
      },
    },
    {
      day: 2,
      date: "2024-09-02",
      places: [toPlanPlace("krk-001", 180), toPlanPlace("krk-002", 120)],
      stats: {
        totalPlaces: 2,
        totalTime: 300,
        totalPrice: 30,
        centerPoint: { lat: 50.06, lng: 19.93 },
      },
    },
    {
      day: 3,
      date: "2024-09-03",
      places: [toPlanPlace("krk-003", 150), toPlanPlace("krk-004", 60)],
      stats: {
        totalPlaces: 2,
        totalTime: 210,
        totalPrice: 89,
        centerPoint: { lat: 50.0, lng: 20.0 },
      },
    },
  ],
  createdAt: new Date("2024-08-15"),
  filters: {
    city: "Kraków",
    days: 3,
    startDate: "2024-09-01",
    types: [],
    minRating: 4.0,
    priceRange: [0, 500],
    crowdLevels: [],
    targetGroups: [],
    style: TRAVEL_STYLE.RELAXED,
    categories: [INTEREST_CATEGORY.FOOD],
    foodAvailable: true,
    foodTypes: [],
    cuisines: [],
  },
  stats: {
    totalPlaces: 7,
    totalDays: 3,
    totalPrice: 299,
  },
};

const mockPlans: GeneratedPlan[] = [
  mockKrakowPlan,
  mockKrakowPlan2,
  mockParisPlan,
  mockParisPlan2,
];

export function getMockPlanById(id: string): GeneratedPlan | null {
  const plan = mockPlans.find((p) => p.id === id);
  return plan || null;
}

export function getMockPlansForUser(): GeneratedPlan[] {
  return mockPlans;
}

export async function savePlanToBackend(): Promise<{
  // _plan: GeneratedPlan
  success: boolean;
  id?: string;
  error?: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    id: `saved-${Date.now()}`,
  };
}

export async function fetchPlanFromBackend(
  id: string,
): Promise<GeneratedPlan | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getMockPlanById(id);
}
