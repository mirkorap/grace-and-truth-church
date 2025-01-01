import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import Quote from '@/components/Heading/Quote';

export default function HeroSection() {
  return (
    <section className='w-full px-4 pt-44' id='hero'>
      <div className='flex flex-col items-center gap-y-5'>
        <HeadlineLarge text='Archivio sermoni' />
        <Quote
          className='mx-auto max-w-[40rem] text-center !text-base md:!text-xl'
          text='Questa è la vita eterna: che conoscano te, il solo vero Dio, e colui che tu hai mandato, Gesù Cristo.'
          verse='Gv. 17:3'
        />
        <BodyLarge
          className='mx-auto mt-16 !text-base md:!text-xl'
          text='I sermoni presenti vengono dalle riunioni svolte durante la settimana, durante le quali la chiesa si riunisce per lodare Dio e ascoltare gli insegnamenti tratti dalla Sua Parola. Il nostro scopo è quello di conoscere di più Dio e aiutare altri a conoscerLo. Qui troverai gli insegnamenti tratti dallo studio sistematico della Sua Parola. Sono serie suddivise per libro della Bibbia, che è possibile filtrare usando la barra di destra.'
        />
      </div>
    </section>
  );
}
