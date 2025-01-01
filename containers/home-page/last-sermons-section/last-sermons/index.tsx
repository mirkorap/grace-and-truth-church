'use client';

import Modal from '@/components/Modal';
import Post from '@/components/Post';
import Thumbnail from '@/components/Thumbnail';
import VideoPlayer from '@/components/VideoPlayer';
import { LastSermons as Options } from '@/containers/home-page/last-sermons-section/types';
import { nullSermon as empty } from '@/types/Sermon';
import { Sermon } from '@/types/Sermon';
import { useState } from 'react';

export default function LastSermons({ featured, others }: Options) {
  const [selected, setSelected] = useState<Sermon>(empty);

  function onOpen(sermon: Sermon) {
    setSelected(sermon);
  }

  function onClose() {
    setSelected(empty);
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <Post
            author={featured.author}
            category={featured.book}
            imgAlt={featured.title}
            imgSrc={featured.image}
            publishedAt={featured.publishedAt}
            text={featured.text}
            title={featured.title}
            onClick={() => onOpen(featured)}
          />
        </div>

        <div>
          {others.map((sermon) => (
            <Thumbnail
              key={sermon.slug}
              imgAlt={sermon.title}
              imgSrc={sermon.image}
              publishedAt={sermon.publishedAt}
              title={sermon.title}
              onClick={() => onOpen(sermon)}
            />
          ))}
        </div>
      </div>

      <Modal
        href={`https://www.youtube.com/watch?v=${selected.slug}`}
        opened={!!selected.slug}
        title={selected.title}
        onClose={onClose}
      >
        <VideoPlayer title={selected.title} videoId={selected.slug} />
      </Modal>
    </>
  );
}
