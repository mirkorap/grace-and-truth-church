'use client';

import { useEventFilters } from '@/hooks/filters';
import { YearItem as Options } from '@/types/Filter';
import clsx from 'clsx';

export default function YearItem({ year, count, selected }: Options) {
  const { select } = useEventFilters();

  const empty = count === 0;

  return (
    <button
      aria-pressed={selected}
      data-selected={selected}
      disabled={empty || selected}
      title={empty ? `${year}: nessun evento` : `Eventi del ${year}`}
      type='button'
      className={clsx(
        'flex shrink-0 snap-start items-center gap-x-2 rounded-full border px-4 py-2 font-nunito text-sm font-semibold transition-all',
        {
          'cursor-not-allowed border-slate-200 text-gray-300': empty,
          'border-primary-500 bg-primary-500 text-white': selected,
          'border-slate-200 text-headline-700 hover:bg-primary-100':
            !empty && !selected,
        },
      )}
      onClick={() => select(year)}
    >
      {year}

      {!empty && (
        <span
          className={clsx(
            'inline-flex min-w-5 items-center justify-center rounded-full px-1 text-[0.625rem] leading-5',
            {
              'bg-white text-primary-600': selected,
              'bg-primary-500 text-white': !selected,
            },
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
