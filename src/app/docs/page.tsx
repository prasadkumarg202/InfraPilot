import { PageShell } from '@/components/layout/PageShell';
import { Section, Icon, Badge, ButtonLink } from '@/components/primitives';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const NAV = [
  {
    group: 'Getting started',
    items: [
      { label: 'Overview', href: '#overview', active: true },
      { label: 'Deploy the control plane', href: '#deploy' },
      { label: 'Register a runner', href: '#runner' },
      { label: 'First discovery scan', href: '#discovery' },
      { label: 'Your first workflow', href: '#workflow' },
    ],
  },
  {
    group: 'Core concepts',
    items: [
      { label: 'Assets and the knowledge graph', href: '#assets' },
      { label: 'Workflows and steps', href: '#workflows' },
      { label: 'Policies and guardrails', href: '#policies' },
      { label: 'Approvals and change records', href: '#approvals' },
      { label: 'Credential brokering', href: '#credentials' },
    ],
  },
  {
    group: 'Automation guides',
    items: [
      { label: 'Patch orchestration', href: '#patch' },
      { label: 'Database upgrades', href: '#upgrades' },
      { label: 'Kubernetes lifecycle', href: '#kubernetes' },
      { label: 'Migration factory', href: '#migration' },
      { label: 'Unattended remediation', href: '#healing' },
    ],
  },
  {
    group: 'Operations',
    items: [
      { label: 'High availability', href: '#ha' },
      { label: 'Disaster recovery', href: '#dr' },
      { label: 'Upgrading Infrapilot', href: '#upgrade' },
      { label: 'Observability', href: '#observability' },
    ],
  },
];

const ON_THIS_PAGE = [
  'Before you begin',
  'Deployment models',
  'Install the control plane',
  'Verify the installation',
  'Next steps',
];

