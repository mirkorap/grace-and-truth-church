import { Block } from './Sanity';

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
