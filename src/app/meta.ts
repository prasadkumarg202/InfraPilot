import { faqSchema, type PageMeta } from '@/lib/seo';
import { homeFaq } from '@/content/faq';

export const meta: PageMeta = {
  title: 'Autonomous Infrastructure Operations Platform',
  description:
    'Infrapilot automates discovery, provisioning, patching, upgrades, migrations, compliance and incident response across databases, operating systems, middleware, cloud and Kubernetes.',
  path: '/',
  keywords: [
    'infrastructure automation platform',
    'autonomous infrastructure operations',
    'AIOps platform',
    'patch orchestration',
    'database automation',
    'compliance automation',
    'self healing infrastructure',
  ],
  structuredData: [faqSchema(homeFaq)],
};
