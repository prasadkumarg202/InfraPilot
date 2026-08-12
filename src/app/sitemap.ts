import type { MetadataRoute } from 'next';
import { site } from '@/content/site.config';

/**
 * Sitemap. Priorities reflect commercial intent rather than depth: the pages a
 * buyer reaches before contacting sales rank above the ones they read after.
 */

const ROUTES: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/platform', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/demos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/integrations', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/customers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/docs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/api', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/partners', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/company/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/company/leadership', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/company/careers', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/company/events', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/contact-sales', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/book-demo', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
