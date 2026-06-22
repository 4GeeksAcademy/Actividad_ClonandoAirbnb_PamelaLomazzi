export type CategoryKey =
  | "playa"
  | "piscinas"
  | "centro"
  | "lujo"
  | "romantico"
  | "vistas";

export type FilterValue = CategoryKey | "all";
export type SectionKey = "buenos-aires" | "madrid";

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  badge?: string;
  category: CategoryKey;
  section: SectionKey;
}

export interface FilterItem {
  id: FilterValue;
  label: string;
  icon: string;
}

export interface ListingSectionData {
  id: SectionKey;
  title: string;
  subtitle?: string;
}
