export interface CaseStudy {
  id: string;
  customerId: string;
  industry: string;
  title: string;
  challenge: string;
  approach: string;
  results: Array<{ value: string; label: string }>;
  quote: { text: string; name: string; role: string };
  scope: string;
  timeframe: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'global-bank-patching',
    customerId: 'northwind',
    industry: 'Banking & capital markets',
    title: 'Patch automation from 34% to 92%, and $4.2M a year that stopped being spent',
    challenge:
      'A Fortune 100 bank ran 18,400 database instances across four regions. Each quarterly cumulative update consumed eleven weeks of elapsed time, most of it spent agreeing a sequence that preserved availability-group quorum and negotiating windows with 62 application owners. Automation coverage sat at 34%, and the remaining two thirds absorbed most of the database engineering team’s capacity.',
    approach:
      'Discovery mapped the estate and its dependencies in the first nine days, surfacing 1,340 instances absent from the CMDB. Patch waves were then generated from the dependency graph rather than negotiated in a meeting, with quorum and replication constraints encoded as policy. Health gates between waves decided whether execution continued, failures re-queued into a trailing wave automatically, and the change record closed itself.',
    results: [
      { value: '92%', label: 'Patch automation coverage, from 34%' },
      { value: '$4.2M', label: 'Annual operating cost avoided' },
      { value: '6 days', label: 'Quarterly cycle, from 11 weeks' },
      { value: '0 min', label: 'Unplanned downtime across three cycles' },
    ],
    quote: {
      text: 'The difference was not speed of execution — it was that nobody had to negotiate a sequence any more.',
      name: 'Director of Database Engineering',
      role: 'Fortune 100 retail and commercial bank',
    },
    scope: '18,400 instances · SQL Server, Oracle, PostgreSQL · 4 regions',
    timeframe: 'Deployed Q1 · first automated cycle Q2',
  },
  {
    id: 'hospital-network-mttr',
    customerId: 'meridian',
    industry: 'Healthcare',
    title: 'Mean time to restore cut from 41 minutes to 3.2',
    challenge:
      'A regional hospital network ran 340 clinical applications across 62 sites. Clinical systems have no natural maintenance window and no tolerance for a slow diagnosis: a database service that stopped at 02:00 took a median of 41 minutes to restore, most of it spent waking an engineer, establishing what had actually failed, and finding the runbook.',
    approach:
      'Known failure modes were promoted to policy-bounded unattended remediation — a bounded set, each with an explicit blast-radius limit and an environment allow-list. When a service stops, the incident is raised, the runbook runs, every affected database is verified back online, and the record closes with the evidence attached. Anything outside the envelope still escalates, but it escalates with the diagnostic work already done.',
    results: [
      { value: '3.2 min', label: 'Mean time to restore, from 41 min' },
      { value: '78%', label: 'Of incidents resolved without paging anyone' },
      { value: '0', label: 'Patient-facing outages in 14 months' },
      { value: '62', label: 'Sites operating under one runbook library' },
    ],
    quote: {
      text: 'The engineers did not lose the interesting failures. They lost the two in the morning ones that were always the same failure.',
      name: 'Chief Technology Officer',
      role: 'Regional hospital network',
    },
    scope: '340 clinical applications · 62 sites · validated change control',
    timeframe: 'Unattended remediation live in month three',
  },
  {
    id: 'telecom-migrations',
    customerId: 'trellis',
    industry: 'Telecommunications',
    title: 'Four hundred database migrations in eleven weeks',
    challenge:
      'A tier-1 telecom operator had committed to a datacentre exit with a fixed lease end and roughly four hundred databases still to move. The first eight had each been run as a bespoke project: discovery redone every time, cutover improvised, and a rollback plan that existed on paper but had never been executed. At that rate the programme would have missed the date by two quarters.',
    approach:
      'The migration factory turned move groups into a production line. Dependency data drove group composition, target environments were built from generated infrastructure code committed to the platform team’s own repository, and every cutover was rehearsed against production data with reconciliation and application smoke tests before the real window. Rollback was executed in rehearsal rather than documented.',
    results: [
      { value: '400', label: 'Databases migrated in 11 weeks' },
      { value: '4 months', label: 'Ahead of the lease deadline' },
      { value: '38 min', label: 'Median cutover duration' },
      { value: '100%', label: 'Cutovers with a rehearsed rollback path' },
    ],
    quote: {
      text: 'We stopped treating each move as a project. Once the ninth one looked exactly like the eighth, the date stopped being a risk.',
      name: 'Director of Infrastructure',
      role: 'Tier-1 telecommunications operator',
    },
    scope: '400 databases · Oracle, SQL Server, PostgreSQL · 38 regions',
    timeframe: '11 weeks from first wave to datacentre exit',
  },
];

