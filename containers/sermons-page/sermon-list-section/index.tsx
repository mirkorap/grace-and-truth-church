import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import Pagination from '@/components/Pagination';
import {
  SERMONS_PER_PAGE,
  fetchSermonsCount,
  fetchSermonsPage,
} from '@/libs/queries';
import { SermonFilters } from '@/types/Filter';

import SermonList from './sermon-list';
import { SermonListSection as Options } from './types';

const toQuery = (filters: SermonFilters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => !!value),
  );
};

export default async function SermonListSection({ page, filters }: Options) {
  const [sermons, total] = await Promise.all([
    fetchSermonsPage(page, filters),
    fetchSermonsCount(filters),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / SERMONS_PER_PAGE));

  return (
    <section className='w-full py-8' id='sermon-list'>
      {sermons.length ? (
        <>
          <div className='flex w-full flex-col items-start justify-center py-12'>
            <SermonList sermons={sermons} />
          </div>
          <Pagination
            page={page}
            params={toQuery(filters)}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div className='flex flex-col items-center gap-y-3 py-20 text-center'>
          <TitleMedium text='Nessun sermone trovato' />
          <BodyLarge text='Non ci sono sermoni che corrispondono ai filtri selezionati. Prova a cambiare libro, titolo o intervallo di date.' />
        </div>
      )}
    </section>
  );
}
