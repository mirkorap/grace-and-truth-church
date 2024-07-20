import { Heading } from '@/types/Heading';

export default function TitleMedium({ text, className }: Heading) {
  return (
    <h5
      className={`text-base font-semibold text-headline-700 lg:text-lg ${className}`}
    >
      {text}
    </h5>
  );
}
