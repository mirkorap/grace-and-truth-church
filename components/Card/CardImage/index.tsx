import { CardImage as Options } from '@/types/Card';
import Image from 'next/image';
import Link from 'next/link';

export default function CardImage({ href, imgSrc, imgAlt }: Options) {
  return (
    <div className='relative overflow-hidden rounded-t-xl pt-[70%] sm:pt-[60%] lg:pt-[80%]'>
      <Link href={href}>
        <Image
          alt={imgAlt}
          className='absolute start-0 top-0 size-full rounded-t-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
          height={330}
          src={imgSrc}
          width={415}
        />
      </Link>
    </div>
  );
}
