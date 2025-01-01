import { Modal as ModalOpts } from '@/types/Modal';
import clsx from 'clsx';

import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

export default function Modal({
  title,
  href,
  opened,
  children,
  onClose,
}: ModalOpts) {
  return (
    <div className={clsx({ hidden: !opened })}>
      <div
        className='pointer-events-none fixed start-0 top-0 z-80 size-full overflow-y-auto overflow-x-hidden transition-all'
        role='dialog'
      >
        <div className='p-5 sm:mx-auto sm:w-full sm:max-w-4xl'>
          <div className='pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm'>
            <ModalHeader title={title} onClose={onClose} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter href={href} onClose={onClose} />
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-70 bg-gray-900 bg-opacity-50 transition'></div>
    </div>
  );
}
