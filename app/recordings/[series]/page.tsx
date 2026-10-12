import HeroSection from '@/containers/recording-series-page/hero-section';
import RecordingListSection from '@/containers/recording-series-page/recording-list-section';
import {
  fetchRecordingSeriesBySlug,
  fetchRecordingsBySeries,
} from '@/libs/queries';
import { signAudioUrl } from '@/libs/r2';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Options {
  params: {
    series: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Options): Promise<Metadata> {
  const series = await fetchRecordingSeriesBySlug(params.series);

  return {
    title: series
      ? `${series.title} | Chiesa Grazia e Verità`
      : 'Serie non trovata',
    robots: { index: false, follow: false },
  };
}

export default async function RecordingSeriesDetail({ params }: Options) {
  const series = await fetchRecordingSeriesBySlug(params.series);
  if (!series) notFound();

  const recordings = await fetchRecordingsBySeries(params.series);

  const playable = await Promise.all(
    recordings
      .filter((item) => !!item.audioKey)
      .map(async ({ audioKey, ...rest }) => ({
        ...rest,
        src: await signAudioUrl(audioKey),
      })),
  );

  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection description={series.description} title={series.title} />
      <RecordingListSection recordings={playable} />
    </main>
  );
}
