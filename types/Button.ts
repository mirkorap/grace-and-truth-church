import { Route } from 'next';
import { RequireExactlyOne } from 'type-fest';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonStyle = 'contained' | 'outlined' | 'text';

export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonLayout = Record<ButtonStyle | ButtonSize, string>;

export type IconButton = RequireExactlyOne<Button, 'icon'>;

export interface Button {
  text: string;
  type: ButtonType;
  style: ButtonStyle;
  size: ButtonSize;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export interface LinkButton extends Omit<Button, 'onClick'> {
  href: string;
}

export interface RouteButton extends Omit<Button, 'onClick'> {
  href: Route;
}

export interface ToggleButton {
  opened: boolean;
  onToggle: () => void;
}
