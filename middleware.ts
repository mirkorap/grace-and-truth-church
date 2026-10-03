import { SESSION_COOKIE, isValidToken } from '@/libs/recordings-session';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/recordings/:path*',
};

const ACCESS_PATH = '/recordings/access';

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith(ACCESS_PATH)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (await isValidToken(token)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = ACCESS_PATH;
  url.search = '';
  url.searchParams.set('from', `${pathname}${search}`);

  return NextResponse.redirect(url);
}
