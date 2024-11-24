import { Input as Options } from '@/types/Form';

export default function Input({ id, name, label, placeholder }: Options) {
  return (
    <div className='flex w-full flex-col gap-y-2'>
      <label className='font-semibold' htmlFor={id}>
        {label}
      </label>

      <input
        className='rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-800 outline-primary-500 focus:bg-transparent'
        id={id}
        name={name}
        placeholder={placeholder}
        type='text'
      ></input>
    </div>
  );
}
