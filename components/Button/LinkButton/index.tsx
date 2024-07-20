import { Layouts } from '@/components/Button/constants';
import { LinkButton as Options } from '@/types/Button';
import Link from 'next/link';

export default function LinkButton({
  text,
  href,
  type,
  style,
  size,
  className,
}: Options) {
  return (
    <Link
      href={href}
      type={type}
      className={`inline-flex items-center gap-x-2 rounded border text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${Layouts[style]} ${Layouts[size]} ${className}`}
    >
      {text}
    </Link>
  );
}
