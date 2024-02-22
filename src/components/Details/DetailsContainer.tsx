import { compareToLowerStrings } from "@/shared/utils";
import { useParams, useSearchParams } from "next/navigation";
import { DEFAULT_CATEGORY, SEARCH_CATEGORIES } from "../Search/constants";
import { usePerson, usePlanet, useStarship, useVehicle } from "./utils";
import { DETAILS_CATEGORY_QUERY_PARAM } from "./constants";
import DetailedPerson from "./Person/DetailedPerson";
import DetailedVehicle from "./Vehicle/DetailedVehicle";
import DetailedStarship from "./Starship/DetailedStarship";
import DetailedPlanet from "./Planet/DetailedPlanet";
import { ProgressSpinner } from "primereact/progressspinner";

const DetailsContainer = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams()!;
  const category =
    searchParams.get(DETAILS_CATEGORY_QUERY_PARAM) ?? DEFAULT_CATEGORY;
  const id = params?.id ?? "1";

  const isCurrentCategoryPeople = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.People
  );
  const isCurrentCategoryPlanets = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Planets
  );
  const isCurrentCategoryStarships = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Starships
  );
  const isCurrentCategoryVehicles = compareToLowerStrings(
    category,
    SEARCH_CATEGORIES.Vehicles
  );

  const { person, isLoadingPerson } = usePerson(id, isCurrentCategoryPeople);
  const { planet, isLoadingPlanet } = usePlanet(id, isCurrentCategoryPlanets);
  const { starship, isLoadingStarship } = useStarship(
    id,
    isCurrentCategoryStarships
  );
  const { vehicle, isLoadingVehicle } = useVehicle(
    id,
    isCurrentCategoryVehicles
  );

  const isLoading =
    isLoadingPerson || isLoadingPlanet || isLoadingStarship || isLoadingVehicle;

  return (
    <div className="w-full h-full">
      <section className="details w-full mt-16 flex justify-center items-center">
        {isLoading && (
          <div>
            <ProgressSpinner />
          </div>
        )}
        {isCurrentCategoryPeople && person && (
          <DetailedPerson person={person} />
        )}
        {isCurrentCategoryVehicles && vehicle && (
          <DetailedVehicle vehicle={vehicle} />
        )}
        {isCurrentCategoryPlanets && planet && (
          <DetailedPlanet planet={planet} />
        )}
        {isCurrentCategoryStarships && starship && (
          <DetailedStarship starship={starship} />
        )}
      </section>
    </div>
  );
};

export default DetailsContainer;
