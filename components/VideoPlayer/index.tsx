import { VideoPlayer as Options } from '@/types/VideoPlayer';

export default function VideoPlayer({ title, videoId }: Options) {
  return (
    <div className='relative aspect-video w-full'>
      <iframe
        allowFullScreen
        className='absolute left-0 top-0 size-full'
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
      />
    </div>
  );
}
