import { EventFilterBar as Options } from '@/types/Filter';

import YearSlider from './YearSlider';

export default function EventFilterBar({ years, selected }: Options) {
  return (
    <div className='flex w-full flex-col gap-y-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
      <YearSlider selected={selected} years={years} />
    </div>
  );
}
