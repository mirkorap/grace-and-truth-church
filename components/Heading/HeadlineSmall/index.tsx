import { Heading } from '@/types/Heading';

export default function HeadlineSmall({ text, className }: Heading) {
  return (
    <h3 className={`text-2xl font-bold text-headline-700 ${className}`}>
      {text}
    </h3>
  );
}
