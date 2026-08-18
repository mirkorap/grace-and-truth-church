import dayjs from 'dayjs';
import 'dayjs/locale/it';

const it = (date: string) => dayjs(date).locale('it');

export const yearOf = (date: string) => Number(date.slice(0, 4));

export const formatDate = (date: string) => it(date).format('D MMMM YYYY');

export const formatWeekday = (date: string) => {
  const formatted = it(date).format('dddd D MMMM');

  return formatted[0].toUpperCase() + formatted.slice(1);
};

export const formatDateRange = (start: string, end: string) => {
  if (!end || end === start) return formatDate(start);

  const from = it(start);
  const to = it(end);

  if (!from.isSame(to, 'year'))
    return `${formatDate(start)} - ${formatDate(end)}`;

  if (!from.isSame(to, 'month')) {
    return `${from.format('D MMMM')} - ${to.format('D MMMM YYYY')}`;
  }

  return `${from.format('D')} - ${to.format('D MMMM YYYY')}`;
};

export const isUpcoming = (start: string, end: string) => {
  return it(end || start)
    .endOf('day')
    .isAfter(dayjs());
};
