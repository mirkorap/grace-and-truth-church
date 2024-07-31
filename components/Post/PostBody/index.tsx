import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostBody as Options } from '@/types/Post';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function PostBody({ title, text, href, publishedAt }: Options) {
  const formatted = dayjs(publishedAt).format('MMMM DD, YYYY');
  const date = formatted[0].toUpperCase() + formatted.slice(1);

  return (
    <>
      <TitleSmall text={date} className='mt-6 text-primary-500' />

      <Link href={href}>
        <TitleLarge text={title} className='my-3 underline' />
      </Link>

      <BodyLarge text={text} />
    </>
  );
}
