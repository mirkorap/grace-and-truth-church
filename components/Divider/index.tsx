import { Divider as Options } from '@/types/Divider';

export default function Divider({ className }: Options) {
  return <hr className={`my-8 h-1 border-t-0 bg-primary-500 ${className}`} />;
}
