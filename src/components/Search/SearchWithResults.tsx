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
import dynamic from "next/dynamic";
import PersonSearchResult from "./Person/PersonSearchResult";

const SEARCH_CATEGORIES = {
  All: "All",
  People: "People",
  Planets: "Planets",
  Starships: "Starships",
  Vehicles: "Vehicles",
};

const SearchWithResults = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: SEARCH_CATEGORIES.All,
  });

  const { data: people, isLoading: isLoadingPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people", search],
    `/people?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.People) &&
      search !== ""
  );

  const { data: planets, isLoading: isLoadingPlanets } = useSWQuery<
    SearchResult<Planet>
  >(
    ["planet", search],
    `/planets?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Planets) &&
      search !== ""
  );

  const { data: starships, isLoading: isLoadingStarships } = useSWQuery<
    SearchResult<Starship>
  >(
    ["starship", search],
    `/starships?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Starships) &&
      search !== ""
  );

  const { data: vehicles, isLoading: isLoadingVehicles } = useSWQuery<
    SearchResult<Vehicle>
  >(
    ["vehicle", search],
    `/vehicles?search=${search}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles) &&
      search !== ""
  );

  const allSearchResultsCount =
    (people?.results?.length ?? 0) +
    (planets?.results?.length ?? 0) +
    (starships?.results?.length ?? 0) +
    (vehicles?.results?.length ?? 0);

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles;

  return (
    <div className="flex flex-col flex-wrap gap-2 w-full">
      <div className="p-input-icon-right relative w-full flex flow-nowrap">
        <Dropdown
          className="rounded-tr-none rounded-br-none"
          value={category}
          onChange={(e) => setCategory(e.target.value || null)}
          options={Array.from(Object.keys(SEARCH_CATEGORIES))}
        />
        <i className="pi pi-search cursor-pointer" />
        <InputText
          placeholder="Search"
          className="rounded-tl-none rounded-bl-none flex-grow w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
        />
      </div>
      {allSearchResultsCount !== 0 && (
        <ul className="w-full bg-white rounded flex flex-row flex-wrap">
          {people?.results.map((person, index) => (
            <PersonSearchResult person={person} key={index} />
          ))}

          <li
            role="option"
            className="w-full h-auto flex flex-row flex-nowrap cursor-pointer hover:bg-gray-100 p-2 font-bold"
          >
            See all results for "{search}"
          </li>
        </ul>
      )}
      {isLoading && (
        <div className="w-full bg-white rounded flex flex-row flex-wrap justify-center items-center p-3">
          <ProgressBar mode="indeterminate" className="h-1 w-full" />
        </div>
      )}
    </div>
  );
};

// we need to do this, because otherwise if a user selects a category and refreshes page or sends it to a friend and they open it
// the category server side will be All, but client side will be the selected category, query params is very tricky with SSR
export default dynamic(() => Promise.resolve(SearchWithResults), {
  ssr: false,
});
