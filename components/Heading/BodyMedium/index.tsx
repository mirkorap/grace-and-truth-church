import { Heading as Options } from '@/types/Heading';

export default function BodyMedium({ text, className }: Options) {
  return (
    <p
      className={`text-xs font-medium text-headline-700 lg:text-sm ${className}`}
    >
      {text}
    </p>
  );
}
