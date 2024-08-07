export type ContactItemOpts = Omit<ContactItem, 'id'>;

export interface ContactItem {
  id: number;
  icon: string;
  text: string;
}
