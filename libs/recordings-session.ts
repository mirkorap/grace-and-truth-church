import { recordingsPassword, recordingsSecret as secret } from '@/src/env';

export const SESSION_COOKIE = 'recordings_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

const hmacKey = () => {
  if (!secret) {
    throw new Error(
      'RECORDINGS_COOKIE_SECRET non è impostata: le sessioni della sezione registrazioni non possono essere firmate. Generane una con `openssl rand -hex 32`.',
    );
  }

  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
};

const sign = async (payload: string) => {
  const signature = await crypto.subtle.sign(
    'HMAC',
    await hmacKey(),
    encoder.encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const equals = (a: string, b: string) => {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
};

export const isValidPassword = (candidate: string) => {
  return !!recordingsPassword && equals(candidate, recordingsPassword);
};

export const createToken = async () => {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;

  return `${expiresAt}.${await sign(String(expiresAt))}`;
};

export const isValidToken = async (token = '') => {
  const [expiresAt, signature] = token.split('.');

  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;

  return equals(signature, await sign(expiresAt));
};
