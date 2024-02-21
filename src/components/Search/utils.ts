import {
  SearchResult,
  Person,
  Planet,
  Starship,
  Vehicle,
} from "@/shared/types";
import { SearchResultSet, SEARCH_CATEGORIES } from "./constants";

export const combineAllSearchResults = (
  people: SearchResult<Person> | undefined,
  planets: SearchResult<Planet> | undefined,
  starships: SearchResult<Starship> | undefined,
  vehicles: SearchResult<Vehicle> | undefined
): SearchResultSet[] => {
  return [
    ...(people?.results ?? []).map((person) => ({
      ...person,
      resultType: SEARCH_CATEGORIES.People,
    })),
    ...(planets?.results ?? []).map((planet) => ({
      ...planet,
      resultType: SEARCH_CATEGORIES.Planets,
    })),
    ...(starships?.results ?? []).map((starship) => ({
      ...starship,
      resultType: SEARCH_CATEGORIES.Starships,
    })),
    ...(vehicles?.results ?? []).map((vehicle) => ({
      ...vehicle,
      resultType: SEARCH_CATEGORIES.Vehicles,
    })),
  ].slice(0, 6);
};
