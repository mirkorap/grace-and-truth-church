import EventCard from '@/components/EventCard';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import { fetchEventsByYear } from '@/libs/queries';

import { EventListSection as Options } from './types';

export default async function EventListSection({ year }: Options) {
  const events = await fetchEventsByYear(year);

  return (
    <section className='w-full py-8' id='event-list'>
      {events.length ? (
        <div className='grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3'>
          {events.map((item) => (
            <EventCard
              key={item.slug}
              description={item.description}
              endDate={item.endDate}
              image={item.image}
              slug={item.slug}
              startDate={item.startDate}
              title={item.title}
              venue={item.venue}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-y-3 py-20 text-center'>
          <TitleMedium text={`Nessun evento nel ${year}`} />
          <BodyLarge text="Non ci sono eventi pubblicati per l'anno selezionato. Prova a scegliere un altro anno dalla barra qui sopra." />
        </div>
      )}
    </section>
  );
}
