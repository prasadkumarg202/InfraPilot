import type { MetadataRoute } from 'next';
import { site } from '@/content/site.config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal endpoints and tracking-parameter variants add nothing to
        // the index and dilute crawl budget.
        disallow: ['/api/internal/', '/*?utm_', '/design-system'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
