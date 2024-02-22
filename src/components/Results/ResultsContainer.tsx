import { Person, Planet, Starship, Vehicle } from "@/shared/types";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Fragment, FC } from "react";
import { SEARCH_CATEGORIES } from "../Search/constants";
import {
  ResultSet,
  MAX_RESULTS_PER_PAGE,
  RESULTS_CATEGORY_QUERY_PARAM,
} from "./constants";
import Pagination, { usePageSetter, usePagination } from "./Pagination";
import PersonResults from "./Person/PersonResults";
import PlanetResults from "./Planet/PlanetResults";
import StarshipResults from "./Starships/StarshipResults";
import VehicleResults from "./Vehicles/VehicleResults";
import {
  usePaginatedPeople,
  usePaginatedPlanets,
  usePaginatedStarships,
  usePaginatedVehicles,
} from "./utilts";

const ResultsContainer: FC = () => {
  const { page, setPage, onNewPageClicked } = usePagination();

  const [peoplePage, setPeoplePage] = useState<number>(1);
  const [planetsPage, setPlanetsPage] = useState<number>(1);
  const [starshipsPage, setStarshipsPage] = useState<number>(1);
  const [vehiclesPage, setVehiclesPage] = useState<number>(1);

  const [extraPeoplePage, setExtraPeoplePage] = useState<number>(-1);
  const [extraPlanetsPage, setExtraPlanetsPage] = useState<number>(-1);
  const [extraStarshipsPage, setExtraStarshipsPage] = useState<number>(-1);
  const [extraVehiclesPage, setExtraVehiclesPage] = useState<number>(-1);

  const [currentPeopleStartIndex, setCurrentPeopleStartIndex] =
    useState<number>(-1);

  const [currentPlanetsStartIndex, setCurrentPlanetsStartIndex] =
    useState<number>(-1);

  const [currentStarshipsStartIndex, setCurrentStarshipsStartIndex] =
    useState<number>(-1);

  const [currentVehiclesStartIndex, setCurrentVehiclesStartIndex] =
    useState<number>(-1);

  const searchParams = useSearchParams()!;
  const category = searchParams.get(RESULTS_CATEGORY_QUERY_PARAM) ?? "";
  const isCurrentCategoryAll = category === SEARCH_CATEGORIES.All;
  const isCurrentCategoryPeople = category === SEARCH_CATEGORIES.People;
  const isCurrentCategoryPlanets = category === SEARCH_CATEGORIES.Planets;
  const isCurrentCategoryStarships = category === SEARCH_CATEGORIES.Starships;
  const isCurrentCategoryVehicles = category === SEARCH_CATEGORIES.Vehicles;

  const { people, isLoadingPeople } = usePaginatedPeople(peoplePage);

  const { people: extraPeople, isLoadingPeople: isLoadingExtraPeople } =
    usePaginatedPeople(extraPeoplePage);

  const { planets, isLoadingPlanets } = usePaginatedPlanets(planetsPage);

  const { planets: extraPlanets, isLoadingPlanets: isLoadingExtraPlanets } =
    usePaginatedPlanets(extraPlanetsPage);

  const { starships, isLoadingStarships } =
    usePaginatedStarships(starshipsPage);

  const {
    starships: extraStarships,
    isLoadingStarships: isLoadingExtraStarships,
  } = usePaginatedStarships(
    extraStarshipsPage,
    isCurrentCategoryAll || isCurrentCategoryStarships
  );

  const { vehicles, isLoadingVehicles } = usePaginatedVehicles(
    vehiclesPage,
    isCurrentCategoryAll || isCurrentCategoryVehicles
  );

  const { vehicles: extraVehicles, isLoadingVehicles: isLoadingExtraVehicles } =
    usePaginatedVehicles(
      extraVehiclesPage,
      isCurrentCategoryAll || isCurrentCategoryVehicles
    );

  const [allVisibleEntities, setAllVisibleEntities] = useState<
    (
      | ResultSet<Person>
      | ResultSet<Planet>
      | ResultSet<Starship>
      | ResultSet<Vehicle>
    )[]
  >([]);

  const [totalEntities, setTotalEntities] = useState<number>(0);

  useEffect(() => {
    const shouldUpdateEntities =
      (isCurrentCategoryAll && people && planets && starships && vehicles) ||
      (isCurrentCategoryPeople && people) ||
      (isCurrentCategoryPlanets && planets) ||
      (isCurrentCategoryStarships && starships) ||
      (isCurrentCategoryVehicles && vehicles);

    if (!shouldUpdateEntities) return;

    const peopleResultSet: ResultSet<Person> = {
      resultType: SEARCH_CATEGORIES.People,
      count: people?.count ?? 0,
      results: people?.results ?? [],
    };

    const planetsResultSet: ResultSet<Planet> = {
      resultType: SEARCH_CATEGORIES.Planets,
      count: planets?.count ?? 0,
      results: planets?.results ?? [],
    };

    const starshipsResultSet: ResultSet<Starship> = {
      resultType: SEARCH_CATEGORIES.Starships,
      count: starships?.count ?? 0,
      results: starships?.results ?? [],
    };

    const vehiclesResultSet: ResultSet<Vehicle> = {
      resultType: SEARCH_CATEGORIES.Vehicles,
      count: vehicles?.count ?? 0,
      results: vehicles?.results ?? [],
    };

    const entities = [
      peopleResultSet,
      planetsResultSet,
      starshipsResultSet,
      vehiclesResultSet,
    ];

    entities.sort((a, b) => b.count - a.count);

    const currentPageEndRange = parseInt(page) * MAX_RESULTS_PER_PAGE;

    const currentPageStartRange = currentPageEndRange - MAX_RESULTS_PER_PAGE;

    // we go through every entity that is now ordered
    entities.forEach((entity, index) => {
      let previousEntityEndRange = 0;
      for (let index = 0; index < entities.length; index++) {
        if (entities[index] === entity) break;

        previousEntityEndRange += entities[index].count;
      }

      // we calculate the range of the current entity
      // e.g prev one could have been [0, 40], that would mean current range is [40, n]
      // and ofc if its first entity, then its [0, n]
      const isFirstEntity = index === 0;
      const entityStartRange = isFirstEntity ? 0 : previousEntityEndRange;
      const entityEndRange = entity.count + entityStartRange;

      const isCurrentEntityInRange =
        entityEndRange >= currentPageStartRange &&
        entityStartRange < currentPageEndRange;

      // if entity is not in range, we need to hide it
      if (!isCurrentEntityInRange) {
        entity.results = [];
        return;
      }

      // we find the common range between the page and the entity's range
      // that would be entityResultsShowCount
      const start = Math.max(entityStartRange, currentPageStartRange);
      const end = Math.min(entityEndRange, currentPageEndRange);
      const entityResultsShowCount = end - start;

      // we find the range indexes which would be invalid for the results sometimes
      // results indexes are = [0, 9], but this range could be [20, 57] so it would not be a valid index
      const resultsRangeStartIndex = Math.max(0, start - entityStartRange);
      const resultsRangeEndIndex =
        resultsRangeStartIndex + entityResultsShowCount - 1;

      const isCurrentEntityPeople =
        entity.resultType === SEARCH_CATEGORIES.People;
      const isCurrentEntityPlanets =
        entity.resultType === SEARCH_CATEGORIES.Planets;
      const isCurrentEntityStarships =
        entity.resultType === SEARCH_CATEGORIES.Starships;
      const isCurrentEntityVehicles =
        entity.resultType === SEARCH_CATEGORIES.Vehicles;

      // we need to update the start index (or end index, doesn't matter)
      // so that our useeffect below will catch this
      // and will update the page from where we need to fetch the results

      // this is needed in this example
      // you go to page 1, go to page 2, then go back to page 1
      if (isCurrentEntityPeople) {
        setCurrentPeopleStartIndex(resultsRangeStartIndex);
      } else if (isCurrentEntityPlanets) {
        setCurrentPlanetsStartIndex(resultsRangeStartIndex);
      } else if (isCurrentEntityStarships) {
        setCurrentStarshipsStartIndex(resultsRangeStartIndex);
      } else if (isCurrentEntityVehicles) {
        setCurrentVehiclesStartIndex(resultsRangeStartIndex);
      }

      const startPage =
        Math.floor(resultsRangeStartIndex / MAX_RESULTS_PER_PAGE) + 1;
      const endPage =
        Math.floor(resultsRangeEndIndex / MAX_RESULTS_PER_PAGE) + 1;

      const shouldFetchFromNextPage = startPage !== endPage;

      const shouldFetchCurrentPage =
        resultsRangeStartIndex >= MAX_RESULTS_PER_PAGE;
      if (shouldFetchCurrentPage) {
        let currentPageEntityStartIndex =
          resultsRangeStartIndex % MAX_RESULTS_PER_PAGE;
        let currentPageEntityEndIndex =
          resultsRangeEndIndex % MAX_RESULTS_PER_PAGE;

        if (currentPageEntityEndIndex < currentPageEntityStartIndex) {
          currentPageEntityEndIndex = MAX_RESULTS_PER_PAGE - 1;
        }

        if (shouldFetchFromNextPage) {
          if (isCurrentEntityPeople) {
            const extraPage = peoplePage === startPage ? endPage : startPage;
            setExtraPeoplePage(extraPage);
          } else if (isCurrentEntityPlanets) {
            const extraPage = planetsPage === startPage ? endPage : startPage;
            setExtraPlanetsPage(extraPage);
          } else if (isCurrentEntityStarships) {
            const extraPage = starshipsPage === startPage ? endPage : startPage;
            setExtraStarshipsPage(extraPage);
          } else if (isCurrentEntityVehicles) {
            const extraPage = vehiclesPage === startPage ? endPage : startPage;
            setExtraVehiclesPage(extraPage);
          }
        }
        // if we do not need to fetch from extra page, but we've already fetched some other time
        // we need to reset it here
        else {
          if (isCurrentEntityPeople) {
            setExtraPeoplePage(-1);
          } else if (isCurrentEntityPlanets) {
            setExtraPlanetsPage(-1);
          } else if (isCurrentEntityStarships) {
            setExtraStarshipsPage(-1);
          } else if (isCurrentEntityVehicles) {
            setExtraVehiclesPage(-1);
          }
        }

        let extraResults: Vehicle[] | Starship[] | Planet[] | Person[] = [];

        if (extraPeople?.results?.length! > 0) {
          extraResults = extraPeople?.results!;
        }
        if (extraPlanets?.results?.length! > 0) {
          extraResults = extraPlanets?.results!;
        }
        if (extraStarships?.results?.length! > 0) {
          extraResults = extraStarships?.results!;
        }
        if (extraVehicles?.results?.length! > 0) {
          extraResults = extraVehicles?.results!;
        }

        const newEntityPage =
          Math.floor(resultsRangeStartIndex / MAX_RESULTS_PER_PAGE) + 1;

        if (isCurrentEntityPeople) {
          setPeoplePage(newEntityPage);
        } else if (isCurrentEntityPlanets) {
          setPlanetsPage(newEntityPage);
        } else if (isCurrentEntityStarships) {
          setStarshipsPage(newEntityPage);
        } else if (isCurrentEntityVehicles) {
          setVehiclesPage(newEntityPage);
        }

        //  here we merge the current page's results with the extra results
        const currentPageResults = [
          ...entity.results.slice(
            currentPageEntityStartIndex,
            currentPageEntityEndIndex + 1
          ),
          ...extraResults,
        ].slice(0, MAX_RESULTS_PER_PAGE);

        if (isCurrentEntityPeople) {
          entity.results = currentPageResults as Person[];
        } else if (isCurrentEntityPlanets) {
          entity.results = currentPageResults as Planet[];
        } else if (isCurrentEntityStarships) {
          entity.results = currentPageResults as Starship[];
        } else if (isCurrentEntityVehicles) {
          entity.results = currentPageResults as Vehicle[];
        }
      } else {
        const resultsToShow = entity.results.slice(
          resultsRangeStartIndex,
          resultsRangeEndIndex + 1
        );

        let newResults: Vehicle[] | Starship[] | Planet[] | Person[] = [];

        if (isCurrentEntityPeople) {
          newResults = [...(newResults as any), ...(resultsToShow as Person[])];
        } else if (isCurrentEntityPlanets) {
          newResults = [...(newResults as any), ...(resultsToShow as Planet[])];
        } else if (isCurrentEntityStarships) {
          newResults = [
            ...(newResults as any),
            ...(resultsToShow as Starship[]),
          ];
        } else if (isCurrentEntityVehicles) {
          newResults = [
            ...(newResults as any),
            ...(resultsToShow as Vehicle[]),
          ];
        }

        if (shouldFetchFromNextPage) {
          if (isCurrentEntityPeople) {
            const extraPage = peoplePage === startPage ? endPage : startPage;
            setExtraPeoplePage(extraPage);
          } else if (isCurrentEntityPlanets) {
            const extraPage = planetsPage === startPage ? endPage : startPage;
            setExtraPlanetsPage(extraPage);
          } else if (isCurrentEntityStarships) {
            const extraPage = starshipsPage === startPage ? endPage : startPage;
            setExtraStarshipsPage(extraPage);
          } else if (isCurrentEntityVehicles) {
            const extraPage = vehiclesPage === startPage ? endPage : startPage;
            setExtraVehiclesPage(extraPage);
          }
        } else {
          if (isCurrentEntityPeople) {
            setExtraPeoplePage(-1);
          } else if (isCurrentEntityPlanets) {
            setExtraPlanetsPage(-1);
          } else if (isCurrentEntityStarships) {
            setExtraStarshipsPage(-1);
          } else if (isCurrentEntityVehicles) {
            setExtraVehiclesPage(-1);
          }
        }
        if (extraPeople?.results?.length! > 0) {
          newResults = [
            ...(newResults as any),
            ...extraPeople?.results!.slice(
              0,
              MAX_RESULTS_PER_PAGE - resultsToShow.length
            )!,
          ];
        }
        if (extraPlanets?.results?.length! > 0) {
          newResults = [
            ...(newResults as any),
            ...extraPlanets?.results!.slice(
              0,
              MAX_RESULTS_PER_PAGE - resultsToShow.length
            )!,
          ];
        }
        if (extraStarships?.results?.length! > 0) {
          newResults = [
            ...(newResults as any),
            ...extraStarships?.results.slice(
              0,
              MAX_RESULTS_PER_PAGE - resultsToShow.length
            )!,
          ];
        }
        if (extraVehicles?.results?.length! > 0) {
          newResults = [
            ...(newResults as any),
            ...extraVehicles?.results.slice(
              0,
              MAX_RESULTS_PER_PAGE - resultsToShow.length
            )!,
          ];
        }
        entity.results = newResults;
      }
    });

    setAllVisibleEntities(entities.filter((e) => e.results.length > 0));
  }, [
    page,
    people?.results,
    planets?.results,
    starships?.results,
    vehicles?.results,
    extraPeople?.results,
    extraPlanets?.results,
    extraStarships?.results,
    extraVehicles?.results,
  ]);

  useEffect(() => {
    // all of these checks are important, because we dont want the pagination to update multiple times
    // it should always stay the same until the user changes the search query and refreshes the page
    const totalPeople =
      isCurrentCategoryAll || isCurrentCategoryPeople
        ? people?.count ?? null
        : 0;

    const totalPlanets =
      isCurrentCategoryAll || isCurrentCategoryPlanets
        ? planets?.count ?? null
        : 0;

    const totalStarships =
      isCurrentCategoryAll || isCurrentCategoryStarships
        ? starships?.count ?? null
        : 0;

    const totalVehicles =
      isCurrentCategoryAll || isCurrentCategoryVehicles
        ? vehicles?.count ?? null
        : 0;

    if (
      isCurrentCategoryAll &&
      totalPeople !== null &&
      totalPlanets !== null &&
      totalStarships !== null &&
      totalVehicles !== null
    ) {
      setTotalEntities(
        totalPeople + totalPlanets + totalStarships + totalVehicles
      );
    }

    if (isCurrentCategoryPeople && totalPeople !== null) {
      setTotalEntities(totalPeople);
    }

    if (isCurrentCategoryPlanets && totalPlanets !== null) {
      setTotalEntities(totalPlanets);
    }

    if (isCurrentCategoryStarships && totalStarships !== null) {
      setTotalEntities(totalStarships);
    }
  }, [
    people?.count,
    planets?.count,
    starships?.count,
    vehicles?.count,
    isCurrentCategoryAll,
    isCurrentCategoryPeople,
    isCurrentCategoryPlanets,
    isCurrentCategoryStarships,
    isCurrentCategoryVehicles,
  ]);

  usePageSetter(currentPeopleStartIndex, setPeoplePage);
  usePageSetter(currentPlanetsStartIndex, setPlanetsPage);
  usePageSetter(currentStarshipsStartIndex, setStarshipsPage);
  usePageSetter(currentVehiclesStartIndex, setVehiclesPage);

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles ||
    isLoadingExtraPeople ||
    isLoadingExtraPlanets ||
    isLoadingExtraStarships ||
    isLoadingExtraVehicles;

  return (
    <div className="w-full mt-16 flex flex-row flex-wrap rounded">
      {isLoading && (
        <div className="results skeleton flex flex-col flex-wrap w-full rounded">
          <ul className="w-full rounded flex flex-row flex-wrap">
            <section className="w-full h-full flex flex-col flex-wrap">
              <div className="flex flex-col flex-wrap w-full">
                <ul className="w-full rounded flex flex-row flex-wrap bg-white">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <li
                      className="w-full h-16 bg-gray-300 rounded"
                      key={index}
                    ></li>
                  ))}
                </ul>
              </div>
            </section>
          </ul>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-wrap w-full">
          <ul className="w-full flex flex-row flex-wrap">
            {allVisibleEntities.map((resultSet, index) => {
              resultSet.results = resultSet.results.slice(
                0,
                MAX_RESULTS_PER_PAGE
              );

              return (
                <Fragment key={index}>
                  {resultSet.resultType === SEARCH_CATEGORIES.People && (
                    <PersonResults people={resultSet?.results as Person[]} />
                  )}
                  {resultSet.resultType === SEARCH_CATEGORIES.Planets && (
                    <PlanetResults planets={resultSet?.results as Planet[]} />
                  )}
                  {resultSet.resultType === SEARCH_CATEGORIES.Starships && (
                    <StarshipResults
                      starships={resultSet?.results as Starship[]}
                    />
                  )}
                  {resultSet.resultType === SEARCH_CATEGORIES.Vehicles && (
                    <VehicleResults
                      vehicles={resultSet?.results as Vehicle[]}
                    />
                  )}
                </Fragment>
              );
            })}
          </ul>
        </div>
      )}
      <Pagination
        totalPages={Math.ceil(totalEntities / MAX_RESULTS_PER_PAGE)}
        setPage={setPage}
        onNewPageClicked={onNewPageClicked}
      />
    </div>
  );
};

export default ResultsContainer;
