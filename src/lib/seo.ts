import { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_URL } from './constants';

export function generateMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const desc = description || APP_DESCRIPTION;
  const url = `${APP_URL}${path}`;
  const ogImage = image || `${APP_URL}/images/og-default.jpg`;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: APP_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export function generateProfessionalSchema(professional: {
  business_name?: string | null;
  full_name: string;
  description: string;
  province?: string | null;
  city?: string | null;
  avg_rating: number;
  review_count: number;
  categories: { name: string }[];
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: professional.business_name || professional.full_name,
    description: professional.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: professional.city,
      addressRegion: professional.province,
      addressCountry: 'AR',
    },
    aggregateRating: professional.review_count > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: professional.avg_rating,
          reviewCount: professional.review_count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    url: `${APP_URL}/profesional/${professional.slug}`,
    additionalType: professional.categories.map(c => c.name).join(', '),
  };
}
