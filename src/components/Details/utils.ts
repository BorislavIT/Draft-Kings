import { useSWQuery } from "@/shared/queries";
import { Person, Planet, Starship, Vehicle } from "@/shared/types";

export const usePerson = (id: string, isCurrentCategoryPeople: boolean) => {
  const {
    data: person,
    isLoading: isLoadingPerson,
    error: personError,
  } = useSWQuery<Person>(
    ["person", id],
    `/people/${id}/`,
    isCurrentCategoryPeople
  );

  return {
    person,
    isLoadingPerson,
    personError,
  };
};

export const usePlanet = (id: string, isCurrentCategoryPlanets: boolean) => {
  const {
    data: planet,
    isLoading: isLoadingPlanet,
    error: planetError,
  } = useSWQuery<Planet>(
    ["planet", id],
    `/planets/${id}/`,
    isCurrentCategoryPlanets
  );

  return {
    planet,
    isLoadingPlanet,
    planetError,
  };
};

export const useStarship = (
  id: string,
  isCurrentCategoryStarships: boolean
) => {
  const {
    data: starship,
    isLoading: isLoadingStarship,
    error: starshipError,
  } = useSWQuery<Starship>(
    ["starship", id],
    `/starships/${id}/`,
    isCurrentCategoryStarships
  );

  return {
    starship,
    isLoadingStarship,
    starshipError,
  };
};

export const useVehicle = (id: string, isCurrentCategoryVehicles: boolean) => {
  const {
    data: vehicle,
    isLoading: isLoadingVehicle,
    error: vehicleError,
  } = useSWQuery<Vehicle>(
    ["vehicle", id],
    `/vehicles/${id}/`,
    isCurrentCategoryVehicles
  );

  return {
    vehicle,
    isLoadingVehicle,
    vehicleError,
  };
};
