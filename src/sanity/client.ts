import { dataset, projectId } from '@/src/env';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});
