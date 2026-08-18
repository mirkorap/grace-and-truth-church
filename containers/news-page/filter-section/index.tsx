import EventFilterBar from '@/components/EventFilterBar';

import { FilterSection as Options } from './types';

export default function FilterSection({ years, selected }: Options) {
  return (
    <section className='w-full pt-10' id='event-filters'>
      <EventFilterBar selected={selected} years={years} />
    </section>
  );
}
