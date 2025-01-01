import { Heading as Options } from '@/types/Heading';

export default function BodyLarge({ text, className = '' }: Options) {
  return (
    <p
      className={`font-nunito text-sm font-medium text-headline-700 lg:text-base ${className}`}
    >
      {text}
    </p>
  );
}
