import RouteButton from '@/components/Button/RouteButton';
import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineLarge from '@/components/Heading/HeadlineLarge';
import { RecordingSeriesHero as Options } from '@/containers/recording-series-page/recording-list-section/types';

export default function HeroSection({ title, description }: Options) {
  return (
    <section className='w-full pt-44' id='hero'>
      <div className='flex flex-col items-center gap-y-5'>
        <HeadlineLarge className='text-center' text={title} />

        {description ? (
          <BodyLarge
            className='mt-4 text-justify !text-base md:!text-xl'
            text={description}
          />
        ) : null}

        <RouteButton
          className='mt-4'
          href='/recordings'
          size='small'
          style='text'
          text='← Tutte le serie'
          type='button'
        />
      </div>
    </section>
  );
}
