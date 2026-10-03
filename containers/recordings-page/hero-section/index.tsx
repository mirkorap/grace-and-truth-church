import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Quote from '@/components/Heading/Quote';

export default function HeroSection() {
  return (
    <section className='w-full pt-44' id='hero'>
      <div className='flex flex-col items-center gap-y-5'>
        <HeadlineLarge className='text-center' text='Registrazioni' />
        <Quote
          className='text-center !text-base md:!text-xl'
          text='Ogni Scrittura è ispirata da Dio e utile a insegnare, a riprendere, a correggere, a educare alla giustizia.'
          verse='2 Tm. 3:16'
        />
        <BodyLarge
          className='mt-10 text-justify !text-base md:!text-xl'
          text="Qui trovi le registrazioni audio degli studi biblici che facciamo insieme in chiesa, raccolte per serie. Ogni cartella riunisce gli incontri dedicati a uno stesso tema."
        />
      </div>
    </section>
  );
}
