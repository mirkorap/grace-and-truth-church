import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import Icon from '@/components/Icon';
import { formatDateRange, isUpcoming } from '@/libs/dates';
import { toPlainText } from '@/libs/portable-text';
import { EventCard as Options } from '@/types/Event';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCard({
  title,
  slug,
  startDate,
  endDate,
  image,
  description,
  venue,
}: Options) {
  const dates = formatDateRange(startDate, endDate);
  const upcoming = isUpcoming(startDate, endDate);
  const excerpt = toPlainText(description);

  return (
    <Link
      className='group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-lg'
      href={`/news/${slug}` as Route}
    >
      <div className='relative aspect-[2/3] overflow-hidden'>
        <Image
          fill
          alt={title}
          className='object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105'
          sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          src={image}
        />

        {upcoming && (
          <span className='absolute end-3 top-3 rounded-full bg-primary-500 px-3 py-1 font-nunito text-xs font-semibold text-white shadow-sm'>
            Prossimo evento
          </span>
        )}
      </div>

      <div className='flex flex-1 flex-col gap-y-2 p-4 md:p-5'>
        <TitleSmall className='text-primary-500' text={dates} />
        <TitleLarge className='group-hover:underline' text={title} />

        {excerpt ? <BodyLarge className='line-clamp-3' text={excerpt} /> : null}

        {venue?.city ? (
          <span className='mt-auto flex items-center gap-x-2 pt-3 font-nunito text-sm text-headline-500'>
            <Icon className='text-base' name='pin' size='small' />
            {venue.city}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
