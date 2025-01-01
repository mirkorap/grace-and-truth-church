export type FilterOpts = Omit<Filter, 'id'>;

export type FilterBar = { items: Filter[] };

export interface Filter {
  id: number;
  text: string;
  value: string;
  count: number;
}
