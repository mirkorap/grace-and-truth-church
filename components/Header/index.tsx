import NavBar from '@/components/Navbar';

export default function Header() {
  return (
    <header className='absolute flex w-full flex-wrap bg-scaffold py-4 text-sm sm:flex-nowrap sm:justify-start'>
      <NavBar />
    </header>
  );
}
