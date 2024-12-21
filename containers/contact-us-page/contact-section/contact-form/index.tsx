import PrimaryButton from '@/components/Button/PrimaryButton';
import Input from '@/components/Form/Input';
import Textarea from '@/components/Form/Textarea';
import BodyLarge from '@/components/Heading/BodyLarge';
import HeadlineMedium from '@/components/Heading/HeadlineMedium';

export default function ContactForm() {
  return (
    <div className='w-full lg:w-8/12'>
      <div className='h-full rounded-xl border bg-white p-8 shadow-sm'>
        <div className='flex flex-col gap-y-2 text-center'>
          <HeadlineMedium text='Contattaci' />
          <BodyLarge
            className='lg:whitespace-pre-line'
            text={`Compila il modulo qui sotto per inviarci un messaggio\n o per ricevere informazioni`}
          />
        </div>

        <form
          action='api/contact-us'
          className='mt-8 flex flex-col space-y-4'
          method='POST'
        >
          <div className='flex flex-col gap-4 lg:flex-row'>
            <Input
              id='name'
              label='Nome'
              name='name'
              placeholder='Nome Completo'
            />

            <Input
              id='email'
              label='E-mail'
              name='email'
              placeholder='Indirizzo E-mail'
            />
          </div>

          <Input
            id='subject'
            label='Oggetto'
            name='subject'
            placeholder='Oggetto'
          />

          <Textarea
            cols={4}
            id='message'
            label='Messaggio'
            name='message'
            placeholder='Scrivi qui il tuo messaggio'
            rows={6}
          />

          <PrimaryButton
            className='!block md:self-end'
            size='medium'
            style='contained'
            text='Invia messaggio'
            type='submit'
          />
        </form>
      </div>
    </div>
  );
}
