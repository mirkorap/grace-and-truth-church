import { Heading } from '@/types/Heading';

export default function BodyLarge({ text, className }: Heading) {
  return (
    <p
      className={`text-sm lg:text-base font-medium text-headline-700 ${className}`}
    >
      {text}
    </p>
  );
}
