import { Route } from 'next';

export type ThumbnailOpts = Omit<Thumbnail, 'id'>;

export interface Thumbnail {
  id: number;
  title: string;
  href: Route;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
}
