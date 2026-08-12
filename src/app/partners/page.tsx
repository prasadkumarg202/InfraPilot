import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge } from '@/components/primitives';
import { CtaBand, FeatureGrid } from '@/components/marketing/sections';
import { partnerTypes } from '@/content/company';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function PartnersPage() {
  return (
    <PageShell current="/partners" breadcrumbs={[{ label: 'Partners', href: '/partners' }]}>
      <PageIntro
        eyebrow="Partners"
        title={
          <>
            Delivered by teams who{' '}
            <span className="text-gradient">already know your estate</span>
          </>
        }
        lede="Most large deployments involve a delivery partner. Ours are accredited on the same curriculum our own field engineers complete, and are measured on customer outcomes rather than licence volume."
        primary={{ label: 'Become a partner', href: '/contact-sales' }}
        secondary={{ label: 'Find a partner', href: '/contact-sales' }}
        stats={[
          { value: '34', label: 'Accredited delivery partners' },
          { value: '4', label: 'Partner programme tiers' },
          { value: '180+', label: 'Certified integrations' },
          { value: '11', label: 'Countries with local delivery' },
        ]}
      />

      <Section size="sm" tightTop>
        <div className="partner-grid">
          {partnerTypes.map((partner) => (
            <article key={partner.title} className="partner-card" data-reveal>
              <span className="icon-plate icon-plate--lg">
                <Icon name={partner.icon} size={22} />
              </span>
              <h2 className="partner-card__title">{partner.title}</h2>
              <p className="partner-card__body">{partner.body}</p>
              <div className="partner-card__names">
                {partner.names.map((name) => (
                  <Badge key={name} tone="outline">{name}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="Programme"
          title="What accreditation involves"
          lede="Partners deploying into customer production environments complete the same technical curriculum and assessment as our own field engineering team."
        />
        <FeatureGrid
          columns={3}
          items={[
            { icon: 'book', title: 'Technical curriculum', body: 'Forty hours covering deployment architecture, policy design, workflow authoring and incident handling, with a practical assessment against a reference estate.' },
            { icon: 'shieldCheck', title: 'Delivery standards', body: 'Accredited partners follow the same deployment runbooks we do, including the security review gates that precede any production connection.' },
            { icon: 'chartBar', title: 'Measured on outcomes', body: 'Tier progression is driven by customer-reported outcomes and deployment health, not by licence resale volume.' },
          ]}
        />
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Partner with us"
          title="Apply to the partner programme"
          body="Tell us about the customers you serve and the practice you run. Applications are reviewed monthly and we are deliberately selective about delivery capacity."
          primary={{ label: 'Apply', href: '/contact-sales' }}
          secondary={{ label: 'Contact sales', href: '/contact-sales' }}
        />
      </Section>
    </PageShell>
  );
}
