import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id='hero' className='w-full px-4 pt-44 text-center'>
      <div className='flex flex-col gap-y-2'>
        <HeadlineLarge text='Chiesa Cristiana Evangelica Riformata' />
        <HeadlineLarge className='mb-10' text='"Grazia e Verità"' />
      </div>

      <div className='flex flex-col items-center'>
        <Image
          className='mb-10 rounded-md shadow-md'
          src='/about-us/church.webp'
          alt=''
          width={1024}
          height={768}
        />

        <BodyLarge
          className='mx-auto max-w-[40rem] !text-base md:!text-xl'
          text='Siamo una chiesa evangelica nata nel 2015, che vuole testimoniare che la grazia e la verità di Dio sono venute per mezzo di Gesù Cristo, il Figlio di Dio, il Salvatore.'
        />
      </div>
    </section>
  );
}
