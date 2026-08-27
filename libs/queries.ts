import { client } from '@/src/sanity/client';
import { Event } from '@/types/Event';
import { BookCounts, SermonFilters, YearCounts } from '@/types/Filter';
import { Sermon } from '@/types/Sermon';
import { SanityDocument, groq } from 'next-sanity';

const revalidate = 3600;
const options = { next: { revalidate } };

export const SERMONS_PER_PAGE = 10;

const filtered = groq`*[_type == "sermon"
  && ($book == "" || book == $book)
  && ($title == "" || title match $title)
  && ($from == "" || publishedAt >= $from)
  && ($to == "" || publishedAt <= $to)
]`;

const toParams = ({ book, title, from, to }: SermonFilters) => ({
  book,
  title: title ? `*${title}*` : '',
  from,
  to: to ? `${to}T23:59:59Z` : '',
});

export const fetchSermonsPage = (page: number, filters: SermonFilters) => {
  const start = (page - 1) * SERMONS_PER_PAGE;
  const end = start + SERMONS_PER_PAGE;

  return client.fetch<SanityDocument<Sermon>[]>(
    groq`${filtered} | order(publishedAt desc) [$start...$end] {
      title, publishedAt, author, book, verses, text,
      "slug": slug.current,
      "image": image.asset->url
    }`,
    { ...toParams(filters), start, end },
    options,
  );
};

export const fetchSermonsCount = (filters: SermonFilters) => {
  return client.fetch<number>(
    groq`count(${filtered})`,
    toParams(filters),
    options,
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
    options,
  );
};

export const fetchSermonsCountByBook = async (): Promise<BookCounts> => {
  const books = await client.fetch<string[]>(
    groq`*[_type == "sermon" && defined(book)].book`,
    {},
    options,
  );

  return books.reduce((acc: BookCounts, book) => {
    return { ...acc, [book]: (acc[book] ?? 0) + 1 };
  }, {});
};

const eventFields = groq`
  title, startDate, endDate, shortDescription, description, program, speaker, venue, phone,
  "slug": slug.current,
  "image": image.asset->url
`;

export const fetchEventsByYear = (year: number) => {
  return client.fetch<SanityDocument<Event>[]>(
    groq`*[_type == "event" && startDate >= $from && startDate <= $to]
      | order(startDate desc) { ${eventFields} }`,
    { from: `${year}-01-01`, to: `${year}-12-31` },
    options,
  );
};

export const fetchEventBySlug = (slug: string) => {
  return client.fetch<SanityDocument<Event> | null>(
    groq`*[_type == "event" && slug.current == $slug][0] { ${eventFields} }`,
    { slug },
    options,
  );
};

export const fetchEventSlugs = () => {
  return client.fetch<string[]>(
    groq`*[_type == "event" && defined(slug.current)].slug.current`,
    {},
    options,
  );
};

export const fetchEventCountsByYear = async (): Promise<YearCounts> => {
  const dates = await client.fetch<string[]>(
    groq`*[_type == "event" && defined(startDate)].startDate`,
    {},
    options,
  );

  return dates.reduce((acc: YearCounts, date) => {
    const year = date.slice(0, 4);

    return { ...acc, [year]: (acc[year] ?? 0) + 1 };
  }, {});
};
