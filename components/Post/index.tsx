import { PostOpts } from '@/types/Post';

import PostBody from './PostBody';
import PostImage from './PostImage';

export default function Post({
  category,
  author,
  title,
  text,
  href,
  imgSrc,
  imgAlt,
  publishedAt,
}: PostOpts) {
  return (
    <div>
      <PostImage
        category={category}
        author={author}
        href={href}
        imgSrc={imgSrc}
        imgAlt={imgAlt}
      />

      <PostBody
        title={title}
        text={text}
        href={href}
        publishedAt={publishedAt}
      />
    </div>
  );
}
