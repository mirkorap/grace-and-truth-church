import Chip from '@/components/Chip';
import BodyLarge from '@/components/Heading/BodyLarge';
import TitleMedium from '@/components/Heading/TitleMedium';
import { DoctrinalItemOpts as Options } from '@/containers/about-us-page/doctrinal-lines-section/types';

export default function DoctrinalItem({ title, text, verses }: Options) {
  return (
    <li>
      <TitleMedium text={title} />
      <BodyLarge text={text} />

      <div className='mt-2 flex flex-wrap gap-1.5'>
        {verses.map((verse, index) => {
          return (
            <Chip
              key={index}
              href={`https://www.laparola.net/testo.php?riferimento=${verse}`}
              text={verse}
            />
          );
        })}
      </div>
    </li>
  );
}
