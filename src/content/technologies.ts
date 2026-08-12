import type { IconName } from '@/components/primitives/Icon';

/**
 * Supported technology coverage.
 *
 * The credibility argument for an infrastructure platform is breadth, so this
 * is deliberately exhaustive rather than curated. Each group renders as a
 * column in the coverage matrix.
 */

export interface TechGroup {
  id: string;
  label: string;
  icon: IconName;
  blurb: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    id: 'databases',
    label: 'Databases',
    icon: 'database',
    blurb: 'Relational, document, key-value, graph, search and warehouse engines under one lifecycle.',
    items: [
      'SQL Server',
      'Oracle',
      'PostgreSQL',
      'MySQL',
      'MariaDB',
      'MongoDB',
      'Redis',
      'Cassandra',
      'Couchbase',
      'Elasticsearch',
      'OpenSearch',
      'Neo4j',
      'Cosmos DB',
      'Snowflake',
      'Db2',
      'SAP HANA',
      'Sybase ASE',
    ],
  },
  {
    id: 'os',
    label: 'Operating systems',
    icon: 'terminal',
    blurb: 'Current Windows and Linux distributions alongside the legacy Unix estates most tools skip.',
    items: [
      'Windows Server',
      'Linux',
      'Red Hat Enterprise Linux',
      'Ubuntu',
      'CentOS',
      'SUSE Linux Enterprise',
      'IBM AIX',
      'Oracle Solaris',
      'Unix',
    ],
  },
  {
    id: 'middleware',
    label: 'Middleware & platforms',
    icon: 'layers',
    blurb: 'Web tiers, application servers, message brokers, containers and virtualisation.',
    items: [
      'IIS',
      'Apache HTTP',
      'NGINX',
      'Tomcat',
      'JBoss EAP',
      'WildFly',
      'Oracle WebLogic',
      'IBM WebSphere',
      'Apache Kafka',
      'RabbitMQ',
      'ActiveMQ',
      'IBM MQ',
      'Docker',
      'Kubernetes',
      'OpenShift',
      'VMware vSphere',
      'Hyper-V',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: 'cloud',
    blurb: 'Consistent governance and lifecycle across every hyperscaler you operate in.',
    items: [
      'Microsoft Azure',
      'Amazon Web Services',
      'Google Cloud',
      'Oracle Cloud',
      'Alibaba Cloud',
    ],
  },
  {
    id: 'iac',
    label: 'Infrastructure as code',
    icon: 'code',
    blurb: 'Generates and consumes the definitions your platform team already maintains.',
    items: ['Terraform', 'OpenTofu', 'Bicep', 'CloudFormation', 'Pulumi'],
  },
  {
    id: 'automation',
    label: 'Automation & config',
    icon: 'workflow',
    blurb: 'Runs alongside existing tooling rather than demanding a rewrite.',
    items: ['Ansible', 'PowerShell', 'Python', 'Bash', 'Chef', 'Puppet', 'Salt'],
  },
  {
    id: 'monitoring',
    label: 'Observability',
    icon: 'activity',
    blurb: 'Signals pulled in for correlation; findings pushed back out as events.',
    items: [
      'Dynatrace',
      'Datadog',
      'SolarWinds',
      'Prometheus',
      'Grafana',
      'SCOM',
      'Splunk',
      'Elastic Stack',
      'Zabbix',
    ],
  },
  {
    id: 'itsm',
    label: 'ITSM & delivery',
    icon: 'lifebuoy',
    blurb: 'Change records, approvals and pipelines stay where your organisation already works.',
    items: [
      'ServiceNow',
      'Jira Service Management',
      'Freshservice',
      'ManageEngine',
      'Azure DevOps',
      'GitHub',
      'GitLab',
      'Jenkins',
    ],
  },
];

export const totalTechnologies = techGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

/* ==========================================================================
   INTEGRATIONS — the certified connector set shown as cards
   ======================================================================= */

export interface Integration {
  id: string;
  name: string;
  category: string;
  blurb: string;
  /** Two-letter monogram used when no vendor mark is available. */
  monogram: string;
  accent: 'teal' | 'violet' | 'info' | 'warning' | 'success' | 'danger';
  capabilities: string[];
  featured?: boolean;
}

