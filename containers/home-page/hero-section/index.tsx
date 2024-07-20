import LinkButton from '@/components/Button/LinkButton';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Quote from '@/components/Heading/Quote';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id='home' className='w-full pt-44'>
      <div className='mx-auto w-full max-w-[85rem] px-4 flex flex-col lg:flex-row items-center justify-between'>
        <div className='lg:w-1/2 mb-10'>
          <div className='flex flex-col items-center lg:items-start'>
            <HeadlineLarge
              className='text-center lg:text-start mb-2'
              text='Benvenuto alla Chiesa Cristiana Evengelica "Grazia e Verità"'
            />
            <Quote
              className='text-center lg:text-start'
              text='...la grazia e la verità sono venute per mezzo di Gesù Cristo.'
              verse='Gv. 1:17'
            />

            <div className='flex flex-wrap items-center gap-x-5 mt-8'>
              <LinkButton
                href='#'
                type='button'
                style='contained'
                text='Chi siamo'
              />
              <LinkButton href='#' type='button' style='text' text='Sermoni' />
            </div>
          </div>
        </div>

        <div className='lg:w-1/2'>
          <div className='relative h-[20rem] w-full max-w-3xl'>
            <div className='lg:absolute lg:right-0 lg:top-0'>
              <Image
                className='h-auto max-w-full rounded-lg'
                src='/home/cross.jpg'
                alt=''
                width={560}
                height={520}
              />
            </div>
            <div className='hidden lg:block lg:absolute lg:left-10 lg:top-20 lg:z-10'>
              <Image
                className='h-auto max-w-full rounded-lg'
                src='/home/bible.jpg'
                alt=''
                width={280}
                height={420}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
