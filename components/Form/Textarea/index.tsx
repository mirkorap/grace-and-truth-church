import { Textarea as Options } from '@/types/Form';

export default function Textarea({
  id,
  name,
  label,
  placeholder,
  cols,
  rows,
}: Options) {
  return (
    <div className='flex w-full flex-col gap-y-2'>
      <label className='font-semibold' htmlFor={id}>
        {label}
      </label>

      <textarea
        className='resize-none rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-800 outline-primary-500 focus:bg-transparent'
        cols={cols}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
      ></textarea>
    </div>
  );
}
