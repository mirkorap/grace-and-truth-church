import AudioPlayer from '@/components/AudioPlayer';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';

import { RecordingListSection as Options } from './types';

export default function RecordingListSection({ recordings }: Options) {
  return (
    <section className='w-full py-8' id='recording-list'>
      {recordings.length ? (
        <div className='flex w-full flex-col gap-y-4 py-12'>
          {recordings.map((item) => (
            <AudioPlayer
              key={item.slug}
              duration={item.duration}
              recordedAt={item.recordedAt}
              src={item.src}
              title={item.title}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-y-3 py-20 text-center'>
          <TitleMedium text='Serie ancora vuota' />
          <BodyLarge text='Questa serie non ha ancora registrazioni pubblicate.' />
        </div>
      )}
    </section>
  );
}
