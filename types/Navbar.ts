export interface NavItem {
  id: number;
  href: string;
  text: string;
}

export interface NavToggle {
  opened: boolean;
  onToggle: () => void;
}
