import { Heading } from '@/types/Heading';

export default function BodyMedium({ text, className }: Heading) {
  return (
    <p className={`text-sm font-medium text-headline-700 ${className}`}>
      {text}
    </p>
  );
}
