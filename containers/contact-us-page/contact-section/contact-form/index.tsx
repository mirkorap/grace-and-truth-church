import PrimaryButton from '@/components/Button/PrimaryButton';
import Input from '@/components/Form/Input';
import Textarea from '@/components/Form/Textarea';
import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineMedium from '@/components/Heading/HeadlineMedium';

export default function ContactForm() {
  return (
    <div>
      <div className='h-full rounded-xl border bg-white p-8 shadow-sm'>
        <div className='flex flex-col gap-y-2 text-center'>
          <HeadlineMedium text='Contattaci' />
          <BodyLarge text='Compila il modulo qui sotto per inviarci un messaggio o per ricevere informazioni' />
        </div>

        <form className='mt-8 flex flex-col space-y-4'>
          <div className='flex flex-col gap-y-4 lg:flex-row lg:justify-between'>
            <Input
              id='name'
              name='name'
              label='Nome'
              placeholder='Nome Completo'
            />

            <Input
              id='email'
              name='email'
              label='E-mail'
              placeholder='Indirizzo E-mail'
            />
          </div>

          <Input
            id='subject'
            name='subject'
            label='Oggetto'
            placeholder='Oggetto'
          />

          <Textarea
            id='message'
            name='message'
            label='Messaggio'
            placeholder='Scrivi qui il tuo messaggio'
            cols={4}
            rows={6}
          />

          <PrimaryButton
            type='submit'
            text='Invia messaggio'
            style='contained'
            size='medium'
            className='self-end'
          />
        </form>
      </div>
    </div>
  );
}
