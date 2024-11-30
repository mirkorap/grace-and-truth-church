import ContactForm from './contact-form';
import ContactInfo from './contact-info';

export default function ContactSection() {
  return (
    <section className='mb-32 w-full pt-44' id='contact'>
      <div className='mx-auto flex max-w-[85rem] flex-col gap-10 px-4 lg:flex-row lg:justify-between'>
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}
