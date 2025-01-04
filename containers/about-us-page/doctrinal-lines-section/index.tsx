import HeadlineMedium from '@/components/Heading/HeadlineMedium';

import { DoctrinalItems } from './constants';
import DoctrinalItem from './doctrinal-item';

export default function DoctrinalLinesSection() {
  return (
    <section className='mb-32 w-full' id='doctrinal-lines'>
      <div className='flex flex-col items-center px-6'>
        <HeadlineMedium
          className='mb-20 text-primary-500'
          text='Lineamenti Dottrinali'
        />

        <ul className='list-decimal space-y-10'>
          {DoctrinalItems.map((item) => {
            return (
              <DoctrinalItem
                key={item.id}
                text={item.text}
                title={item.title}
                verses={item.verses}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
