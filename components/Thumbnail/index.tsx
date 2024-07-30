import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { ThumbnailOpts } from '@/types/Thumbnail';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Thumbnail({
  title,
  text,
  href,
  imgSrc,
  imgAlt,
  publishedAt,
}: ThumbnailOpts) {
  const formatted = dayjs(publishedAt).format('MMMM DD, YYYY');
  const date = formatted[0].toUpperCase() + formatted.slice(1);

  return (
    <Link href={href}>
      <div className='mb-4 rounded-xl bg-card p-4 shadow'>
        <div className='flex justify-between'>
          <div>
            <TitleSmall text={date} className='text-primary-500' />
            <TitleMedium text={title} className='my-1.5 underline' />
            <BodyLarge text={text} className='line-clamp-2 lg:hidden' />
          </div>

          <Image
            className='hidden rounded-xl object-cover object-center xs:size-20 sm:block'
            src={imgSrc}
            alt={imgAlt}
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </Link>
  );
}
