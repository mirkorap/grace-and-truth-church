import FilterBar from '@/components/FilterBar';
import { BIBLE_BOOKS } from '@/constants/bible-books';
import { fetchSermonsCountByBook } from '@/libs/queries';
import { BookFilter } from '@/types/Filter';

export default async function FilterSection() {
  const counts = await fetchSermonsCountByBook();

  const books: BookFilter[] = BIBLE_BOOKS.map((item) => ({
    ...item,
    count: counts[item.book] ?? 0,
  }));

  return (
    <section className='w-full pt-10' id='sermon-filters'>
      <FilterBar books={books} />
    </section>
  );
}
