'use client';

import { FilterOpts as Options } from '@/types/Filter';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useIsSelected = (value: string): boolean => {
  const searchParams = useSearchParams();

  return searchParams.get('q') === value;
};

const useFilterPathname = (value: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string): string => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (!useIsSelected(value)) {
    const search = '?' + createQueryString('q', value);

    return { pathname, search };
  }

  return { pathname };
};

export default function FilterItem({ text, value, count }: Options) {
  return (
    <Link href={useFilterPathname(value)}>
      <div
        className={clsx(
          'flex w-full items-center justify-between rounded-md p-3 text-headline-700 transition-all hover:bg-primary-100 hover:text-headline-700',
          { 'bg-primary-500 text-white': useIsSelected(value) },
        )}
      >
        <span>{text}</span>
        <span>{count}</span>
      </div>
    </Link>
  );
}
