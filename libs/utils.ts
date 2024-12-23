import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';

export const isUrl = (url: string) => {
  return !!url.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  );
};

export const getImage = (src: string) => {
  return isUrl(src) ? getRemoteImage(src) : getLocalImage(src);
};

const getRemoteImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

const getLocalImage = async (src: string) => {
  const file = await fs.readFile(`./public${src}`);

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(file, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
