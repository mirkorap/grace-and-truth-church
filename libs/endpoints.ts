export const contactUs =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/contact-us';

export const getAllSermons =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/sermons/getAll';

export const getLatestSermons =
  (process.env.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000') + '/api/sermons/getLatest';
