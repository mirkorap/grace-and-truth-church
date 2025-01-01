import { Icon as Options } from '@/types/Icon';

import { Layouts } from './constants';

export default function Icon({ name, size, className = '' }: Options) {
  return <i className={`icon-${name} ${Layouts[size]} ${className}`}></i>;
}
