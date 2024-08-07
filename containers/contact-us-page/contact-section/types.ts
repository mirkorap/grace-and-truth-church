export type ContactItemOpts = Omit<ContactItem, 'id'>;

export interface ContactItem {
  id: number;
  icon: string;
  color: string;
  text: string;
}
