import { VideoPlayer as VideoPlayerOpts } from '@/types/VideoPlayer';

export default function VideoPlayer({ title, videoId }: VideoPlayerOpts) {
  return (
    <div className='relative aspect-video w-full'>
      <iframe
        allowFullScreen
        className='absolute left-0 top-0 h-full w-full'
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
      />
    </div>
  );
}
