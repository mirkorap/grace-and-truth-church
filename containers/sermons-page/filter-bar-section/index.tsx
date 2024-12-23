export default function FilterBarSection() {
  return (
    <div className='relative flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm'>
      <nav className='flex min-w-[240px] flex-col gap-1 p-1.5'>
        <div
          className='flex w-full items-center rounded-md bg-slate-100 p-3 text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
          role='button'
        >
          Inbox
        </div>
        <div
          className='mt-1 flex w-full items-center rounded-md p-3 text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
          role='button'
        >
          Trash
        </div>
        <div
          className='mt-1 flex w-full items-center rounded-md p-3 text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'
          role='button'
        >
          Settings
        </div>
      </nav>
    </div>
  );
}
