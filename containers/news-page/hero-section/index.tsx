import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Quote from '@/components/Heading/Quote';

export default function HeroSection() {
  return (
    <section className='w-full pt-44' id='hero'>
      <div className='flex flex-col items-center gap-y-5'>
        <HeadlineLarge className='text-center' text='Ultime novità' />
        <Quote
          className='text-center !text-base md:!text-xl'
          text='E ogni giorno, nel tempio e per le case, non cessavano di insegnare e di portare il lieto messaggio che Gesù è il Cristo.'
          verse='At. 5:42'
        />
        <BodyLarge
          className='mt-10 text-justify !text-base md:!text-xl'
          text="Qui trovi gli eventi organizzati dalla chiesa: conferenze, incontri speciali, giornate di studio e momenti di comunione aperti a tutti. Usa la barra qui sotto per scegliere l'anno e scopri il programma, il luogo e i contatti di ogni evento."
        />
      </div>
    </section>
  );
}
