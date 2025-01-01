export type ModalHeader = Pick<Modal, 'title' | 'onClose'>;

export type ModalBody = Pick<Modal, 'children'>;

export type ModalFooter = Pick<Modal, 'href' | 'onClose'>;

export interface Modal {
  title: string;
  href: string;
  opened: boolean;
  children: React.ReactNode;
  onClose: () => void;
}
