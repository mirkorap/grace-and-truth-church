import { ToggleButton as Options } from '@/types/Button';
import clsx from 'clsx';
import Image from 'next/image';

export default function ToggleButton({ opened, onToggle }: Options) {
  return (
    <button
      type='button'
      className='rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-50'
      aria-controls='navbar-collapse-with-animation'
      aria-label='Toggle navigation'
      onClick={onToggle}
    >
      <Image
        src='/svg/menu.svg'
        className={clsx('size-4', { hidden: opened })}
        alt='Open menu'
        width={24}
        height={24}
      />

      <Image
        src='/svg/close.svg'
        className={clsx('size-4', { hidden: !opened })}
        alt='Close menu'
        width={24}
        height={24}
      />
    </button>
  );
}
