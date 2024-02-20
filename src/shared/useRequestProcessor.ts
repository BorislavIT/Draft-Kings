import {
  useQuery,
  useQueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export const useRequestProcessor = () => {
  const queryClient = useQueryClient();

  const query = <T>(
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

  return { query };
};

// sw = star wars query, this will be used to query the star wars api
export const useSWQuery = <T>(
  queryKey: QueryKey,
  path: string,
  enabled: boolean
) => {
  const { query } = useRequestProcessor();

  const { data } = query<T[]>(
    queryKey,
    () => axiosClient.get(path).then((res) => res.data),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 mins
      cacheTime: 15 * 60 * 1000, // 15 mins
    }
  );

  return { data };
};
