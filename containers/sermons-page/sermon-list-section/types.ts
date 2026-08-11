import { SermonFilters } from '@/types/Filter';
import { Sermon } from '@/types/Sermon';

export interface SermonList {
  sermons: Sermon[];
}

export interface SermonListSection {
  page: number;
  filters: SermonFilters;
}
