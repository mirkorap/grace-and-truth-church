import { client } from '@/src/sanity/client';
import { Sermon } from '@/types/Sermon';
import { SanityDocument } from 'next-sanity';
import { NextResponse } from 'next/server';

const ALL_SERMONS_QUERY = `*[
  _type == "sermon"
]{
  title, publishedAt, author, book, verses, text,
  "slug": slug.current,
  "image": image.asset->url
}|order(publishedAt desc)[0...12]`;

const options = { next: { revalidate: 30 } };

export async function GET() {
  try {
    const sermons = await client.fetch<SanityDocument<Sermon>[]>(
      ALL_SERMONS_QUERY,
      {},
      options,
    );

    return NextResponse.json(sermons);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
