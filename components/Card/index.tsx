import { CardOpts as Options } from '@/types/Card';

import CardBody from './CardBody';
import CardImage from './CardImage';

export default function Card({ title, text, href, imgSrc, imgAlt }: Options) {
  return (
    <div className='group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-lg'>
      <CardImage href={href} imgAlt={imgAlt} imgSrc={imgSrc} />
      <CardBody href={href} text={text} title={title} />
    </div>
  );
}
