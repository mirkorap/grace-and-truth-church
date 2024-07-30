export type ThumbnailOpts = Omit<Thumbnail, 'id'>;

export interface Thumbnail {
  id: number;
  title: string;
  text: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
}
