export type DoctrinalItemOpts = Omit<DoctrinalItem, 'id'>;

export interface DoctrinalItem {
  id: number;
  title: string;
  text: string;
  verses: string[];
}
