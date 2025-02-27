import RouteButton from '@/components/Button/RouteButton';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Quote from '@/components/Heading/Quote';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className='w-full pt-44 xs:pb-8 md:pb-44 lg:pb-64' id='hero'>
      <div className='mx-auto flex w-full max-w-[40rem] flex-col items-center justify-between px-4 lg:max-w-[85rem] lg:flex-row'>
        <div className='mb-10 lg:w-1/2'>
          <div className='flex flex-col items-center lg:items-start'>
            <HeadlineLarge
              className='mb-2 text-center lg:text-start'
              text='Benvenuto alla Chiesa Cristiana Evangelica "Grazia e Verità"'
            />
            <Quote
              className='text-center lg:text-start'
              text='...la grazia e la verità sono venute per mezzo di Gesù Cristo.'
              verse='Gv. 1:17'
            />

            <div className='mt-8 flex flex-wrap items-center gap-x-5'>
              <RouteButton
                href='/about-us'
                size='large'
                style='contained'
                text='Chi siamo'
                type='button'
              />
              <RouteButton
                href='/sermons'
                icon='play'
                size='large'
                style='text'
                text='Sermoni'
                type='button'
              />
            </div>
          </div>
        </div>

        <div className='lg:w-1/2'>
          <div className='relative h-[20rem] w-full max-w-3xl'>
            <div className='lg:absolute lg:right-0 lg:top-0'>
              <Image
                alt=''
                className='h-auto max-w-full rounded-lg'
                height={520}
                src='/home/cross.jpg'
                width={560}
              />
            </div>
            <div className='hidden lg:absolute lg:left-10 lg:top-20 lg:z-10 lg:block'>
              <Image
                alt=''
                className='h-auto max-w-full rounded-lg'
                height={420}
                src='/home/bible.jpg'
                width={280}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
