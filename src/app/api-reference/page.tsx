import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge } from '@/components/primitives';
import { CtaBand, FeatureGrid } from '@/components/marketing/sections';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const ENDPOINTS = [
  { method: 'GET', path: '/v1/assets', desc: 'List and filter discovered assets', scope: 'assets:read' },
  { method: 'GET', path: '/v1/assets/{id}/dependencies', desc: 'Resolved dependency graph for an asset', scope: 'assets:read' },
  { method: 'POST', path: '/v1/runs', desc: 'Start a workflow run', scope: 'runs:write' },
  { method: 'GET', path: '/v1/runs/{id}', desc: 'Run status, step results and timings', scope: 'runs:read' },
  { method: 'POST', path: '/v1/runs/{id}/approve', desc: 'Record an approval decision', scope: 'runs:approve' },
  { method: 'POST', path: '/v1/policies/evaluate', desc: 'Dry-run a policy against a proposed change', scope: 'policies:read' },
  { method: 'GET', path: '/v1/compliance/controls', desc: 'Control results across in-scope systems', scope: 'compliance:read' },
  { method: 'GET', path: '/v1/audit/entries', desc: 'Query the append-only audit ledger', scope: 'audit:read' },
];

const WEBHOOKS = [
  'run.started',
  'run.step.completed',
  'run.gate.failed',
  'run.completed',
  'run.rolled_back',
  'approval.requested',
  'approval.granted',
  'policy.denied',
  'asset.discovered',
  'asset.drifted',
  'compliance.control.failed',
  'incident.remediated',
];

export default function ApiPage() {
  return (
    <PageShell current="/api" breadcrumbs={[{ label: 'API', href: '/api' }]}>
      <PageIntro
        eyebrow="API platform"
        title={
          <>
            Everything the console does,{' '}
            <span className="text-gradient">available over the wire</span>
          </>
        }
        lede="The Infrapilot console is built entirely on the public API. There is no private surface, no reserved capability and no functionality that requires a person clicking a button."
        primary={{ label: 'Read the docs', href: '/docs' }}
        secondary={{ label: 'Book demo', href: '/book-demo' }}
        stats={[
          { value: 'REST', label: 'JSON over HTTPS, OpenAPI 3.1' },
          { value: '12', label: 'Webhook event types' },
          { value: '4', label: 'Officially maintained SDKs' },
          { value: '99.98%', label: 'API availability, rolling 90 days' },
        ]}
      />

      <Section size="sm" tightTop>
        <div className="split">
          <div className="split__copy" data-reveal="left">
            <span className="eyebrow">Quick start</span>
            <h2 className="split__title">Start a governed run in six lines</h2>
            <p className="split__body">
              Authentication uses short-lived tokens issued to a service identity.
              Policy is evaluated on the server, so a run started over the API is
              subject to exactly the same guardrails and approval routing as one
              started in the console.
            </p>
            <ul className="feature-list">
              {[
                'OpenAPI 3.1 specification, published per release',
                'Cursor pagination with stable ordering on every collection',
                'Idempotency keys on all mutating requests',
                'Per-identity rate limits surfaced in response headers',
                'Typed SDKs for TypeScript, Python, Go and .NET',
              ].map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="split__visual" data-reveal="right">
            <div className="code-block">
              <div className="code-block__head">
                <span className="code-block__name">start-patch-run.ts</span>
                <Badge tone="neutral">TypeScript</Badge>
              </div>
              <pre className="code-block__body">
                <code>{`import { Infrapilot } from '@infrapilot/sdk';

const client = new Infrapilot({ token: process.env.AETHERION_TOKEN });

// Policy is evaluated server-side before the run is admitted.
// A denial returns 409 with the specific rule that blocked it.
const run = await client.runs.create({
  workflow: 'sql-server-cu-rollup',
  scope: { assetClass: 'database', engine: 'sqlserver', region: 'emea' },
  window: 'CW-2841',
  parameters: { maxConcurrency: 24, haltOnFailure: true },
});

for await (const event of client.runs.stream(run.id)) {
  console.log(event.step, event.status, event.durationMs);
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="Endpoints"
          title="The surface most integrations use"
          lede="A representative selection. The full reference lists 214 operations across eleven resource families."
        />
        <div className="table-wrap" style={{ marginTop: 'var(--space-8)' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Path</th>
                <th scope="col">Description</th>
                <th scope="col">Required scope</th>
              </tr>
            </thead>
            <tbody>
              {ENDPOINTS.map((endpoint) => (
                <tr key={endpoint.path + endpoint.method}>
                  <td>
                    <span className={`method method--${endpoint.method.toLowerCase()}`}>
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="table__cell--primary text-mono">{endpoint.path}</td>
                  <td>{endpoint.desc}</td>
                  <td className="text-mono">{endpoint.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Events"
          title="Push, don’t poll"
          lede="Webhooks are signed with a rotating secret and delivered at least once with exponential backoff. The same events are available as a stream for systems that prefer to pull."
        />
        <div className="chip-row" style={{ marginTop: 'var(--space-8)' }}>
          {WEBHOOKS.map((event) => (
            <span key={event} className="chip text-mono">
              {event}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-12)' }}>
          <FeatureGrid
            columns={3}
            items={[
              {
                icon: 'shieldCheck',
                title: 'Signed delivery',
                body: 'Every payload carries an HMAC signature and a timestamp. Replay windows are configurable, and the signing secret rotates without downtime.',
              },
              {
                icon: 'refresh',
                title: 'At-least-once with backoff',
                body: 'Failed deliveries retry for 24 hours with exponential backoff. Undelivered events remain queryable so nothing is silently lost.',
              },
              {
                icon: 'activity',
                title: 'Streaming alternative',
                body: 'The same event stream is available over server-sent events and as a Kafka topic for organisations that prefer to pull into their own bus.',
              },
            ]}
          />
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Build on it"
          title="Get sandbox credentials"
          body="A sandbox tenant with a synthetic estate of 500 assets, full API access and no time limit. Useful for evaluating the integration surface before any commercial conversation."
          primary={{ label: 'Request sandbox access', href: '/contact-sales' }}
          secondary={{ label: 'Read the docs', href: '/docs' }}
        />
      </Section>
    </PageShell>
  );
}
