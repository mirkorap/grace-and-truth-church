import HeroSection from '@/containers/home-page/hero-section';
import LastSermonsSection from '@/containers/home-page/last-sermons-section';
import OurMeetingsSection from '@/containers/home-page/our-meetings-section';
import { getLatestSermons as endpoint } from '@/libs/endpoints';
import { typedFetch } from '@/libs/utils';
import { Sermon } from '@/types/Sermon';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

interface Props {
  lastSermon: Sermon;
  latestSermons: Sermon[];
}

export const getStaticProps = (async () => {
  const [lastSermon, ...latestSermons] = await typedFetch<Sermon[]>(endpoint, {
    next: { revalidate: 3600 },
  });

  return {
    props: {
      repo: { lastSermon, latestSermons },
    },
  };
}) satisfies GetStaticProps<{
  repo: Props;
}>;

export default function Home({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <HeroSection />
      <OurMeetingsSection />
      <LastSermonsSection
        lastSermon={repo.lastSermon}
        latestSermons={repo.latestSermons}
      />
    </main>
  );
}
