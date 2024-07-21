import { Heading as Options } from '@/types/Heading';

export default function DisplayMedium({ text, className }: Options) {
  return (
    <h2
      className={`text-5xl font-bold text-headline-700 lg:text-6xl ${className}`}
    >
      {text}
    </h2>
  );
}
