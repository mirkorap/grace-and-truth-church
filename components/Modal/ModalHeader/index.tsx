import TitleMedium from '@/components/Heading/TitleMedium';
import Icon from '@/components/Icon';
import { ModalHeader as Options } from '@/types/Modal';

export default function ModalHeader({ title }: Options) {
  return (
    <div className='flex items-center justify-between border-b px-4 py-3'>
      <TitleMedium text={title} />
      <button
        aria-label='Chiudi'
        className='inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
        type='button'
      >
        <span className='sr-only'>Chiudi</span>
        <Icon name='close' size='small' />
      </button>
    </div>
  );
}
