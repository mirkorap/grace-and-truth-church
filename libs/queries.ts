import { client } from '@/src/sanity/client';
import { Filter } from '@/types/Filter';
import { GroupedSermon, Sermon } from '@/types/Sermon';
import { trans } from '@/types/Translation';
import { SanityDocument, groq } from 'next-sanity';

const revalidate = 3600;
const options = { next: { revalidate } };

export const SERMONS_PER_PAGE = 10;

export const fetchSermonsPage = (page: number) => {
  const start = (page - 1) * SERMONS_PER_PAGE;
  const end = start + SERMONS_PER_PAGE;

  return client.fetch<SanityDocument<Sermon>[]>(
    groq`*[_type == "sermon"] | order(publishedAt desc) [$start...$end] {
      title, publishedAt, author, book, verses, text,
      "slug": slug.current,
      "image": image.asset->url
    }`,
    { start, end },
    options,
  );
};

export const fetchSermonsCount = () => {
  return client.fetch<number>(groq`count(*[_type == "sermon"])`, {}, options);
};

export const fetchLatestSermons = () => {
  return client.fetch<SanityDocument<Sermon>[]>(
    groq`*[_type == "sermon"] {
      title, publishedAt, author, book, verses, text,
      "slug": slug.current,
      "image": image.asset->url
    } | order(publishedAt desc)[0...4]`,
    {},
    options,
  );
};

export const fetchOnlyBooksUsedInSermons = async () => {
  const docs = await client.fetch<SanityDocument<GroupedSermon>[]>(
    groq`*[_type == "sermon"] {
      book,
      "count": count(*[_type == "sermon" && book == ^.book])
    }`,
    {},
    options,
  );

  return docs.reduce((acc: Filter[], curr, index) => {
    if (!curr.book || !trans[curr.book]) return acc;

    const found = acc.findIndex((o) => o.value === curr.book);

    if (found === -1) {
      const filter: Filter = {
        id: index + 1,
        text: trans[curr.book],
        value: curr.book,
        count: curr.count,
      };

      return [...acc, filter];
    }

    return acc;
  }, []);
};
