export type CardImage = Pick<Card, 'href' | 'imgSrc' | 'imgAlt'>;

export type CardBody = Pick<Card, 'title' | 'text' | 'href'>;

export type CardOpts = Omit<Card, 'id'>;

export interface Card {
  id: number;
  title: string;
  text: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}
