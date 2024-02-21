import { InputText } from "primereact/inputtext";
import { useQueryState } from "nuqs";
import {
  Person,
  Planet,
  SearchResult,
  Starship,
  Vehicle,
} from "@/shared/types";
import { Dropdown } from "primereact/dropdown";
import { useSWQuery } from "@/shared/queries";
import { ProgressBar } from "primereact/progressbar";
import { KEYBOARD_KEYS, SEARCH_CATEGORIES, SearchResultSet } from "./constants";
import { useRouter } from "next/navigation";
import { combineAllSearchResults } from "./utils";
import { KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import PersonSearchResult from "./Person/PersonSearchResult";
import PlanetSearchResult from "./Planet/PlanetSearchResult";
import StarshipSearchResult from "./Starship/StarshipSearchResult";
import VehicleSearchResult from "./Vehicle/VehicleSearchResult";

const SearchWithResults = () => {
  const router = useRouter();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: SEARCH_CATEGORIES.All,
  });

  const { data: people, isLoading: isLoadingPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people", search, category],
    `/people?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.People) &&
      search !== ""
  );

  const { data: planets, isLoading: isLoadingPlanets } = useSWQuery<
    SearchResult<Planet>
  >(
    ["planet", search, category],
    `/planets?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Planets) &&
      search !== ""
  );

  const { data: starships, isLoading: isLoadingStarships } = useSWQuery<
    SearchResult<Starship>
  >(
    ["starship", search, category],
    `/starships?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Starships) &&
      search !== ""
  );

  const { data: vehicles, isLoading: isLoadingVehicles } = useSWQuery<
    SearchResult<Vehicle>
  >(
    ["vehicle", search, category],
    `/vehicles?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles) &&
      search !== ""
  );

  const allSearchResults: SearchResultSet[] = combineAllSearchResults(
    people,
    planets,
    starships,
    vehicles
  );

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles;

  const goToSearchResultsPage = () => {
    router.push(`/results?search=${search}&category=${category}`);
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER) {
      goToSearchResultsPage();
    }
  };

  const onSearchResultClicked = (searchResult: SearchResultSet) => {
    alert(`go to ${searchResult.resultType} details page`);
  };

  return (
    <div className="flex flex-col flex-wrap gap-2 w-full">
      <div className="p-input-icon-right relative w-full flex flow-nowrap">
        <Dropdown
          className="rounded-tr-none rounded-br-none"
          value={category}
          onChange={(e) => setCategory(e.target.value || null)}
          options={Array.from(Object.keys(SEARCH_CATEGORIES))}
        />
        <i
          className="pi pi-search cursor-pointer"
          onClick={goToSearchResultsPage}
        />
        <InputText
          placeholder="Search"
          className="rounded-tl-none rounded-bl-none flex-grow w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          onKeyDown={onSearchKeyDown}
        />
      </div>
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
      {allSearchResults.length > 0 && (
        <ul className="w-full bg-white rounded flex flex-row flex-wrap">
          {allSearchResults?.map((result, index) => {
            switch (result.resultType) {
              case SEARCH_CATEGORIES.People:
                return (
                  <PersonSearchResult
                    person={result as Person}
                    key={index}
                    onSearchResultClicked={onSearchResultClicked}
                  />
                );
              case SEARCH_CATEGORIES.Planets:
                return (
                  <PlanetSearchResult
                    planet={result as Planet}
                    key={index}
                    onSearchResultClicked={onSearchResultClicked}
                  />
                );
              case SEARCH_CATEGORIES.Starships:
                return (
                  <StarshipSearchResult
                    starship={result as Starship}
                    key={index}
                    onSearchResultClicked={onSearchResultClicked}
                  />
                );
              case SEARCH_CATEGORIES.Vehicles:
                return (
                  <VehicleSearchResult
                    vehicle={result as Vehicle}
                    key={index}
                    onSearchResultClicked={onSearchResultClicked}
                  />
                );
              default:
                return null;
            }
          })}

          <li
            role="option"
            className="w-full h-auto flex flex-row flex-nowrap cursor-pointer hover:bg-gray-100 p-2 font-bold"
            onClick={goToSearchResultsPage}
          >
            See all results for "{search}"
          </li>
        </ul>
      )}
    </div>
  );
};

// we need to do this, because otherwise if a user selects a category and refreshes page or sends it to a friend and they open it
// the category server side will be All, but client side will be the selected category, query params is very tricky with SSR
export default dynamic(() => Promise.resolve(SearchWithResults), {
  ssr: false,
});
