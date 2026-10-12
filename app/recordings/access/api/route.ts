import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createToken,
  isValidPassword,
} from '@/libs/recordings-session';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_TARGET = '/recordings';

const safeTarget = (value: string) => {
  if (value.startsWith('//')) return DEFAULT_TARGET;
  if (!value.startsWith('/recordings')) return DEFAULT_TARGET;
  if (value.startsWith('/recordings/access')) return DEFAULT_TARGET;

  return value;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const password = formData.get('password')?.toString() ?? '';
  const from = safeTarget(formData.get('from')?.toString() ?? DEFAULT_TARGET);

  if (!isValidPassword(password)) {
    await wait(500);

    const retry = new URL('/recordings/access', req.nextUrl.origin);
    retry.searchParams.set('from', from);
    retry.searchParams.set('error', '1');

    return NextResponse.redirect(retry, { status: 303 });
  }

  const res = NextResponse.redirect(new URL(from, req.nextUrl.origin), {
    status: 303,
  });

  res.cookies.set(SESSION_COOKIE, await createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/recordings',
    maxAge: SESSION_MAX_AGE,
  });

  return res;
}
