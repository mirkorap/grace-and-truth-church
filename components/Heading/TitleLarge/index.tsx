import { Heading } from '@/types/Heading';

export default function TitleLarge({ text, className }: Heading) {
  return (
    <h4
      className={`text-lg font-semibold text-headline-700 lg:text-xl ${className}`}
    >
      {text}
    </h4>
  );
}
