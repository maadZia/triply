import type { GeneratedPlan, PlanPlace } from "@/types/plan";
import {
  TRAVEL_STYLE,
  PLACE_TYPE,
  CROWD_LEVEL,
  INTEREST_CATEGORY,
  TARGET_GROUP,
} from "@/types/places";

// Helper do konwersji Place na PlanPlace
function toPlanPlace(
  id: string,
  name: string,
  description: string,
  mainImage: string,
  rating: { score: number; reviews: number },
  location: { address: string; lat: number; lng: number },
  price: { normal: number; currency: string },
  estimatedVisitTime: number,
  type: PLACE_TYPE,
  categories: INTEREST_CATEGORY[],
): PlanPlace {
  return {
    id,
    name,
    description,
    mainImage,
    rating,
    location,
    price,
    estimatedVisitTime,
    type,
    categories,
  };
}

// Mock plan - przykładowy plan dla Krakowa
const mockKrakowPlan: GeneratedPlan = {
  id: "mock-krakow-001",
  city: "Kraków",
  days: [
    {
      day: 1,
      date: "2024-06-15",
      places: [
        toPlanPlace(
          "krk-001",
          "Zamek Królewski na Wawelu",
          "Zamek na Wawelu to jeden z najważniejszych zabytków Polski...",
          "./places/cracow/wawel-1.png",
          { score: 4.9, reviews: 12540 },
          { address: "Wawel 5, 31-001 Kraków", lat: 50.0541, lng: 19.9352 },
          { normal: 30, currency: "PLN" },
          180,
          PLACE_TYPE.INDOOR,
          [INTEREST_CATEGORY.HISTORY, INTEREST_CATEGORY.ARCHITECTURE],
        ),
        toPlanPlace(
          "krk-002",
          "Rynek Główny",
          "Rynek Główny w Krakowie to jeden z największych placów w Europie...",
          "./places/cracow/rynek-1.png",
          { score: 4.8, reviews: 15420 },
          {
            address: "Rynek Główny, 31-042 Kraków",
            lat: 50.0614,
            lng: 19.9372,
          },
          { normal: 0, currency: "PLN" },
          120,
          PLACE_TYPE.OUTDOOR,
          [
            INTEREST_CATEGORY.HISTORY,
            INTEREST_CATEGORY.ARCHITECTURE,
            INTEREST_CATEGORY.ENTERTAINMENT,
          ],
        ),
        toPlanPlace(
          "krk-009",
          "Kościół Mariacki",
          "Gotycka bazylika z XIV wieku, dominująca nad Rynkiem Głównym...",
          "./places/cracow/mariacki-1.png",
          { score: 4.8, reviews: 7650 },
          {
            address: "Plac Mariacki 5, 31-042 Kraków",
            lat: 50.0616,
            lng: 19.9393,
          },
          { normal: 15, currency: "PLN" },
          45,
          PLACE_TYPE.INDOOR,
          [
            INTEREST_CATEGORY.HISTORY,
            INTEREST_CATEGORY.ART,
            INTEREST_CATEGORY.ARCHITECTURE,
          ],
        ),
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
        toPlanPlace(
          "krk-005",
          "Kazimierz - Dzielnica Żydowska",
          "Historyczna dzielnica Kazimierz to dusza alternatywnego Krakowa...",
          "./places/cracow/kazimierz-1.png",
          { score: 4.6, reviews: 9870 },
          { address: "Kazimierz, Kraków", lat: 50.0484, lng: 19.9444 },
          { normal: 0, currency: "PLN" },
          180,
          PLACE_TYPE.OUTDOOR,
          [
            INTEREST_CATEGORY.HISTORY,
            INTEREST_CATEGORY.ENTERTAINMENT,
            INTEREST_CATEGORY.ARCHITECTURE,
          ],
        ),
        toPlanPlace(
          "krk-008",
          "Muzeum Sztuki i Techniki Japońskiej Manggha",
          "Jedyne w Polsce muzeum poświęcone sztuce i technice japońskiej...",
          "./places/cracow/manggha-1.png",
          { score: 4.5, reviews: 1680 },
          {
            address: "Marii Konopnickiej 26, 30-302 Kraków",
            lat: 50.0495,
            lng: 19.9323,
          },
          { normal: 20, currency: "PLN" },
          90,
          PLACE_TYPE.INDOOR,
          [INTEREST_CATEGORY.ART, INTEREST_CATEGORY.HISTORY],
        ),
        toPlanPlace(
          "krk-010",
          "Bulwary Wiślane",
          "Miejsce spotkań krakowian i turystów nad Wisłą...",
          "./places/cracow/bulwary-1.png",
          { score: 4.5, reviews: 4320 },
          { address: "Bulwary Wiślane, Kraków", lat: 50.048, lng: 19.936 },
          { normal: 0, currency: "PLN" },
          90,
          PLACE_TYPE.OUTDOOR,
          [INTEREST_CATEGORY.NATURE, INTEREST_CATEGORY.ENTERTAINMENT],
        ),
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
      places: [
        toPlanPlace(
          "krk-003",
          "Kopalnia Soli 'Wieliczka'",
          "UNESCO World Heritage Site - jedna z najstarszych kopalni soli...",
          "./places/cracow/wieliczka-1.png",
          { score: 4.8, reviews: 8920 },
          {
            address: "Daniłowicza 10, 32-020 Wieliczka",
            lat: 49.9829,
            lng: 20.0556,
          },
          { normal: 89, currency: "PLN" },
          150,
          PLACE_TYPE.INDOOR,
          [INTEREST_CATEGORY.HISTORY, INTEREST_CATEGORY.NATURE],
        ),
      ],
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

// Mock plan dla Paryża (placeholder)
const mockParisPlan: GeneratedPlan = {
  id: "mock-paris-001",
  city: "Paryż",
  days: [
    {
      day: 1,
      date: "2024-07-20",
      places: [
        toPlanPlace(
          "paris-001",
          "Wieża Eiffla",
          "Symbol Paryża i jedna z najbardziej rozpoznawalnych budowli świata...",
          "./places/paris/eiffel-1.png",
          { score: 4.7, reviews: 45000 },
          {
            address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
            lat: 48.8584,
            lng: 2.2945,
          },
          { normal: 25, currency: "EUR" },
          120,
          PLACE_TYPE.OUTDOOR,
          [INTEREST_CATEGORY.ARCHITECTURE, INTEREST_CATEGORY.HISTORY],
        ),
        toPlanPlace(
          "paris-002",
          "Luwr",
          "Największe muzeum sztuki na świecie...",
          "./places/paris/louvre-1.png",
          { score: 4.8, reviews: 38000 },
          { address: "Rue de Rivoli, 75001 Paris", lat: 48.8606, lng: 2.3376 },
          { normal: 17, currency: "EUR" },
          180,
          PLACE_TYPE.INDOOR,
          [
            INTEREST_CATEGORY.ART,
            INTEREST_CATEGORY.HISTORY,
            INTEREST_CATEGORY.ARCHITECTURE,
          ],
        ),
      ],
      stats: {
        totalPlaces: 2,
        totalTime: 300,
        totalPrice: 42,
        centerPoint: { lat: 48.8595, lng: 2.316 },
      },
    },
  ],
  createdAt: new Date("2024-07-15"),
  filters: {
    city: "Paryż",
    days: 1,
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
    totalPlaces: 2,
    totalDays: 1,
    totalPrice: 42,
  },
};

const mockPlans: GeneratedPlan[] = [mockKrakowPlan, mockParisPlan];

// Pobierz mock plan po ID
export function getMockPlanById(id: string): GeneratedPlan | null {
  const plan = mockPlans.find((p) => p.id === id);
  return plan || null;
}

// Pobierz wszystkie mock plany dla użytkownika (dla strony profilu)
export function getMockPlansForUser(): GeneratedPlan[] {
  return mockPlans;
}

// Future: funkcja do zapisywania planu
export async function savePlanToBackend(): Promise<{
// _plan: GeneratedPlan
  success: boolean;
  id?: string;
  error?: string;
}> {
  // Mock implementacja - symulacja API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    id: `saved-${Date.now()}`,
  };
}

// Future: funkcja do pobierania planu z backendu
export async function fetchPlanFromBackend(
  id: string,
): Promise<GeneratedPlan | null> {
  // Mock implementacja - symulacja API call
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getMockPlanById(id);
}
