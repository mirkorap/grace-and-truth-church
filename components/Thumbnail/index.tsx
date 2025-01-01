import TitleMedium from '@/components/Heading/TitleMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { ThumbnailOpts as Options } from '@/types/Thumbnail';
import dayjs from 'dayjs';
import Image from 'next/image';

export default function Thumbnail({
  title,
  imgSrc,
  imgAlt,
  publishedAt,
  onClick,
}: Options) {
  const formatted = dayjs(publishedAt).format('MMMM DD, YYYY');
  const date = formatted[0].toUpperCase() + formatted.slice(1);

  return (
    <div
      className='mb-4 cursor-pointer rounded-xl bg-card p-4 shadow'
      onClick={onClick}
    >
      <div className='flex justify-between'>
        <div>
          <TitleSmall className='text-primary-500' text={date} />
          <TitleMedium className='my-1.5 underline' text={title} />
        </div>

        <Image
          alt={imgAlt}
          className='hidden rounded-xl object-cover object-center xs:size-20 sm:block'
          height={1024}
          src={imgSrc}
          width={1024}
        />
      </div>
    </div>
  );
}
