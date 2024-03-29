import {
  SearchResult,
  Person,
  Planet,
  Starship,
  Vehicle,
} from "@/shared/types";
import {
  SearchResultSet,
  SEARCH_CATEGORIES,
  MAX_SEARCH_RESULTS,
  CATEGORY_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
  DEFAULT_CATEGORY,
  DEFAULT_SEARCH,
} from "./constants";
import { useSWQuery } from "@/shared/queries";
import { useSearchParams } from "next/navigation";
import { PAGE_QUERY_PARAM } from "../Results/constants";
import { NextRouter } from "next/router";
import { DETAILS_CATEGORY_QUERY_PARAM } from "../Details/constants";
import { compareToLowerStrings } from "@/shared/utils";

export const combineAllSearchResults = (
  people?: SearchResult<Person>,
  planets?: SearchResult<Planet>,
  starships?: SearchResult<Starship>,
  vehicles?: SearchResult<Vehicle>
): SearchResultSet[] => {
  const peopleLength = people?.results.length ?? 0;
  const planetsLength = planets?.results.length ?? 0;
  const starshipsLength = starships?.results.length ?? 0;
  const vehiclesLength = vehicles?.results.length ?? 0;

  const combinedResults = [
    ...(people?.results ?? []).map((person) => ({
      ...person,
      resultType: SEARCH_CATEGORIES.People,
      count: peopleLength,
    })),
    ...(planets?.results ?? []).map((planet) => ({
      ...planet,
      resultType: SEARCH_CATEGORIES.Planets,
      count: planetsLength,
    })),
    ...(starships?.results ?? []).map((starship) => ({
      ...starship,
      resultType: SEARCH_CATEGORIES.Starships,
      count: starshipsLength,
    })),
    ...(vehicles?.results ?? []).map((vehicle) => ({
      ...vehicle,
      resultType: SEARCH_CATEGORIES.Vehicles,
      count: vehiclesLength,
    })),
  ];

  combinedResults.sort((a, b) => {
    // primary order by count
    const countDiff = b.count - a.count;
    if (countDiff !== 0) return countDiff;

    // secondary order by result type
    return a.resultType.localeCompare(b.resultType);
  });

  const sortedAndCleanedResults = combinedResults.map(
    ({ count, ...rest }) => rest
  );

  return sortedAndCleanedResults.slice(0, MAX_SEARCH_RESULTS);
};

// althought it's needed to provide page, the API considers no query param as page = 1
// it's better to add it, so that react query can recognize that this key is already
// cached and it doesn't need to refetch it, so we avoid an unnecessary request for all of them at the initial load
const defaultSearchPage = 1;

export const usePeople = () => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category = searchParams.get(CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryPeople = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.People
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const { data: people, isLoading: isLoadingPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people", search, category, defaultSearchPage],
    `/people?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${defaultSearchPage}`,
    (isCurrentCategoryPeople || isCurrentCategoryAll) && !isSearchEmpty
  );

  return { people, isLoadingPeople };
};

export const usePlanets = () => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category = searchParams.get(CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryPlanets = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Planets
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const { data: planets, isLoading: isLoadingPlanets } = useSWQuery<
    SearchResult<Planet>
  >(
    ["planet", search, category, defaultSearchPage],
    `/planets?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${defaultSearchPage}`,
    (isCurrentCategoryPlanets || isCurrentCategoryAll) && !isSearchEmpty
  );

  return { planets, isLoadingPlanets };
};

export const useStarships = () => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category = searchParams.get(CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryStarships = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Starships
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const { data: starships, isLoading: isLoadingStarships } = useSWQuery<
    SearchResult<Starship>
  >(
    ["starships", search, category, defaultSearchPage],
    `/starships?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${defaultSearchPage}`,
    (isCurrentCategoryStarships || isCurrentCategoryAll) && !isSearchEmpty
  );

  return { starships, isLoadingStarships };
};

export const useVehicles = () => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? DEFAULT_SEARCH;
  const category = searchParams.get(CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const isSearchEmpty = search === DEFAULT_SEARCH;

  const isCurrentCategoryVehicles = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Vehicles
  );
  const isCurrentCategoryAll = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.All
  );

  const { data: vehicles, isLoading: isLoadingVehicles } = useSWQuery<
    SearchResult<Vehicle>
  >(
    ["vehicle", search, category, defaultSearchPage],
    `/vehicles?${SEARCH_QUERY_PARAM}=${search}&${PAGE_QUERY_PARAM}=${defaultSearchPage}`,
    (isCurrentCategoryVehicles || isCurrentCategoryAll) && !isSearchEmpty
  );

  return { vehicles, isLoadingVehicles };
};

export const onDetailsClicked = (
  searchResult: SearchResultSet,
  router: NextRouter
) => {
  const urlArgs = searchResult.url.split("/");
  const id = urlArgs[urlArgs.length - 2];
  router.push(
    `/details/${id}?${DETAILS_CATEGORY_QUERY_PARAM}=${searchResult.resultType}`
  );
};
