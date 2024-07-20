import { Layouts } from '@/components/Button/constants';
import { Button } from '@/types/Button';

export default function PrimaryButton({
  text,
  type,
  style,
  className,
  onClick,
}: Button) {
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-x-2 rounded border px-4 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 sm:px-8 sm:py-4 ${Layouts[style]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
