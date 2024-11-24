import Image from 'next/image';
import Link from 'next/link';

export default function Brand() {
  return (
    <Link href='/'>
      <Image
        priority
        alt='Logo Chiesa Grazia e Verità'
        className='rounded-full'
        height={60}
        src='/logo.webp'
        width={60}
      />
    </Link>
  );
}
