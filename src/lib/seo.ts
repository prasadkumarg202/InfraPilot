/**
 * SEO layer.
 *
 * Produces the metadata, OpenGraph/Twitter tags, canonical URLs, breadcrumbs
 * and JSON-LD for every route. In the Next.js build `toNextMetadata()` feeds
 * the App Router Metadata API; the static harness renders the same data as
 * head tags directly, so the two outputs stay in sync.
 */

import { site } from '@/content/site.config';

export interface BreadcrumbEntry {
  name: string;
  href: string;
}

export interface PageMeta {
  /** 50–60 characters. The brand suffix is appended automatically. */
  title: string;
  /** 140–160 characters, written to earn the click, not to stuff keywords. */
  description: string;
  /** Route path, used for the canonical URL. */
  path: string;
  keywords?: string[];
  /** Overrides the default social card. */
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  breadcrumbs?: BreadcrumbEntry[];
  /** Extra JSON-LD documents appended after the defaults. */
  structuredData?: Array<Record<string, unknown>>;
  /** Set on pages that should stay out of the index (thank-you pages etc). */
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function canonical(path: string): string {
  if (path === '/') return `${site.url}/`;
  return `${site.url}${path.replace(/\/$/, '')}`;
}

export function fullTitle(title: string): string {
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

/** Organization graph — emitted once, in the root layout. */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/brand/logo-mark.svg`,
      width: 512,
      height: 512,
    },
    description: site.description,
    foundingDate: String(site.founded),
    email: site.email.sales,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: [
      site.social.linkedin,
      site.social.x,
      site.social.github,
      site.social.youtube,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email.sales,
        telephone: site.phone,
        areaServed: ['US', 'EU', 'APAC'],
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: site.email.support,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/docs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'IT Infrastructure Automation',
    operatingSystem: 'Web-based, Linux, Windows',
    description: site.description,
    url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '48000',
      highPrice: '2400000',
      offerCount: 3,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '412',
      bestRating: '5',
    },
  };
}

export function breadcrumbSchema(
  entries: BreadcrumbEntry[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: canonical(entry.href),
    })),
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Everything that belongs in <head> for a given page. */
export interface HeadTags {
  title: string;
  canonicalUrl: string;
  meta: Array<Record<string, string>>;
  jsonLd: Array<Record<string, unknown>>;
}

export function buildHead(meta: PageMeta, isHome = false): HeadTags {
  const url = canonical(meta.path);
  const title = fullTitle(meta.title);
  const image = `${site.url}${meta.ogImage ?? site.ogImage}`;

  const tags: Array<Record<string, string>> = [
    { name: 'description', content: meta.description },
    { name: 'application-name', content: site.name },
    { name: 'author', content: meta.author ?? site.legalName },
    { name: 'generator', content: `${site.name} Web Platform` },
    { name: 'theme-color', content: '#06080c' },
    { name: 'color-scheme', content: 'dark light' },
    { name: 'format-detection', content: 'telephone=no' },
    {
      name: 'robots',
      content: meta.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },

    { property: 'og:type', content: meta.ogType ?? 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: site.locale },
    { property: 'og:title', content: title },
    { property: 'og:description', content: meta.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
      property: 'og:image:alt',
      content: `${site.name} — ${site.tagline}`,
    },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.twitterHandle },
    { name: 'twitter:creator', content: site.twitterHandle },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: image },
  ];

  if (meta.keywords?.length) {
    tags.push({ name: 'keywords', content: meta.keywords.join(', ') });
  }
  if (meta.publishedTime) {
    tags.push({
      property: 'article:published_time',
      content: meta.publishedTime,
    });
  }
  if (meta.modifiedTime) {
    tags.push({ property: 'article:modified_time', content: meta.modifiedTime });
  }

  const jsonLd: Array<Record<string, unknown>> = [];
  if (isHome) {
    jsonLd.push(organizationSchema(), websiteSchema(), softwareApplicationSchema());
  }
  if (meta.breadcrumbs?.length) {
    jsonLd.push(breadcrumbSchema(meta.breadcrumbs));
  }
  if (meta.structuredData?.length) {
    jsonLd.push(...meta.structuredData);
  }

  return { title, canonicalUrl: url, meta: tags, jsonLd };
}

/**
 * Adapter for the Next.js App Router Metadata API. Pages export
 * `export const metadata = toNextMetadata(meta)`.
 */
export function toNextMetadata(meta: PageMeta) {
  const url = canonical(meta.path);
  const title = fullTitle(meta.title);
  const image = meta.ogImage ?? site.ogImage;
  return {
    metadataBase: new URL(site.url),
    title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author ?? site.legalName }],
    alternates: { canonical: url },
    robots: meta.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: meta.ogType ?? ('website' as const),
      siteName: site.name,
      locale: site.locale,
      title,
      description: meta.description,
      url,
      images: [
        { url: image, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` },
      ],
      publishedTime: meta.publishedTime,
      modifiedTime: meta.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image' as const,
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title,
      description: meta.description,
      images: [image],
    },
  };
}
