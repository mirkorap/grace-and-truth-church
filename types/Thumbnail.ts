export type ThumbnailOpts = Omit<Thumbnail, 'id'>;

export interface Thumbnail {
  id: number;
  title: string;
  imgSrc: string;
  imgAlt: string;
  publishedAt: Date;
  onClick: () => void;
}
