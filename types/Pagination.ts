export interface Pagination {
  page: number;
  totalPages: number;
  params?: { [key: string]: string };
}
