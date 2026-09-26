import HeroSection from '@/containers/home-page/hero-section';
import LastSermonsSection from '@/containers/home-page/last-sermons-section';
import NextEventSection from '@/containers/home-page/next-event-section';
import OurMeetingsSection from '@/containers/home-page/our-meetings-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NextEventSection />
      <OurMeetingsSection />
      <LastSermonsSection />
    </main>
  );
}
