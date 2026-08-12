import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge, Alert } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { resources } from '@/content/resources';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const STATUS_COMPONENTS = [
  { name: 'Control plane · EU', status: 'operational', uptime: '99.99%' },
  { name: 'Control plane · US', status: 'operational', uptime: '99.99%' },
  { name: 'Control plane · APAC', status: 'operational', uptime: '100%' },
  { name: 'API', status: 'operational', uptime: '99.98%' },
  { name: 'Copilot inference', status: 'operational', uptime: '99.95%' },
  { name: 'Connector registry', status: 'operational', uptime: '100%' },
];

const CHANGELOG = [
  {
    version: '2026.8',
    date: '1 August 2026',
    items: [
      'Copilot now authors and validates rollback plans alongside forward runbooks',
      'Wave planner accounts for cross-region replication lag when sequencing',
      'Audit ledger export to Splunk and Microsoft Sentinel',
    ],
  },
  {
    version: '2026.7',
    date: '3 July 2026',
    items: [
      'OpenTofu support alongside Terraform for generated infrastructure code',
      'Policy simulation — evaluate a policy change against the last 90 days of runs',
      'Kubernetes add-on lifecycle management for EKS, AKS, GKE and OpenShift',
    ],
  },
  {
    version: '2026.6',
    date: '5 June 2026',
    items: [
      'SAP HANA and Sybase ASE added to the managed database set',
      'Risk model retraining moved to nightly, per tenant',
      'Approval engine supports delegated and time-bounded pre-authorisation',
    ],
  },
];

export default function ResourcesPage() {
  return (
    <PageShell
      current="/resources"
      breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
    >
      <PageIntro
        eyebrow="Resources"
        title={
          <>
            Everything we know,{' '}
            <span className="text-gradient">without a registration wall</span>
          </>
        }
        lede="Reference architectures, regulatory mappings, operating-cost research and the templates we use with customers. Download what is useful; talk to us if it is."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Read the docs', href: '/docs' }}
      />

      <Section size="sm" tightTop>
        <div className="resource-grid">
          {resources.map((resource) => (
            <a key={resource.title} className="resource-card" href={resource.href} data-reveal>
              <Badge tone="violet">{resource.kind}</Badge>
              <h2 className="resource-card__title">{resource.title}</h2>
              <p className="resource-card__desc">{resource.description}</p>
              <div className="resource-card__foot">
                <span className="article__meta">{resource.meta}</span>
                <Icon name="arrowRight" size={15} />
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="panel" id="status">
        <div className="split">
          <div className="split__copy" data-reveal="left">
            <span className="eyebrow">Status</span>
            <h2 className="split__title">Platform status</h2>
            <p className="split__body">
              Live component status and rolling 90-day availability. Incident
              history, post-incident reviews and the RSS feed are published without
              authentication.
            </p>
            <Alert tone="success" title="All systems operational">
              No incidents affecting customer environments in the last 90 days. The
              most recent post-incident review was published on 12 April 2026.
            </Alert>
          </div>
          <div className="split__visual" data-reveal="right">
            <div className="viz-frame ticked">
              <div className="viz-frame__head">
                <span>Component status</span>
                <Badge tone="success" live>
                  Operational
                </Badge>
              </div>
              <ul className="status-list">
                {STATUS_COMPONENTS.map((component) => (
                  <li key={component.name}>
                    <span className="status-list__dot" />
                    <span className="status-list__name">{component.name}</span>
                    <span className="status-list__uptime" data-numeric>
                      {component.uptime}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="viz-frame__foot">
                <span>
                  <Icon name="clock" size={13} />
                  Rolling 90-day availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="changelog">
        <SectionHead
          eyebrow="Changelog"
          title="What shipped, monthly"
          lede="Infrapilot ships on a monthly release train. Customers on self-hosted deployments receive the same release with a 30-day soak window."
        />
        <div className="changelog">
          {CHANGELOG.map((release) => (
            <article key={release.version} className="changelog__entry" data-reveal>
              <div className="changelog__aside">
                <span className="changelog__version" data-numeric>
                  {release.version}
                </span>
                <span className="changelog__date">{release.date}</span>
              </div>
              <ul className="changelog__items">
                {release.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="inset" size="sm" id="support">
        <SectionHead
          align="center"
          eyebrow="Support"
          title="How to reach an engineer"
          lede="Enterprise and Sovereign customers have a 24×7 channel with a 30-minute P1 response and a named customer architect who knows your deployment."
        />
        <div className="assurance-grid">
          {[
            { icon: 'lifebuoy' as const, title: 'Support portal', body: 'Raise and track cases, view your entitlement, and reach your named architect.' },
            { icon: 'book' as const, title: 'Documentation', body: 'Guides, references, runbook library and migration playbooks, versioned per release.' },
            { icon: 'users' as const, title: 'Community', body: 'A moderated forum where customer platform teams share workflows and policy patterns.' },
            { icon: 'phone' as const, title: 'Emergency line', body: 'A direct number for active P1 incidents, staffed by engineers rather than a triage desk.' },
          ].map((item) => (
            <div key={item.title} className="assurance" data-reveal>
              <span className="icon-plate icon-plate--sm">
                <Icon name={item.icon} size={16} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section size="sm">
        <CtaBand />
      </Section>
    </PageShell>
  );
}
