import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() ?? '';
  // Consolidate on the www host (P0: avoid duplicate-content / authority split).
  if (host === 'dinglicliffsmalta.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.dinglicliffsmalta.com';
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