export default function DocsPage() {
  return (
    <PageShell
      current="/docs"
      breadcrumbs={[{ label: 'Documentation', href: '/docs' }]}
    >
      <Section container="wide" size="sm">
        <div className="docs">
          {/* ------------------------------------------------------- Sidebar */}
          <aside className="docs__nav" aria-label="Documentation">
            <form className="docs__search" role="search">
              <Icon name="search" size={15} />
              <label className="sr-only" htmlFor="docs-search">
                Search documentation
              </label>
              <input
                id="docs-search"
                type="search"
                placeholder="Search documentation"
                autoComplete="off"
              />
              <kbd className="kbd">/</kbd>
            </form>

            {NAV.map((group) => (
              <div key={group.group} className="docs__nav-group">
                <p className="docs__nav-title">{group.group}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        className={item.active ? 'is-active' : undefined}
                        aria-current={item.active ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* -------------------------------------------------------- Article */}
          <article className="docs__body" id="overview">
            <div className="row row--wrap" style={{ marginBottom: 'var(--space-4)' }}>
              <Badge tone="accent">Getting started</Badge>
              <Badge tone="neutral">Release 2026.8</Badge>
              <span className="article__meta">Updated 1 August 2026</span>
            </div>

            <h1 className="docs__title">Deploy the control plane</h1>
            <p className="docs__lede">
              Infrapilot runs as a self-hosted control plane inside your network or as
              a dedicated single-tenant instance in a region you choose. In both
              models, execution runners live in your perimeter and connect outbound
              only. This guide covers the self-hosted path on Kubernetes.
            </p>

            <div className="prose docs__prose">
              <h2 id="before">Before you begin</h2>
              <p>
                You will need a Kubernetes cluster running 1.28 or later with at
                least twelve vCPU and 48 GB of memory available across three worker
                nodes, a PostgreSQL 15 or later database, and object storage
                compatible with the S3 API for the audit ledger and artefact store.
              </p>
              <ul>
                <li>
                  A namespace you control, with permission to create custom resource
                  definitions
                </li>
                <li>
                  Outbound HTTPS to your secrets broker and to any cloud provider APIs
                  you intend to manage
                </li>
                <li>
                  A TLS certificate for the console hostname, or cert-manager
                  configured in the cluster
                </li>
              </ul>

              <h2 id="deployment-models">Deployment models</h2>
              <p>
                Self-hosted keeps every component inside your network, including model
                inference on the Sovereign plan. Dedicated cloud runs the control
                plane as a single-tenant instance in your chosen region while runners
                remain inside your perimeter. The runner protocol is identical in both
                models, so moving between them does not change your workflows.
              </p>

              <h2 id="install">Install the control plane</h2>
              <p>
                Add the Helm repository and install the chart. The operator reconciles
                the control-plane components, database schema and default policy
                bundle.
              </p>
            </div>

            <div className="code-block">
              <div className="code-block__head">
                <span className="code-block__name">shell</span>
                <span className="code-block__name">copy</span>
              </div>
              <pre className="code-block__body">
                <code>{`helm repo add infrapilot https://charts.infrapilot.io
helm repo update

helm install infrapilot infrapilot/control-plane \\
  --namespace infrapilot --create-namespace \\
  --set global.hostname=infrapilot.internal.example.com \\
  --set postgres.dsn="postgres://infrapilot@db.internal:5432/infrapilot" \\
  --set objectStore.endpoint="https://s3.internal.example.com" \\
  --set objectStore.bucket=infrapilot-ledger \\
  --set licence.key="$AETHERION_LICENCE"`}</code>
              </pre>
            </div>

            <div className="prose docs__prose">
              <h2 id="verify">Verify the installation</h2>
              <p>
                The operator reports readiness once every component has passed its
                health check and the audit ledger has written its genesis entry.
              </p>
            </div>

            <div className="code-block">
              <div className="code-block__head">
                <span className="code-block__name">shell</span>
              </div>
              <pre className="code-block__body">
                <code>{`$ kubectl -n infrapilot get infrapilot/control-plane

NAME            VERSION    PHASE     LEDGER    AGE
control-plane   2026.8.1   Ready     sealed    3m12s

$ infrapilot status
  control plane   Ready      2026.8.1
  database        Connected  PostgreSQL 16.3
  object store    Connected  s3.internal.example.com
  ledger          Sealed     genesis 9f2c41e0…b73a
  runners         0 registered`}</code>
              </pre>
            </div>

            <div className="prose docs__prose">
              <h2 id="next">Next steps</h2>
              <p>
                With the control plane running, the next step is to register a runner
                in each network segment you intend to manage, then run a scoped
                discovery scan to populate the knowledge graph.
              </p>
            </div>

            <nav className="docs__pager" aria-label="Pagination">
              <a href="#overview" className="docs__pager-link">
                <Icon name="arrowLeft" size={15} />
                <span>
                  <em>Previous</em>
                  Overview
                </span>
              </a>
              <a href="#runner" className="docs__pager-link docs__pager-link--next">
                <span>
                  <em>Next</em>
                  Register a runner
                </span>
                <Icon name="arrowRight" size={15} />
              </a>
            </nav>
          </article>

          {/* ------------------------------------------------------ On this page */}
          <aside className="docs__toc" aria-label="On this page">
            <p className="docs__nav-title">On this page</p>
            <ul>
              {ON_THIS_PAGE.map((entry, index) => (
                <li key={entry}>
                  <a href="#overview" className={index === 0 ? 'is-active' : undefined}>
                    {entry}
                  </a>
                </li>
              ))}
            </ul>
            <div className="docs__help">
              <p>Was this page useful?</p>
              <div className="row">
                <button type="button" className="btn btn--secondary btn--xs">
                  Yes
                </button>
                <button type="button" className="btn btn--secondary btn--xs">
                  No
                </button>
              </div>
            </div>
            <ButtonLink href="/api" variant="link" size="sm" iconRight="arrowRight">
              API reference
            </ButtonLink>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}
