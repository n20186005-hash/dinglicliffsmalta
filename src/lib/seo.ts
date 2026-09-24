import { routing } from '@/i18n/routing';

export const BASE_URL = 'https://www.dinglicliffsmalta.com';

// Build canonical + hreflang alternates for a given page path across all locales.
// `pagePath` must start with a slash (e.g. '/privacy-policy').
export function buildAlternates(pagePath: string, locale: string) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}${pagePath}`;
  }
  languages['x-default'] = `${BASE_URL}/en${pagePath}`;

  return {
    canonical: `${BASE_URL}/${locale}${pagePath}`,
    languages,
  };
}
