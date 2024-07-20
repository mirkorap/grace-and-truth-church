import { Heading } from '@/types/Heading';

export default function BodyMedium({ text, className }: Heading) {
  return (
    <p
      className={`text-xs font-medium text-headline-700 lg:text-sm ${className}`}
    >
      {text}
    </p>
  );
}
