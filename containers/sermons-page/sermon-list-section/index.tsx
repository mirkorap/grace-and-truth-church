import Filterbar from '@/components/Filterbar';
import Post from '@/components/Post';
import {
  ALL_SERMONS_QUERY,
  SERMONS_GROUPED_BY_BOOK_QUERY,
} from '@/libs/queries';
import { client } from '@/src/sanity/client';
import { GroupedSermon, Sermon, SermonFilter } from '@/types/Sermon';
import { trans } from '@/types/Translation';
import { SanityDocument } from 'next-sanity';

const fetchAllSermons = () => {
  return client.fetch<SanityDocument<Sermon>[]>(
    ALL_SERMONS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
};

const fetchOnlyBooksUsedInSermons = async () => {
  const docs = await client.fetch<SanityDocument<GroupedSermon>[]>(
    SERMONS_GROUPED_BY_BOOK_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );

  return docs.reduce((acc: SermonFilter[], curr, index) => {
    const found = acc.findIndex((o) => o.value === curr.book);

    if (found === -1) {
      const book: SermonFilter = {
        id: index + 1,
        text: trans[curr.book],
        value: curr.book,
        count: curr.count,
      };

      return [...acc, book];
    }

    return acc;
  }, []);
};

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
