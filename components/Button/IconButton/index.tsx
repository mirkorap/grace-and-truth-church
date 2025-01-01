import Icon from '@/components/Icon';
import { IconButton as Options } from '@/types/Button';

import { Layouts } from './constants';

export default function IconButton({
  text,
  type,
  style,
  size,
  icon,
  className = '',
  onClick,
}: Options) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-x-2 rounded-full border font-nunito text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${Layouts[style]} ${Layouts[size]} ${className}`}
      type={type}
      onClick={onClick}
    >
      <span className='sr-only'>{text}</span>
      <Icon name={icon} size={size} />
    </button>
  );
}
