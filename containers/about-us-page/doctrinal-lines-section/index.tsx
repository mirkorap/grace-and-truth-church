import HeadlineMedium from '@/components/Heading/HeadlineMedium';

import { DoctrinalItems } from './constants';
import DoctrinalItem from './doctrinal-item';

export default function DoctrinalLinesSection() {
  return (
    <section id='doctrinal-lines' className='mb-32 w-full'>
      <div className='mx-auto flex max-w-[85rem] flex-col items-center px-6'>
        <HeadlineMedium
          text='Lineamenti Dottrinali'
          className='mb-20 text-primary-500'
        />

        <ul className='list-decimal space-y-10'>
          {DoctrinalItems.map((item) => {
            return (
              <DoctrinalItem
                key={item.id}
                title={item.title}
                text={item.text}
                verses={item.verses}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
