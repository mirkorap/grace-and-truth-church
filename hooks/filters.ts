'use client';

import { SermonFilters } from '@/types/Filter';
import { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSermonFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: SermonFilters = {
    book: searchParams.get('book') ?? '',
    title: searchParams.get('title') ?? '',
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
  };

  // Any filter change sends the user back to the first page, otherwise the
  // current page could fall outside the filtered results.
  const apply = useCallback(
    (changes: Partial<SermonFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(changes).forEach(([name, value]) => {
        if (value) {
          params.set(name, value);
          return;
        }

        params.delete(name);
      });

      params.delete('page');

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      router.replace(url as Route, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clear = useCallback(() => {
    router.replace(pathname as Route, { scroll: false });
  }, [pathname, router]);

  const isActive = !!(
    filters.book ||
    filters.title ||
    filters.from ||
    filters.to
  );

  return { filters, apply, clear, isActive };
}
