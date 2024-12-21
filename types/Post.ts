import { Route } from 'next';

import { Block } from './Sanity';

export type PostImage = Omit<Post, 'id' | 'title' | 'text' | 'publishedAt'>;

export type PostBody = Pick<Post, 'title' | 'text' | 'href' | 'publishedAt'>;

export type PostOpts = Omit<Post, 'id'>;

export interface Post {
  id: number;
  author: string;
  book: string;
  title: string;
  text: Block;
  href: Route;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
}
