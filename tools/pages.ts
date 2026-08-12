/**
 * Route manifest for the static render harness.
 *
 * The Next.js build derives routes from the `src/app` directory. This manifest
 * mirrors it so the local renderer can produce the same pages without the
 * framework, which is what makes visual QA possible in an offline sandbox.
 *
 * Metadata is loaded from a sibling `meta.ts` rather than from the page itself:
 * Next.js validates the export surface of `page.tsx` and rejects any named
 * export outside its allow-list, so the object lives beside the route and is
 * imported by both the page and this manifest.
 */

import type { ComponentType } from 'react';
import type { PageMeta } from '@/lib/seo';

export interface RouteEntry {
  path: string;
  load: () => Promise<{ default: ComponentType }>;
  meta: () => Promise<{ meta: PageMeta }>;
}

/** Route path → directory under `src/app`. */
const ROUTES: Array<[string, string]> = [
  ['/', ''],
  ['/platform', 'platform'],
  ['/products', 'products'],
  ['/solutions', 'solutions'],
  ['/industries', 'industries'],
  ['/integrations', 'integrations'],
  ['/customers', 'customers'],
  ['/pricing', 'pricing'],
  ['/security', 'security'],
  ['/resources', 'resources'],
  ['/docs', 'docs'],
  ['/api', 'api-reference'],
  ['/blog', 'blog'],
  ['/case-studies', 'case-studies'],
  ['/partners', 'partners'],
  ['/company', 'company'],
  ['/company/about', 'company/about'],
  ['/company/leadership', 'company/leadership'],
  ['/company/careers', 'company/careers'],
  ['/company/events', 'company/events'],
  ['/contact-sales', 'contact-sales'],
  ['/book-demo', 'book-demo'],
  ['/design-system', 'design-system'],
];

export const routes: RouteEntry[] = [
  { path: '/', load: () => import('@/app/page'), meta: () => import('@/app/meta') },
  { path: '/platform', load: () => import('@/app/platform/page'), meta: () => import('@/app/platform/meta') },
  { path: '/products', load: () => import('@/app/products/page'), meta: () => import('@/app/products/meta') },
  { path: '/solutions', load: () => import('@/app/solutions/page'), meta: () => import('@/app/solutions/meta') },
  { path: '/industries', load: () => import('@/app/industries/page'), meta: () => import('@/app/industries/meta') },
  { path: '/integrations', load: () => import('@/app/integrations/page'), meta: () => import('@/app/integrations/meta') },
  { path: '/customers', load: () => import('@/app/customers/page'), meta: () => import('@/app/customers/meta') },
  { path: '/pricing', load: () => import('@/app/pricing/page'), meta: () => import('@/app/pricing/meta') },
  { path: '/security', load: () => import('@/app/security/page'), meta: () => import('@/app/security/meta') },
  { path: '/resources', load: () => import('@/app/resources/page'), meta: () => import('@/app/resources/meta') },
  { path: '/docs', load: () => import('@/app/docs/page'), meta: () => import('@/app/docs/meta') },
  { path: '/api', load: () => import('@/app/api-reference/page'), meta: () => import('@/app/api-reference/meta') },
  { path: '/blog', load: () => import('@/app/blog/page'), meta: () => import('@/app/blog/meta') },
  { path: '/case-studies', load: () => import('@/app/case-studies/page'), meta: () => import('@/app/case-studies/meta') },
  { path: '/partners', load: () => import('@/app/partners/page'), meta: () => import('@/app/partners/meta') },
  { path: '/company', load: () => import('@/app/company/page'), meta: () => import('@/app/company/meta') },
  { path: '/company/about', load: () => import('@/app/company/about/page'), meta: () => import('@/app/company/about/meta') },
  { path: '/company/leadership', load: () => import('@/app/company/leadership/page'), meta: () => import('@/app/company/leadership/meta') },
  { path: '/company/careers', load: () => import('@/app/company/careers/page'), meta: () => import('@/app/company/careers/meta') },
  { path: '/company/events', load: () => import('@/app/company/events/page'), meta: () => import('@/app/company/events/meta') },
  { path: '/contact-sales', load: () => import('@/app/contact-sales/page'), meta: () => import('@/app/contact-sales/meta') },
  { path: '/book-demo', load: () => import('@/app/book-demo/page'), meta: () => import('@/app/book-demo/meta') },
  { path: '/design-system', load: () => import('@/app/design-system/page'), meta: () => import('@/app/design-system/meta') },
];

/** Exposed for the sitemap writer, which needs directory names, not routes. */
export const routeDirectories = ROUTES;
