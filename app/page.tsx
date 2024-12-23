import HeroSection from '@/containers/home-page/hero-section';
import LastSermonsSection from '@/containers/home-page/last-sermons-section';
import OurMeetingsSection from '@/containers/home-page/our-meetings-section';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OurMeetingsSection />
      <LastSermonsSection />
    </main>
  );
}
