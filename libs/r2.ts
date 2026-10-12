import {
  r2AccessKeyId as accessKeyId,
  r2AccountId as accountId,
  r2Bucket as bucket,
  r2SecretAccessKey as secretAccessKey,
} from '@/src/env';
import { AwsClient } from 'aws4fetch';

const EXPIRES_IN = 60 * 60 * 2;

let client: AwsClient | null = null;

const getClient = () => {
  if (!client) {
    client = new AwsClient({
      accessKeyId,
      secretAccessKey,
      service: 's3',
      region: 'auto',
    });
  }

  return client;
};

const endpoint = (key: string) => {
  const path = key.split('/').map(encodeURIComponent).join('/');

  return `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${path}`;
};

export const signAudioUrl = async (key: string) => {
  const url = new URL(endpoint(key));
  url.searchParams.set('X-Amz-Expires', String(EXPIRES_IN));

  const signed = await getClient().sign(url.toString(), {
    aws: { signQuery: true },
  });

  return signed.url;
};
