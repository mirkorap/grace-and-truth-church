import { Layouts } from '@/components/Button/constants';
import Icon from '@/components/Icon';
import { Button as Options } from '@/types/Button';

export default function PrimaryButton({
  text,
  type,
  style,
  size,
  icon,
  className = '',
  onClick,
}: Options) {
  return (
    <button
      className={`inline-flex items-center gap-x-2 rounded border font-nunito text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 ${Layouts[style]} ${Layouts[size]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {text}

      {icon ? <Icon name={icon} size='small' /> : null}
    </button>
  );
}
