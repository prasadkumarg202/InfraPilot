import type { IconName } from '@/components/primitives/Icon';

/**
 * Interactive demo scenarios.
 *
 * These are the same six stories the animated demo films tell, in the same
 * order and with the same identifiers — INC0048122, RB-1108, CHG0042917,
 * RITM0067342. A visitor who watches a film and then plays the corresponding
 * tab on the site should see the same run, not a different invented one.
 */

export type DemoVisual =
  | 'topology'
  | 'waves'
  | 'evidence'
  | 'compliance'
  | 'migration'
  | 'build'
  | 'rollback';

export interface DemoPhase {
  id: string;
  label: string;
  /** Seconds of simulated run time this phase represents. */
  duration: number;
  logs: Array<{ text: string; tone: 'info' | 'ok' | 'warn' | 'ai' | 'danger' }>;
}

export interface DemoVideoLink {
  label: string;
  url: string;
  type: 'sqlserver' | 'oracle' | 'postgres' | 'general';
}

export interface DemoScenario {
  id: string;
  name: string;
  icon: IconName;
  tagline: string;
  description: string;
  visual: DemoVisual;
  scope: string;
  phases: DemoPhase[];
  metrics: Array<{ label: string; from: string; to: string }>;
  outcome: string;
  /** Videos associated with this scenario */
  videos?: DemoVideoLink[];
}

