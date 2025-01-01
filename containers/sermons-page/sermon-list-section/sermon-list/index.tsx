'use client';

import Modal from '@/components/Modal';
import Post from '@/components/Post';
import VideoPlayer from '@/components/VideoPlayer';
import { SermonList as Options } from '@/containers/sermons-page/sermon-list-section/types';
import { Sermon, nullSermon as empty } from '@/types/Sermon';
import { useState } from 'react';

export default function SermonList({ sermons }: Options) {
  const [selected, setSelected] = useState<Sermon>(empty);

  function onOpen(sermon: Sermon) {
    setSelected(sermon);
  }

  function onClose() {
    setSelected(empty);
  }

  return (
    <>
      {sermons.map((sermon) => (
        <Post
          key={sermon.slug}
          author={sermon.author}
          category={sermon.book}
          imgAlt={sermon.title}
          imgSrc={sermon.image}
          publishedAt={sermon.publishedAt}
          text={sermon.text}
          title={sermon.title}
          onClick={() => onOpen(sermon)}
        />
      ))}

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
