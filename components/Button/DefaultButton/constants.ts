import { ButtonLayout } from '@/types/Button';

export const Layouts: ButtonLayout = {
  // Style
  contained: 'border-transparent bg-white text-gray-800 hover:bg-gray-100',
  outlined: 'border-gray-800 text-gray-800 hover:bg-gray-100',
  text: 'border-transparent text-gray-600 hover:text-gray-800',

  // Size
  large: 'px-5 py-4 sm:px-8 sm:py-4',
  medium: 'px-4 py-3 sm:px-6 sm:py-3',
  small: 'px-3 py-2 sm:px-4 sm:py-2',
};
