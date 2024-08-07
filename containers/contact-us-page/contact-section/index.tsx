import ContactForm from './contact-form';
import ContactInfo from './contact-info';

export default function ContactSection() {
  return (
    <section id='section' className='mb-32 w-full px-4 pt-44'>
      <div className='mx-auto flex max-w-[85rem] flex-col gap-10 px-4 lg:flex-row'>
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}