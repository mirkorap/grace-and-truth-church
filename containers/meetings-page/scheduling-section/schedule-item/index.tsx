import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineSmall from '@/components/Heading/HeadlineSmall';
import TitleSmall from '@/components/Heading/TitleSmall';
import { ScheduleItemOpts as Options } from '@/containers/meetings-page/scheduling-section/types';
import Image from 'next/image';

export default function ScheduleItem({
  title,
  description,
  time,
  imgSrc,
  imgAlt,
}: Options) {
  return (
    <div className='flex flex-col items-center overflow-hidden text-center xl:flex-row xl:text-left'>
      <Image
        src={imgSrc}
        className='h-auto w-full rounded-3xl object-cover xl:max-w-72'
        alt={imgAlt}
        width={1024}
        height={1024}
      />

      <div className='p-6'>
        <TitleSmall text={time} className='uppercase !text-gray-500' />
        <HeadlineSmall text={title} className='mt-1.5' />
        <BodyLarge text={description} className='mt-1.5' />
      </div>
    </div>
  );
}
