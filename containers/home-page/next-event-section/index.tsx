import RouteButton from '@/components/Button/RouteButton';
import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineMedium from '@/components/Heading/HeadlineMedium';
import TitleMedium from '@/components/Heading/TitleMedium';
import { formatDateRange } from '@/libs/dates';
import { fetchNextEvent } from '@/libs/queries';
import { Route } from 'next';
import Image from 'next/image';

const label =
  'font-nunito text-xs font-semibold uppercase tracking-wide text-secondary-300';

export default async function NextEventSection() {
  const event = await fetchNextEvent();
  if (!event) return null;

  const dates = formatDateRange(event.startDate, event.endDate);
  const place = [event.venue?.name, event.venue?.city]
    .filter(Boolean)
    .join(' · ');

  return (
    <section className='w-full bg-secondary-700 py-20 lg:py-24' id='next-event'>
      <div className='mx-auto flex w-full max-w-[40rem] flex-col items-center gap-10 px-4 lg:max-w-[85rem] lg:flex-row lg:gap-16'>
        <div className='relative aspect-[2/3] w-full max-w-sm shrink-0 overflow-hidden rounded-xl shadow-lg'>
          <Image
            fill
            alt={event.title}
            className='object-cover object-center'
            sizes='(min-width: 640px) 24rem, 100vw'
            src={event.image}
          />
        </div>

        <div className='flex flex-col items-center gap-y-4 text-center lg:items-start lg:text-start'>
          <span className='font-nunito text-sm font-semibold uppercase tracking-widest text-primary-300'>
            Prossimo evento
          </span>

          <TitleMedium className='text-secondary-100' text={dates} />
          <HeadlineMedium className='text-white' text={event.title} />

          {event.shortDescription ? (
            <BodyLarge
              className='line-clamp-4 text-secondary-100'
              text={event.shortDescription}
            />
          ) : null}

          {event.speaker || place ? (
            <div className='mt-2 flex flex-col items-center gap-6 border-t border-white/20 pt-5 text-center sm:flex-row sm:gap-10 lg:items-start lg:text-start'>
              {event.speaker ? (
                <div className='flex flex-col gap-y-1'>
                  <span className={label}>Relatore</span>
                  <BodyLarge className='text-white' text={event.speaker} />
                </div>
              ) : null}

              {place ? (
                <div className='flex flex-col gap-y-1'>
                  <span className={label}>Dove</span>
                  <BodyLarge className='text-white' text={place} />
                </div>
              ) : null}
            </div>
          ) : null}

          <RouteButton
            className='mt-4'
            href={`/news/${event.slug}` as Route}
            icon='forward'
            size='large'
            style='contained'
            text='Scopri di più'
            type='button'
          />
        </div>
      </div>
    </section>
  );
}
