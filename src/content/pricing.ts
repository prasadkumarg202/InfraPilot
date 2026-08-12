/**
 * Commercial model.
 *
 * Priced by managed node rather than by module, so adding a capability never
 * triggers a new negotiation — which is the complaint enterprises make most
 * often about platforms in this category.
 */

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceLabel: string;
  priceNote: string;
  cta: { label: string; href: string };
  highlighted?: boolean;
  bestFor: string;
  includes: string[];
  limits: Array<{ label: string; value: string }>;
}

export const plans: Plan[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Prove the model on one estate',
    priceLabel: 'From $48,000',
    priceNote: 'per year · up to 500 managed nodes',
    cta: { label: 'Start proof of concept', href: '/contact-sales' },
    bestFor:
      'A single platform team automating one domain — usually databases or operating systems — before widening scope.',
    includes: [
      'Infrastructure discovery and dependency mapping',
      'Workflow engine with visual and YAML authoring',
      'Policy engine and approval routing',
      'Patch, provisioning and configuration modules',
      'Audit ledger with 12-month retention',
      'Standard support · 8×5, 4-hour first response',
    ],
    limits: [
      { label: 'Managed nodes', value: 'Up to 500' },
      { label: 'Environments', value: '2' },
      { label: 'Concurrent runs', value: '25' },
      { label: 'Integrations', value: '10' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Operate the whole estate',
    priceLabel: 'From $310,000',
    priceNote: 'per year · from 2,500 managed nodes',
    cta: { label: 'Book demo', href: '/book-demo' },
    highlighted: true,
    bestFor:
      'Global estates spanning databases, operating systems, middleware, cloud and Kubernetes across multiple regions and business units.',
    includes: [
      'Everything in Foundation',
      'All 28 modules including Migration Factory and Self Healing',
      'AI Copilot, risk prediction and root cause analysis',
      'Compliance automation with regulatory control mappings',
      'Executive dashboards and scheduled reporting',
      'Multi-tenant organisation model with delegated administration',
      'Audit ledger with 7-year retention',
      'Enterprise support · 24×7, 30-minute P1 response',
      'Named customer architect',
    ],
    limits: [
      { label: 'Managed nodes', value: 'From 2,500' },
      { label: 'Environments', value: 'Unlimited' },
      { label: 'Concurrent runs', value: '500' },
      { label: 'Integrations', value: 'All 180+' },
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    tagline: 'Regulated and air-gapped estates',
    priceLabel: 'Custom',
    priceNote: 'annual · scoped to your accreditation',
    cta: { label: 'Contact sales', href: '/contact-sales' },
    bestFor:
      'Public sector, defence and critical national infrastructure operating inside an authorisation boundary or a disconnected network.',
    includes: [
      'Everything in Enterprise',
      'Air-gapped deployment with an offline update channel',
      'NIST 800-53 control inheritance · FedRAMP Moderate assessment in process',
      'Customer-managed encryption keys',
      'Dedicated single-tenant infrastructure in your region',
      'Source escrow and supply-chain attestation',
      'Cleared support personnel where required',
      'Custom retention and data residency commitments',
    ],
    limits: [
      { label: 'Managed nodes', value: 'Unlimited' },
      { label: 'Environments', value: 'Unlimited' },
      { label: 'Concurrent runs', value: 'Unlimited' },
      { label: 'Integrations', value: 'All 180+ · custom connectors' },
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  foundation: string | boolean;
  enterprise: string | boolean;
  sovereign: string | boolean;
}

export interface ComparisonGroup {
  group: string;
  rows: ComparisonRow[];
}

export const comparison: ComparisonGroup[] = [
  {
    group: 'Discovery & modelling',
    rows: [
      { feature: 'Agentless infrastructure discovery', foundation: true, enterprise: true, sovereign: true },
      { feature: 'Dependency mapping with evidence', foundation: true, enterprise: true, sovereign: true },
      { feature: 'CMDB bi-directional sync', foundation: 'ServiceNow only', enterprise: true, sovereign: true },
      { feature: 'Infrastructure digital twin', foundation: false, enterprise: true, sovereign: true },
      { feature: 'Knowledge graph API', foundation: 'Read-only', enterprise: true, sovereign: true },
    ],
  },
  {
    group: 'Automation',
    rows: [
      { feature: 'Visual workflow builder', foundation: true, enterprise: true, sovereign: true },
      { feature: 'Patch orchestration', foundation: true, enterprise: true, sovereign: true },
      { feature: 'Upgrade automation', foundation: 'OS and database', enterprise: true, sovereign: true },
      { feature: 'Migration Factory', foundation: false, enterprise: true, sovereign: true },
      { feature: 'Kubernetes automation', foundation: false, enterprise: true, sovereign: true },
      { feature: 'Self healing (unattended)', foundation: false, enterprise: true, sovereign: true },
    ],
  },
  {
    group: 'Intelligence',
    rows: [
      { feature: 'AI Copilot', foundation: false, enterprise: true, sovereign: 'On-premises model' },
      { feature: 'Change risk prediction', foundation: 'Baseline model', enterprise: 'Trained on your history', sovereign: 'Trained on your history' },
      { feature: 'AI root cause analysis', foundation: false, enterprise: true, sovereign: true },
      { feature: 'Predictive maintenance', foundation: false, enterprise: true, sovereign: true },
      { feature: 'AI-generated runbooks', foundation: false, enterprise: true, sovereign: true },
    ],
  },
  {
    group: 'Governance & security',
    rows: [
      { feature: 'Policy engine', foundation: true, enterprise: true, sovereign: true },
      { feature: 'Approval engine with CAB automation', foundation: 'Basic', enterprise: true, sovereign: true },
      { feature: 'Secrets brokering', foundation: 'Vault, CyberArk', enterprise: 'All brokers', sovereign: 'All brokers · CMEK' },
      { feature: 'Compliance control library', foundation: 'CIS only', enterprise: 'Full library', sovereign: 'Full library · custom' },
      { feature: 'Audit ledger retention', foundation: '12 months', enterprise: '7 years', sovereign: 'Custom' },
      { feature: 'Air-gapped deployment', foundation: false, enterprise: false, sovereign: true },
    ],
  },
  {
    group: 'Operations & support',
    rows: [
      { feature: 'Executive dashboards', foundation: 'Standard', enterprise: 'Custom', sovereign: 'Custom' },
      { feature: 'Scheduled reporting', foundation: false, enterprise: true, sovereign: true },
      { feature: 'Multi-tenant organisations', foundation: false, enterprise: true, sovereign: true },
      { feature: 'High availability & DR', foundation: 'Single region', enterprise: 'Multi-region', sovereign: 'Multi-region' },
      { feature: 'Support', foundation: '8×5', enterprise: '24×7 · 30-min P1', sovereign: '24×7 · dedicated' },
      { feature: 'Named customer architect', foundation: false, enterprise: true, sovereign: true },
    ],
  },
];

export const pricingFaq = [
  {
    question: 'What counts as a managed node?',
    answer:
      'Any discrete asset the platform executes against — a database instance, an operating system host, a middleware installation, a Kubernetes cluster or a cloud subscription. Discovery of assets you do not automate is not charged.',
  },
  {
    question: 'Do modules cost extra?',
    answer:
      'No. Pricing is by managed node and support tier. Every module in your plan is available from day one, so widening automation scope never requires a new commercial conversation.',
  },
  {
    question: 'How does a proof of concept work?',
    answer:
      'A two-week engagement against a scoped part of your estate, run in your environment with your approvals. It concludes with a real automated change executed end to end and a written assessment of measured effort saved.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'Foundation is a twelve-month term. Enterprise and Sovereign are typically three-year agreements with annual node-count reconciliation, which is what allows the per-node rate to fall as coverage grows.',
  },
  {
    question: 'What happens if we exceed our node count?',
    answer:
      'Nothing stops working. Usage above the committed count is reported in your dashboard and reconciled at the next anniversary at the same rate — we do not throttle automation mid-year.',
  },
  {
    question: 'Can we deploy without any outbound internet access?',
    answer:
      'Yes, on the Sovereign plan. The control plane, runners and model inference run entirely inside your network, with updates delivered through a signed offline channel.',
  },
];
