import AccessSection from '@/containers/recordings-access-page/access-section';
import type { Metadata } from 'next';

interface Options {
  searchParams?: {
    from?: string;
    error?: string;
  };
}

export const metadata: Metadata = {
  title: 'Area riservata | Chiesa Grazia e Verità',
  robots: { index: false, follow: false },
};

export default function RecordingsAccess({ searchParams }: Options) {
  return (
    <main className='mx-auto max-w-[85rem] px-4'>
      <AccessSection
        failed={searchParams?.error === '1'}
        from={searchParams?.from ?? '/recordings'}
      />
    </main>
  );
}
