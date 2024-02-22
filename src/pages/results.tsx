import {
  Person,
  Planet,
  SearchResult,
  Starship,
  Vehicle,
} from "@/shared/types";
import { useSWQuery } from "@/shared/queries";
import { useSearchParams } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { SEARCH_CATEGORIES } from "@/components/Search/constants";
import { useQueryState } from "nuqs";
import {
  MAX_RESULTS_PER_PAGE,
  ResultSet,
} from "@/components/Results/constants";
import SearchWithResults from "@/components/Search/SearchWithResults";
import PersonResults from "@/components/Results/Person/PersonResults";
import PlanetResults from "@/components/Results/Planet/PlanetResults";
import StarshipResults from "@/components/Results/Starships/StarshipResults";
import VehicleResults from "@/components/Results/Vehicles/VehicleResults";

const ResultsPage: FC = () => {
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
  });

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

  const { data: people, isLoading: isLoadingPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people", peoplePage],
    `/people?search=${search}&page=${peoplePage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.People) &&
      search !== "" &&
      peoplePage > 0,
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: extraPeople, isLoading: isLoadingExtraPeople } = useSWQuery<
    SearchResult<Person>
  >(
    ["people", extraPeoplePage],
    `/people?search=${search}&page=${extraPeoplePage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.People) &&
      search !== "" &&
      extraPeoplePage > 0,
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
    ["planet", planetsPage],
    `/planets?search=${search}&page=${planetsPage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Planets) &&
      search !== "" &&
      planetsPage > 0,
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: extraPlanets, isLoading: isLoadingExtraPlanets } = useSWQuery<
    SearchResult<Planet>
  >(
    ["planet", extraPlanetsPage],
    `/planets?search=${search}&page=${extraPlanetsPage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Planets) &&
      search !== "" &&
      extraPlanetsPage > 0,
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
    ["starship", starshipsPage],
    `/starships?search=${search}&page=${starshipsPage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Starships) &&
      search !== "" &&
      starshipsPage > 0,
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: extraStarships, isLoading: isLoadingExtraStarships } =
    useSWQuery<SearchResult<Starship>>(
      ["starship", extraStarshipsPage],
      `/starships?search=${search}&page=${extraStarshipsPage}`,
      (category === SEARCH_CATEGORIES.All ||
        category === SEARCH_CATEGORIES.Starships) &&
        search !== "" &&
        extraStarshipsPage > 0,
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
    ["vehicle", vehiclesPage],
    `/vehicles?search=${search}&page=${vehiclesPage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles) &&
      search !== "" &&
      vehiclesPage > 0,
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const { data: extraVehicles, isLoading: isLoadingExtraVehicles } = useSWQuery<
    SearchResult<Vehicle>
  >(
    ["vehicles", extraVehiclesPage],
    `/vehicles?search=${search}&page=${extraVehiclesPage}`,
    (category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles) &&
      search !== "" &&
      extraVehiclesPage > 0,
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const [allVisibleEntities, setAllVisibleEntities] = useState<
    (
      | ResultSet<Person>
      | ResultSet<Planet>
      | ResultSet<Starship>
      | ResultSet<Vehicle>
    )[]
  >([]);

  useEffect(() => {
    if (
      category === SEARCH_CATEGORIES.All &&
      people &&
      planets &&
      starships &&
      vehicles
    ) {
      const peopleResultSet: ResultSet<Person> = {
        resultType: SEARCH_CATEGORIES.People,
        count: people.count ?? 0,
        results: people.results ?? [],
      };

      const planetsResultSet: ResultSet<Planet> = {
        resultType: SEARCH_CATEGORIES.Planets,
        count: planets.count ?? 0,
        results: planets.results ?? [],
      };

      const starshipsResultSet: ResultSet<Starship> = {
        resultType: SEARCH_CATEGORIES.Starships,
        count: starships.count ?? 0,
        results: starships.results ?? [],
      };

      const vehiclesResultSet: ResultSet<Vehicle> = {
        resultType: SEARCH_CATEGORIES.Vehicles,
        count: vehicles.count ?? 0,
        results: vehicles.results ?? [],
      };

      const entities = [
        peopleResultSet,
        planetsResultSet,
        starshipsResultSet,
        vehiclesResultSet,
      ];

      entities.sort((a, b) => b.count - a.count);

      const currentPageStartRange =
        parseInt(page) * MAX_RESULTS_PER_PAGE - MAX_RESULTS_PER_PAGE;
      const currentPageEndRange = parseInt(page) * MAX_RESULTS_PER_PAGE;

      entities.forEach((entity, index) => {
        let previousEntityEndRange = 0;
        for (let index = 0; index < entities.length; index++) {
          if (entities[index] === entity) break;

          previousEntityEndRange += entities[index].count;
        }
        const isFirstEntity = index === 0;
        const entityStartRange = isFirstEntity ? 0 : previousEntityEndRange;
        const entityEndRange = entity.count + entityStartRange;

        if (
          entityEndRange >= currentPageStartRange &&
          entityStartRange < currentPageEndRange
        ) {
          const start = Math.max(entityStartRange, currentPageStartRange);
          const end = Math.min(entityEndRange, currentPageEndRange);
          const entityResultsShowCount = end - start;

          const resultsStartIndex = Math.max(0, start - entityStartRange);
          const resultsEndIndex =
            resultsStartIndex + entityResultsShowCount - 1;

          if (entity.resultType === SEARCH_CATEGORIES.People) {
            setCurrentPeopleStartIndex(resultsStartIndex);
          } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
            setCurrentPlanetsStartIndex(resultsStartIndex);
          } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
            setCurrentStarshipsStartIndex(resultsStartIndex);
          } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
            setCurrentVehiclesStartIndex(resultsStartIndex);
          }

          const resultsToShow = entity.results.slice(
            resultsStartIndex,
            resultsEndIndex + 1
          );

          if (resultsStartIndex >= MAX_RESULTS_PER_PAGE) {
            let newEntityActualStartIndex =
              resultsStartIndex % MAX_RESULTS_PER_PAGE;
            let newEntityActualEndIndex =
              resultsEndIndex % MAX_RESULTS_PER_PAGE;

            if (newEntityActualEndIndex < newEntityActualStartIndex) {
              newEntityActualEndIndex = MAX_RESULTS_PER_PAGE - 1;
            }

            // START OF BULLSHIT
            const startPage =
              Math.floor(resultsStartIndex / MAX_RESULTS_PER_PAGE) + 1;
            const endPage =
              Math.floor(resultsEndIndex / MAX_RESULTS_PER_PAGE) + 1;

            if (startPage !== endPage) {
              if (entity.resultType === SEARCH_CATEGORIES.People) {
                const extraPage =
                  peoplePage === startPage ? endPage : startPage;
                setExtraPeoplePage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
                const extraPage =
                  planetsPage === startPage ? endPage : startPage;
                setExtraPlanetsPage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
                const extraPage =
                  starshipsPage === startPage ? endPage : startPage;
                setExtraStarshipsPage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
                const extraPage =
                  vehiclesPage === startPage ? endPage : startPage;
                setExtraVehiclesPage(extraPage);
              }
            } else {
              if (entity.resultType === SEARCH_CATEGORIES.People) {
                setExtraPeoplePage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
                setExtraPlanetsPage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
                setExtraStarshipsPage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
                setExtraVehiclesPage(-1);
              }
            }
            let newResults: Vehicle[] | Starship[] | Planet[] | Person[] = [];
            if (extraPeople?.results?.length! > 0) {
              newResults = [...(newResults as any), ...extraPeople?.results!];
            }
            if (extraPlanets?.results?.length! > 0) {
              newResults = [...(newResults as any), ...extraPlanets?.results!];
            }
            if (extraStarships?.results?.length! > 0) {
              newResults = [
                ...(newResults as any),
                ...extraStarships?.results!,
              ];
            }
            if (extraVehicles?.results?.length! > 0) {
              newResults = [...(newResults as any), ...extraVehicles?.results!];
            }
            //END OF BULLSHIT

            const newEntityPage =
              Math.floor(resultsStartIndex / MAX_RESULTS_PER_PAGE) + 1;

            if (entity.resultType === SEARCH_CATEGORIES.People) {
              setPeoplePage(newEntityPage);
            } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
              setPlanetsPage(newEntityPage);
            } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
              setStarshipsPage(newEntityPage);
            } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
              setVehiclesPage(newEntityPage);
            }

            const currentPageResults = [
              ...entity.results.slice(
                newEntityActualStartIndex,
                newEntityActualEndIndex + 1
              ),
              ...newResults,
            ].slice(0, MAX_RESULTS_PER_PAGE);

            if (entity.resultType === SEARCH_CATEGORIES.People) {
              entity.results = currentPageResults as Person[];
            } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
              entity.results = currentPageResults as Planet[];
            } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
              entity.results = currentPageResults as Starship[];
            } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
              entity.results = currentPageResults as Vehicle[];
            }
          } else {
            let newResults: Vehicle[] | Starship[] | Planet[] | Person[] = [];

            if (entity.resultType === SEARCH_CATEGORIES.People) {
              newResults = [
                ...(newResults as any),
                ...(resultsToShow as Person[]),
              ];
            } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
              newResults = [
                ...(newResults as any),
                ...(resultsToShow as Planet[]),
              ];
            } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
              newResults = [
                ...(newResults as any),
                ...(resultsToShow as Starship[]),
              ];
            } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
              newResults = [
                ...(newResults as any),
                ...(resultsToShow as Vehicle[]),
              ];
            }
            const startPage =
              Math.floor(resultsStartIndex / MAX_RESULTS_PER_PAGE) + 1;
            const endPage =
              Math.floor(resultsEndIndex / MAX_RESULTS_PER_PAGE) + 1;

            if (startPage !== endPage) {
              if (entity.resultType === SEARCH_CATEGORIES.People) {
                const extraPage =
                  peoplePage === startPage ? endPage : startPage;
                setExtraPeoplePage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
                const extraPage =
                  planetsPage === startPage ? endPage : startPage;
                setExtraPlanetsPage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
                const extraPage =
                  starshipsPage === startPage ? endPage : startPage;
                setExtraStarshipsPage(extraPage);
              } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
                const extraPage =
                  vehiclesPage === startPage ? endPage : startPage;
                setExtraVehiclesPage(extraPage);
              }
            } else {
              if (entity.resultType === SEARCH_CATEGORIES.People) {
                setExtraPeoplePage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Planets) {
                setExtraPlanetsPage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Starships) {
                setExtraStarshipsPage(-1);
              } else if (entity.resultType === SEARCH_CATEGORIES.Vehicles) {
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
        } else {
          entity.results = [];
        }
      });

      setAllVisibleEntities(entities.filter((e) => e.results.length > 0));
    }
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

  const [totalEntities, setTotalEntities] = useState<number>(0);

  useEffect(() => {
    if (
      category === SEARCH_CATEGORIES.All &&
      people &&
      planets &&
      starships &&
      vehicles
    ) {
      setTotalEntities(
        people.count + planets.count + starships.count + vehicles.count
      );
    }
  }, [people?.count, planets?.count, starships?.count, vehicles?.count]);

  useEffect(() => {
    if (currentPeopleStartIndex >= 0) {
      setPeoplePage(
        Math.floor(currentPeopleStartIndex / MAX_RESULTS_PER_PAGE) + 1
      );
    }
  }, [currentPeopleStartIndex]);

  useEffect(() => {
    if (currentPlanetsStartIndex >= 0) {
      setPlanetsPage(
        Math.floor(currentPlanetsStartIndex / MAX_RESULTS_PER_PAGE) + 1
      );
    }
  }, [currentPlanetsStartIndex]);

  useEffect(() => {
    if (currentStarshipsStartIndex >= 0) {
      setStarshipsPage(
        Math.floor(currentStarshipsStartIndex / MAX_RESULTS_PER_PAGE) + 1
      );
    }
  }, [currentStarshipsStartIndex]);

  useEffect(() => {
    if (currentVehiclesStartIndex >= 0) {
      setVehiclesPage(
        Math.floor(currentVehiclesStartIndex / MAX_RESULTS_PER_PAGE) + 1
      );
    }
  }, [currentVehiclesStartIndex]);

  const isLoading =
    isLoadingPeople ||
    isLoadingPlanets ||
    isLoadingStarships ||
    isLoadingVehicles ||
    isLoadingExtraPeople ||
    isLoadingExtraPlanets ||
    isLoadingExtraStarships ||
    isLoadingExtraVehicles;

  const onNewPageClicked = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage.toString());
  };

  const Pagination = () => {
    return (
      <ul className="pagination flex flex-row flex-nowrap justify-end text-white">
        {Array.from({
          length: Math.ceil(totalEntities / MAX_RESULTS_PER_PAGE),
        }).map((_, index) => (
          <li
            key={index}
            className="border border-solid border-gray-200 hover:bg-gray-200 p-3 cursor-pointer bg-white text-black"
            onClick={() => onNewPageClicked(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="w-full h-full flex flex-col flex-wrap">
      <SearchWithResults />
      {isLoading && (
        <div className="flex flex-col flex-wrap w-full">
          <ul className="w-full rounded flex flex-row flex-wrap">
            <section className="w-full h-full flex flex-col flex-wrap">
              <div className="flex flex-col flex-wrap w-full mb-2">
                <ul className="w-full rounded flex flex-row flex-wrap bg-white">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <li className="w-full h-16 bg-gray-200" key={index}></li>
                  ))}
                </ul>
              </div>
            </section>
          </ul>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-wrap w-full">
          <ul className="w-full rounded flex flex-row flex-wrap">
            {allVisibleEntities.map((resultSet, index) => (
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
                  <VehicleResults vehicles={resultSet?.results as Vehicle[]} />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
      <Pagination />
    </section>
  );
};

export default ResultsPage;
