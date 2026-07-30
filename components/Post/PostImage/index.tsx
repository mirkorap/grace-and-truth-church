import BodyMedium from '@/components/Heading/BodyMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { PostImage as Options } from '@/types/Post';
import { trans } from '@/types/Translation';
import Image from 'next/image';

export default function PostImage({
  category,
  author,
  verses,
  imgSrc,
  imgAlt,
  onClick,
}: Options) {
  const reference = [trans[category], verses].filter(Boolean).join(' ');

  return (
    <div className='relative'>
      <Image
        alt={imgAlt}
        className='w-full cursor-pointer rounded-xl object-cover object-center lg:h-96'
        height={1024}
        src={imgSrc}
        width={1024}
        onClick={onClick}
      />

      {reference || author ? (
        <div className='absolute bottom-0 flex items-center bg-white p-3'>
          <div className='mx-4'>
            {reference ? <TitleSmall text={reference} /> : null}
            {author ? <BodyMedium text={author} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
