import type { NavGroup } from './site.config';

/** Primary navigation. Mega-menu columns are grouped by job to be done. */
export const primaryNav: NavGroup[] = [
  {
    label: 'Platform',
    href: '/platform',
    columns: [
      {
        title: 'Core',
        links: [
          {
            label: 'Platform overview',
            href: '/platform',
            description: 'How the control plane, agents and AI layer fit together',
            icon: 'layers',
          },
          {
            label: 'Discovery & topology',
            href: '/platform#discovery',
            description: 'Agentless inventory and live dependency mapping',
            icon: 'network',
          },
          {
            label: 'Workflow engine',
            href: '/platform#workflow',
            description: 'Visual authoring, approvals, and guarded rollback',
            icon: 'workflow',
          },
          {
            label: 'Policy engine',
            href: '/platform#policy',
            description: 'Codified guardrails enforced before execution',
            icon: 'shieldCheck',
          },
        ],
      },
      {
        title: 'Intelligence',
        links: [
          {
            label: 'AI Copilot',
            href: '/platform#copilot',
            description: 'Ask questions, generate runbooks, review change risk',
            icon: 'sparkles',
            badge: 'New',
          },
          {
            label: 'Root cause analysis',
            href: '/platform#rca',
            description: 'Correlated evidence across the full stack',
            icon: 'target',
          },
          {
            label: 'Risk prediction',
            href: '/platform#risk',
            description: 'Change scoring trained on your own change history',
            icon: 'gauge',
          },
          {
            label: 'Digital twin',
            href: '/platform#twin',
            description: 'Simulate changes before they touch production',
            icon: 'box',
          },
        ],
      },
      {
        title: 'Foundations',
        links: [
          {
            label: 'Architecture',
            href: '/platform#architecture',
            description: 'Deployment models, scale, and data residency',
            icon: 'server',
          },
          {
            label: 'Security model',
            href: '/security',
            description: 'Zero standing privilege, secrets, and audit',
            icon: 'lock',
          },
          {
            label: 'API platform',
            href: '/api',
            description: 'Everything the console does, available over REST',
            icon: 'code',
          },
          {
            label: 'Integrations',
            href: '/integrations',
            description: '180+ certified connectors',
            icon: 'link',
          },
        ],
      },
    ],
    featured: {
      eyebrow: 'Technical brief',
      title: 'The autonomous operations reference architecture',
      body: 'How a 40,000-node estate runs change with a nine-person platform team.',
      href: '/resources',
      cta: 'Read the brief',
    },
  },
  {
    label: 'Products',
    href: '/products',
    columns: [
      {
        title: 'Discover',
        links: [
          { label: 'Infrastructure Discovery', href: '/products#discovery', icon: 'search' },
          { label: 'Dependency Mapping', href: '/products#dependency', icon: 'network' },
          { label: 'Configuration Management', href: '/products#configuration', icon: 'settings' },
          { label: 'CMDB Sync', href: '/products#cmdb', icon: 'refresh' },
        ],
      },
      {
        title: 'Automate',
        links: [
          { label: 'Provisioning & Build', href: '/products#provisioning', icon: 'package' },
          { label: 'Patch Orchestration', href: '/products#patch', icon: 'shield' },
          { label: 'Upgrade Automation', href: '/products#upgrade', icon: 'trendingUp' },
          { label: 'Migration Factory', href: '/products#migration', icon: 'route' },
          { label: 'Kubernetes Automation', href: '/products#kubernetes', icon: 'container' },
        ],
      },
      {
        title: 'Operate',
        links: [
          { label: 'Incident Automation', href: '/products#incident', icon: 'zap' },
          { label: 'Self Healing', href: '/products#self-healing', icon: 'refresh' },
          { label: 'Compliance Automation', href: '/products#compliance', icon: 'shieldCheck' },
          { label: 'Executive Dashboard', href: '/products#dashboard', icon: 'chartBar' },
          { label: 'Audit & Reporting', href: '/products#audit', icon: 'file' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Product tour',
      title: 'Twenty-eight modules, one control plane',
      body: 'Start with one estate and expand without re-platforming.',
      href: '/products',
      cta: 'See all modules',
    },
  },
  {
    label: 'Demos',
    href: '/demos',
  },
  {
    label: 'Solutions',
    href: '/solutions',
    columns: [
      {
        title: 'By outcome',
        links: [
          { label: 'Reduce unplanned downtime', href: '/solutions#downtime', icon: 'activity' },
          { label: 'Accelerate patch cycles', href: '/solutions#patching', icon: 'shield' },
          { label: 'Continuous compliance', href: '/solutions#compliance', icon: 'shieldCheck' },
          { label: 'Cloud & data centre migration', href: '/solutions#migration', icon: 'cloud' },
          { label: 'Reduce operating cost', href: '/solutions#cost', icon: 'trendingDown' },
        ],
      },
      {
        title: 'By team',
        links: [
          { label: 'Database engineering', href: '/solutions#dba', icon: 'database' },
          { label: 'Platform & SRE', href: '/solutions#sre', icon: 'server' },
          { label: 'Cloud infrastructure', href: '/solutions#cloud', icon: 'cloud' },
          { label: 'Security & GRC', href: '/solutions#grc', icon: 'lock' },
          { label: 'IT service management', href: '/solutions#itsm', icon: 'lifebuoy' },
        ],
      },
      {
        title: 'By industry',
        links: [
          { label: 'Banking & capital markets', href: '/industries#banking', icon: 'building' },
          { label: 'Insurance', href: '/industries#insurance', icon: 'shield' },
          { label: 'Healthcare', href: '/industries#healthcare', icon: 'heart' },
          { label: 'Telecommunications', href: '/industries#telecom', icon: 'globe' },
          { label: 'All industries', href: '/industries', icon: 'grid' },
        ],
      },
    ],
  },
  {
    label: 'Customers',
    href: '/customers',
  },
  {
    label: 'Resources',
    href: '/resources',
    columns: [
      {
        title: 'Learn',
        links: [
          { label: 'Documentation', href: '/docs', description: 'Guides, references and runbooks', icon: 'book' },
          { label: 'API reference', href: '/api', description: 'REST, webhooks and SDKs', icon: 'code' },
          { label: 'Blog', href: '/blog', description: 'Engineering and industry writing', icon: 'file' },
          { label: 'Case studies', href: '/case-studies', description: 'Measured outcomes from production estates', icon: 'chartBar' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Events & webinars', href: '/company/events', icon: 'calendar' },
          { label: 'Partners', href: '/partners', icon: 'users' },
          { label: 'Trust & security', href: '/security', icon: 'shieldCheck' },
          { label: 'Support', href: '/resources#support', icon: 'lifebuoy' },
        ],
      },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
];

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string; badge?: string }>;
}

export const footerNav: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Overview', href: '/platform' },
      { label: 'Discovery & topology', href: '/platform#discovery' },
      { label: 'Workflow engine', href: '/platform#workflow' },
      { label: 'Policy engine', href: '/platform#policy' },
      { label: 'AI Copilot', href: '/platform#copilot' },
      { label: 'Architecture', href: '/platform#architecture' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'All modules', href: '/products' },
      { label: 'Patch Orchestration', href: '/products#patch' },
      { label: 'Migration Factory', href: '/products#migration' },
      { label: 'Compliance Automation', href: '/products#compliance' },
      { label: 'Self Healing', href: '/products#self-healing' },
      { label: 'Executive Dashboard', href: '/products#dashboard' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'By outcome', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Customers', href: '/customers' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API reference', href: '/api' },
      { label: 'Design system', href: '/design-system' },
      { label: 'Status', href: '/resources#status' },
      { label: 'Changelog', href: '/resources#changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company/about' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Careers', href: '/company/careers', badge: 'Hiring' },
      { label: 'Events', href: '/company/events' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact sales', href: '/contact-sales' },
    ],
  },
];

export const legalNav = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Trust centre', href: '/security' },
  { label: 'Subprocessors', href: '/legal/subprocessors' },
  { label: 'Accessibility', href: '/legal/accessibility' },
];
