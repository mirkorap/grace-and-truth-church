import { Block } from '@/types/Sanity';

export const toPlainText = (blocks: Block[] = []) => {
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((child) => child.text).join(''))
    .join(' ')
    .trim();
};
