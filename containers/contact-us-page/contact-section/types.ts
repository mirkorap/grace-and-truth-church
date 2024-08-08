export type ContactItemOpts = Omit<ContactItem, 'id'>;

export interface ContactItem {
  id: number;
  icon: string;
  color: string;
  text: string;
}

export interface EmailTemplate {
  name: string;
  email: string;
  subject: string;
  message: string;
}
