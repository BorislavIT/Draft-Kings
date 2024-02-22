export const MAX_RESULTS_PER_PAGE = 10;

export type ResultSet<T> = {
  resultType: string;
  count: number;
  results: T[];
};

export const RESULTS_SEARCH_QUERY_PARAM = "resultsSearch";
export const RESULTS_CATEGORY_QUERY_PARAM = "resultsCategory";
export const PAGE_QUERY_PARAM = "page";
