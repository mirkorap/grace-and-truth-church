import TitleMedium from '@/components/Heading/TitleMedium';
import Icon from '@/components/Icon';
import { ContactItemOpts as Options } from '@/containers/contact-us-page/contact-section/types';

export default function ContactItem({ icon, color, text }: Options) {
  return (
    <div className='flex h-48 flex-col justify-center gap-y-2.5 overflow-hidden rounded-xl bg-card shadow-sm'>
      <Icon name={icon} size='large' className={color} />
      <TitleMedium text={text} className='whitespace-pre-line' />
    </div>
  );
}
