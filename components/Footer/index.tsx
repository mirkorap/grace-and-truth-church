import Brand from '@/components/Brand';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';

import Copyright from './Copyright';
import NavItem from './NavItem';
import { NavItems } from './constants';

export default function Footer() {
  return (
    <footer className='w-full py-5'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto flex flex-col items-center text-center'>
          <Brand />

          <div className='my-5'>
            <TitleLarge text='Chiesa Cristiana Evangelica' />
            <TitleLarge text='"Grazia e Verità"' />
          </div>

          <div>
            <BodyLarge text='Via Giuseppe Garibaldi 453 - 95029 Viagrande (CT)' />
            <BodyLarge text='chiesagraziaeverita@gmail.com | Tel: +39 329 7117849' />
          </div>

          <ul className='mb-10 flex flex-wrap items-center justify-center gap-7 border-b border-gray-200 py-10 text-lg'>
            {NavItems.map((item) => (
              <NavItem key={item.id} href={item.href} text={item.text} />
            ))}
          </ul>

          <Copyright />
        </div>
      </div>
    </footer>
  );
}
