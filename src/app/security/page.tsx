import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge, Alert } from '@/components/primitives';
import { CtaBand, FeatureGrid } from '@/components/marketing/sections';
import { ArchitectureDiagram } from '@/components/visualizations/ArchitectureDiagram';
import { Accordion } from '@/components/marketing/Accordion';
import { Island } from '@/lib/islands';
import { faqSchema, toNextMetadata } from '@/lib/seo';
import { securityFaq } from '@/content/faq';
import { meta } from './meta';

const CERTIFICATIONS = [
  { name: 'SOC 2 Type II', detail: 'Security, Availability, Confidentiality · audited annually', status: 'Current' },
  { name: 'ISO/IEC 27001:2022', detail: 'Information security management system', status: 'Current' },
  { name: 'ISO/IEC 27017', detail: 'Cloud services security controls', status: 'Current' },
  { name: 'ISO/IEC 27018', detail: 'Protection of personally identifiable information', status: 'Current' },
  { name: 'FedRAMP Moderate', detail: 'Agency sponsorship secured · assessment under way', status: 'In process' },
  { name: 'HIPAA', detail: 'Business associate agreement available', status: 'Supported' },
  { name: 'GDPR', detail: 'EU representative appointed · SCCs in place', status: 'Compliant' },
  { name: 'TISAX', detail: 'Automotive information security assessment', status: 'Level 3' },
];

export const metadata = toNextMetadata(meta);

