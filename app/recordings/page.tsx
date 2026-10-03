import HeroSection from '@/containers/recordings-page/hero-section';
import SeriesListSection from '@/containers/recordings-page/series-list-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registrazioni | Chiesa Grazia e Verità',
  robots: { index: false, follow: false },
};

export default function Recordings() {
  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection />
      <SeriesListSection />
    </main>
  );
}
