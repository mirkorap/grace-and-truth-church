import { RichText as Options } from '@/types/RichText';
import { PortableText, PortableTextComponents } from 'next-sanity';

const heading = 'mt-2 font-roboto font-semibold text-headline-700 first:mt-0';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => (
      <h1 className={`${heading} text-3xl lg:text-4xl`}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className={`${heading} text-2xl lg:text-3xl`}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={`${heading} text-xl lg:text-2xl`}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className={`${heading} text-lg lg:text-xl`}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className={`${heading} text-base lg:text-lg`}>{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className={`${heading} text-sm lg:text-base`}>{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-s-4 border-primary-500 ps-4 italic text-headline-600'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className='flex list-disc flex-col gap-y-1 ps-5'>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className='flex list-decimal flex-col gap-y-1 ps-5'>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,
    underline: ({ children }) => <span className='underline'>{children}</span>,
    'strike-through': ({ children }) => (
      <span className='line-through'>{children}</span>
    ),
    code: ({ children }) => (
      <code className='rounded bg-scaffold px-1 py-0.5 font-mono text-[0.9em]'>
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href ?? '';
      const external = /^https?:\/\//.test(href);

      return (
        <a
          className='text-primary-500 underline transition hover:text-primary-600'
          href={href}
          rel={external ? 'noopener noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value, className = '' }: Options) {
  if (!value?.length) return null;

  return (
    <div
      className={`flex flex-col gap-y-3 font-nunito text-sm font-medium text-headline-700 lg:text-base ${className}`}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
