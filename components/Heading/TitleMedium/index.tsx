import { Heading as Options } from '@/types/Heading';

export default function TitleMedium({ text, className }: Options) {
  return (
    <h5
      className={`font-roboto text-base font-semibold text-headline-700 lg:text-lg ${className}`}
    >
      {text}
    </h5>
  );
}
