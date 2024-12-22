import HeroSection from '@/containers/home-page/hero-section';
import LastSermonsSection from '@/containers/home-page/last-sermons-section';
import OurMeetingsSection from '@/containers/home-page/our-meetings-section';
import { getLatestSermons as endpoint } from '@/libs/endpoints';
import { typedFetch } from '@/libs/utils';
import { Sermon } from '@/types/Sermon';
import { GetStaticProps } from 'next';

interface Props {
  lastSermon: Sermon;
  latestSermons: Sermon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [lastSermon, ...latestSermons] = await typedFetch<Sermon[]>(endpoint);

  return {
    props: { lastSermon, latestSermons },
    revalidate: 3600,
  };
};

export default function Home({ lastSermon, latestSermons }: Props) {
  return (
    <main>
      <HeroSection />
      <OurMeetingsSection />
      <LastSermonsSection
        lastSermon={lastSermon}
        latestSermons={latestSermons}
      />
    </main>
  );
}
