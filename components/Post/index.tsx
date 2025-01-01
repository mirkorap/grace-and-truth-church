import { PostOpts as Options } from '@/types/Post';

import PostBody from './PostBody';
import PostImage from './PostImage';

export default function Post({
  category,
  author,
  title,
  text,
  imgSrc,
  imgAlt,
  publishedAt,
  onClick,
}: Options) {
  return (
    <div>
      <PostImage
        author={author}
        category={category}
        imgAlt={imgAlt}
        imgSrc={imgSrc}
        onClick={onClick}
      />

      <PostBody
        publishedAt={publishedAt}
        text={text}
        title={title}
        onClick={onClick}
      />
    </div>
  );
}
