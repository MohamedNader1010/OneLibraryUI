export interface IPaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  results: T[];
}
