const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const contactUs = `${getBaseUrl()}/api/contact-us`;
export const getAll = `${getBaseUrl()}/api/sermons/getAll`;
export const getLatestSermons = `${getBaseUrl()}/api/sermons/getLatest`;
