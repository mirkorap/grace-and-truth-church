interface Span {
  _type: 'span';
  text: string;
  marks?: string[];
}

interface BlockStyle {
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

interface BlockList {
  listItem?: 'bullet' | 'number';
}

export interface Block extends BlockStyle, BlockList {
  _type: 'block';
  _key: string;
  children: Span[];
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
}

export const nullBlock: Block = {
  _type: 'block',
  _key: '',
  style: 'blockquote',
  children: [],
};
