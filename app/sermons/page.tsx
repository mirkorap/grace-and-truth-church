import HeroSection from '@/containers/sermons-page/hero-section';
import SermonListSection from '@/containers/sermons-page/sermon-list-section';

interface Options {
  searchParams?: { page?: string };
}

export default function Sermons({ searchParams }: Options) {
  const page = Math.max(1, Number(searchParams?.page) || 1);

  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection />
      <SermonListSection page={page} />
    </main>
  );
}
