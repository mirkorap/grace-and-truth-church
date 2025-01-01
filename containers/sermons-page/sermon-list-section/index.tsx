import { fetchAllSermons, fetchOnlyBooksUsedInSermons } from '@/libs/queries';

import SermonList from './sermon-list';

export default async function SermonListSection() {
  const sermons = await fetchAllSermons();
  const books = await fetchOnlyBooksUsedInSermons();

  return (
    <section className='w-full py-8' id='sermon-list'>
      <div className='flex flex-col items-start gap-y-10 px-4 py-12 lg:flex-row lg:gap-x-24 lg:gap-y-0'>
        <SermonList sermons={sermons} />
      </div>
    </section>
  );
}
