import HeroSection from '@/containers/sermons-page/hero-section';
import SermonListSection from '@/containers/sermons-page/sermon-list-section';

export default function Sermons() {
  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection />
      <SermonListSection />
    </main>
  );
}
