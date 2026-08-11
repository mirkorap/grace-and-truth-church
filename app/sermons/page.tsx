import FilterSection from '@/containers/sermons-page/filter-section';
import HeroSection from '@/containers/sermons-page/hero-section';
import SermonListSection from '@/containers/sermons-page/sermon-list-section';
import { SermonFilters } from '@/types/Filter';

interface Options {
  searchParams?: {
    page?: string;
    book?: string;
    title?: string;
    from?: string;
    to?: string;
  };
}

export default function Sermons({ searchParams }: Options) {
  const page = Math.max(1, Number(searchParams?.page) || 1);

  const filters: SermonFilters = {
    book: searchParams?.book ?? '',
    title: searchParams?.title ?? '',
    from: searchParams?.from ?? '',
    to: searchParams?.to ?? '',
  };

  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection />
      <FilterSection />
      <SermonListSection filters={filters} page={page} />
    </main>
  );
}
