import BodyMedium from '@/components/Heading/BodyMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { getImage } from '@/libs/utils';
import { PostImage as Options } from '@/types/Post';
import { trans } from '@/types/Translation';
import Image from 'next/image';
import Link from 'next/link';

export default async function PostImage({
  category,
  author,
  href,
  imgSrc,
  imgAlt,
}: Options) {
  const { base64, img } = await getImage(imgSrc);

  return (
    <div className='relative'>
      <Link href={href}>
        <Image
          {...img}
          alt={imgAlt}
          blurDataURL={base64}
          className='w-full rounded-xl object-cover object-center lg:h-96'
          placeholder='blur'
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
