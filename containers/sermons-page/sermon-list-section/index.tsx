import { ALL_SERMONS_QUERY } from '@/libs/queries';
import { client } from '@/src/sanity/client';
import { Sermon } from '@/types/Sermon';
import { SanityDocument } from 'next-sanity';

const fetchAllSermons = () => {
  return client.fetch<SanityDocument<Sermon>[]>(
    ALL_SERMONS_QUERY,
    {},
    { next: { revalidate: 3600 } },
  );
};

export default async function SermonListSection() {
  const sermons = await fetchAllSermons();

  return <section id='sermon-list'></section>;
}
