import { ToggleButton as Options } from '@/types/Button';
import clsx from 'clsx';
import Image from 'next/image';

export default function ToggleButton({ opened, onToggle }: Options) {
  return (
    <button
      aria-controls='navbar-collapse-with-animation'
      aria-label='Toggle navigation'
      className='rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-50'
      type='button'
      onClick={onToggle}
    >
      <Image
        alt='Open menu'
        className={clsx('size-4', { hidden: opened })}
        height={24}
        src='/icons/menu.svg'
        width={24}
      />

      <Image
        alt='Close menu'
        className={clsx('size-4', { hidden: !opened })}
        height={24}
        src='/icons/close.svg'
        width={24}
      />
    </button>
  );
}
