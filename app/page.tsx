import HeroSection from '@/containers/home-page/hero-section';
import LastSermonsSection from '@/containers/home-page/last-sermons-section';
import OurMeetingsSection from '@/containers/home-page/our-meetings-section';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OurMeetingsSection />
      <Suspense fallback={<h1>Loading...</h1>}>
        <LastSermonsSection />
      </Suspense>
    </main>
  );
}
