/**
 * Brand and site-wide configuration.
 *
 * Every reference to the company name, domain, contact details, and social
 * handles in the entire codebase resolves through this file. Renaming the
 * company is a single edit here.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export interface NavGroup {
  label: string;
  href?: string;
  columns?: NavColumn[];
  featured?: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}

export const site = {
  name: 'Infrapilot',
  legalName: 'Infrapilot Technologies, Inc.',
  domain: 'infrapilot.io',
  url: 'https://www.infrapilot.io',
  tagline: 'Autonomous Infrastructure Operations',
  category: 'AI Powered Enterprise Infrastructure Automation Platform',
  mission:
    'Helping enterprises automate everything across infrastructure with AI.',
  description:
    'Infrapilot automates the full infrastructure lifecycle — discovery, provisioning, patching, upgrades, migrations, compliance and incident response — across databases, operating systems, middleware, cloud and Kubernetes.',
  founded: 2019,
  headquarters: 'Austin, Texas',
  locations: ['Austin', 'Dublin', 'Bengaluru', 'Singapore'],
  email: {
    sales: 'sales@infrapilot.io',
    support: 'support@infrapilot.io',
    security: 'security@infrapilot.io',
    press: 'press@infrapilot.io',
  },
  phone: '+1 (512) 555-0142',
  address: {
    street: '600 Congress Avenue, Suite 1400',
    city: 'Austin',
    region: 'TX',
    postalCode: '78701',
    country: 'US',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/infrapilot',
    x: 'https://x.com/infrapilot',
    github: 'https://github.com/infrapilot',
    youtube: 'https://www.youtube.com/@infrapilot',
  },
  /** Used by the SEO layer for OpenGraph and Twitter cards. */
  ogImage: '/og/default.png',
  twitterHandle: '@infrapilot',
  locale: 'en_US',
} as const;

export type Site = typeof site;
