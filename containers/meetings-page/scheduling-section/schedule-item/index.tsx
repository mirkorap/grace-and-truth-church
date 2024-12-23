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
        alt={imgAlt}
        className='h-72 w-full rounded-3xl object-cover xl:max-w-72'
        height={1024}
        src={imgSrc}
        width={1024}
      />

      <div className='p-6'>
        <TitleSmall className='uppercase !text-gray-500' text={time} />
        <HeadlineSmall className='mt-1.5' text={title} />
        <BodyLarge className='mt-1.5' text={description} />
      </div>
    </div>
  );
}
