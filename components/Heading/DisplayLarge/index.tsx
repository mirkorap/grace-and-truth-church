import { Heading as Options } from '@/types/Heading';

export default function DisplayLarge({ text, className = '' }: Options) {
  return (
    <h1
      className={`font-roboto text-6xl font-bold text-headline-700 lg:text-7xl ${className}`}
    >
      {text}
    </h1>
  );
}