export const demoScenarios: DemoScenario[] = [
  {
    id: 'self-healing',
    name: 'Self-healing',
    icon: 'refresh',
    tagline: 'SQL Server service down on SQL-PRD-14',
    description:
      'A SQL Server service stops on a production host. ServiceNow raises the incident, runbook RB-1108 restarts the service and verifies every database came back, and the incident closes itself — with no engineer paged.',
    visual: 'topology',
    scope: 'INC0048122 · RB-1108 · policy-bounded, unattended',
    videos: [
      { label: 'SQL Server', url: '/videos/Demo%20Video%20-%20Self-Healing.dc.html', type: 'sqlserver' },
      { label: 'Oracle', url: '/videos/Demo%20Video%20-%20Oracle%20Auto-Healing.dc.html', type: 'oracle' },
      { label: 'PostgreSQL', url: '/videos/Demo%20Video%20-%20PG%20Auto-Healing.dc.html', type: 'postgres' }
    ],
    outcome:
      'Service restored in 71 seconds without human involvement. All 14 databases verified online, the incident validated and closed automatically, and the full evidence chain attached to the record.',
    phases: [
      {
        id: 'detect',
        label: 'Detect',
        duration: 9,
        logs: [
          { text: 'MSSQLSERVER service stopped on SQL-PRD-14', tone: 'danger' },
          { text: 'Matched known failure mode — 17 prior occurrences, all recoverable', tone: 'ai' },
          { text: 'ServiceNow incident INC0048122 created · P2 · assigned to automation', tone: 'info' },
        ],
      },
      {
        id: 'authorise',
        label: 'Policy check',
        duration: 3,
        logs: [
          { text: 'Policy PLC-UNATTENDED-SERVICE evaluated — permitted', tone: 'ok' },
          { text: 'Blast radius within limit: 1 host, no dependent failover in flight', tone: 'ok' },
          { text: 'Credentials brokered from vault · 15 min TTL', tone: 'ok' },
        ],
      },
      {
        id: 'remediate',
        label: 'Run RB-1108',
        duration: 44,
        logs: [
          { text: 'Runbook RB-1108 started — service recovery, SQL Server', tone: 'info' },
          { text: 'Pre-checks: disk, memory, error log tail — no blocking condition', tone: 'ok' },
          { text: 'MSSQLSERVER started · SQLSERVERAGENT started', tone: 'ok' },
          { text: 'Verifying databases — 14 of 14 ONLINE', tone: 'ok' },
        ],
      },
      {
        id: 'close',
        label: 'Validate & close',
        duration: 15,
        logs: [
          { text: 'Connectivity probe passed from 3 dependent application hosts', tone: 'ok' },
          { text: 'Evidence chain attached to INC0048122', tone: 'ok' },
          { text: 'Incident validated and closed — no engineer paged', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'Engineers paged', from: '1', to: '0' },
      { label: 'Time to restore', from: '~35 min', to: '71 sec' },
      { label: 'Databases verified', from: '—', to: '14 / 14' },
      { label: 'Incident record', from: 'Manual', to: 'Automatic' },
    ],
  },
  {
    id: 'patch',
    name: 'Patch orchestration',
    icon: 'shield',
    tagline: 'Topology-aware patch waves under CHG0042917',
    description:
      'A change request drives the whole run. Servers come from the ServiceNow CMDB, the platform detects each one’s topology — standalone, Always On availability group, or failover cluster — and sequences the waves so quorum is never at risk.',
    visual: 'waves',
    scope: 'CHG0042917 · 2,104 instances · 4 regions · 6-hour window',
    videos: [
      { label: 'SQL Server', url: '/videos/Demo%20Video%20-%20Patch%20Orchestration.dc.html', type: 'sqlserver' },
      { label: 'Oracle', url: '/videos/Demo%20Video%20-%20Oracle%20Patching.dc.html', type: 'oracle' },
      { label: 'PostgreSQL', url: '/videos/Demo%20Video%20-%20PG%20Patching.dc.html', type: 'postgres' }
    ],
    outcome:
      'Completed in 4h 12m with zero unplanned downtime. Two nodes failed a post-patch health gate, rolled back automatically, and were re-run in the trailing wave. The change request closed itself.',
    phases: [
      {
        id: 'intake',
        label: 'Intake & scope',
        duration: 42,
        logs: [
          { text: 'CHG0042917 approved — window opens 02:00 UTC', tone: 'ok' },
          { text: 'Server list fetched from ServiceNow CMDB — 2,104 instances', tone: 'info' },
          { text: 'Change risk scored 18/100 (low) against 4,206 comparable prior changes', tone: 'ok' },
        ],
      },
      {
        id: 'topology',
        label: 'Detect topology',
        duration: 96,
        logs: [
          { text: 'Standalone: 1,418 · Always On AG: 486 · Failover cluster: 200', tone: 'info' },
          { text: '38 availability groups detected — quorum constraints applied', tone: 'info' },
          { text: 'Copilot re-sequenced 3 nodes to protect quorum in EMEA wave 1', tone: 'ai' },
          { text: 'Pre-checks: disk headroom, backup chain, cluster health — 3 remediated', tone: 'warn' },
        ],
      },
      {
        id: 'execute',
        label: 'Rolling execution',
        duration: 12_480,
        logs: [
          { text: 'AG nodes: secondaries first, then failover, then former primary', tone: 'info' },
          { text: 'Cluster nodes: passive node, failover, then previously active node', tone: 'info' },
          { text: 'Wave 1 · EMEA · 238 instances complete · 0 failures', tone: 'ok' },
          { text: 'Wave 3 · AMER · health gate failed on 2 nodes — rolled back', tone: 'warn' },
          { text: 'Failed nodes re-queued to the trailing wave with diagnostics attached', tone: 'ai' },
          { text: 'Wave 7 · APAC · 302 instances complete', tone: 'ok' },
        ],
      },
      {
        id: 'validate',
        label: 'Validate & close',
        duration: 268,
        logs: [
          { text: 'Post-patch checks passed on 2,102 of 2,104', tone: 'ok' },
          { text: 'Failover tested on 38 availability groups', tone: 'ok' },
          { text: 'Evidence package written to the audit ledger and attached to CHG0042917', tone: 'ok' },
          { text: 'Change closed automatically — no manual steps required', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'Instances patched', from: '0', to: '2,104' },
      { label: 'Unplanned downtime', from: '—', to: '0 min' },
      { label: 'Manual engineer hours', from: '840', to: '6' },
      { label: 'Elapsed', from: '00:00', to: '04:12' },
    ],
  },
  {
    id: 'migration',
    name: 'Database migration',
    icon: 'route',
    tagline: 'Platform upgrade and cloud migration',
    description:
      'A version upgrade delivered as a rehearsed cutover. Full backups, restores across every replica WITH NORECOVERY, a tail-log backup, then the availability group rebuilt with synchronous replicas locally and an asynchronous replica in the remote region.',
    visual: 'migration',
    scope: 'SQLAG-11 · 3 replicas · US-East sync, US-West async',
    videos: [
      { label: 'SQL Server', url: '/videos/Demo%20Video%20-%20SQL%20Migration.dc.html', type: 'sqlserver' },
      { label: 'Oracle', url: '/videos/Demo%20Video%20-%20Oracle%20Upgrade.dc.html', type: 'oracle' },
      { label: 'PostgreSQL', url: '/videos/Demo%20Video%20-%20PG%20Upgrade.dc.html', type: 'postgres' }
    ],
    outcome:
      'Cutover executed in 38 minutes against a rehearsed plan. Compatibility level raised, CHECKDB clean, maintenance jobs re-created, and the change request closed. The rollback path was validated but not needed.',
    phases: [
      {
        id: 'backup',
        label: 'Backup & restore',
        duration: 3600,
        logs: [
          { text: 'Full backups taken on all databases in SQLAG-11', tone: 'ok' },
          { text: 'Restored on 11A, 11B and 11C WITH NORECOVERY', tone: 'ok' },
          { text: 'Backup chain verified — restore tested, not assumed', tone: 'ok' },
        ],
      },
      {
        id: 'cutover',
        label: 'Tail log & recovery',
        duration: 1840,
        logs: [
          { text: 'Traffic quiesced — 0 active sessions on the primary', tone: 'info' },
          { text: 'Tail-log backup taken', tone: 'ok' },
          { text: 'Primary recovered WITH RECOVERY · secondaries left NORECOVERY', tone: 'ok' },
        ],
      },
      {
        id: 'ag',
        label: 'Rebuild the AG',
        duration: 1400,
        logs: [
          { text: 'SQLAG-11 created — 11A + 11B synchronous with automatic failover (US-East)', tone: 'ok' },
          { text: '11C added asynchronous, manual failover (US-West)', tone: 'ok' },
          { text: 'Listener and read-only routing re-established', tone: 'ok' },
          { text: 'Synchronisation healthy on all three replicas', tone: 'ok' },
        ],
      },
      {
        id: 'finalise',
        label: 'Finalise',
        duration: 2280,
        logs: [
          { text: 'Compatibility level raised to 160', tone: 'ok' },
          { text: 'DBCC CHECKDB clean across all databases', tone: 'ok' },
          { text: 'Maintenance jobs and Agent schedules re-created', tone: 'ok' },
          { text: 'Change request closed — 38m 12s elapsed', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'Replicas migrated', from: '0', to: '3' },
      { label: 'Cutover duration', from: 'est. 6h', to: '38 min' },
      { label: 'CHECKDB errors', from: '—', to: '0' },
      { label: 'Rollback tested', from: 'No', to: 'Yes' },
    ],
  },
  {
    id: 'build',
    name: 'SQL Server build',
    icon: 'package',
    tagline: 'Intake RITM0067342 to health-checked instance',
    description:
      'A service catalogue request becomes a running, standards-compliant SQL Server. The VM is created, drives are formatted and labelled to the storage standard, the install runs unattended, and the instance is tuned and health-checked before handover.',
    visual: 'build',
    scope: 'RITM0067342 · WS2022 · SQL 2022 + CU12 · 8 vCPU / 64 GB',
    videos: [
      { label: 'SQL Server', url: '/videos/Demo%20Video%20-%20SQL%20Server%20Build.dc.html', type: 'sqlserver' },
      { label: 'Oracle', url: '/videos/Demo%20Video%20-%20Oracle%20Build.dc.html', type: 'oracle' },
      { label: 'PostgreSQL', url: '/videos/Demo%20Video%20-%20PG%20Build.dc.html', type: 'postgres' }
    ],
    outcome:
      'Delivered in 68 minutes from approved request to health-checked instance, against a manual baseline of three to five working days. Every setting traceable to the standard that specified it.',
    phases: [
      {
        id: 'intake',
        label: 'Intake',
        duration: 60,
        logs: [
          { text: 'RITM0067342 approved — WS2022, SQL 2022 + CU12, 8 vCPU / 64 GB', tone: 'ok' },
          { text: 'Naming, placement and IP allocated from the estate model', tone: 'info' },
          { text: 'Licence position checked before provisioning', tone: 'ok' },
        ],
      },
      {
        id: 'provision',
        label: 'Create & format',
        duration: 900,
        logs: [
          { text: 'VM created and joined to the domain', tone: 'ok' },
          { text: 'Drives formatted and labelled — C: OS · D: SQLBin · E: SQLData', tone: 'info' },
          { text: 'F: SQLLogs · G: Backups · I: TempDB — 64K allocation unit', tone: 'info' },
          { text: 'Pre-build validation passed', tone: 'ok' },
        ],
      },
      {
        id: 'install',
        label: 'Unattended install',
        duration: 1680,
        logs: [
          { text: 'SQL Server 2022 installed unattended from the approved media', tone: 'ok' },
          { text: 'CU12 applied', tone: 'ok' },
          { text: 'Instance-level collation and service accounts set from the standard', tone: 'ok' },
        ],
      },
      {
        id: 'configure',
        label: 'Configure & verify',
        duration: 1440,
        logs: [
          { text: 'Max memory, MAXDOP and cost threshold set for 8 vCPU / 64 GB', tone: 'ok' },
          { text: 'TempDB files sized and split to the standard', tone: 'ok' },
          { text: 'Security policy, audit and backup jobs applied', tone: 'ok' },
          { text: 'Health checks passed — instance handed over', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'Time to handover', from: '3–5 days', to: '68 min' },
      { label: 'Manual steps', from: '~120', to: '0' },
      { label: 'Standard deviations', from: 'Common', to: '0' },
      { label: 'Evidence captured', from: 'Partial', to: 'Complete' },
    ],
  },
  {
    id: 'discovery',
    name: 'Infrastructure discovery',
    icon: 'search',
    tagline: 'Agentless scan across four subnets',
    description:
      'No agents, no rollout project. The platform scans with vault-brokered credentials, classifies what it finds, resolves the dependency graph from observed traffic and configuration, and reconciles the result into the CMDB.',
    visual: 'evidence',
    scope: '4 subnets · vault credentials · agentless',
    videos: [
      { label: 'Demo Video', url: '/videos/Demo%20Video%20-%20Infrastructure%20Discovery.dc.html', type: 'general' }
    ],
    outcome:
      '1,240 configuration items discovered and classified, 3,861 dependency edges resolved, and the CMDB reconciled — including 96 assets that were running in production and recorded nowhere.',
    phases: [
      {
        id: 'scan',
        label: 'Scan',
        duration: 900,
        logs: [
          { text: 'Scanning 4 subnets with credentials brokered from the vault', tone: 'info' },
          { text: 'No agent installed on any target', tone: 'ok' },
          { text: '1,240 configuration items responded', tone: 'ok' },
        ],
      },
      {
        id: 'classify',
        label: 'Classify',
        duration: 420,
        logs: [
          { text: 'Databases 412 · Operating systems 566 · Middleware 198 · Other 64', tone: 'info' },
          { text: 'Versions, editions and end-of-support dates attached', tone: 'info' },
          { text: '96 assets found that were absent from the CMDB', tone: 'warn' },
        ],
      },
      {
        id: 'graph',
        label: 'Resolve dependencies',
        duration: 640,
        logs: [
          { text: 'Connection telemetry, configuration and query analysis correlated', tone: 'info' },
          { text: '3,861 dependency edges resolved, each with its supporting evidence', tone: 'ok' },
          { text: '4 services found in the payment path with no documented owner', tone: 'warn' },
        ],
      },
      {
        id: 'sync',
        label: 'Reconcile CMDB',
        duration: 300,
        logs: [
          { text: 'ServiceNow CMDB reconciled — 96 CIs created, 311 corrected', tone: 'ok' },
          { text: 'Ownership and support groups preserved, conflicts routed for decision', tone: 'ok' },
          { text: 'Live inventory available over API and in the console', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'CIs discovered', from: '0', to: '1,240' },
      { label: 'Dependency edges', from: 'Unknown', to: '3,861' },
      { label: 'Undocumented assets', from: 'Unknown', to: '96 found' },
      { label: 'Agents deployed', from: '1,240', to: '0' },
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance scanning',
    icon: 'shieldCheck',
    tagline: 'CIS v8, PCI DSS 4.0 and the company baseline',
    description:
      'Controls tested continuously against every in-scope system. Findings are ranked, the remediable ones become governed change, the rest are filed as exceptions with owners and dates, and signed evidence goes to GRC.',
    visual: 'compliance',
    scope: 'CIS v8 · PCI DSS 4.0 · company baseline',
    videos: [
      { label: 'Demo Video', url: '/videos/Demo%20Video%20-%20Compliance.dc.html', type: 'general' }
    ],
    outcome:
      'Thirty-seven findings ranked and cleared or accepted. Signed evidence delivered to GRC with per-check timestamps, and a per-platform posture dashboard: SQL Server 99.1%, Oracle 97.6%, Middleware 96.2%.',
    phases: [
      {
        id: 'scan',
        label: 'Continuous scan',
        duration: 1620,
        logs: [
          { text: 'CIS v8, PCI DSS 4.0 and the company baseline evaluated', tone: 'info' },
          { text: '76,632 individual checks executed across every in-scope system', tone: 'info' },
          { text: '0 systems unreachable', tone: 'ok' },
        ],
      },
      {
        id: 'rank',
        label: 'Rank findings',
        duration: 96,
        logs: [
          { text: '37 findings ranked by exploitability and blast radius', tone: 'warn' },
          { text: 'Password policy non-compliant on 41 systems', tone: 'warn' },
          { text: 'Audit logging incomplete on 22 systems', tone: 'warn' },
          { text: 'Copilot grouped the 37 findings into 9 remediation workflows', tone: 'ai' },
        ],
      },
      {
        id: 'remediate',
        label: 'Remediate',
        duration: 8400,
        logs: [
          { text: 'Workflow 1 of 9 approved — password policy across 41 systems', tone: 'ok' },
          { text: '33 findings auto-remediated under standard change', tone: 'ok' },
          { text: '4 filed as exceptions with named owners and expiry dates', tone: 'warn' },
        ],
      },
      {
        id: 'evidence',
        label: 'Evidence to GRC',
        duration: 42,
        logs: [
          { text: 'Signed evidence package generated with per-check timestamps', tone: 'ok' },
          { text: 'Delivered to GRC in the assessor’s own template', tone: 'ok' },
          { text: 'Posture: SQL Server 99.1% · Oracle 97.6% · Middleware 96.2%', tone: 'ok' },
        ],
      },
    ],
    metrics: [
      { label: 'Open findings', from: '37', to: '4 accepted' },
      { label: 'SQL Server posture', from: '87.4%', to: '99.1%' },
      { label: 'Evidence preparation', from: '6 weeks', to: '1 day' },
      { label: 'Checks executed', from: '0', to: '76,632' },
    ],
  },
];
