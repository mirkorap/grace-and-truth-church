import { ContactItems } from '@/containers/contact-us-page/contact-section/constants';

import ContactItem from './contact-item';

export default function ContactInfo() {
  return (
    <div className='flex w-full flex-col gap-y-5 text-center lg:w-5/12'>
      {ContactItems.map((item) => {
        return (
          <ContactItem
            key={item.id}
            color={item.color}
            icon={item.icon}
            text={item.text}
          />
        );
      })}
    </div>
  );
}
