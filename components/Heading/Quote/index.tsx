import { Verse } from '@/types/Heading';

export default function Quote({ text, verse, className }: Verse) {
  return (
    <p className={`text-lg italic text-headline-600 lg:text-xl ${className}`}>
      {text} <br></br> ({verse})
    </p>
  );
}
