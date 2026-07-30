import { Pagination as Options } from '@/types/Pagination';
import Link from 'next/link';

const base =
  'inline-flex items-center gap-x-2 rounded border px-4 py-3 font-nunito text-sm font-semibold sm:px-6 sm:py-3';
const enabled =
  'border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white';
const disabled = 'pointer-events-none border-gray-200 text-gray-300';

export default function Pagination({ page, totalPages }: Options) {
  const href = (target: number) => ({
    pathname: '/sermons' as const,
    query: { page: target },
    hash: 'sermon-list',
  });

  return (
    <nav className='flex w-full items-center justify-center gap-x-4 py-8 sm:gap-x-8'>
      {page > 1 ? (
        <Link className={`${base} ${enabled}`} href={href(page - 1)}>
          Precedente
        </Link>
      ) : (
        <span className={`${base} ${disabled}`}>Precedente</span>
      )}

      <span className='font-nunito text-sm font-semibold'>
        Pagina {page} di {totalPages}
      </span>

      {page < totalPages ? (
        <Link className={`${base} ${enabled}`} href={href(page + 1)}>
          Successiva
        </Link>
      ) : (
        <span className={`${base} ${disabled}`}>Successiva</span>
      )}
    </nav>
  );
}
