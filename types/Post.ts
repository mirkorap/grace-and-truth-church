import { Route } from 'next';

import { Block } from './Sanity';

export type PostImage = Omit<Post, 'id' | 'title' | 'text' | 'publishedAt'>;

export type PostBody = Pick<Post, 'title' | 'text' | 'publishedAt' | 'onClick'>;

export type PostOpts = Omit<Post, 'id'>;

export interface Post {
  id: number;
  category: string;
  author: string;
  title: string;
  text: Block;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
  onClick: () => void;
}
