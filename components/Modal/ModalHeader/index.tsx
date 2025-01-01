import IconButton from '@/components/Button/IconButton';
import TitleMedium from '@/components/Heading/TitleMedium';
import { ModalHeader as Options } from '@/types/Modal';

export default function ModalHeader({ title, onClose }: Options) {
  return (
    <div className='flex items-center justify-between border-b px-4 py-3'>
      <TitleMedium text={title} />
      <IconButton
        icon='close'
        size='small'
        style='contained'
        text='Chiudi'
        type='button'
        onClick={onClose}
      />
    </div>
  );
}
