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
} from "./constants";

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
