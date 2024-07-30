import Card from '@/components/Card';
import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';

import { CardItems } from './constants';

export default function OurMeetingsSection() {
  return (
    <section id='our-meetings' className='w-full bg-slate-200 py-32'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall text='I nostri incontri' className='mb-5' />
          <Quote
            text="Facciamo attenzione gli uni agli altri per incitarci all'amore e alle buone opere"
            verse='Eb. 10:24'
            className='px-[10%]'
          />
        </div>

        <div className='mx-auto flex w-full max-w-[85rem] flex-col items-center justify-center gap-10 px-4 lg:flex-row'>
          {CardItems.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              text={item.text}
              href={item.href}
              imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
