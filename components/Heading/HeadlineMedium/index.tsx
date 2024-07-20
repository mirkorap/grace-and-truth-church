import { Heading } from '@/types/Heading';

export default function HeadlineMedium({ text, className }: Heading) {
  return (
    <h2
      className={`text-2xl lg:text-3xl font-bold text-headline-700 ${className}`}
    >
      {text}
    </h2>
  );
}
