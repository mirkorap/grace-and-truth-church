import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';
import Post from '@/components/Post';
import Thumbnail from '@/components/Thumbnail';
import { getLatestSermons as endpoint } from '@/libs/endpoints';
import { typedFetch } from '@/libs/utils';
import { Sermon } from '@/types/Sermon';

const getLatestSermons = async () => {
  return await typedFetch<Sermon[]>(endpoint);
};

export default async function LastSermonsSection() {
  const [lastSermon, ...latestSermons] = await getLatestSermons();

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
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <Post
                author={lastSermon.author}
                category={lastSermon.book}
                href='/'
                imgAlt={lastSermon.title}
                imgSrc={lastSermon.image}
                publishedAt={lastSermon.publishedAt}
                text={lastSermon.text}
                title={lastSermon.title}
              />
            </div>

            <div>
              {latestSermons.map((item) => (
                <Thumbnail
                  key={item.slug}
                  href='/'
                  imgAlt={item.title}
                  imgSrc={item.image}
                  publishedAt={item.publishedAt}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
