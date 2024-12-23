import { client } from '@/src/sanity/client';
import { Sermon } from '@/types/Sermon';
import { SanityDocument, groq } from 'next-sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LATEST_SERMONS_QUERY = groq`*[
  _type == "sermon"
]{
  title, publishedAt, author, book, verses, text,
  "slug": slug.current,
  "image": image.asset->url
}|order(publishedAt desc)[0...4]`;

const options = { next: { revalidate: 30 } };

export async function GET() {
  try {
    const sermons = await client.fetch<SanityDocument<Sermon>[]>(
      LATEST_SERMONS_QUERY,
      {},
      options,
    );

    return NextResponse.json(sermons);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
