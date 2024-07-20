import { Verse } from '@/types/Heading';

export default function Quote({ text, verse, className }: Verse) {
  return (
    <p className={`text-lg lg:text-xl italic text-headline-600 ${className}`}>
      {text} <br></br> ({verse})
    </p>
  );
}
