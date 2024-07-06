import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='flex w-full flex-wrap bg-transparent py-4 text-sm sm:flex-nowrap sm:justify-start'>
      <nav
        className='mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between'
        aria-label='Global'
      >
        <Link href="#">
          <Image
            className='rounded-full'
            src='/logo.webp'
            alt='Chiesa Grazia e Verità Logo'
            width={60}
            height={60}
            priority
          />
        </Link>
        <div className='mt-5 flex flex-row items-center gap-5 sm:mt-0 sm:justify-end sm:ps-5'>
          <Link
            className='text-primary-500 font-medium'
            href='#'
            aria-current='page'
          >
            Home
          </Link>
          <Link
            className='font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
            href='#'
          >
            Chi siamo
          </Link>
          <Link
            className='font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
            href='#'
          >
            Incontri
          </Link>
          <Link
            className='font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
            href='#'
          >
            Sermoni
          </Link>
          <Link
            className='font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
            href='#'
          >
            Ultime novità
          </Link>
          <Link
            className='font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500'
            href='#'
          >
            Contattaci
          </Link>
        </div>
      </nav>
    </header>
  );
}
