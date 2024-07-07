import Image from 'next/image';
import Link from 'next/link';

export default function Brand() {
  return (
    <Link href='/'>
      <Image
        src='/logo.webp'
        className='rounded-full'
        alt='Logo Chiesa Grazia e Verità'
        priority
        width={60}
        height={60}
      />
    </Link>
  );
}
