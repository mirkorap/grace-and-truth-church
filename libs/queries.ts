import { groq } from 'next-sanity';

export const ALL_SERMONS_QUERY = groq`*[
  _type == "sermon"
]{
  title, publishedAt, author, book, verses, text,
  "slug": slug.current,
  "image": image.asset->url
} | order(publishedAt desc)[0...12]`;

export const LATEST_SERMONS_QUERY = groq`*[
  _type == "sermon"
]{
  title, publishedAt, author, book, verses, text,
  "slug": slug.current,
  "image": image.asset->url
} | order(publishedAt desc)[0...4]`;

export const SERMONS_GROUPED_BY_BOOK_QUERY = groq`*[
  _type == "sermon"
]{
  book,
  "count": count(*[_type == "sermon" && book == ^.book])
}`;
