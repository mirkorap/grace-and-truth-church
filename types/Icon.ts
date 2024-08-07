export type IconSize = 'large' | 'medium' | 'small';

export type IconLayout = Record<IconSize, string>;

export interface Icon {
  name: string;
  size: IconSize;
  className?: string;
}
