import { PostOpts as Options } from '@/types/Post';

import PostBody from './PostBody';
import PostImage from './PostImage';

export default function Post({
  author,
  book,
  title,
  text,
  href,
  imgSrc,
  imgAlt,
  publishedAt,
}: Options) {
  return (
    <div>
      <PostImage
        author={author}
        book={book}
        href={href}
        imgAlt={imgAlt}
        imgSrc={imgSrc}
      />

      <PostBody
        href={href}
        publishedAt={publishedAt}
        text={text}
        title={title}
      />
    </div>
  );
}
