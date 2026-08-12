import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { leadership } from '@/content/company';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function LeadershipPage() {
  return (
    <PageShell
      current="/company"
      breadcrumbs={[
        { label: 'Company', href: '/company' },
        { label: 'Leadership', href: '/company/leadership' },
      ]}
    >
      <PageIntro
        eyebrow="Leadership"
        title={
          <>
            People who have{' '}
            <span className="text-gradient">run estates like yours</span>
          </>
        }
        lede="Most of the leadership team spent their previous careers on the customer side of this problem — in banks, telcos and payments networks where an unplanned outage was a reportable event."
      />

      <Section size="sm" tightTop>
        <div className="leader-grid">
          {leadership.map((leader) => (
            <article key={leader.name} className="leader-card" data-reveal>
              <span className="leader-card__avatar" aria-hidden="true">{leader.initials}</span>
              <h2 className="leader-card__name">{leader.name}</h2>
              <p className="leader-card__role">{leader.role}</p>
              <p className="leader-card__bio">{leader.bio}</p>
              <span className="leader-card__prior">{leader.prior}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead
          align="center"
          eyebrow="Governance"
          title="How decisions get made"
          lede="Security and product-safety decisions sit with an internal change advisory board chaired by the CISO, with a standing right of veto over any release that weakens a control property. Commercial pressure does not override it."
        />
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Talk to us"
          title="Executive briefings"
          body="For organisations in an active evaluation, we run a two-hour executive briefing covering architecture, security posture, deployment model and the measurement plan for a proof of concept."
          primary={{ label: 'Request a briefing', href: '/contact-sales' }}
          secondary={{ label: 'Book demo', href: '/book-demo' }}
        />
      </Section>
    </PageShell>
  );
}
