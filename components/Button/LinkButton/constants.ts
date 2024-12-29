import { ButtonLayout } from '@/types/Button';

export const Layouts: ButtonLayout = {
  // Style
  contained:
    'border-transparent bg-primary-500 text-white hover:bg-primary-600',
  outlined:
    'border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  text: 'border-transparent text-primary-500 hover:text-primary-600',

  // Size
  large: 'px-5 py-4 sm:px-8 sm:py-4',
  medium: 'px-4 py-3 sm:px-6 sm:py-3',
  small: 'px-3 py-2 sm:px-4 sm:py-2',
};
