'use client';

import Brand from '@/components/Brand';
import clsx from 'clsx';
import { useState } from 'react';

import NavItem from './NavItem';
import ToggleButton from './ToggleButton';
import { NavItems } from './constants';

export default function Navbar() {
  const [opened, setOpened] = useState(false);

  function onToggle() {
    setOpened(!opened);
  }

  return (
    <nav
      className={clsx('mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between', {
        'shadow': opened
      })}
      aria-label='Global'
    >
      <div className='flex items-center justify-between'>
        <Brand />

        <div className='sm:hidden'>
          <ToggleButton opened={opened} onToggle={onToggle} />
        </div>
      </div>

      <div
        id='navbar-collapse-with-animation'
        className={clsx('grow basis-full overflow-hidden sm:block', {
          hidden: !opened,
        })}
      >
        <div className='my-5 flex flex-col gap-5 sm:my-0 sm:flex-row sm:items-center sm:justify-center lg:justify-end sm:ps-5'>
          {NavItems.map((item) => (
            <NavItem key={item.id} href={item.href} text={item.text} />
          ))}
        </div>
      </div>
    </nav>
  );
}
