import { ReactNode } from 'react';

export type ModalHeader = Pick<Modal, 'title'>;

export type ModalBody = Pick<Modal, 'children'>;

export type ModalFooter = Pick<Modal, 'href'>;

export interface Modal {
  title: string;
  href: string;
  children: ReactNode;
}
