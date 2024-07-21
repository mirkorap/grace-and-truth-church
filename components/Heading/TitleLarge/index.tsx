import { Heading as Options } from '@/types/Heading';

export default function TitleLarge({ text, className }: Options) {
  return (
    <h4
      className={`font-roboto text-lg font-semibold text-headline-700 lg:text-xl ${className}`}
    >
      {text}
    </h4>
  );
}
