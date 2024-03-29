import { InputText } from "primereact/inputtext";
import { useQueryState } from "nuqs";
import { Person, Planet, Starship, Vehicle } from "@/shared/types";
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import {
  CATEGORY_QUERY_PARAM,
  KEYBOARD_KEYS,
  SEARCH_CATEGORIES,
  SEARCH_QUERY_PARAM,
  SearchResultSet,
} from "./constants";
import {
  combineAllSearchResults,
  usePeople,
  usePlanets,
  useStarships,
  useVehicles,
} from "./utils";
import { useRouter } from "next/router";
import { FC, Fragment, KeyboardEvent, useMemo, useState } from "react";
import {
  RESULTS_CATEGORY_QUERY_PARAM,
  RESULTS_SEARCH_QUERY_PARAM,
} from "../Results/constants";
import dynamic from "next/dynamic";
import PersonSearchResult from "./Person/PersonSearchResult";
import PlanetSearchResult from "./Planet/PlanetSearchResult";
import StarshipSearchResult from "./Starship/StarshipSearchResult";
import VehicleSearchResult from "./Vehicle/VehicleSearchResult";

const SearchWithResults: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useQueryState(SEARCH_QUERY_PARAM, {
    defaultValue: "",
  });
  const [category, setCategory] = useQueryState(CATEGORY_QUERY_PARAM, {
    defaultValue: SEARCH_CATEGORIES.All,
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  const { people, isLoadingPeople } = usePeople();
  const { planets, isLoadingPlanets } = usePlanets();
  const { starships, isLoadingStarships } = useStarships();
  const { vehicles, isLoadingVehicles } = useVehicles();

  const allSearchResults: SearchResultSet[] = useMemo(() => {
    const combinedResults = combineAllSearchResults(
      people,
      planets,
      starships,
      vehicles
    );

    return combinedResults;
  }, [people, planets, starships, vehicles]);

  const OrderedResults = () => {
    return allSearchResults?.map((result, index) => {
      switch (result.resultType) {
        case SEARCH_CATEGORIES.People:
          return (
            <Fragment key={index}>
              <PersonSearchResult person={result as Person} />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Planets:
          return (
            <Fragment key={index}>
              <PlanetSearchResult planet={result as Planet} />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Starships:
          return (
            <Fragment key={index}>
              <StarshipSearchResult starship={result as Starship} />
            </Fragment>
          );
        case SEARCH_CATEGORIES.Vehicles:
          return (
            <Fragment key={index}>
              <VehicleSearchResult vehicle={result as Vehicle} />
            </Fragment>
          );
        default:
          return null;
      }
    });
  };

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles;

  const goToSearchResultsPage = () => {
    // this is needed, because of the bad decision to use query params for the search and category, instead of standard
    // client side state management
    if (router.pathname === "/results") {
      router
        .push(
          `/results?${RESULTS_SEARCH_QUERY_PARAM}=${search}&${RESULTS_CATEGORY_QUERY_PARAM}=${category}&${CATEGORY_QUERY_PARAM}=${category}&${SEARCH_QUERY_PARAM}=${search}`
        )
        .then(() => router.reload());
      return;
    }
    router.push(
      `/results?${RESULTS_SEARCH_QUERY_PARAM}=${search}&${RESULTS_CATEGORY_QUERY_PARAM}=${category}&${CATEGORY_QUERY_PARAM}=${category}&${SEARCH_QUERY_PARAM}=${search}`
    );
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER) {
      goToSearchResultsPage();
    } else if (e.key === KEYBOARD_KEYS.ESCAPE) {
      setShowResults(false);
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  return (
    <div className="flex flex-col flex-wrap w-full">
      <div className="p-input-icon-right relative w-full flex flow-nowrap">
        <Dropdown
          className="rounded-tr-none rounded-br-none"
          value={category}
          onChange={(e) => setCategory(e.target.value || null)}
          options={Array.from(Object.keys(SEARCH_CATEGORIES))}
        />
        <i
          className="pi pi-search cursor-pointer"
          onMouseDown={goToSearchResultsPage}
        />
        <InputText
          onFocus={() => {
            setShowResults(true);
          }}
          onBlur={() => {
            // the delay here is needed, because whenever you try to click on one of the results or the "see all results"
            // the input loses focus and the results disappear, so it stops you from clicking inside of it
            setTimeout(() => {
              setShowResults(false);
            }, 10);
          }}
          placeholder="Search"
          className="rounded-tl-none rounded-bl-none flex-grow w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          onKeyDown={onSearchKeyDown}
        />

        {showResults && (
          <div className="w-full h-full z-20 absolute top-[58px]">
            {isLoading && (
              <div className="w-full bg-white rounded flex flex-row flex-nowrap justify-center items-center p-3">
                <ProgressBar mode="indeterminate" className="h-1 w-full" />
              </div>
            )}
            {search !== "" && allSearchResults.length === 0 && !isLoading && (
              <div className="w-full bg-white rounded flex flex-row flex-nowrap justify-center items-center p-3">
                No results found for &quot;{search}&quot;
              </div>
            )}
            {allSearchResults.length > 0 && !isLoading && (
              <ul className="w-full bg-white rounded flex flex-row flex-wrap">
                <OrderedResults />

                <li
                  aria-selected="false"
                  role="option"
                  className="w-full h-auto flex flex-row flex-nowrap cursor-pointer hover:bg-gray-100 p-2 font-bold"
                  onMouseDown={goToSearchResultsPage}
                >
                  See all results for &quot;{search}&quot;
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// we need to do this, because otherwise if a user selects a category and refreshes page or sends it to a friend and they open it
// the category server side will be All, but client side will be the selected category, query params is very tricky with SSR
export default dynamic(() => Promise.resolve(SearchWithResults), {
  ssr: false,
});
