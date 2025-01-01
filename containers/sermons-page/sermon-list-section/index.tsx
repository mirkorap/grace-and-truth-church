import Filterbar from '@/components/Filterbar';
import Post from '@/components/Post';
import { fetchAllSermons, fetchOnlyBooksUsedInSermons } from '@/libs/queries';

export default async function SermonListSection() {
  const sermons = await fetchAllSermons();
  const books = await fetchOnlyBooksUsedInSermons();

  return (
    <section className='w-full py-8' id='sermon-list'>
      <div className='flex flex-col items-start gap-y-10 px-4 py-12 lg:flex-row lg:gap-x-24 lg:gap-y-0'>
        <div className='order-last grid grid-cols-1 gap-8 lg:order-first lg:grid-cols-2'>
          {sermons.map((sermon) => (
            <Post
              key={sermon.slug}
              author={sermon.author}
              category={sermon.book}
              href='/'
              imgAlt={sermon.title}
              imgSrc={sermon.image}
              publishedAt={sermon.publishedAt}
              text={sermon.text}
              title={sermon.title}
            />
          ))}
        </div>

        <Filterbar items={books} />
      </div>
    </section>
  );
}
