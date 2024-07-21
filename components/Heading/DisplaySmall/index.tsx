import { Heading as Options } from '@/types/Heading';

export default function DisplaySmall({ text, className }: Options) {
  return (
    <h2
      className={`font-roboto text-4xl font-bold text-headline-700 lg:text-5xl ${className}`}
    >
      {text}
    </h2>
  );
}
