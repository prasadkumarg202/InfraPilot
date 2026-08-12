import type { IconName } from '@/components/primitives/Icon';

/* ==========================================================================
   SOLUTIONS BY OUTCOME
   ======================================================================= */

export interface Solution {
  id: string;
  eyebrow: string;
  title: string;
  problem: string;
  approach: string;
  icon: IconName;
  proof: { value: string; label: string; customer: string };
  capabilities: string[];
}

export const outcomeSolutions: Solution[] = [
  {
    id: 'downtime',
    eyebrow: 'Availability',
    title: 'Reduce unplanned downtime',
    icon: 'activity',
    problem:
      'Most unplanned outages trace back to a change nobody modelled the blast radius of, or a dependency nobody knew existed. The incident is the first time the real topology becomes visible.',
    approach:
      'Infrapilot maintains that topology continuously and refuses to execute a change whose blast radius exceeds policy. When something does break, the diagnostic evidence is already gathered by the time an engineer opens the ticket.',
    proof: { value: '71%', label: 'Reduction in MTTR', customer: 'Trellis Telecom' },
    capabilities: [
      'Live dependency mapping with evidence per edge',
      'Blast-radius limits enforced before execution',
      'Automated evidence collection on alert',
      'Policy-bounded self-healing for known failure modes',
    ],
  },
  {
    id: 'patching',
    eyebrow: 'Currency',
    title: 'Accelerate patch cycles',
    icon: 'shield',
    problem:
      'Patch programmes rarely fail on execution. They fail on coordination — agreeing a sequence that preserves quorum, securing windows across business units, and chasing the exceptions that did not complete.',
    approach:
      'Wave plans are derived from the dependency graph rather than negotiated in a meeting. Health gates decide whether the next wave proceeds, failures re-queue automatically, and the change record closes itself.',
    proof: {
      value: '11 weeks → 6 days',
      label: 'Quarterly patch cycle',
      customer: 'Northwind Financial',
    },
    capabilities: [
      'Dependency-aware wave planning',
      'Quorum and replication constraints respected',
      'Automatic halt and rollback on health regression',
      'Exception tracking through to zero',
    ],
  },
  {
    id: 'compliance',
    eyebrow: 'Assurance',
    title: 'Move to continuous compliance',
    icon: 'shieldCheck',
    problem:
      'Point-in-time audits measure the estate on the day someone looked. Between audits, drift accumulates quietly, and evidence collection becomes a multi-week manual exercise across several teams.',
    approach:
      'Controls are tested on a schedule against every in-scope system. Failures become governed remediation workflows with owners and dates. Evidence is produced in the assessor’s own format, continuously.',
    proof: {
      value: '6 weeks → 1 day',
      label: 'Audit evidence preparation',
      customer: 'Castellan Insurance Group',
    },
    capabilities: [
      'CIS, PCI DSS, HIPAA, SOX, DORA and NIST 800-53 mappings',
      'Continuous control testing with per-check timestamps',
      'Remediation raised as standard change, not a spreadsheet',
      'Risk acceptances tracked with owners and expiry',
    ],
  },
  {
    id: 'migration',
    eyebrow: 'Transformation',
    title: 'Deliver migrations on a fixed date',
    icon: 'route',
    problem:
      'Datacentre exits and cloud programmes slip because each move group is treated as a bespoke project. Discovery is redone, cutover is improvised, and rollback exists only on paper.',
    approach:
      'The migration factory turns move groups into a repeatable pipeline: wave planning from the dependency graph, automated target build, rehearsed cutover against production data, and a rollback path that has actually been executed.',
    proof: {
      value: '4 months early',
      label: 'Datacentre exit completed',
      customer: 'Cobalt Logistics',
    },
    capabilities: [
      'Move-group planning from observed dependencies',
      'Target environments built from generated IaC',
      'Cutover rehearsal with reconciliation and smoke tests',
      'Validated rollback before the real window',
    ],
  },
  {
    id: 'cost',
    eyebrow: 'Efficiency',
    title: 'Reduce operating cost',
    icon: 'trendingDown',
    problem:
      'The largest infrastructure cost in most enterprises is not licences or cloud spend. It is skilled engineering hours consumed by work that is repetitive, out-of-hours, and impossible to hire your way out of.',
    approach:
      'Routine change moves to unattended execution inside a policy envelope. Engineers keep the judgement calls and lose the 2am restarts. Cost avoided is reported from execution data, not estimated.',
    proof: {
      value: '$14.2M',
      label: 'Average annual cost avoided',
      customer: 'Enterprise deployments',
    },
    capabilities: [
      'Unattended remediation for precedented failure modes',
      'Out-of-hours work reduced to genuine exceptions',
      'Orphaned and untagged cloud resource reclaimed',
      'Avoided-cost reporting traceable to source events',
    ],
  },
];

