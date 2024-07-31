'use client';

import { NavItemOpts as Options } from '@/types/Nav';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem({ href, text }: Options) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={clsx('text-headline-700 hover:text-headline-400', {
          'text-primary-500 hover:text-primary-600': pathname === href,
        })}
      >
        {text}
      </Link>
    </li>
  );
}
