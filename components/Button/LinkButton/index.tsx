import { Layouts } from '@/components/Button/constants';
import { LinkButton as Options } from '@/types/Button';
import Link from 'next/link';

export default function LinkButton({
  text,
  href,
  type,
  style,
  className,
}: Options) {
  return (
    <Link
      href={href}
      type={type}
      className={`inline-flex items-center gap-x-2 rounded border px-4 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:py-4 ${Layouts[style]} ${className}`}
    >
      {text}
    </Link>
  );
}
