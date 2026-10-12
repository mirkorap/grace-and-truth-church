import TitleMedium from '@/components/Heading/TitleMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { formatDate, formatDuration } from '@/libs/dates';
import { AudioPlayer as Options } from '@/types/AudioPlayer';

export default function AudioPlayer({
  title,
  src,
  duration,
  recordedAt,
}: Options) {
  const meta = [formatDate(recordedAt), formatDuration(duration)]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className='rounded-xl bg-card p-4 shadow'>
      {meta ? <TitleSmall className='text-primary-500' text={meta} /> : null}

      <TitleMedium className='my-1.5' text={title} />

      <audio controls className='mt-3 w-full' preload='none' src={src}>
        Il tuo browser non supporta la riproduzione audio.
      </audio>
    </div>
  );
}
