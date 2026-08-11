'use client';

import { BOOK_ICONS_PATH } from '@/constants/bible-books';
import { useSermonFilters } from '@/hooks/filters';
import { BookItem as Options } from '@/types/Filter';
import clsx from 'clsx';
import Image from 'next/image';

export default function BookItem({ book, name, icon, count }: Options) {
  const { filters, apply } = useSermonFilters();

  const selected = filters.book === book;
  const empty = count === 0;

  function onClick() {
    apply({ book: selected ? '' : book });
  }

  return (
    <button
      aria-pressed={selected}
      data-selected={selected}
      disabled={empty}
      title={empty ? `${name}: nessun sermone` : name}
      type='button'
      className={clsx(
        'group flex w-20 shrink-0 snap-start flex-col items-center gap-y-1.5 rounded-lg px-1 py-2 transition-all sm:w-24',
        {
          'cursor-not-allowed opacity-40': empty,
          'hover:bg-primary-100': !empty,
          'bg-primary-100': selected,
        },
      )}
      onClick={onClick}
    >
      <span className='relative'>
        <Image
          unoptimized
          alt=''
          height={48}
          src={`${BOOK_ICONS_PATH}/${icon}`}
          width={48}
          className={clsx('size-12 rounded-full transition-all sm:size-14', {
            'ring-2 ring-primary-500 ring-offset-2': selected,
            'grayscale group-hover:grayscale-0': empty,
          })}
        />

        {!empty && (
          <span className='absolute -end-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 font-nunito text-[0.625rem] font-semibold leading-4 text-white'>
            {count}
          </span>
        )}
      </span>

      <span
        className={clsx(
          'text-center font-nunito text-[0.6875rem] leading-tight text-headline-700 sm:text-xs',
          { 'font-semibold text-primary-600': selected },
        )}
      >
        {name}
      </span>
    </button>
  );
}
