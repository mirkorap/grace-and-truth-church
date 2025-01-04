import { PostOpts as Options } from '@/types/Post';

import PostBody from './PostBody';
import PostImage from './PostImage';

export default function Post({
  category,
  author,
  verses,
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
        verses={verses}
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
