import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon } from '@/components/primitives';
import { CtaBand, IntegrationGrid, TechMatrix } from '@/components/marketing/sections';
import {
  integrations,
  integrationCategories,
  totalTechnologies,
} from '@/content/technologies';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function IntegrationsPage() {
  return (
    <PageShell
      current="/integrations"
      breadcrumbs={[{ label: 'Integrations', href: '/integrations' }]}
    >
      <PageIntro
        eyebrow="Integrations"
        title={
          <>
            Works with the stack{' '}
            <span className="text-gradient">you already operate</span>
          </>
        }
        lede="Infrapilot orchestrates your existing tooling rather than replacing it. Change records stay in ServiceNow, secrets stay in your vault, pipelines stay in your CI — and every one of them gains dependency awareness and an audit trail."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Read the API docs', href: '/api' }}
        stats={[
          { value: '180+', label: 'Certified connectors' },
          { value: `${totalTechnologies}`, label: 'Managed technologies' },
          { value: '0', label: 'Agents required for discovery' },
          { value: 'REST', label: 'Everything available over API' },
        ]}
      />

      <Section size="sm" tightTop>
        <SectionHead
          eyebrow="Certified"
          title="The connectors most enterprises start with"
          lede="Certified means tested against each vendor’s supported versions on every release, with a named owner and a documented deprecation policy."
        />
        <div style={{ marginTop: 'var(--space-10)' }}>
          <IntegrationGrid items={integrations.filter((i) => i.featured)} />
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="Full catalogue"
          title="Every connector, by category"
          actions={
            <div className="chip-row">
              {integrationCategories.map((category) => (
                <span key={category} className="chip">
                  {category}
                </span>
              ))}
            </div>
          }
        />
        <div style={{ marginTop: 'var(--space-10)' }}>
          <IntegrationGrid items={integrations} />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Managed technologies"
          title={`${totalTechnologies} platforms under one lifecycle`}
          lede="Connectors integrate with the systems around your estate. These are the technologies Infrapilot operates directly."
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <TechMatrix />
        </div>
      </Section>

      <Section tone="inset" size="sm">
        <div className="split">
          <div className="split__copy" data-reveal="left">
            <span className="eyebrow">Extend it</span>
            <h2 className="split__title">
              If a connector does not exist, the SDK is the same one we use
            </h2>
            <p className="split__body">
              Connectors are plugins built against a public SDK — the certified set is
              written with exactly the same interfaces available to you. A custom
              connector inherits credential brokering, retry semantics, audit capture
              and policy evaluation without implementing any of them.
            </p>
            <ul className="feature-list">
              {[
                'TypeScript and Python SDKs with typed connector interfaces',
                'Local test harness with a recorded-fixture replay mode',
                'Signed connector packages with version pinning per environment',
                'Certification programme for connectors you want us to maintain',
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
                <span className="code-block__name">connectors/acme-cmdb/index.ts</span>
                <span className="code-block__name">TypeScript</span>
              </div>
              <pre className="code-block__body">
                <code>{`import { defineConnector, type SyncContext } from '@infrapilot/sdk';

export default defineConnector({
  id: 'acme-cmdb',
  version: '1.4.0',
  capabilities: ['inventory.read', 'ci.write'],

  // Credentials are injected per execution and revoked on completion.
  // The connector never sees a long-lived secret.
  async sync(ctx: SyncContext) {
    const page = await ctx.http.get('/api/v2/configuration-items', {
      query: { updatedSince: ctx.cursor },
    });

    for (const item of page.items) {
      await ctx.upsertAsset({
        externalId: item.sys_id,
        kind: item.ci_class,
        attributes: item.attributes,
        evidence: ctx.evidence('acme-cmdb', item.sys_id),
      });
    }

    return { cursor: page.nextCursor };
  },
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Missing something?"
          title="Tell us what you need to connect"
          body="Connector requests from customers on an active agreement are prioritised in the quarterly roadmap, and we will confirm a target release before you sign."
          primary={{ label: 'Contact sales', href: '/contact-sales' }}
          secondary={{ label: 'Read the API docs', href: '/api' }}
        />
      </Section>
    </PageShell>
  );
}
