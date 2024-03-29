import { Person, Planet, Starship, Vehicle } from "@/shared/types";

export const SEARCH_CATEGORIES = {
  All: "All",
  People: "People",
  Planets: "Planets",
  Starships: "Starships",
  Vehicles: "Vehicles",
};

export type SearchResultSet = (Person | Planet | Starship | Vehicle) & {
  resultType: string;
};

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  ESCAPE: "Escape",
};

export const MAX_SEARCH_RESULTS = 6;

export const SEARCH_QUERY_PARAM = "search";
export const CATEGORY_QUERY_PARAM = "category";

export const DEFAULT_SEARCH = "";
export const DEFAULT_CATEGORY = SEARCH_CATEGORIES.All;
