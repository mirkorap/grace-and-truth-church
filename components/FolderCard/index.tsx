import LinkButton from '@/components/Button/LinkButton';
import RouteButton from '@/components/Button/RouteButton';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleLarge from '@/components/Heading/TitleLarge';
import TitleSmall from '@/components/Heading/TitleSmall';
import { FolderCard as Options } from '@/types/Card';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const label = (count: number) => {
  if (count === 1) {
    return '1 registrazione';
  }

  return `${count} registrazioni`;
};

export default function FolderCard({
  title,
  text,
  count,
  href,
  external,
  imgSrc,
  imgAlt,
}: Options) {
  return (
    <div className='group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-lg'>
      <div className='relative overflow-hidden rounded-t-xl pt-[70%] sm:pt-[60%] lg:pt-[80%]'>
        {external ? (
          <a href={href} target='_blank'>
            <Image
              alt={imgAlt}
              className='absolute start-0 top-0 size-full rounded-t-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
              height={330}
              src={imgSrc}
              width={415}
            />
          </a>
        ) : (
          <Link href={href as Route}>
            <Image
              alt={imgAlt}
              className='absolute start-0 top-0 size-full rounded-t-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
              height={330}
              src={imgSrc}
              width={415}
            />
          </Link>
        )}
      </div>

      <div className='grid flex-1 p-4 md:p-5'>
        <TitleLarge text={title} />

        {external ? null : (
          <TitleSmall className='mt-1 text-primary-500' text={label(count)} />
        )}

        <BodyLarge className='mb-5 mt-2' text={text} />

        {external ? (
          <LinkButton
            className='w-max self-end'
            href={href}
            icon='forward'
            size='small'
            style='outlined'
            text='Apri la raccolta'
            type='button'
          />
        ) : (
          <RouteButton
            className='w-max self-end'
            href={href as Route}
            icon='forward'
            size='small'
            style='outlined'
            text='Ascolta la serie'
            type='button'
          />
        )}
      </div>
    </div>
  );
}
