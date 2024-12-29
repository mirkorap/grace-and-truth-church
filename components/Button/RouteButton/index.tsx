import Icon from '@/components/Icon';
import { RouteButton as Options } from '@/types/Button';
import Link from 'next/link';

import { Layouts } from './constants';

export default function RouteButton({
  text,
  href,
  type,
  style,
  size,
  icon,
  className = '',
}: Options) {
  return (
    <Link
      className={`inline-flex items-center gap-x-2 rounded border font-nunito text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${Layouts[style]} ${Layouts[size]} ${className}`}
      href={href}
      type={type}
    >
      {text}

      {icon ? <Icon name={icon} size='small' /> : null}
    </Link>
  );
}
