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
