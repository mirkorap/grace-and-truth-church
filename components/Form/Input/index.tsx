import { Input as Options } from '@/types/Form';

export default function Input({ id, name, label, placeholder }: Options) {
  return (
    <div className='flex flex-col gap-y-2'>
      <label className='font-semibold' htmlFor={id}>
        {label}
      </label>

      <input
        type='text'
        id={id}
        name={name}
        placeholder={placeholder}
        className='rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-800 outline-primary-500 focus:bg-transparent'
      ></input>
    </div>
  );
}
