import type { IconName } from '@/components/primitives/Icon';

/* ==========================================================================
   PRODUCT MODULES
   Twenty-eight modules grouped into the four stages of the operations
   lifecycle. Copy is written to the outcome, not the feature.
   ======================================================================= */

export type ModuleStage = 'discover' | 'build' | 'operate' | 'govern';

export interface ProductModule {
  id: string;
  name: string;
  stage: ModuleStage;
  icon: IconName;
  summary: string;
  detail: string;
  outcomes: string[];
}

export const stageMeta: Record<
  ModuleStage,
  { label: string; description: string; icon: IconName }
> = {
  discover: {
    label: 'Discover',
    description:
      'Establish what you actually run, how it connects, and what changing it would affect.',
    icon: 'search',
  },
  build: {
    label: 'Build & change',
    description:
      'Provision, patch, upgrade and migrate at estate scale with the same guardrails every time.',
    icon: 'package',
  },
  operate: {
    label: 'Operate',
    description:
      'Detect, diagnose and resolve — with the platform doing the routine work unattended.',
    icon: 'activity',
  },
  govern: {
    label: 'Govern',
    description:
      'Prove control to auditors and executives from the same record the engineers work in.',
    icon: 'shieldCheck',
  },
};

export const modules: ProductModule[] = [
  {
    id: 'discovery',
    name: 'Infrastructure Discovery',
    stage: 'discover',
    icon: 'search',
    summary: 'Agentless inventory of every host, instance and service you own.',
    detail:
      'Scans networks, hypervisors, cloud accounts and Kubernetes clusters on a schedule, resolving duplicates and reconciling ownership. Finds the estate nobody documented — typically 8–14% more than the CMDB knew about.',
    outcomes: [
      'Full estate visible within 48 hours of deployment',
      'No agent rollout required to start',
      'Continuous reconciliation, not a point-in-time audit',
    ],
  },
  {
    id: 'dependency',
    name: 'Dependency Mapping',
    stage: 'discover',
    icon: 'network',
    summary: 'Observed traffic and configuration resolved into a live service map.',
    detail:
      'Combines connection telemetry, configuration parsing and query analysis to build a directed graph of what talks to what. Every edge carries evidence, so engineers can see why a dependency was inferred.',
    outcomes: [
      'Blast radius known before a change is approved',
      'Orphaned and shadow dependencies surfaced',
      'Evidence trail on every inferred relationship',
    ],
  },
  {
    id: 'configuration',
    name: 'Configuration Management',
    stage: 'discover',
    icon: 'settings',
    summary: 'Desired state defined once and enforced continuously.',
    detail:
      'Captures configuration across databases, operating systems and middleware, compares it to your standard, and either reports or remediates drift according to policy.',
    outcomes: [
      'Drift detected within minutes',
      'Standards expressed as code, versioned in Git',
      'Remediation gated by the same approvals as any change',
    ],
  },
  {
    id: 'inventory',
    name: 'Infrastructure Inventory',
    stage: 'discover',
    icon: 'grid',
    summary: 'One queryable record of every asset, version and licence.',
    detail:
      'A normalised inventory across seventeen database engines, nine operating systems and the middleware layer, with end-of-support dates and licence positions attached.',
    outcomes: [
      'End-of-support exposure visible a year ahead',
      'Licence position reconciled automatically',
      'Queryable over API for downstream systems',
    ],
  },
  {
    id: 'cmdb',
    name: 'CMDB Sync',
    stage: 'discover',
    icon: 'refresh',
    summary: 'Your service management record kept accurate without manual upkeep.',
    detail:
      'Bi-directional reconciliation with ServiceNow, Jira Service Management and other CMDBs. Discovered truth flows in; ownership and business context flow back out.',
    outcomes: [
      'CI accuracy above 97% sustained',
      'Ownership and support groups preserved',
      'Conflicts routed for human decision, not overwritten',
    ],
  },
  {
    id: 'build',
    name: 'Build Automation',
    stage: 'build',
    icon: 'package',
    summary: 'Standard builds produced identically, every time.',
    detail:
      'Golden-image and configuration pipelines for every supported platform, with hardening baselines applied at build time rather than retrofitted.',
    outcomes: [
      'Build time reduced from days to under an hour',
      'CIS baselines applied at creation',
      'Every build reproducible from source',
    ],
  },
  {
    id: 'provisioning',
    name: 'Provisioning',
    stage: 'build',
    icon: 'server',
    summary: 'Self-service infrastructure inside your guardrails.',
    detail:
      'Catalogue-driven provisioning across cloud and on-premises, generating the Terraform, Bicep or Ansible your platform team already maintains rather than replacing it.',
    outcomes: [
      'Request to running environment in minutes',
      'Cost and policy checks before creation',
      'Generated IaC committed to your repository',
    ],
  },
  {
    id: 'patch',
    name: 'Patch Orchestration',
    stage: 'build',
    icon: 'shield',
    summary: 'Estate-wide patching sequenced around real dependencies.',
    detail:
      'Plans waves from the dependency graph so quorum, replication and availability constraints are respected. Validates health between waves and stops on the first signal that matters.',
    outcomes: [
      'Patch cycles that took weeks completed in days',
      'Availability maintained through rolling execution',
      'Automatic halt and rollback on health regression',
    ],
  },
  {
    id: 'upgrade',
    name: 'Upgrade Automation',
    stage: 'build',
    icon: 'trendingUp',
    summary: 'Major version upgrades run as a repeatable pipeline.',
    detail:
      'Pre-flight compatibility analysis, staged execution, in-flight validation and a tested rollback path for database, middleware and OS major versions.',
    outcomes: [
      'Compatibility issues found before the window opens',
      'Rollback rehearsed, not improvised',
      'Same pipeline from dev through production',
    ],
  },
  {
    id: 'database',
    name: 'Database Automation',
    stage: 'build',
    icon: 'database',
    summary: 'Seventeen engines, one operating model.',
    detail:
      'Provisioning, patching, backup verification, HA configuration, failover testing and performance baselining across SQL Server, Oracle, PostgreSQL, MySQL, MongoDB, Cassandra and more.',
    outcomes: [
      'One runbook library across every engine',
      'Backup restores verified, not assumed',
      'Failover tested on a schedule',
    ],
  },
  {
    id: 'middleware',
    name: 'Middleware Automation',
    stage: 'build',
    icon: 'layers',
    summary: 'Application servers, web tiers and messaging handled as first-class estate.',
    detail:
      'Lifecycle automation for IIS, Apache, NGINX, Tomcat, JBoss, WebLogic, WebSphere, Kafka, RabbitMQ and MQ Series — the layer most automation programmes leave manual.',
    outcomes: [
      'Config drift eliminated across the web tier',
      'Broker upgrades without message loss',
      'Certificate rotation fully automated',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Automation',
    stage: 'build',
    icon: 'cloud',
    summary: 'One control plane across Azure, AWS, Google Cloud and Oracle Cloud.',
    detail:
      'Account and subscription governance, resource lifecycle, tagging enforcement and cost guardrails applied consistently regardless of provider.',
    outcomes: [
      'Consistent policy across every provider',
      'Untagged and orphaned resources reclaimed',
      'Landing zones provisioned from a template',
    ],
  },
  {
    id: 'os',
    name: 'Operating System Automation',
    stage: 'build',
    icon: 'terminal',
    summary: 'Windows, Linux and Unix under a single lifecycle.',
    detail:
      'Kernel and package management, hardening, service configuration and reboot coordination for Windows Server, RHEL, Ubuntu, SUSE, AIX and Solaris.',
    outcomes: [
      'Reboots coordinated with application owners',
      'Hardening drift closed continuously',
      'Legacy Unix estates included, not excluded',
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes Automation',
    stage: 'build',
    icon: 'container',
    summary: 'Cluster lifecycle without a bespoke platform team per cluster.',
    detail:
      'Version upgrades, node pool rotation, add-on management and policy enforcement across EKS, AKS, GKE and OpenShift, respecting pod disruption budgets throughout.',
    outcomes: [
      'Cluster upgrades without workload disruption',
      'Add-on versions kept in a supported window',
      'Policy enforced at admission',
    ],
  },
  {
    id: 'migration',
    name: 'Migration Factory',
    stage: 'build',
    icon: 'route',
    summary: 'Datacentre exits and cloud migrations run as a production line.',
    detail:
      'Wave planning from the dependency graph, automated target build, data movement, cutover rehearsal and validated rollback — repeated at volume rather than run as a one-off project.',
    outcomes: [
      'Move-group planning in hours instead of weeks',
      'Cutover rehearsed against production data',
      'Migration debt tracked to zero',
    ],
  },
  {
    id: 'incident',
    name: 'Incident Automation',
    stage: 'operate',
    icon: 'zap',
    summary: 'Diagnostics gathered and first response executed before an engineer joins.',
    detail:
      'On alert, the platform collects evidence across the dependency path, correlates it with recent changes, and runs the approved first-response actions.',
    outcomes: [
      'Evidence attached to the ticket automatically',
      'Common incidents resolved without paging',
      'Engineers join with context, not a blank screen',
    ],
  },
  {
    id: 'self-healing',
    name: 'Self Healing',
    stage: 'operate',
    icon: 'refresh',
    summary: 'Known failure modes corrected without a human in the loop.',
    detail:
      'Policy defines which conditions may be remediated unattended, in which environments, within which windows. Everything else escalates with a recommended action.',
    outcomes: [
      'Routine restarts and reclaims handled silently',
      'Explicit blast-radius limits per policy',
      'Full audit record of every unattended action',
    ],
  },
  {
    id: 'rca',
    name: 'AI Root Cause Analysis',
    stage: 'operate',
    icon: 'target',
    summary: 'Correlated evidence instead of a wall of alerts.',
    detail:
      'Ranks candidate causes by combining topology, change history, telemetry and log signals, and shows the reasoning behind each candidate so engineers can confirm or discard it quickly.',
    outcomes: [
      'Median diagnosis time reduced by 71%',
      'Ranked causes with supporting evidence',
      'Reasoning shown, never a black-box verdict',
    ],
  },
  {
    id: 'predictive',
    name: 'Predictive Maintenance',
    stage: 'operate',
    icon: 'activity',
    summary: 'Capacity and failure risk flagged before it becomes an incident.',
    detail:
      'Models growth in storage, connections, memory and transaction volume against historical patterns and raises a change request with a proposed remediation.',
    outcomes: [
      'Capacity exhaustion forecast weeks ahead',
      'Remediation proposed with the warning',
      'Fewer out-of-hours escalations',
    ],
  },
  {
    id: 'copilot',
    name: 'AI Copilot',
    stage: 'operate',
    icon: 'sparkles',
    summary: 'Ask the estate a question. Get an answer with the evidence attached.',
    detail:
      'Natural-language access to inventory, topology, change history and telemetry, plus runbook generation reviewed by a human before it can execute anywhere.',
    outcomes: [
      'Answers grounded in your data, with citations',
      'Draft runbooks in minutes, reviewed before use',
      'Never executes without an approval path',
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance Automation',
    stage: 'govern',
    icon: 'shieldCheck',
    summary: 'Controls tested continuously, evidence produced automatically.',
    detail:
      'Maps technical checks to CIS, PCI DSS, HIPAA, SOX, DORA, NIST 800-53 and internal standards, running them on a schedule and packaging the results as auditor-ready evidence.',
    outcomes: [
      'Audit preparation reduced from weeks to hours',
      'Exceptions tracked with owners and dates',
      'Evidence exported in the auditor’s format',
    ],
  },
  {
    id: 'policy',
    name: 'Policy Engine',
    stage: 'govern',
    icon: 'lock',
    summary: 'Guardrails evaluated before anything executes.',
    detail:
      'Policies written as code decide what may run, where, by whom and in which window. Denials explain themselves, so engineers can fix the request rather than file a ticket.',
    outcomes: [
      'Unsafe change prevented, not detected later',
      'Policy versioned and peer-reviewed',
      'Clear, actionable denial messages',
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow Engine',
    stage: 'govern',
    icon: 'workflow',
    summary: 'Visual authoring with production-grade execution semantics.',
    detail:
      'Build workflows on a canvas or in YAML — they are the same object. Retries, compensation, parallelism, human tasks and rollback are first-class rather than bolted on.',
    outcomes: [
      'Non-scripters can build safe automation',
      'Every workflow reviewable as a diff',
      'Deterministic replay of any past run',
    ],
  },
  {
    id: 'approval',
    name: 'Approval Engine',
    stage: 'govern',
    icon: 'checkCircle',
    summary: 'Change advisory that keeps up with the change volume.',
    detail:
      'Risk-scored changes route to the right approvers with the evidence already attached. Low-risk, well-precedented change can be pre-authorised by policy.',
    outcomes: [
      'CAB time spent on the changes that matter',
      'Approval decisions recorded with rationale',
      'Emergency path with retrospective review',
    ],
  },
  {
    id: 'dashboard',
    name: 'Executive Dashboard',
    stage: 'govern',
    icon: 'chartBar',
    summary: 'The operational picture leadership actually asks for.',
    detail:
      'Automation coverage, change success rate, patch currency, compliance posture and avoided cost — drawn from execution data rather than assembled by hand each month.',
    outcomes: [
      'Board reporting produced in minutes',
      'Every figure traceable to source events',
      'Trends by business unit and region',
    ],
  },
  {
    id: 'reporting',
    name: 'Reporting Engine',
    stage: 'govern',
    icon: 'file',
    summary: 'Scheduled, parameterised reporting for every audience.',
    detail:
      'Build a report once and deliver it as PDF, spreadsheet or API to the teams and regulators that need it, on the cadence they need it.',
    outcomes: [
      'Recurring reports fully unattended',
      'Consistent figures across every audience',
      'Delivered to email, storage or ticket',
    ],
  },
  {
    id: 'audit',
    name: 'Audit Engine',
    stage: 'govern',
    icon: 'book',
    summary: 'A tamper-evident record of everything the platform did.',
    detail:
      'Every action, approval, parameter and output written to an append-only log with cryptographic chaining, retained to your policy and queryable over API.',
    outcomes: [
      'Complete reconstruction of any past change',
      'Tamper-evident by cryptographic chain',
      'Retention aligned to regulatory requirement',
    ],
  },
  {
    id: 'api',
    name: 'API Platform',
    stage: 'govern',
    icon: 'code',
    summary: 'Everything the console does, available programmatically.',
    detail:
      'A documented REST API, webhooks, event streaming and SDKs — the console is built on the same surface, so nothing is reserved for the UI.',
    outcomes: [
      'Automation embedded in your own pipelines',
      'Events streamed to your data platform',
      'No functionality locked behind the UI',
    ],
  },
];

export const modulesByStage = (stage: ModuleStage): ProductModule[] =>
  modules.filter((m) => m.stage === stage);

/* ==========================================================================
   PLATFORM PILLARS — the four-part story told on the home and platform pages
   ======================================================================= */

export interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: Array<{ title: string; body: string }>;
  icon: IconName;
}

export const pillars: Pillar[] = [
  {
    id: 'discovery',
    eyebrow: 'Know the estate',
    title: 'A live model of everything you run',
    body: 'Automation is only as safe as the map it works from. Infrapilot builds and maintains that map itself — continuously, without agents, across every layer of the stack.',
    icon: 'network',
    points: [
      {
        title: 'Agentless discovery',
        body: 'Networks, hypervisors, cloud accounts and clusters scanned on a schedule with no software to roll out first.',
      },
      {
        title: 'Evidence-backed dependencies',
        body: 'Every inferred relationship shows the traffic, configuration or query that produced it.',
      },
      {
        title: 'Impact analysis on demand',
        body: 'Select any node and see precisely which services, teams and SLAs a change would touch.',
      },
    ],
  },
  {
    id: 'workflow',
    eyebrow: 'Change with confidence',
    title: 'Workflows that behave like production systems',
    body: 'Scripts fail quietly. Infrapilot workflows are durable, resumable and reversible, with the same guardrails applied whether a change touches one instance or twenty thousand.',
    icon: 'workflow',
    points: [
      {
        title: 'Visual and code, one object',
        body: 'Author on the canvas or in YAML. Both views edit the same definition and diff cleanly in Git.',
      },
      {
        title: 'Rollback as a first-class path',
        body: 'Every step declares its inverse. Rollback is rehearsed in lower environments, not written during an incident.',
      },
      {
        title: 'Wave-based execution',
        body: 'Sequencing derived from real dependencies, with health gates between waves and automatic halt on regression.',
      },
    ],
  },
  {
    id: 'policy',
    eyebrow: 'Stay inside the lines',
    title: 'Guardrails that run before anything else does',
    body: 'Control is enforced at execution time, not reviewed afterwards. Policy decides what may run, where, by whom and in which window — and explains every denial.',
    icon: 'shieldCheck',
    points: [
      {
        title: 'Zero standing privilege',
        body: 'Credentials are brokered per execution from your vault and expire when the step completes.',
      },
      {
        title: 'Continuous control testing',
        body: 'Regulatory and internal controls tested on a schedule, with evidence packaged for audit.',
      },
      {
        title: 'Tamper-evident audit',
        body: 'Append-only, cryptographically chained records of every action, approval and output.',
      },
    ],
  },
  {
    id: 'intelligence',
    eyebrow: 'Compound the learning',
    title: 'AI grounded in your estate, not the internet',
    body: 'Models are trained and prompted on your topology, your change history and your outcomes. Every recommendation shows its evidence, and nothing executes without an approval path.',
    icon: 'sparkles',
    points: [
      {
        title: 'Risk scored from your history',
        body: 'Change risk modelled on comparable prior changes in your own environment, not an industry average.',
      },
      {
        title: 'Runbooks drafted, humans approve',
        body: 'Copilot writes the procedure and its rollback; an engineer reviews before it can run anywhere.',
      },
      {
        title: 'Root cause with reasoning shown',
        body: 'Ranked candidates with the correlating evidence exposed, so engineers can confirm rather than trust.',
      },
    ],
  },
];