export default function SecurityPage() {
  return (
    <PageShell
      current="/security"
      breadcrumbs={[{ label: 'Security', href: '/security' }]}
    >
      <PageIntro
        eyebrow="Trust centre"
        title={
          <>
            A platform with production access{' '}
            <span className="text-gradient">has to earn it</span>
          </>
        }
        lede="Infrapilot executes change against your most sensitive systems. That privilege is constrained by design: no stored credentials, no inbound network access, no customer data in model training, and an audit record that cannot be quietly edited."
        primary={{ label: 'Request the security pack', href: '/contact-sales' }}
        secondary={{ label: 'Read the architecture', href: '#architecture' }}
        stats={[
          { value: '0', label: 'Credentials stored at rest' },
          { value: '0', label: 'Inbound firewall rules required' },
          { value: '15 min', label: 'Maximum credential lease' },
          { value: '7 days', label: 'Critical vulnerability remediation SLA' },
        ]}
      />

      <Section size="sm" tightTop>
        <SectionHead
          eyebrow="Certifications"
          title="Independently assessed, continuously"
          lede="Reports, bridge letters and the current penetration test summary are available under NDA through your account team or the trust portal."
        />
        <div className="cert-grid">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="cert-card" data-reveal>
              <span className="cert-card__icon">
                <Icon name="shieldCheck" size={18} />
              </span>
              <div>
                <h3 className="cert-card__name">{cert.name}</h3>
                <p className="cert-card__detail">{cert.detail}</p>
              </div>
              <Badge tone="success" dot>
                {cert.status}
              </Badge>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="Control model"
          title="Four properties that make production access defensible"
          lede="Each of these is a design constraint rather than a configuration option — they cannot be switched off, on any plan."
        />
        <FeatureGrid
          columns={4}
          items={[
            {
              icon: 'key',
              title: 'Zero standing privilege',
              body: 'No account the platform holds has standing access to your estate. Every credential is brokered from your vault at step start with a bounded lease, and revoked at step completion.',
            },
            {
              icon: 'shieldCheck',
              title: 'Policy before execution',
              body: 'Guardrails are evaluated ahead of every step, not audited afterwards. A change that violates policy never reaches a host, and the denial explains which rule stopped it.',
            },
            {
              icon: 'book',
              title: 'Tamper-evident audit',
              body: 'Records are append-only and cryptographically chained. Altering or removing an entry breaks the chain and is detectable on verification, including by you.',
            },
            {
              icon: 'lock',
              title: 'Least-privilege by construction',
              body: 'Runners request only the specific capability a step needs. A patching workflow cannot read application data; a discovery scan cannot write configuration.',
            },
          ]}
        />
      </Section>

      <Section id="architecture">
        <SectionHead
          eyebrow="Deployment architecture"
          title="What crosses the boundary, and what never does"
          lede="Self-hosted keeps everything inside your network. Dedicated cloud runs a single-tenant control plane in your chosen region, with runners still inside your perimeter."
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <ArchitectureDiagram />
        </div>
        <div style={{ marginTop: 'var(--space-8)', maxWidth: '56rem' }}>
          <Alert tone="info" title="Runners connect outbound only">
            There is no inbound path from the control plane into your estate. Runners
            poll for signed job manifests over an outbound gRPC channel, which means
            no firewall exception, no VPN and no publicly reachable management
            interface is introduced by deploying Infrapilot.
          </Alert>
        </div>
      </Section>

      <Section tone="inset">
        <div className="split">
          <div className="split__copy" data-reveal="left">
            <span className="eyebrow">Data handling</span>
            <h2 className="split__title">What we hold, for how long, and where</h2>
            <p className="split__body">
              Infrapilot is an operations platform, not a data platform. The
              information it retains is metadata about your estate and the actions
              taken against it — not the contents of your databases, files or
              messages.
            </p>
            <ul className="feature-list">
              {[
                'Configuration and topology metadata, retained for the life of the agreement',
                'Execution records and audit entries, retained per your plan’s policy',
                'Diagnostic evidence collected during incidents, retained 90 days by default',
                'No table contents, file payloads or message bodies are read or stored',
                'Regional data residency in EU, US, UK, Australia, Canada, Japan and Singapore',
              ].map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="split__visual" data-reveal="right">
            <div className="viz-frame ticked">
              <div className="viz-frame__head">
                <span>Audit ledger · verification</span>
                <Badge tone="success" dot>
                  Chain intact
                </Badge>
              </div>
              <div className="code-block" style={{ border: 'none', borderRadius: 0 }}>
                <pre className="code-block__body">
                  <code>{`$ infrapilot audit verify --from 2026-07-01 --to 2026-08-01

Verifying 1,284,402 entries ......................... ok
Recomputing chain digests ........................... ok
Comparing against notarised checkpoints (31) ........ ok

  entries          1,284,402
  first            2026-07-01T00:00:04Z
  last             2026-07-31T23:59:51Z
  root digest      sha256:9f2c41e0…b73a
  checkpoints      31 / 31 matched
  discrepancies    0

Chain verified. No entry has been altered or removed.`}</code>
                </pre>
              </div>
              <div className="viz-frame__foot">
                <span>
                  <Icon name="lock" size={13} />
                  Daily digests notarised externally
                </span>
                <span>
                  <Icon name="code" size={13} />
                  Verifiable by you, over API
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Identity & access"
          title="Fits the identity model you already run"
        />
        <FeatureGrid
          columns={3}
          items={[
            {
              icon: 'users',
              title: 'SSO and SCIM',
              body: 'SAML 2.0 and OIDC with Entra ID, Okta, Ping and Google Workspace. SCIM 2.0 provisioning keeps membership and deprovisioning automatic.',
            },
            {
              icon: 'grid',
              title: 'Fine-grained RBAC',
              body: 'Roles scoped by environment, asset class, region and business unit. Permission to run a workflow is separate from permission to author or approve it.',
            },
            {
              icon: 'eye',
              title: 'Session recording',
              body: 'Interactive sessions initiated through the platform are recorded and attached to the change record, including keystroke-level capture where policy requires it.',
            },
          ]}
        />
      </Section>

      <Section tone="panel">
        <div className="faq-layout">
          <SectionHead
            eyebrow="Security questions"
            title="The questions your security team will ask first"
            lede="If your review requires a completed CAIQ, SIG or bespoke questionnaire, your account team will return it within five working days."
          />
          <Island name="Accordion" props={{ items: securityFaq, idPrefix: 'security', defaultOpen: [0] }}>
            <Accordion items={securityFaq} idPrefix="security" defaultOpen={[0]} />
          </Island>
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Security review"
          title="Start the review before the commercial conversation"
          body="We would rather your security team said no in week one than week twelve. Ask for the security pack — SOC 2 report, penetration test summary, architecture documentation and completed questionnaires."
          primary={{ label: 'Request the security pack', href: '/contact-sales' }}
          secondary={{ label: 'Book demo', href: '/book-demo' }}
        />
      </Section>
    </PageShell>
  );
}