/* ==========================================================================
   SOLUTIONS BY TEAM
   ======================================================================= */

export interface TeamSolution {
  id: string;
  team: string;
  icon: IconName;
  pain: string;
  gain: string;
}

export const teamSolutions: TeamSolution[] = [
  {
    id: 'dba',
    team: 'Database engineering',
    icon: 'database',
    pain: 'Seventeen engines, each with its own tooling, its own runbooks and its own specialist.',
    gain: 'One operating model across every engine, so expertise compounds instead of fragmenting.',
  },
  {
    id: 'sre',
    team: 'Platform & SRE',
    icon: 'server',
    pain: 'Toil that never quite reaches the top of the backlog, because it is spread across a hundred small tasks.',
    gain: 'Durable workflows that absorb the repetitive work and leave the interesting failures.',
  },
  {
    id: 'cloud',
    team: 'Cloud infrastructure',
    icon: 'cloud',
    pain: 'Four providers, four governance models, and a landing zone standard that drifts within a quarter.',
    gain: 'Consistent policy and lifecycle across providers, enforced at execution rather than reviewed later.',
  },
  {
    id: 'grc',
    team: 'Security & GRC',
    icon: 'lock',
    pain: 'Evidence assembled by hand every audit cycle, describing a state that has already moved on.',
    gain: 'Continuous control testing with an append-only record auditors can query directly.',
  },
  {
    id: 'itsm',
    team: 'IT service management',
    icon: 'lifebuoy',
    pain: 'A CMDB that everyone knows is wrong, and a CAB that cannot keep pace with change volume.',
    gain: 'Discovered truth reconciled into the CMDB, and risk-scored changes routed with evidence attached.',
  },
  {
    id: 'leadership',
    team: 'Technology leadership',
    icon: 'chartBar',
    pain: 'Operational reporting assembled manually each month, with numbers nobody can trace to a source.',
    gain: 'Automation coverage, change success and compliance posture drawn straight from execution data.',
  },
];

/* ==========================================================================
   INDUSTRIES
   ======================================================================= */

export interface Industry {
  id: string;
  name: string;
  icon: IconName;
  summary: string;
  pressures: string[];
  regulations: string[];
  customer: string;
  outcome: string;
}

