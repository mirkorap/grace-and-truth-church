import dayjs from 'dayjs';

export default function Copyright() {
  const year = dayjs().format('YYYY');

  return (
    <span className='whitespace-pre-line text-lg text-gray-500 md:whitespace-normal'>
      &copy; {year} {`Chiesa Cristiana Evangelica\n "Grazia e Verità"`}
    </span>
  );
}