export const integrations: Integration[] = [
  {
    id: 'servicenow',
    name: 'ServiceNow',
    category: 'ITSM',
    monogram: 'SN',
    accent: 'success',
    blurb:
      'Bi-directional change records, CMDB reconciliation and approval routing.',
    capabilities: ['CMDB sync', 'Change requests', 'Approval routing', 'Incident linkage'],
    featured: true,
  },
  {
    id: 'ansible',
    name: 'Ansible',
    category: 'Automation',
    monogram: 'AN',
    accent: 'danger',
    blurb: 'Existing playbooks execute as workflow steps with full audit capture.',
    capabilities: ['Playbook execution', 'Inventory sync', 'Vault integration'],
    featured: true,
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'Infrastructure as code',
    monogram: 'TF',
    accent: 'violet',
    blurb: 'Plan, review and apply within governed change windows.',
    capabilities: ['Plan preview', 'State inspection', 'Drift detection', 'Module catalogue'],
    featured: true,
  },
  {
    id: 'powershell',
    name: 'PowerShell',
    category: 'Automation',
    monogram: 'PS',
    accent: 'info',
    blurb: 'Signed script execution with brokered credentials and captured output.',
    capabilities: ['Signed execution', 'DSC support', 'Remoting'],
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud',
    monogram: 'AZ',
    accent: 'info',
    blurb: 'Subscription governance, resource lifecycle and Entra ID integration.',
    capabilities: ['Resource lifecycle', 'Policy sync', 'Entra ID', 'Cost signals'],
    featured: true,
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'Cloud',
    monogram: 'AW',
    accent: 'warning',
    blurb: 'Account-level automation with Organizations and IAM role assumption.',
    capabilities: ['Multi-account', 'IAM assume-role', 'Systems Manager', 'Cost signals'],
    featured: true,
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'Cloud',
    monogram: 'GC',
    accent: 'info',
    blurb: 'Project and folder governance with workload identity federation.',
    capabilities: ['Project lifecycle', 'Workload identity', 'GKE operations'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Delivery',
    monogram: 'GH',
    accent: 'violet',
    blurb: 'Workflows, policies and runbooks versioned as code with pull-request review.',
    capabilities: ['GitOps sync', 'PR checks', 'Actions triggers', 'Secret scanning'],
    featured: true,
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'Delivery',
    monogram: 'GL',
    accent: 'warning',
    blurb: 'Pipeline triggers and merge-request gating on infrastructure change.',
    capabilities: ['Pipeline triggers', 'MR gating', 'Registry access'],
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'Delivery',
    monogram: 'JK',
    accent: 'danger',
    blurb: 'Existing jobs invoked as governed steps inside a larger workflow.',
    capabilities: ['Job invocation', 'Artifact retrieval', 'Status callback'],
  },
  {
    id: 'dynatrace',
    name: 'Dynatrace',
    category: 'Observability',
    monogram: 'DT',
    accent: 'teal',
    blurb: 'Problem events trigger automation; topology enriches the dependency graph.',
    capabilities: ['Problem events', 'Topology enrichment', 'Metric queries'],
    featured: true,
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'Observability',
    monogram: 'DD',
    accent: 'violet',
    blurb: 'Monitors initiate remediation and receive execution events in return.',
    capabilities: ['Monitor webhooks', 'Metric queries', 'Event stream'],
    featured: true,
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    category: 'Observability',
    monogram: 'PR',
    accent: 'warning',
    blurb: 'Alertmanager routes to workflows; PromQL informs health gates.',
    capabilities: ['Alertmanager', 'PromQL gates', 'Recording rules'],
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'Observability',
    monogram: 'GF',
    accent: 'warning',
    blurb: 'Execution metrics exposed as a datasource for your existing dashboards.',
    capabilities: ['Datasource plugin', 'Annotation push', 'Alert routing'],
  },
  {
    id: 'vmware',
    name: 'VMware vSphere',
    category: 'Virtualisation',
    monogram: 'VM',
    accent: 'teal',
    blurb: 'Inventory, snapshot orchestration and guest operations across clusters.',
    capabilities: ['Inventory sync', 'Snapshot orchestration', 'Guest operations'],
  },
  {
    id: 'activedirectory',
    name: 'Active Directory',
    category: 'Identity',
    monogram: 'AD',
    accent: 'info',
    blurb: 'Group-based authorisation mapped to platform roles and approval chains.',
    capabilities: ['Group mapping', 'Kerberos', 'gMSA support'],
  },
  {
    id: 'cyberark',
    name: 'CyberArk',
    category: 'Secrets',
    monogram: 'CA',
    accent: 'teal',
    blurb: 'Credentials brokered per execution — nothing stored by the platform.',
    capabilities: ['Just-in-time credentials', 'Session isolation', 'Rotation events'],
    featured: true,
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    category: 'Secrets',
    monogram: 'HV',
    accent: 'violet',
    blurb: 'Dynamic secrets issued at step start and revoked at step completion.',
    capabilities: ['Dynamic secrets', 'Transit encryption', 'Lease revocation'],
    featured: true,
  },
];

export const integrationCategories = Array.from(
  new Set(integrations.map((i) => i.category)),
).sort();
