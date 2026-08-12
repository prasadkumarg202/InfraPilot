import { faqSchema, type PageMeta } from '@/lib/seo';
import { securityFaq } from '@/content/faq';

export const meta: PageMeta = {
  title: 'Security & Trust Centre',
  description:
    'SOC 2 Type II, ISO/IEC 27001, PCI DSS ready, FedRAMP in process. Zero standing privilege, credentials brokered per execution, tamper-evident audit, and no customer data used for model training.',
  path: '/security',
  keywords: [
    'SOC 2 Type II automation platform',
    'FedRAMP infrastructure automation',
    'zero standing privilege',
    'secrets brokering',
    'tamper evident audit log',
  ],
  breadcrumbs: [{ name: 'Security', href: '/security' }],
  structuredData: [faqSchema(securityFaq)],
};
