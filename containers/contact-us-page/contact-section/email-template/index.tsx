import HeadlineMedium from '@/components/Heading/HeadlineMedium';
import { EmailTemplate as Options } from '@/containers/contact-us-page/contact-section/types';

export default function EmailTemplate({
  name,
  email,
  subject,
  message,
}: Options) {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12'>
      <div className='relative py-3 sm:mx-auto sm:max-w-xl'>
        <div className='absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-secondary-400 to-primary-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-lg'></div>
        <div className='relative bg-card px-4 py-10 shadow-lg sm:rounded-lg sm:p-20'>
          <div className='mx-auto max-w-md'>
            <div>
              <HeadlineMedium text='Un nuovo messaggio è stato ricevuto' />
            </div>

            <div className='divide-y divide-gray-200'>
              <div className='space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7'>
                <p>
                  <strong>Nome:</strong> {name}
                </p>
                <p>
                  <strong>E-mail:</strong> {email}
                </p>
                <p>
                  <strong>Oggetto:</strong> {subject}
                </p>
                <p>
                  <strong>Messaggio:</strong>
                  <br></br>
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
