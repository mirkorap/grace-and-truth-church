export interface BibleBook {
  book: string;
  name: string;
  icon: string;
}

export interface BookFilter extends BibleBook {
  count: number;
}

export interface SermonFilters {
  book: string;
  title: string;
  from: string;
  to: string;
}

export type BookCounts = { [book: string]: number };

export type FilterBar = { books: BookFilter[] };

export type BookSlider = { books: BookFilter[] };

export type BookItem = BookFilter;

export const emptyFilters: SermonFilters = {
  book: '',
  title: '',
  from: '',
  to: '',
};

export interface EventFilters {
  year: string;
}

export interface YearFilter {
  year: number;
  count: number;
}

export type YearCounts = { [year: string]: number };

export type EventFilterBar = { years: YearFilter[]; selected: number };

export type YearSlider = EventFilterBar;

export type YearItem = YearFilter & { selected: boolean };
