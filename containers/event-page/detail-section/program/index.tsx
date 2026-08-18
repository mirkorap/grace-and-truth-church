import BodyMedium from '@/components/Heading/BodyMedium';
import TitleMedium from '@/components/Heading/TitleMedium';
import TitleSmall from '@/components/Heading/TitleSmall';
import { formatWeekday } from '@/libs/dates';
import { groupProgram } from '@/libs/events';

import { Program as Options } from '../types';

export default function Program({ program }: Options) {
  const groups = groupProgram(program);

  if (!groups.length) return null;

  return (
    <div className='flex flex-col gap-y-4'>
      <TitleMedium text='Programma' />

      {groups.map((group) => (
        <div key={group.day || 'single'} className='flex flex-col gap-y-3'>
          {group.day ? (
            <TitleSmall
              className='text-primary-500'
              text={formatWeekday(group.day)}
            />
          ) : null}

          <ul className='flex flex-col divide-y divide-slate-200 rounded-lg border border-slate-200'>
            {group.slots.map((slot) => (
              <li key={slot._key} className='flex gap-x-4 p-4'>
                <span className='w-16 shrink-0 font-nunito text-sm font-semibold text-primary-500'>
                  {slot.time}
                </span>

                <div className='flex flex-col gap-y-1'>
                  <TitleSmall text={slot.title} />
                  {slot.speaker ? <BodyMedium text={slot.speaker} /> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
