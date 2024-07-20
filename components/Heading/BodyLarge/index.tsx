import { Heading } from '@/types/Heading';

export default function BodyLarge({ text, className }: Heading) {
  return (
    <p
      className={`text-sm font-medium text-headline-700 lg:text-base ${className}`}
    >
      {text}
    </p>
  );
}
