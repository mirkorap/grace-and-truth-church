import HeadlineLarge from '@/components/Heading/HeadlineLarge';

import { ScheduleItems } from './constants';
import ScheduleItem from './schedule-item';

export default function SchedulingSection() {
  return (
    <section id='scheduling' className='mb-32 w-full pt-44'>
      <div className='mx-auto flex max-w-[85rem] flex-col gap-10 px-4 lg:flex-row lg:justify-between'>
        <div>
          <HeadlineLarge text='Gli incontri mensili' />

          <div className='mt-8 grid gap-16 md:grid-cols-2'>
            {ScheduleItems.map((item) => {
              return (
                <ScheduleItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                  imgSrc={item.imgSrc}
                  imgAlt={item.imgAlt}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
