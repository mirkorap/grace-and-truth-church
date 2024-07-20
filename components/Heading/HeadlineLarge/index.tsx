import { Heading } from '@/types/Heading';

export default function HeadlineLarge({ text, className }: Heading) {
  return (
    <h1
      className={`text-3xl font-bold text-headline-700 lg:text-4xl ${className}`}
    >
      {text}
    </h1>
  );
}
