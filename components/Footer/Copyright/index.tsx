import dayjs from 'dayjs';

export default function Copyright() {
  const year = dayjs().format('YYYY');

  return (
    <span className='text-lg text-gray-500'>
      &copy; {year} Chiesa Cristiana Evangelica &quot;Grazia e Verità&quot;
    </span>
  );
}