export const industries: Industry[] = [
  {
    id: 'banking',
    name: 'Banking & capital markets',
    icon: 'building',
    summary:
      'Core banking, payments and market-data estates where an outage is a reportable event and every change needs a defensible record.',
    pressures: [
      'Operational resilience obligations with named accountable executives',
      'Change freezes around settlement and reporting windows',
      'Legacy estate that cannot be re-platformed on a project timeline',
    ],
    regulations: ['DORA', 'PCI DSS 4.0', 'SOX', 'Basel III', 'FFIEC'],
    customer: 'Northwind Financial',
    outcome: 'Quarterly patch execution reduced from eleven weeks to six days.',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: 'shield',
    summary:
      'Policy administration and claims platforms spanning decades of acquisition, with regulators in every jurisdiction you write in.',
    pressures: [
      'Estates inherited through acquisition with inconsistent standards',
      'Solvency and resilience reporting across multiple regulators',
      'Long-lived platforms with narrow maintenance windows',
    ],
    regulations: ['Solvency II', 'DORA', 'NAIC Model Law', 'GDPR'],
    customer: 'Castellan Insurance Group',
    outcome: 'Regulatory evidence preparation reduced from six weeks to one day.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'heart',
    summary:
      'Clinical systems that cannot take a maintenance window, operating under strict validation and privacy obligations.',
    pressures: [
      'Twenty-four hour clinical operations with no natural downtime',
      'Validated change control on systems affecting patient care',
      'Protected health information constraints on tooling and data flow',
    ],
    regulations: ['HIPAA', 'HITRUST', '21 CFR Part 11', 'GDPR'],
    customer: 'Meridian Health System',
    outcome: 'Sixty-two hospital migrations with zero patient-facing outages.',
  },
  {
    id: 'retail',
    name: 'Retail & e-commerce',
    icon: 'package',
    summary:
      'Store, warehouse and digital estates that must be provably stable through the trading peak and adaptable outside it.',
    pressures: [
      'Extended change freezes around peak trading',
      'Thousands of geographically distributed endpoints',
      'Cardholder data environment under continuous assessment',
    ],
    regulations: ['PCI DSS 4.0', 'GDPR', 'CCPA'],
    customer: 'Halden Retail Group',
    outcome: 'Peak-season change freeze shortened from nine weeks to two.',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: 'settings',
    summary:
      'Plant-floor and enterprise systems where a restart in the wrong minute stops a production line.',
    pressures: [
      'Continuous three-shift operations across many sites',
      'Convergence of IT and OT with different change cultures',
      'Edge infrastructure with constrained connectivity',
    ],
    regulations: ['IEC 62443', 'NIS2', 'ISO 27001'],
    customer: 'Auric Manufacturing',
    outcome: 'One hundred and twelve plants patched without production stoppage.',
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    icon: 'globe',
    summary:
      'Network, OSS and BSS estates measured in tens of thousands of nodes, where degradation is visible to every subscriber.',
    pressures: [
      'Extremely large node counts with tight change velocity',
      'Signalling and core network availability commitments',
      'Multi-vendor estates with inconsistent management interfaces',
    ],
    regulations: ['NIS2', 'ISO 27001', 'National telecoms security frameworks'],
    customer: 'Trellis Telecom',
    outcome: 'Mean time to restore reduced by seventy-one per cent.',
  },
  {
    id: 'government',
    name: 'Government & public sector',
    icon: 'building',
    summary:
      'Accredited environments where automation must operate inside the authorisation boundary, not alongside it.',
    pressures: [
      'Authorisation boundaries that constrain tooling choices',
      'Long procurement cycles and strict supply-chain requirements',
      'Legacy estates with extended support arrangements',
    ],
    regulations: ['NIST 800-53', 'CMMC', 'ISO 27001', 'FedRAMP (in process)'],
    customer: 'Sentinel Federal',
    outcome: 'Accredited automation delivered inside the authorisation boundary.',
  },
  {
    id: 'energy',
    name: 'Energy & utilities',
    icon: 'zap',
    summary:
      'Generation, grid and trading systems under critical-infrastructure regulation, spanning IT and operational technology.',
    pressures: [
      'Critical infrastructure protection standards with audit exposure',
      'Operational technology that predates modern management tooling',
      'Geographic dispersion with limited on-site staff',
    ],
    regulations: ['NERC CIP', 'NIS2', 'IEC 62443'],
    customer: 'Volta Energy',
    outcome: 'NERC CIP evidence generated continuously rather than per audit.',
  },
  {
    id: 'education',
    name: 'Education & research',
    icon: 'book',
    summary:
      'Research computing and student systems with seasonal demand peaks and small central platform teams.',
    pressures: [
      'Sharp seasonal load around enrolment and examination',
      'Federated IT with limited central control',
      'Research data requirements that vary by funder',
    ],
    regulations: ['FERPA', 'GDPR', 'ISO 27001'],
    customer: 'Lumen Biosciences',
    outcome: 'Validated change with automated regulatory records.',
  },
  {
    id: 'technology',
    name: 'Technology & SaaS',
    icon: 'cpu',
    summary:
      'Multi-tenant platforms where infrastructure change is continuous and customer-visible reliability is the product.',
    pressures: [
      'Continuous deployment against a growing infrastructure surface',
      'Customer-facing availability commitments with financial penalties',
      'Rapid multi-region expansion',
    ],
    regulations: ['SOC 2 Type II', 'ISO 27001', 'GDPR'],
    customer: 'Cobalt Logistics',
    outcome: 'Change failure rate held below half a per cent at scale.',
  },
];
