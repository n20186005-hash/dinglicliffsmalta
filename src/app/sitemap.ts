import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/seo';

// All static route pathnames declared in the i18n routing config.
// Each page emits ONE <url> entry advertising every locale + x-default
// via hreflang alternates, so the sitemap covers languages × pages
// without duplicating URLs.
const pathnames = Object.keys(routing.pathnames);

export default function sitemap(): MetadataRoute.Sitemap {
  return pathnames.map((pathname) => {
    const pagePath = pathname === '/' ? '' : pathname;
    const { languages } = buildAlternates(pagePath, routing.defaultLocale);

    return {
      url: `${languages[routing.defaultLocale]}`,
      lastmod: new Date(),
      changefreq: pathname === '/' ? 'weekly' : 'monthly',
      priority: pathname === '/' ? 1 : 0.4,
      alternates: {
        languages,
      },
    };
  });
}
