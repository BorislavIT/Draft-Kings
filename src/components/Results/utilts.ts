import { useSWQuery } from "@/shared/queries";
import {
  SearchResult,
  Person,
  Planet,
  Starship,
  Vehicle,
} from "@/shared/types";
import { SEARCH_CATEGORIES, SEARCH_QUERY_PARAM } from "../Search/constants";
import {
  PAGE_QUERY_PARAM,
  RESULTS_CATEGORY_QUERY_PARAM,
  RESULTS_SEARCH_QUERY_PARAM,
} from "./constants";
import { useSearchParams } from "next/navigation";

export const usePaginatedPeople = (peoplePage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? "";
  const category = searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? "";
  const isSearchEmpty = search === "";

  const {
    data: people,
    isLoading: isLoadingPeople,
    error: peopleError,
  } = useSWQuery<SearchResult<Person>>(
    ["people", search, category, peoplePage],
    `/people?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${peoplePage}`,
    (category === SEARCH_CATEGORIES.People ||
      category === SEARCH_CATEGORIES.All) &&
      !isSearchEmpty &&
      peoplePage > 0
  );

  return { people, isLoadingPeople, peopleError };
};

export const usePaginatedPlanets = (planetsPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? "";
  const category = searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? "";
  const isSearchEmpty = search === "";

  const {
    data: planets,
    isLoading: isLoadingPlanets,
    error: planetsError,
  } = useSWQuery<SearchResult<Planet>>(
    ["planet", search, category, planetsPage],
    `/planets?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${planetsPage}`,
    (category === SEARCH_CATEGORIES.Planets ||
      category === SEARCH_CATEGORIES.All) &&
      !isSearchEmpty &&
      planetsPage > 0
  );

  return { planets, isLoadingPlanets, planetsError };
};

export const usePaginatedStarships = (starshipsPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? "";
  const category = searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? "";
  const isSearchEmpty = search === "";

  const {
    data: starships,
    isLoading: isLoadingStarships,
    error: starshipsError,
  } = useSWQuery<SearchResult<Starship>>(
    ["starships", search, category, starshipsPage],
    `/starships?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${starshipsPage}`,
    (category === SEARCH_CATEGORIES.Starships ||
      category === SEARCH_CATEGORIES.All) &&
      !isSearchEmpty &&
      starshipsPage > 0
  );

  return { starships, isLoadingStarships, starshipsError };
};

export const usePaginatedVehicles = (vehiclesPage: number) => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(RESULTS_SEARCH_QUERY_PARAM) ?? "";
  const category = searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? "";
  const isSearchEmpty = search === "";

  const {
    data: vehicles,
    isLoading: isLoadingVehicles,
    error: vehiclesError,
  } = useSWQuery<SearchResult<Vehicle>>(
    ["vehicle", search, category, vehiclesPage],
    `/vehicles?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${vehiclesPage}`,
    (category === SEARCH_CATEGORIES.Vehicles ||
      category === SEARCH_CATEGORIES.All) &&
      !isSearchEmpty &&
      vehiclesPage > 0
  );

  return { vehicles, isLoadingVehicles, vehiclesError };
};
