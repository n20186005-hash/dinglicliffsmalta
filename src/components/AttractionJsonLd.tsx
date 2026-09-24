import { Locale } from '@/i18n/routing';

const BASE_URL = 'https://www.dinglicliffsmalta.com';

// Approximate coordinates of the Dingli Cliffs main viewpoint (near the
// 1646 St. Mary Magdalene Chapel).
const GEO = { latitude: 35.8522, longitude: 14.3822 };

export default async function AttractionJsonLd({ locale }: { locale: string }) {
  const messages: any = (await import(`@/messages/${locale}.json`)).default;
  const selfUrl = `${BASE_URL}/${locale}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'Place', 'LandmarksOrHistoricalBuildings'],
        '@id': `${BASE_URL}/#attraction`,
        name: 'Dingli Cliffs',
        alternateName: 'Cliffs of Dingli',
        description: messages?.meta?.description || '',
        url: selfUrl,
        image: `${BASE_URL}/gallery/dingli-cliffs%20(1).jpg`,
        telephone: '+35621456060',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'V92P+V45',
          addressLocality: 'Ħad-Dingli',
          addressRegion: 'Malta',
          addressCountry: 'MT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: 9701,
          bestRating: '5',
        },
        isAccessibleForFree: true,
        publicAccess: true,
        sameAs: [
          'https://maps.app.goo.gl/7kurr3qMaSgWhNA59',
          'https://en.wikipedia.org/wiki/Dingli_Cliffs',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Dingli Cliffs',
        inLanguage: locale,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
