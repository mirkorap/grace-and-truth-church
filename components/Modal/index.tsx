import { Modal as ModalOpts } from '@/types/Modal';

import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

export default function Modal({ title, href, children }: ModalOpts) {
  return (
    <>
      <div
        className='z-80 pointer-events-none fixed start-0 top-0 size-full overflow-y-auto overflow-x-hidden opacity-0 transition-all'
        role='dialog'
      >
        <div className='m-3 sm:mx-auto sm:w-full sm:max-w-lg'>
          <div className='pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm'>
            <ModalHeader title={title} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter href={href} />
          </div>
        </div>
      </div>
      <div className='z-70 fixed inset-0 bg-gray-900 bg-opacity-50 transition'></div>
    </>
  );
}
