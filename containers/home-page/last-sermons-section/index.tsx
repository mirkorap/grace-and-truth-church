import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';
import { fetchLatestSermons } from '@/libs/queries';

import LastSermons from './last-sermons';

export default async function LastSermonsSection() {
  const [lastSermon, ...latestSermons] = await fetchLatestSermons();

  return (
    <section className='w-full py-32' id='last-sermons'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall className='mb-5' text='Sermoni recenti' />
          <Quote
            className='px-[10%]'
            text="Ogni Scrittura è ispirata da Dio e utile a insegnare, a riprendere, a correggere, a educare alla giustizia, perché l'uomo di Dio sia completo e ben preparato per ogni opera buona."
            verse='2Ti. 3:16-17'
          />
        </div>

        <div className='mx-auto w-full max-w-[85rem] px-4'>
          <LastSermons featured={lastSermon} others={latestSermons} />
        </div>
      </div>
    </section>
  );
}
