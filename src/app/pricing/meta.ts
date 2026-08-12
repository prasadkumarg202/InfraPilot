import { faqSchema, type PageMeta } from '@/lib/seo';
import { pricingFaq } from '@/content/pricing';

export const meta: PageMeta = {
  title: 'Pricing — Per Managed Node, All Modules Included',
  description:
    'Foundation, Enterprise and Sovereign plans priced by managed node. Every module included in your plan from day one, with no per-capability licensing.',
  path: '/pricing',
  keywords: [
    'infrastructure automation pricing',
    'enterprise automation platform cost',
    'per node licensing',
  ],
  breadcrumbs: [{ name: 'Pricing', href: '/pricing' }],
  structuredData: [faqSchema(pricingFaq)],
};
