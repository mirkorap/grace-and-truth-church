import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import Icon from '@/components/Icon';
import { formatDateRange, isUpcoming } from '@/libs/dates';
import Link from 'next/link';

import { HeroSection as Options } from './types';

export default function HeroSection({ title, startDate, endDate }: Options) {
  const dates = formatDateRange(startDate, endDate);
  const upcoming = isUpcoming(startDate, endDate);

  return (
    <section className='w-full pt-44' id='hero'>
      <Link
        className='inline-flex items-center gap-x-2 font-nunito text-sm font-semibold text-primary-500'
        href='/news'
      >
        <Icon className='rotate-180' name='forward' size='small' />
        <span className='hover:underline'>Torna alle novità</span>
      </Link>

      <div className='mt-6 flex flex-col gap-y-3'>
        <div className='flex flex-wrap items-center gap-3'>
          <TitleMedium className='text-primary-500' text={dates} />

          {upcoming && (
            <span className='rounded-full bg-primary-500 px-3 py-1 font-nunito text-xs font-semibold text-white'>
              Prossimo evento
            </span>
          )}
        </div>

        <HeadlineLarge text={title} />
      </div>
    </section>
  );
}
