import { Route } from 'next';

export type NavItemOpts = Omit<NavItem, 'id'>;

export interface NavItem {
  id: number;
  href: Route;
  text: string;
}
