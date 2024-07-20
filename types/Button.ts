export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonStyle = 'contained' | 'outlined' | 'text';

export type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonLayout = Record<ButtonStyle | ButtonSize, string>;

export interface Button {
  text: string;
  type: ButtonType;
  style: ButtonStyle;
  size: ButtonSize;
  className?: string;
  onClick?: () => void;
}

export interface LinkButton extends Omit<Button, 'onClick'> {
  href: string;
}
