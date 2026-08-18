'use client';

import IconButton from '@/components/Button/IconButton';
import { YearSlider as Options } from '@/types/Filter';
import { useEffect, useRef } from 'react';

import YearItem from '../YearItem';

export default function YearSlider({ years, selected }: Options) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = track.current;
    const active = node?.querySelector<HTMLElement>('[data-selected="true"]');

    if (!node || !active) return;

    const left =
      active.offsetLeft - node.clientWidth / 2 + active.clientWidth / 2;

    node.scrollTo({ left, behavior: 'smooth' });
  }, [selected]);

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
        text='Anni successivi'
        type='button'
        onClick={() => scroll(-1)}
      />

      <div
        ref={track}
        aria-label='Filtra gli eventi per anno'
        className='flex min-w-0 flex-1 snap-x snap-mandatory gap-x-2 overflow-x-auto scroll-smooth py-1'
        role='group'
      >
        {years.map((item) => (
          <YearItem
            key={item.year}
            count={item.count}
            selected={item.year === selected}
            year={item.year}
          />
        ))}
      </div>

      <IconButton
        className='hidden shrink-0 md:inline-flex'
        icon='forward'
        size='small'
        style='outlined'
        text='Anni precedenti'
        type='button'
        onClick={() => scroll(1)}
      />
    </div>
  );
}
