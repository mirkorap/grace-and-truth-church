import { client } from '@/src/sanity/client';
import { GroupedSermon, Sermon, SermonFilter } from '@/types/Sermon';
import { trans } from '@/types/Translation';
import { SanityDocument, groq } from 'next-sanity';

const revalidate = 3600 * 24 * 7;

export const fetchAllSermons = () => {
  return client.fetch<SanityDocument<Sermon>[]>(
    groq`*[_type == "sermon"] {
      title, publishedAt, author, book, verses, text,
      "slug": slug.current,
      "image": image.asset->url
    } | order(publishedAt desc)[0...12]`,
    {},
    { next: { revalidate } },
  );
};

export const fetchLatestSermons = () => {
  return client.fetch<SanityDocument<Sermon>[]>(
    groq`*[_type == "sermon"] {
      title, publishedAt, author, book, verses, text,
      "slug": slug.current,
      "image": image.asset->url
    } | order(publishedAt desc)[0...4]`,
    {},
    { next: { revalidate } },
  );
};

export const fetchOnlyBooksUsedInSermons = async () => {
  const docs = await client.fetch<SanityDocument<GroupedSermon>[]>(
    groq`*[_type == "sermon"] {
      book, "count": count(*[_type == "sermon" && book == ^.book])
    }`,
    {},
    { next: { revalidate } },
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
