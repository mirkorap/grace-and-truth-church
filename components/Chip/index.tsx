import { Chip as Options } from '@/types/Chip';

export default function Chip({ text, href, className }: Options) {
  return (
    <a href={href} target='_blank'>
      <span className={`inline-flex rounded-full border border-gray-800 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-800 hover:text-white ${className}`}>
        {text}
      </span>
    </a>
  );
}
