import { Heading as Options } from '@/types/Heading';

export default function HeadlineMedium({ text, className }: Options) {
  return (
    <h2
      className={`text-2xl font-bold text-headline-700 lg:text-3xl ${className}`}
    >
      {text}
    </h2>
  );
}
