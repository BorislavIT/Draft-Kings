import {
  Person,
  Planet,
  SearchResult,
  Starship,
  Vehicle,
} from "@/shared/types";
import { useSWQuery } from "@/shared/queries";
import { ProgressBar } from "primereact/progressbar";
import { useSearchParams } from "next/navigation";
import { FC, Fragment, useMemo } from "react";
import {
  SEARCH_CATEGORIES,
  SearchResultSet,
} from "@/components/Search/constants";
import { combineAllSearchResults } from "@/components/Search/utils";
import SearchWithResults from "@/components/Search/SearchWithResults";
import PersonSearchResult from "@/components/Search/Person/PersonSearchResult";
import PlanetSearchResult from "@/components/Search/Planet/PlanetSearchResult";
import StarshipSearchResult from "@/components/Search/Starship/StarshipSearchResult";
import VehicleSearchResult from "@/components/Search/Vehicle/VehicleSearchResult";

const ResultsPage: FC = () => {
  const searchParams = useSearchParams()!;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: people, isLoading: isLoadingPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people"],
    `/people?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.People) &&
      search !== "",
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: planets, isLoading: isLoadingPlanets } = useSWQuery<
    SearchResult<Planet>
  >(
    ["planet"],
    `/planets?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Planets) &&
      search !== "",
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: starships, isLoading: isLoadingStarships } = useSWQuery<
    SearchResult<Starship>
  >(
    ["starship"],
    `/starships?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Starships) &&
      search !== "",
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: vehicles, isLoading: isLoadingVehicles } = useSWQuery<
    SearchResult<Vehicle>
  >(
    ["vehicle"],
    `/vehicles?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles) &&
      search !== "",
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const allSearchResults: SearchResultSet[] = useMemo(() => {
    const combinedResults = combineAllSearchResults(
      people,
      planets,
      starships,
      vehicles
    );

    return combinedResults;
  }, [people, planets, starships, vehicles]);

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles;

  const onSearchResultClicked = (searchResult: SearchResultSet) => {
    alert(`go to ${searchResult.resultType} details page`);
  };

  const OrderedResults = () => {
    return allSearchResults?.map((result, index) => {
      switch (result.resultType) {
        case SEARCH_CATEGORIES.People:
          return (
            <Fragment key={index}>
              <PersonSearchResult
                person={result as Person}
                onSearchResultClicked={onSearchResultClicked}
              />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Planets:
          return (
            <Fragment key={index}>
              <PlanetSearchResult
                planet={result as Planet}
                onSearchResultClicked={onSearchResultClicked}
              />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Starships:
          return (
            <Fragment key={index}>
              <StarshipSearchResult
                starship={result as Starship}
                onSearchResultClicked={onSearchResultClicked}
              />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Vehicles:
          return (
            <Fragment key={index}>
              <VehicleSearchResult
                vehicle={result as Vehicle}
                onSearchResultClicked={onSearchResultClicked}
              />
            </Fragment>
          );
        default:
          return null;
      }
    });
  };

  return (
    <section className="w-full h-full flex flex-col flex-wrap gap-16">
      <SearchWithResults />
      <div className="flex flex-col flex-wrap w-full">
        {isLoading && (
          <div className="w-full bg-white rounded flex flex-row flex-wrap justify-center items-center p-3">
            <ProgressBar mode="indeterminate" className="h-1 w-full" />
          </div>
        )}
        {search !== "" && allSearchResults.length === 0 && !isLoading && (
          <div className="w-full bg-white rounded flex flex-row flex-wrap justify-center items-center p-3">
            No results found for "{search}"
          </div>
        )}
        {allSearchResults.length > 0 && !isLoading && (
          <ul className="w-full bg-white rounded flex flex-row flex-wrap">
            {<OrderedResults />}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ResultsPage;
