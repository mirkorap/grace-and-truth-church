import DisplaySmall from '@/components/Heading/DisplaySmall';
import Quote from '@/components/Heading/Quote';
import Post from '@/components/Post';

import { Posts } from './costants';

export default function LastSermonsSection() {
  return (
    <section id='last-sermons' className='w-full py-32'>
      <div className='mx-auto w-full'>
        <div className='mb-20 text-center'>
          <DisplaySmall text='Sermoni recenti' className='mb-5' />
          <Quote
            text="Ogni Scrittura è ispirata da Dio e utile a insegnare, a riprendere, a correggere, a educare alla giustizia, perché l'uomo di Dio sia completo e ben preparato per ogni opera buona."
            verse='2Ti. 3:16-17'
            className='mx-auto max-w-5xl'
          />
        </div>

        <div className='mx-auto flex w-full max-w-[85rem] flex-col items-center justify-center gap-10 px-4 lg:flex-row'>
          {Posts.map((item) => (
            <Post
              key={item.id}
              category={item.category}
              author={item.author}
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
    </section>
  );
}
