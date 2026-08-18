import EventListSection from '@/containers/news-page/event-list-section';
import FilterSection from '@/containers/news-page/filter-section';
import HeroSection from '@/containers/news-page/hero-section';
import { resolveYear, toYearFilters } from '@/libs/events';
import { fetchEventCountsByYear } from '@/libs/queries';

interface Options {
  searchParams?: {
    year?: string;
  };
}

export default async function News({ searchParams }: Options) {
  const counts = await fetchEventCountsByYear();
  const years = toYearFilters(counts);
  const selected = resolveYear(searchParams?.year, years);

  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection />
      <FilterSection selected={selected} years={years} />
      <EventListSection year={selected} />
    </main>
  );
}
