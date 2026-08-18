import DetailSection from '@/containers/event-page/detail-section';
import HeroSection from '@/containers/event-page/hero-section';
import { toPlainText } from '@/libs/portable-text';
import { fetchEventBySlug, fetchEventSlugs } from '@/libs/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Options {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await fetchEventSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Options): Promise<Metadata> {
  const event = await fetchEventBySlug(params.slug);

  if (!event) return { title: 'Evento non trovato' };

  const description = toPlainText(event.description).slice(0, 160);

  return {
    title: `${event.title} | Chiesa Grazia e Verità`,
    description,
    openGraph: {
      title: event.title,
      description,
      images: event.image ? [event.image] : undefined,
      type: 'article',
    },
  };
}

export default async function EventDetail({ params }: Options) {
  const event = await fetchEventBySlug(params.slug);

  if (!event) notFound();

  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <HeroSection
        endDate={event.endDate}
        startDate={event.startDate}
        title={event.title}
      />

      <DetailSection
        description={event.description}
        endDate={event.endDate}
        image={event.image}
        phone={event.phone}
        program={event.program}
        speaker={event.speaker}
        startDate={event.startDate}
        title={event.title}
        venue={event.venue}
      />
    </main>
  );
}
