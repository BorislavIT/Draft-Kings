export const MAX_RESULTS_PER_PAGE = 10;

export type ResultSet<T> = {
  resultType: string;
  count: number;
  results: T[];
};
