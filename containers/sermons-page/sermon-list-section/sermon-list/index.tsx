'use client';

import Modal from '@/components/Modal';
import Post from '@/components/Post';
import VideoPlayer from '@/components/VideoPlayer';
import { SermonList as Options } from '@/containers/sermons-page/sermon-list-section/types';
import { useClientMediaQuery } from '@/hooks/device';
import { Sermon, emptySermon as empty } from '@/types/Sermon';
import { useState } from 'react';

export default function SermonList({ sermons }: Options) {
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
    <div className='order-last grid grid-cols-1 gap-8 lg:order-first lg:grid-cols-2'>
      {sermons.map((item) => (
        <Post
          key={item.slug}
          author={item.author}
          category={item.book}
          imgAlt={item.title}
          imgSrc={item.image}
          publishedAt={item.publishedAt}
          text={item.text}
          title={item.title}
          onClick={() => onClick(item)}
        />
      ))}

      <Modal
        href={`https://www.youtube.com/watch?v=${selected.slug}`}
        opened={opened}
        title={selected.title}
        onClose={onClose}
      >
        <VideoPlayer title={selected.title} videoId={selected.slug} />
      </Modal>
    </div>
  );
}
