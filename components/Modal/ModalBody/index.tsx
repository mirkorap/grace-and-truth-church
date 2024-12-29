import { ModalBody as Options } from '@/types/Modal';

export default function ModalBody({ children }: Options) {
  return <div className='overflow-y-auto p-4'>{children}</div>;
}
