export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonStyle = 'contained' | 'outlined' | 'text';

export type ButtonLayout = Record<ButtonStyle, string>;

export interface Button {
  text: string;
  type: ButtonType;
  style: ButtonStyle;
  className?: string;
  onClick?: () => void;
}

export interface LinkButton extends Omit<Button, 'onClick'> {
  href: string;
}
