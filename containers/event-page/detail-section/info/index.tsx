import BodyLarge from '@/components/Heading/BodyLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import Icon from '@/components/Icon';
import { toMapUrl, toPhoneUrl } from '@/libs/events';

import { Info as Options } from '../types';

const label = 'font-nunito text-xs font-semibold uppercase text-headline-500';
const link = 'font-nunito text-sm font-semibold text-primary-500';

export default function Info({ speaker, venue, phone }: Options) {
  const address = [venue?.street, venue?.city].filter(Boolean).join(', ');

  return (
    <div className='flex flex-col gap-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
      {speaker ? (
        <div className='flex flex-col gap-y-1'>
          <span className={label}>Relatore</span>
          <BodyLarge text={speaker} />
        </div>
      ) : null}

      {venue?.name || address ? (
        <div className='flex flex-col gap-y-1'>
          <span className={label}>Dove</span>
          {venue?.name ? <TitleSmall text={venue.name} /> : null}
          {address ? <BodyLarge text={address} /> : null}

          <a
            className={`mt-1 inline-flex items-center gap-x-2 ${link}`}
            href={toMapUrl(venue)}
            rel='noreferrer'
            target='_blank'
          >
            <Icon name='pin' size='small' />
            <span className='hover:underline'>Apri in Google Maps</span>
          </a>
        </div>
      ) : null}

      {phone ? (
        <div className='flex flex-col gap-y-1'>
          <span className={label}>Informazioni</span>
          <a
            className={`inline-flex items-center gap-x-2 ${link}`}
            href={toPhoneUrl(phone)}
          >
            <Icon name='phone' size='small' />
            <span className='hover:underline'>{phone}</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
