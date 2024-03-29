import { useQuery, QueryFunction, QueryKey } from "@tanstack/react-query";
import swapiClient from "./swapiClient";

export const useDKQuery = <T>(
  key: QueryKey,
  queryFunction: QueryFunction<T>,
  options = {}
) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: queryFunction,
    ...options,
  });
};

// sw = star wars, this will be used to query the star wars api
export const useSWQuery = <T>(
  queryKey: QueryKey,
  path: string,
  enabled: boolean,
  options = {}
) => {
  const { data, isLoading, error } = useDKQuery<T>(
    queryKey,
    () => swapiClient.get(path).then((res) => res.data),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 mins
      cacheTime: 15 * 60 * 1000, // 15 mins
      ...options,
    }
  );

  return { data, isLoading, error };
};
