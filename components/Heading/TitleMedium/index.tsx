import { Heading } from '@/types/Heading';

export default function TitleMedium({ text, className }: Heading) {
  return (
    <h5 className={`text-lg font-semibold text-headline-700 ${className}`}>
      {text}
    </h5>
  );
}
