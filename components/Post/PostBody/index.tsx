import TitleLarge from '@/components/Heading/TitleLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostBody as Options } from '@/types/Post';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function PostBody({ title, text, href, publishedAt }: Options) {
  const formatted = dayjs(publishedAt).format('MMMM DD, YYYY');
  const date = formatted[0].toUpperCase() + formatted.slice(1);

  return (
    <>
      <TitleSmall className='mt-6 text-primary-500' text={date} />

      <Link href={href}>
        <TitleLarge className='my-3 underline' text={title} />
      </Link>

      <PortableText value={text} />
    </>
  );
}
