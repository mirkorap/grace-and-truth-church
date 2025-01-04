import HeadlineLarge from '@/components/Heading/HeadlineLarge';

import { ScheduleItems } from './constants';
import ScheduleItem from './schedule-item';

export default function SchedulingSection() {
  return (
    <section className='mb-32 w-full pt-44' id='scheduling'>
      <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
        <div>
          <HeadlineLarge
            className='text-center xl:text-left'
            text='Gli incontri mensili'
          />

          <div className='mt-8 grid gap-16 md:grid-cols-2'>
            {ScheduleItems.map((item) => {
              return (
                <ScheduleItem
                  key={item.id}
                  description={item.description}
                  imgAlt={item.imgAlt}
                  imgSrc={item.imgSrc}
                  time={item.time}
                  title={item.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
