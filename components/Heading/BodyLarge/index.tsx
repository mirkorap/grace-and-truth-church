import { Heading as Options } from '@/types/Heading';

export default function BodyLarge({ text, className }: Options) {
  return (
    <p
      className={`text-sm font-medium text-headline-700 lg:text-base ${className}`}
    >
      {text}
    </p>
  );
}
