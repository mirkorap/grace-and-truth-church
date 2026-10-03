import FolderCard from '@/components/FolderCard';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import { fetchRecordingSeries } from '@/libs/queries';

const FALLBACK_IMAGE = '/meetings/bible-study.jpg';

export default async function SeriesListSection() {
  const series = await fetchRecordingSeries();

  return (
    <section className='w-full py-8' id='series-list'>
      {series.length ? (
        <div className='grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3'>
          {series.map((item) => (
            <FolderCard
              key={item.slug}
              count={item.count}
              external={!!item.externalUrl}
              href={item.externalUrl || `/recordings/${item.slug}`}
              imgAlt={item.title}
              imgSrc={item.image || FALLBACK_IMAGE}
              text={item.description}
              title={item.title}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-y-3 py-20 text-center'>
          <TitleMedium text='Nessuna serie disponibile' />
          <BodyLarge text='Non ci sono ancora serie pubblicate. Torna a trovarci fra qualche giorno.' />
        </div>
      )}
    </section>
  );
}
