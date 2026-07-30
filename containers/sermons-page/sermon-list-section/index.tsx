import Pagination from '@/components/Pagination';
import {
  SERMONS_PER_PAGE,
  fetchSermonsCount,
  fetchSermonsPage,
} from '@/libs/queries';

import SermonList from './sermon-list';
import { SermonListSection as Options } from './types';

export default async function SermonListSection({ page }: Options) {
  const [sermons, total] = await Promise.all([
    fetchSermonsPage(page),
    fetchSermonsCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / SERMONS_PER_PAGE));

  return (
    <section className='w-full py-8' id='sermon-list'>
      <div className='flex flex-col items-start justify-center gap-y-10 py-12 lg:flex-row lg:gap-x-24 lg:gap-y-0'>
        <SermonList sermons={sermons} />
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}
