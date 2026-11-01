import { Head } from 'vite-react-ssg'
import { SITE } from '../config/site'

const business = {
  '@context': 'https://schema.org', '@type': ['InteriorDesigner', 'LocalBusiness'], '@id': `${SITE.url}/#business`,
  name: SITE.legal, url: SITE.url, logo: `${SITE.url}/logo.png`, image: `${SITE.url}/og-image.jpg`,
  description: 'مكتب متخصص في التصميم الداخلي والخارجي والإشراف الهندسي في الرياض',
  telephone: SITE.phones.map((p) => '+' + p), email: SITE.email, priceRange: '$$', openingHours: 'Sa-Th 09:00-21:00',
  address: { '@type': 'PostalAddress', streetAddress: 'طريق أنس بن مالك، الملقا', addressLocality: 'الرياض', addressCountry: 'SA' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  sameAs: Object.values(SITE.social), areaServed: { '@type': 'City', name: 'الرياض' },
}

export default function Seo({ title, description, path = '/', ld = [] }) {
  const url = SITE.url + path, img = `${SITE.url}/og-image.jpg`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {[business, ...ld].map((j, i) => <script key={i} type="application/ld+json">{JSON.stringify(j)}</script>)}
    </Head>
  )
}
