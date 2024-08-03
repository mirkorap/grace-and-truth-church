import { Route } from 'next';

export type PostImage = Omit<Post, 'id' | 'title' | 'text' | 'publishedAt'>;

export type PostBody = Pick<Post, 'title' | 'text' | 'href' | 'publishedAt'>;

export type PostOpts = Omit<Post, 'id'>;

export interface Post {
  id: number;
  category: string;
  author: string;
  title: string;
  text: string;
  href: Route;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
}
