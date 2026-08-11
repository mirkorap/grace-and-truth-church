'use client';

import IconButton from '@/components/Button/IconButton';
import { useSermonFilters } from '@/hooks/filters';
import { BookSlider as Options } from '@/types/Filter';
import { useEffect, useRef } from 'react';

import BookItem from '../BookItem';

export default function BookSlider({ books }: Options) {
  const track = useRef<HTMLDivElement>(null);
  const { filters } = useSermonFilters();

  useEffect(() => {
    const node = track.current;
    const active = node?.querySelector<HTMLElement>('[data-selected="true"]');

    if (!node || !active) return;

    const left =
      active.offsetLeft - node.clientWidth / 2 + active.clientWidth / 2;

    node.scrollTo({ left, behavior: 'smooth' });
  }, [filters.book]);

  function scroll(direction: -1 | 1) {
    const node = track.current;

    if (!node) return;

    node.scrollBy({
      left: direction * node.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }

  return (
    <div className='flex w-full items-center gap-x-2'>
      <IconButton
        className='hidden shrink-0 rotate-180 md:inline-flex'
        icon='forward'
        size='small'
        style='outlined'
        text='Libri precedenti'
        type='button'
        onClick={() => scroll(-1)}
      />

      <div
        ref={track}
        aria-label='Filtra per libro della Bibbia'
        className='flex min-w-0 flex-1 snap-x snap-mandatory gap-x-1 overflow-x-auto scroll-smooth py-1'
        role='group'
      >
        {books.map((item) => (
          <BookItem
            key={item.book}
            book={item.book}
            count={item.count}
            icon={item.icon}
            name={item.name}
          />
        ))}
      </div>

      <IconButton
        className='hidden shrink-0 md:inline-flex'
        icon='forward'
        size='small'
        style='outlined'
        text='Libri successivi'
        type='button'
        onClick={() => scroll(1)}
      />
    </div>
  );
}
