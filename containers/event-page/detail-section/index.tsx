import TitleMedium from '@/components/Heading/TitleMedium';
import RichText from '@/components/RichText';
import { POSTER_HEIGHT, POSTER_WIDTH } from '@/constants/events';
import Image from 'next/image';

import Info from './info';
import Program from './program';
import { DetailSection as Options } from './types';

export default function DetailSection({
  title,
  image,
  description,
  program,
  speaker,
  venue,
  phone,
}: Options) {
  return (
    <section className='w-full py-10' id='event-detail'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='flex flex-col gap-y-6 lg:col-span-1'>
          <div className='overflow-hidden rounded-xl border shadow-sm'>
            <Image
              priority
              alt={title}
              className='h-auto w-full'
              height={POSTER_HEIGHT}
              sizes='(min-width: 1024px) 33vw, 100vw'
              src={image}
              width={POSTER_WIDTH}
            />
          </div>

          <Info phone={phone} speaker={speaker} venue={venue} />
        </div>

        <div className='flex flex-col gap-y-8 lg:col-span-2'>
          <div className='flex flex-col gap-y-4'>
            <TitleMedium text="L'evento" />

            <RichText value={description} />
          </div>

          <Program program={program} />
        </div>
      </div>
    </section>
  );
}
