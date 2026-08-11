'use client';

import { useSermonFilters } from '@/hooks/filters';
import { useEffect, useState } from 'react';

const DEBOUNCE_MS = 400;

const field =
  'rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-800 outline-primary-500 focus:bg-transparent';
const label = 'font-nunito text-xs font-semibold uppercase text-headline-500';

export default function SearchFilters() {
  const { filters, apply, clear, isActive } = useSermonFilters();
  const [title, setTitle] = useState(filters.title);

  useEffect(() => {
    setTitle(filters.title);
  }, [filters.title]);

  useEffect(() => {
    if (title === filters.title) return;

    const timeout = setTimeout(() => apply({ title }), DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [title, filters.title, apply]);

  return (
    <div className='flex w-full flex-col gap-4 md:flex-row md:items-end'>
      <div className='flex w-full flex-col gap-y-2 md:flex-1'>
        <label className={label} htmlFor='sermon-title'>
          Titolo
        </label>

        <input
          className={field}
          id='sermon-title'
          name='title'
          placeholder='Cerca per titolo...'
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className='flex w-full flex-col gap-y-2 md:w-44'>
        <label className={label} htmlFor='sermon-from'>
          Dal
        </label>

        <input
          className={field}
          id='sermon-from'
          max={filters.to || undefined}
          name='from'
          type='date'
          value={filters.from}
          onChange={(event) => apply({ from: event.target.value })}
        />
      </div>

      <div className='flex w-full flex-col gap-y-2 md:w-44'>
        <label className={label} htmlFor='sermon-to'>
          Al
        </label>

        <input
          className={field}
          id='sermon-to'
          min={filters.from || undefined}
          name='to'
          type='date'
          value={filters.to}
          onChange={(event) => apply({ to: event.target.value })}
        />
      </div>

      <button
        className='rounded-md border border-primary-500 px-4 py-3 font-nunito text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-500 hover:text-white disabled:pointer-events-none disabled:border-gray-200 disabled:text-gray-300'
        disabled={!isActive}
        type='button'
        onClick={clear}
      >
        Azzera filtri
      </button>
    </div>
  );
}
