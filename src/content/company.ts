export interface Leader {
  name: string;
  role: string;
  initials: string;
  bio: string;
  prior: string;
}

export const leadership: Leader[] = [
  {
    name: 'Elena Varga',
    role: 'Chief Executive Officer',
    initials: 'EV',
    bio: 'Founded Infrapilot after a decade running platform engineering for two systemically important banks, where the recurring problem was never capability — it was coordination at scale.',
    prior: 'Previously VP Infrastructure, global custody bank',
  },
  {
    name: 'Marcus Adeyemi',
    role: 'Chief Technology Officer',
    initials: 'MA',
    bio: 'Leads platform engineering. Built distributed workflow systems for two hyperscale providers and holds patents in durable execution and failure-domain-aware scheduling.',
    prior: 'Previously Distinguished Engineer, hyperscale cloud provider',
  },
  {
    name: 'Sofia Marchetti',
    role: 'Head of Applied AI',
    initials: 'SM',
    bio: 'Responsible for the intelligence layer and the constraint that no model output reaches production without an approval path. Publishes on evaluation of operational AI systems.',
    prior: 'Previously Research Lead, operational ML',
  },
  {
    name: 'Tom Beckett',
    role: 'Field Chief Technology Officer',
    initials: 'TB',
    bio: 'Works with customer platform teams on deployment design and operating-model change. Spent fifteen years on the other side of the table running infrastructure for a national telecommunications operator.',
    prior: 'Previously Director of Infrastructure, national telco',
  },
  {
    name: 'Rachel Okonjo',
    role: 'Chief Information Security Officer',
    initials: 'RO',
    bio: 'Owns the security programme, the certification portfolio and the design constraints that keep production access defensible. Chairs the internal change advisory board.',
    prior: 'Previously Head of Security Engineering, payments network',
  },
  {
    name: 'David Lindqvist',
    role: 'Chief Revenue Officer',
    initials: 'DL',
    bio: 'Runs go-to-market with a preference for proofs of concept that can fail honestly. Believes an evaluation that ends in a no in week two is a better outcome for everyone than one that ends in a no in month six.',
    prior: 'Previously SVP Enterprise Sales, infrastructure software',
  },
];

export const values = [
  {
    title: 'Evidence over assertion',
    body: 'Every claim the product makes shows its working — the inferred dependency, the ranked cause, the risk score. We hold the company to the same standard: benchmarks come with methodology, and case studies come with the customer’s name on them.',
  },
  {
    title: 'Safe by construction, not by policy',
    body: 'The properties that make production access defensible are design constraints, not configuration. If a safeguard can be switched off under commercial pressure, it was never really a safeguard.',
  },
  {
    title: 'Respect the operator',
    body: 'The person holding the pager at 2am is the customer, not an abstraction two levels above them. We build for their judgement rather than trying to replace it.',
  },
  {
    title: 'Boring where it counts',
    body: 'Infrastructure software should be unexciting in production. Novelty belongs in how we solve the problem, not in how the system behaves during an incident.',
  },
];

export interface Role {
  title: string;
  team: string;
  location: string;
  type: string;
}

export const openRoles: Role[] = [
  { title: 'Staff Engineer, Workflow Execution', team: 'Platform', location: 'Austin or remote (US)', type: 'Full-time' },
  { title: 'Senior Engineer, Database Automation', team: 'Automation', location: 'Dublin or remote (EU)', type: 'Full-time' },
  { title: 'Applied AI Engineer, Root Cause', team: 'Intelligence', location: 'Remote (EU/US)', type: 'Full-time' },
  { title: 'Security Engineer, Product Security', team: 'Security', location: 'Austin', type: 'Full-time' },
  { title: 'Solutions Architect, Financial Services', team: 'Field', location: 'London', type: 'Full-time' },
  { title: 'Senior Technical Writer', team: 'Product', location: 'Remote (EU/US)', type: 'Full-time' },
  { title: 'Site Reliability Engineer', team: 'Platform', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Product Designer, Console', team: 'Design', location: 'Remote (EU)', type: 'Full-time' },
  { title: 'Engineering Manager, Compliance', team: 'Governance', location: 'Dublin', type: 'Full-time' },
];

export interface CompanyEvent {
  name: string;
  kind: 'Conference' | 'Webinar' | 'Roundtable' | 'Workshop';
  date: string;
  location: string;
  description: string;
  cta: string;
}

export const events: CompanyEvent[] = [
  {
    name: 'Autonomous Operations Summit',
    kind: 'Conference',
    date: '17–18 September 2026',
    location: 'Austin, Texas',
    description:
      'Two days with customer platform teams on operating-model change: wave planning at scale, policy design for unattended remediation, and what breaks when automation coverage passes eighty per cent.',
    cta: 'Register',
  },
  {
    name: 'Quorum-aware patching at availability-group scale',
    kind: 'Webinar',
    date: '3 September 2026',
    location: 'Online · 16:00 BST',
    description:
      'A technical session with Northwind Financial’s database engineering team on the wave planner, health gates and what they changed after the first automated cycle.',
    cta: 'Save a seat',
  },
  {
    name: 'DORA readiness roundtable',
    kind: 'Roundtable',
    date: '24 September 2026',
    location: 'London · invitation only',
    description:
      'A closed session for technology risk leaders in financial services on evidencing operational resilience obligations from infrastructure controls. Chatham House rule.',
    cta: 'Request an invitation',
  },
  {
    name: 'Migration factory workshop',
    kind: 'Workshop',
    date: '8 October 2026',
    location: 'Frankfurt',
    description:
      'A hands-on day designing move groups from real dependency data, building the cutover rehearsal, and stress-testing the rollback path.',
    cta: 'Reserve a place',
  },
  {
    name: 'Building connectors on the Infrapilot SDK',
    kind: 'Webinar',
    date: '22 October 2026',
    location: 'Online · 10:00 EDT',
    description:
      'For platform teams extending the connector catalogue: the SDK interfaces, the test harness, and how certification works.',
    cta: 'Save a seat',
  },
];

export const partnerTypes = [
  {
    title: 'Global systems integrators',
    body: 'Delivery partners running large-scale transformation programmes, accredited to deploy and operate Infrapilot inside customer environments.',
    icon: 'building' as const,
    names: ['Meridian Consulting Group', 'Aldridge Technology Services', 'Kestrel Digital'],
  },
  {
    title: 'Technology alliances',
    body: 'Joint engineering with the vendors whose platforms Infrapilot manages and integrates with, including certified connector maintenance.',
    icon: 'link' as const,
    names: ['Observability vendors', 'Cloud providers', 'Secrets management', 'ITSM platforms'],
  },
  {
    title: 'Regional resellers',
    body: 'Licensed partners in markets where local presence, language and procurement structure matter to how enterprises buy.',
    icon: 'globe' as const,
    names: ['EMEA', 'APAC', 'Latin America', 'Middle East'],
  },
  {
    title: 'Managed service providers',
    body: 'MSPs operating customer estates on Infrapilot under a multi-tenant model, with delegated administration and per-tenant isolation.',
    icon: 'server' as const,
    names: ['Multi-tenant licensing', 'Delegated administration', 'White-label reporting'],
  },
];
