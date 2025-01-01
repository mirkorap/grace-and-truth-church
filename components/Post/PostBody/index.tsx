import TitleLarge from '@/components/Heading/TitleLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostBody as Options } from '@/types/Post';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';

export default function PostBody({
  title,
  text,
  publishedAt,
  onClick,
}: Options) {
  const formatted = dayjs(publishedAt).format('MMMM DD, YYYY');
  const date = formatted[0].toUpperCase() + formatted.slice(1);

  return (
    <>
      <TitleSmall className='mt-6 text-primary-500' text={date} />

      <div className='cursor-pointer' onClick={onClick}>
        <TitleLarge className='my-3 underline' text={title} />
      </div>

      <PortableText value={text} />
    </>
  );
}
