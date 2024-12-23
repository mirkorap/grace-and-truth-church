import { createClient } from 'next-sanity';

import { dataset, projectId, token } from './env';

export const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});
