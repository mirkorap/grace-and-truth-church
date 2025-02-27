'use client';

import Modal from '@/components/Modal';
import Post from '@/components/Post';
import Thumbnail from '@/components/Thumbnail';
import VideoPlayer from '@/components/VideoPlayer';
import { LastSermons as Options } from '@/containers/home-page/last-sermons-section/types';
import { useClientMediaQuery } from '@/hooks/device';
import { emptySermon as empty } from '@/types/Sermon';
import { Sermon } from '@/types/Sermon';
import { useState } from 'react';

export default function LastSermons({ featured, thumbnails }: Options) {
  const [selected, setSelected] = useState<Sermon>(empty);
  const isTablet = useClientMediaQuery('(min-width: 768px)');
  const opened = !!selected.slug;

  function onClick(sermon: Sermon) {
    if (isTablet) {
      setSelected(sermon);
      return;
    }

    window.open(`https://www.youtube.com/watch?v=${sermon.slug}`, '_blank');
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
            verses={featured.verses}
            onClick={() => onClick(featured)}
          />
        </div>

        <div>
          {thumbnails.map((item) => (
            <Thumbnail
              key={item.slug}
              imgAlt={item.title}
              imgSrc={item.image}
              publishedAt={item.publishedAt}
              title={item.title}
              onClick={() => onClick(item)}
            />
          ))}
        </div>
      </div>

      <Modal
        href={`https://www.youtube.com/watch?v=${selected.slug}`}
        opened={opened}
        title={selected.title}
        onClose={onClose}
      >
        <VideoPlayer title={selected.title} videoId={selected.slug} />
      </Modal>
    </>
  );
}
