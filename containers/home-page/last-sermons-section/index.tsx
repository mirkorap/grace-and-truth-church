import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';
import Post from '@/components/Post';
import Thumbnail from '@/components/Thumbnail';

import { Thumbnails } from './costants';

export default function LastSermonsSection() {
  return (
    <section id='last-sermons' className='w-full py-32'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall text='Sermoni recenti' className='mb-5' />
          <Quote
            text="Ogni Scrittura è ispirata da Dio e utile a insegnare, a riprendere, a correggere, a educare alla giustizia, perché l'uomo di Dio sia completo e ben preparato per ogni opera buona."
            verse='2Ti. 3:16-17'
            className='px-[10%]'
          />
        </div>

        <div className='mx-auto w-full max-w-[85rem] px-4'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <Post
                category='grace'
                author='Giuseppe Fortuna'
                title='Lorem ipsum dolor sit amet'
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce erat nibh, sodales in elit et, scelerisque condimentum mauris.'
                href='/'
                imgSrc='/home/cross.jpg'
                imgAlt='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                publishedAt={new Date(Date.parse('2024-06-16'))}
              />
            </div>

            <div>
              {Thumbnails.map((item) => (
                <Thumbnail
                  key={item.id}
                  title={item.title}
                  text={item.text}
                  href={item.href}
                  imgSrc={item.imgSrc}
                  imgAlt={item.imgAlt}
                  publishedAt={item.publishedAt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
