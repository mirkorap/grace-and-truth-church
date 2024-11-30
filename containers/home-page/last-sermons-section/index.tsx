import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';
import Post from '@/components/Post';
import Thumbnail from '@/components/Thumbnail';

import { Thumbnails } from './costants';

export default function LastSermonsSection() {
  return (
    <section className='w-full py-32' id='last-sermons'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall className='mb-5' text='Sermoni recenti' />
          <Quote
            className='px-[10%]'
            text="Ogni Scrittura è ispirata da Dio e utile a insegnare, a riprendere, a correggere, a educare alla giustizia, perché l'uomo di Dio sia completo e ben preparato per ogni opera buona."
            verse='2Ti. 3:16-17'
          />
        </div>

        <div className='mx-auto w-full max-w-[85rem] px-4'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <Post
                author='Giuseppe Fortuna'
                category='grace'
                href='/'
                imgAlt='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                imgSrc='/home/cross.jpg'
                publishedAt={new Date(Date.parse('2024-06-16'))}
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat nibh, sodales in elit et, scelerisque condimentum mauris.'
                title='Lorem ipsum dolor sit amet'
              />
            </div>

            <div>
              {Thumbnails.map((item) => (
                <Thumbnail
                  key={item.id}
                  href={item.href}
                  imgAlt={item.imgAlt}
                  imgSrc={item.imgSrc}
                  publishedAt={item.publishedAt}
                  text={item.text}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