/* ==================================================================== BLOG */

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readingTime: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: 'blast-radius-is-the-only-metric',
    title: 'Blast radius is the only change metric that matters',
    excerpt:
      'Change failure rate tells you how often you were wrong. Blast radius tells you how much it cost when you were. Only one of them is something you can decide in advance.',
    category: 'Engineering',
    author: 'Priya Venkataraman',
    role: 'Principal Engineer, Workflow',
    date: '2026-07-28',
    readingTime: '9 min',
    featured: true,
  },
  {
    slug: 'why-cmdbs-drift',
    title: 'Why every CMDB drifts, and what to do instead',
    excerpt:
      'A configuration database records intent. Production records outcome. The gap is not a data-quality problem to be solved — it is a signal to be measured continuously.',
    category: 'Operations',
    author: 'Tom Beckett',
    role: 'Field CTO',
    date: '2026-07-14',
    readingTime: '11 min',
  },
  {
    slug: 'runbooks-that-write-themselves',
    title: 'Runbooks that write themselves still need a reviewer',
    excerpt:
      'Generated procedures are only as safe as the review step that follows them. What we learned putting a human gate in front of every AI-authored runbook.',
    category: 'AI',
    author: 'Sofia Marchetti',
    role: 'Head of Applied AI',
    date: '2026-06-30',
    readingTime: '8 min',
  },
  {
    slug: 'quorum-aware-patching',
    title: 'Quorum-aware patching for availability groups',
    excerpt:
      'A technical walk-through of how wave planning derives sequencing constraints from replication topology, and why naive parallelism loses quorum at scale.',
    category: 'Engineering',
    author: 'Daniel Osei',
    role: 'Staff Engineer, Database Automation',
    date: '2026-06-17',
    readingTime: '14 min',
  },
  {
    slug: 'dora-without-a-programme',
    title: 'Meeting DORA obligations without a two-year programme',
    excerpt:
      'Most of what the regulation asks for is evidence you already generate. The problem is that it lives in six systems and nobody can assemble it on demand.',
    category: 'Compliance',
    author: 'Marta Lindqvist',
    role: 'Guest contributor',
    date: '2026-06-03',
    readingTime: '10 min',
  },
  {
    slug: 'cost-of-an-unattended-restart',
    title: 'The real cost of an unattended restart at 2am',
    excerpt:
      'We modelled the fully-loaded cost of out-of-hours remediation across 40 enterprise estates. The engineer hours are not the expensive part.',
    category: 'Operations',
    author: 'Tom Beckett',
    role: 'Field CTO',
    date: '2026-05-21',
    readingTime: '7 min',
  },
];

/* =============================================================== RESOURCES */

export interface Resource {
  title: string;
  kind: 'Technical brief' | 'Whitepaper' | 'Webinar' | 'Report' | 'Guide' | 'Template';
  description: string;
  href: string;
  meta: string;
}

export const resources: Resource[] = [
  {
    title: 'The autonomous operations reference architecture',
    kind: 'Technical brief',
    description:
      'How a 40,000-node estate runs governed change with a nine-person platform team. Deployment topology, policy model and the failure modes we designed around.',
    href: '/resources',
    meta: '38 pages · updated July 2026',
  },
  {
    title: 'Quantifying the cost of manual infrastructure operations',
    kind: 'Report',
    description:
      'Effort and cost baselines drawn from 40 enterprise estates, broken down by platform, region and change class, with the methodology included.',
    href: '/resources',
    meta: '24 pages · 40 estates surveyed',
  },
  {
    title: 'Mapping DORA technical requirements to infrastructure controls',
    kind: 'Whitepaper',
    description:
      'Article-by-article mapping from the regulation to testable technical controls, with evidence templates for each.',
    href: '/resources',
    meta: '31 pages · reviewed by external counsel',
  },
  {
    title: 'Designing a policy model for unattended remediation',
    kind: 'Guide',
    description:
      'How to decide which failure modes may be resolved without a human, and how to bound them so the decision stays defensible.',
    href: '/resources',
    meta: '18 pages · with worked examples',
  },
  {
    title: 'Patch orchestration at availability-group scale',
    kind: 'Webinar',
    description:
      'A live walkthrough with Northwind Financial’s database engineering team on compressing a quarterly cycle from eleven weeks to six days.',
    href: '/company/events',
    meta: '52 minutes · on demand',
  },
  {
    title: 'Proof of concept scoping template',
    kind: 'Template',
    description:
      'The scoping document we use to define a two-week proof of concept, including the measurement plan that determines whether it succeeded.',
    href: '/contact-sales',
    meta: 'Editable · no registration',
  },
];
