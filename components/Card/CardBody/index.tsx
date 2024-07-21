import LinkButton from '@/components/Button/LinkButton';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';
import { CardBody as Options } from '@/types/Card';

export default function CardBody({ title, text, href }: Options) {
  return (
    <div className='p-4 md:p-5'>
      <TitleLarge text={title} />
      <BodyLarge className='mb-5' text={text} />
      <LinkButton
        href={href}
        text='Vai alla pagina'
        type='button'
        style='outlined'
        size='small'
      />
    </div>
  );
}
