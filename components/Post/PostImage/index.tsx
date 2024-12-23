import BodyMedium from '@/components/Heading/BodyMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostImage as Options } from '@/types/Post';
import { trans } from '@/types/Translation';
import Image from 'next/image';
import Link from 'next/link';

export default function PostImage({
  category,
  author,
  href,
  imgSrc,
  imgAlt,
}: Options) {
  return (
    <div className='relative'>
      <Link href={href}>
        <Image
          alt={imgAlt}
          className='w-full rounded-xl object-cover object-center lg:h-96'
          height={1024}
          src={imgSrc}
          width={1024}
        />

        <div className='absolute bottom-0 flex items-center bg-white p-3'>
          <div className='mx-4'>
            <TitleSmall text={trans[category]} />
            <BodyMedium text={author} />
          </div>
        </div>
      </Link>
    </div>
  );
}
