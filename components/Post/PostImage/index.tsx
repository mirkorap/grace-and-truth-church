import BodyMedium from '@/components/Heading/BodyMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostImage as PostImageOpts } from '@/types/Post';
import Image from 'next/image';
import Link from 'next/link';

export default function PostImage({
  category,
  author,
  href,
  imgSrc,
  imgAlt,
}: PostImageOpts) {
  return (
    <div className='relative'>
      <Link href={href}>
        <Image
          className='size-full rounded-xl object-cover object-center'
          src={imgSrc}
          alt={imgAlt}
          width={1024}
          height={1024}
        />

        <div className='absolute bottom-0 flex bg-white p-3'>
          <Image
            className='size-10 rounded-full object-cover object-center'
            src='/home/cross.jpg'
            alt=''
            width={1024}
            height={1024}
          />

          <div className='mx-4'>
            <TitleSmall text={category} />
            <BodyMedium text={author} />
          </div>
        </div>
      </Link>
    </div>
  );
}
