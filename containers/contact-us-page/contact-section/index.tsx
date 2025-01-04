import ContactForm from './contact-form';
import ContactInfo from './contact-info';

export default function ContactSection() {
  return (
    <section className='mb-32 w-full pt-44' id='contact'>
      <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}
