export interface ISearchContainer<T> {
  page?: number;
  results?: T[];
  totalPages?: number;
  totalResults?: number;
}
