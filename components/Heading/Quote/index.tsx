import { Verse as Options } from '@/types/Heading';

export default function Quote({ text, verse, className }: Options) {
  return (
    <p
      className={`font-nunito text-lg italic text-headline-600 lg:text-xl ${className}`}
    >
      {text} <br></br> ({verse})
    </p>
  );
}
