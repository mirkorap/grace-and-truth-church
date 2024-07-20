import { Heading } from '@/types/Heading';

export default function HeadlineLarge({ text, className }: Heading) {
  return (
    <h1
      className={`text-3xl lg:text-4xl font-bold text-headline-700 ${className}`}
    >
      {text}
    </h1>
  );
}
