import PrimaryButton from '@/components/Button/PrimaryButton';
import Input from '@/components/Form/Input';
import BodyLarge from '@/components/Heading/BodyLarge';
import BodyMedium from '@/components/Heading/BodyMedium';
import HeadlineMedium from '@/components/Heading/HeadlineMedium';

import { AccessSection as Options } from './types';

export default function AccessSection({ from, failed }: Options) {
  return (
    <section className='flex w-full justify-center pb-20 pt-44' id='access'>
      <div className='w-full rounded-xl border bg-white p-8 shadow-sm lg:w-6/12'>
        <div className='flex flex-col gap-y-2 text-center'>
          <HeadlineMedium text='Area riservata' />
          <BodyLarge text='Le registrazioni degli studi biblici sono riservate alla nostra comunità. Inserisci la password che ti è stata comunicata.' />
        </div>

        <form
          action='/recordings/access/api'
          className='mt-8 flex flex-col space-y-4'
          method='POST'
        >
          <input name='from' type='hidden' value={from} />

          <Input
            id='password'
            label='Password'
            name='password'
            placeholder='Password'
            type='password'
          />

          {failed ? (
            <BodyMedium
              className='!text-red-600'
              text='Password non corretta. Riprova.'
            />
          ) : null}

          <PrimaryButton
            className='!block md:self-end'
            size='medium'
            style='contained'
            text='Accedi'
            type='submit'
          />
        </form>
      </div>
    </section>
  );
}
