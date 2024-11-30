import Card from '@/components/Card';
import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';

import { CardItems } from './constants';

export default function OurMeetingsSection() {
  return (
    <section className='w-full bg-slate-200 py-32' id='our-meetings'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall className='mb-5' text='I nostri incontri' />
          <Quote
            className='px-[10%]'
            text="Facciamo attenzione gli uni agli altri per incitarci all'amore e alle buone opere"
            verse='Eb. 10:24'
          />
        </div>

        <div className='mx-auto flex w-full max-w-[85rem] flex-col items-center justify-center gap-10 px-4 lg:flex-row'>
          {CardItems.map((item) => (
            <Card
              key={item.id}
              href={item.href}
              imgAlt={item.imgAlt}
              imgSrc={item.imgSrc}
              text={item.text}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
