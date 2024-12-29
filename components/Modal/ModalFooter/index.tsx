import DefaultButton from '@/components/Button/DefaultButton';
import LinkButton from '@/components/Button/LinkButton';
import { ModalFooter as Options } from '@/types/Modal';

export default function ModalFooter({ href }: Options) {
  return (
    <div className='flex items-center justify-end gap-x-2 border-t px-4 py-3'>
      <DefaultButton
        size='small'
        style='outlined'
        text='Chiudi'
        type='button'
      />
      <LinkButton
        href={href}
        icon='play'
        size='small'
        style='contained'
        text='Visualizza'
        type='button'
      />
    </div>
  );
}
