import { FIRST_EVENT_YEAR } from '@/constants/events';
import { ProgramGroup, ProgramSlot, Venue } from '@/types/Event';
import { YearCounts, YearFilter } from '@/types/Filter';

export const toYearFilters = (counts: YearCounts): YearFilter[] => {
  const found = Object.keys(counts).map(Number).filter(Boolean);
  const current = new Date().getFullYear();

  const first = Math.min(FIRST_EVENT_YEAR, ...found);
  const last = Math.max(current, ...found);

  return Array.from({ length: last - first + 1 }, (item, index) => {
    const year = last - index;

    return { year, count: counts[year] ?? 0 };
  });
};

export const resolveYear = (
  requested: string | undefined,
  years: YearFilter[],
) => {
  const current = new Date().getFullYear();
  const asked = Number(requested);

  if (asked && years.some((item) => item.year === asked)) return asked;

  if (years.some((item) => item.year === current && item.count > 0))
    return current;

  return years.find((item) => item.count > 0)?.year ?? current;
};

export const toMapUrl = ({ name, street, city }: Venue) => {
  const query = [name, street, city].filter(Boolean).join(', ');

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export const toPhoneUrl = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

export const groupProgram = (program: ProgramSlot[] = []) => {
  return program.reduce((groups: ProgramGroup[], slot) => {
    const last = groups[groups.length - 1];

    if (last && last.day === (slot.day ?? '')) {
      return [
        ...groups.slice(0, -1),
        { ...last, slots: [...last.slots, slot] },
      ];
    }

    return [...groups, { day: slot.day ?? '', slots: [slot] }];
  }, []);
};
