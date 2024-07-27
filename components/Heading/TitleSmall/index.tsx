import { Heading as Options } from '@/types/Heading';

export default function TitleSmall({ text, className }: Options) {
  return (
    <h6
      className={`font-roboto text-xs font-semibold text-headline-700 lg:text-sm ${className}`}
    >
      {text}
    </h6>
  );
}
