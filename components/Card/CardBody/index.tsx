import RouteButton from '@/components/Button/RouteButton';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';
import { CardBody as Options } from '@/types/Card';

export default function CardBody({ title, text, href }: Options) {
  return (
    <div className='grid flex-1 p-4 md:p-5'>
      <TitleLarge text={title} />
      <BodyLarge className='mb-5' text={text} />
      <RouteButton
        className='w-max self-end'
        href={href}
        icon='forward'
        size='small'
        style='outlined'
        text='Vai alla pagina'
        type='button'
      />
    </div>
  );
}
