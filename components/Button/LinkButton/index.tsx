import Icon from '@/components/Icon';
import { LinkButton as Options } from '@/types/Button';

import { Layouts } from './constants';

export default function LinkButton({
  text,
  href,
  type,
  style,
  size,
  icon,
  className = '',
}: Options) {
  return (
    <a
      className={`inline-flex items-center gap-x-2 rounded border font-nunito text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${Layouts[style]} ${Layouts[size]} ${className}`}
      href={href}
      target='_blank'
      type={type}
    >
      {text}

      {icon ? <Icon name={icon} size='small' /> : null}
    </a>
  );
}
