import { FilterBar as Options } from '@/types/Filter';

import FilterItem from './FilterItem';

export default function FilterBar({ items }: Options) {
  return (
    <div className='relative flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm'>
      <nav className='flex min-w-60 flex-col gap-1 p-1.5'>
        {items.map((item) => (
          <FilterItem
            key={item.id}
            count={item.count}
            text={item.text}
            value={item.value}
          />
        ))}
      </nav>
    </div>
  );
}
