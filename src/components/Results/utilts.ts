import { useSWQuery } from "@/shared/queries";
import {
  SearchResult,
  Person,
  Planet,
  Starship,
  Vehicle,
} from "@/shared/types";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SEARCH,
  SEARCH_CATEGORIES,
  SEARCH_QUERY_PARAM,
} from "../Search/constants";
import {
  PAGE_QUERY_PARAM,
  RESULTS_CATEGORY_QUERY_PARAM,
  RESULTS_SEARCH_QUERY_PARAM,
} from "./constants";
import { useSearchParams } from "next/navigation";
import { compareToLowerStrings } from "@/shared/utils";

export const usePaginatedPeople = (peoplePage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category =
    searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryPeople = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.People
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const {
    data: people,
    isLoading: isLoadingPeople,
    error: peopleError,
  } = useSWQuery<SearchResult<Person>>(
    ["people", search, category, peoplePage],
    `/people?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${peoplePage}`,
    (isCurrentCategoryPeople || isCurrentCategoryAll) &&
      !isSearchEmpty &&
      peoplePage > 0
  );

  return { people, isLoadingPeople, peopleError };
};

export const usePaginatedPlanets = (planetsPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category =
    searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryPlanets = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Planets
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const {
    data: planets,
    isLoading: isLoadingPlanets,
    error: planetsError,
  } = useSWQuery<SearchResult<Planet>>(
    ["planet", search, category, planetsPage],
    `/planets?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${planetsPage}`,
    (isCurrentCategoryPlanets || isCurrentCategoryAll) &&
      !isSearchEmpty &&
      planetsPage > 0
  );

  return { planets, isLoadingPlanets, planetsError };
};

export const usePaginatedStarships = (starshipsPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category =
    searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryStarships = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Starships
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const {
    data: starships,
    isLoading: isLoadingStarships,
    error: starshipsError,
  } = useSWQuery<SearchResult<Starship>>(
    ["starships", search, category, starshipsPage],
    `/starships?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${starshipsPage}`,
    (isCurrentCategoryStarships || isCurrentCategoryAll) &&
      !isSearchEmpty &&
      starshipsPage > 0
  );

  return { starships, isLoadingStarships, starshipsError };
};

export const usePaginatedVehicles = (vehiclesPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category =
    searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryVehicles = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Vehicles
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const {
    data: vehicles,
    isLoading: isLoadingVehicles,
    error: vehiclesError,
  } = useSWQuery<SearchResult<Vehicle>>(
    ["vehicle", search, category, vehiclesPage],
    `/vehicles?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${vehiclesPage}`,
    (isCurrentCategoryVehicles || isCurrentCategoryAll) &&
      !isSearchEmpty &&
      vehiclesPage > 0
  );

  return { vehicles, isLoadingVehicles, vehiclesError };
};
