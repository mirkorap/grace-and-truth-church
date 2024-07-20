import { Heading } from '@/types/Heading';

export default function TitleLarge({ text, className }: Heading) {
  return (
    <h4
      className={`text-lg lg:text-xl font-semibold text-headline-700 ${className}`}
    >
      {text}
    </h4>
  );
}
