import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className='w-full pt-44' id='hero'>
      <div className='flex flex-col gap-y-2 text-center'>
        <HeadlineLarge text='Chiesa Cristiana Evangelica Riformata' />
        <HeadlineLarge className='mb-10' text='"Grazia e Verità"' />
      </div>

      <div className='flex flex-col items-center'>
        <Image
          alt=''
          className='mb-10 rounded-md shadow-md'
          height={768}
          src='/about-us/church.webp'
          width={1024}
        />

        <BodyLarge
          className='max-w-[40rem] text-center !text-base md:!text-xl'
          text='Siamo una chiesa evangelica nata nel 2015, che vuole testimoniare che la grazia e la verità di Dio sono venute per mezzo di Gesù Cristo, il Figlio di Dio, il Salvatore.'
        />
      </div>
    </section>
  );
}
