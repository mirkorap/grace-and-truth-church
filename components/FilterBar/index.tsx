import { FilterBar as Options } from '@/types/Filter';

import BookSlider from './BookSlider';
import SearchFilters from './SearchFilters';

export default function FilterBar({ books }: Options) {
  return (
    <div className='flex w-full flex-col gap-y-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
      <BookSlider books={books} />
      <hr className='border-slate-200' />
      <SearchFilters />
    </div>
  );
}
