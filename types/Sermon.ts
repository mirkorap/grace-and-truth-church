import { Block, emptyBlock } from './Sanity';

export type SermonFilterOpts = Omit<SermonFilter, 'id'>;

export type SermonFilters = { items: SermonFilter[] };

export interface Sermon {
  title: string;
  slug: string;
  publishedAt: Date;
  author: string;
  book: string;
  verses: string;
  image: string;
  text: Block;
}

export interface GroupedSermon {
  book: string;
  count: number;
}

export interface SermonFilter {
  id: number;
  text: string;
  value: string;
  count: number;
}

export const emptySermon: Sermon = {
  title: '',
  slug: '',
  publishedAt: new Date(),
  author: '',
  book: '',
  verses: '',
  image: '',
  text: emptyBlock,
};
