export type NavItemOpts = Omit<NavItem, 'id'>;

export interface NavItem {
  id: number;
  href: string;
  text: string;
}
