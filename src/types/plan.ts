import type {
  PLACE_TYPE,
  CROWD_LEVEL,
  TRAVEL_STYLE,
  INTEREST_CATEGORY,
  TARGET_GROUP,
  FOOD_TYPE,
  CUISINE_TYPE,
} from "./places";

export interface PlanFilters {
  city: string;
  days: number;
  startDate?: string;
  types: PLACE_TYPE[];
  minRating: number;
  priceRange: [number, number];
  crowdLevels: CROWD_LEVEL[];
  targetGroups: TARGET_GROUP[];
  style: TRAVEL_STYLE;
  categories: INTEREST_CATEGORY[];
  foodAvailable: boolean;
  foodTypes: FOOD_TYPE[];
  cuisines: CUISINE_TYPE[];
}

export interface PlanPlace {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  rating: { score: number; reviews: number };
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: { normal: number; reduced?: number; currency: string };
  estimatedVisitTime: number;
  type: PLACE_TYPE;
  categories: INTEREST_CATEGORY[];
}

export interface DayPlan {
  day: number;
  date?: string;
  places: PlanPlace[];
  stats: {
    totalPlaces: number;
    totalTime: number; // w minutach
    totalPrice: number;
    centerPoint: { lat: number; lng: number };
  };
}

export interface GeneratedPlan {
  id: string; // 'generated' lub UUID
  city: string;
  days: DayPlan[];
  createdAt: Date;
  filters: PlanFilters;
  stats: {
    totalPlaces: number;
    totalDays: number;
    totalPrice: number;
  };
}

export interface GeneratedPlanContextType {
  currentPlan: GeneratedPlan | null;
  filters: PlanFilters | null;
  isGenerating: boolean;
  hasUnsavedChanges: boolean;
  generatePlan: (filters: PlanFilters) => Promise<void>;
  clearPlan: () => void;
  markAsSaved: () => void; // Resetuje hasUnsavedChanges
}

// Pomocnicza funkcja do formatowania czasu
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

// Pomocnicza funkcja do obliczania daty
export function calculateDate(
  startDate: string | undefined,
  dayIndex: number,
): string | undefined {
  if (!startDate) return undefined;
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayIndex);
  return date.toISOString().split("T")[0];
}

// Polskie nazwy dni tygodnia
const DAYS_PL = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

// Formatowanie daty do wyświetlenia (np. "Pon, 2 cze")
export function formatDateForDisplay(
  dateStr: string | undefined,
): string | undefined {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  const dayName = DAYS_PL[date.getDay()].slice(0, 3);
  const dayNum = date.getDate();
  const month = date.toLocaleString("pl-PL", { month: "short" }).slice(0, 3);
  return `${dayName}, ${dayNum} ${month}`;
}
