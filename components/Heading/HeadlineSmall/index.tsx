import { Heading as Options } from '@/types/Heading';

export default function HeadlineSmall({ text, className }: Options) {
  return (
    <h3
      className={`text-xl font-bold text-headline-700 lg:text-2xl ${className}`}
    >
      {text}
    </h3>
  );
}
