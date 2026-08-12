import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, ButtonLink } from '@/components/primitives';
import { CtaBand, FeatureGrid } from '@/components/marketing/sections';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { values } from '@/content/company';
import { site } from '@/content/site.config';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function CompanyPage() {
  return (
    <PageShell current="/company" breadcrumbs={[{ label: 'Company', href: '/company' }]}>
      <PageIntro
        eyebrow="Company"
        title={
          <>
            We build the control plane for{' '}
            <span className="text-gradient">infrastructure that runs itself</span>
          </>
        }
        lede={site.mission}
        primary={{ label: 'See open roles', href: '/company/careers' }}
        secondary={{ label: 'Meet the leadership', href: '/company/leadership' }}
        stats={[
          { value: String(site.founded), label: 'Founded' },
          { value: '340', label: 'People across four regions' },
          { value: '40+', label: 'Enterprise deployments' },
          { value: '4', label: 'Engineering locations' },
        ]}
      />

      <Section size="sm" tightTop>
        <CustomerLogos limit={8} label="Trusted with production change at" />
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="What we believe"
          title="Four positions that shape the product"
          lede="These are not aspirations on a wall. Each one has cost us something — a feature we did not ship, a deal we did not close, a shortcut we did not take."
        />
        <div className="value-grid">
          {values.map((value, index) => (
            <article key={value.title} className="value-card" data-reveal>
              <span className="value-card__index" data-numeric>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="value-card__title">{value.title}</h3>
              <p className="value-card__body">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Explore" title="More about Infrapilot" />
        <FeatureGrid
          columns={4}
          items={[
            { icon: 'compass', title: 'About', body: 'Why the company exists, and the problem we set out to solve.', href: '/company/about' },
            { icon: 'users', title: 'Leadership', body: 'The people accountable for the product, the security programme and the field.', href: '/company/leadership' },
            { icon: 'briefcase', title: 'Careers', body: 'Nine open roles across platform, automation, intelligence and field engineering.', href: '/company/careers' },
            { icon: 'calendar', title: 'Events', body: 'Summits, webinars, roundtables and hands-on workshops.', href: '/company/events' },
          ]}
        />
      </Section>

      <Section tone="inset" size="sm">
        <div className="office-grid">
          {[
            { city: 'Austin', role: 'Headquarters', detail: site.address.street },
            { city: 'Dublin', role: 'EMEA engineering', detail: 'Grand Canal Dock' },
            { city: 'Bengaluru', role: 'Platform engineering', detail: 'Embassy Tech Village' },
            { city: 'Singapore', role: 'APAC field & support', detail: 'Marina Bay' },
          ].map((office) => (
            <div key={office.city} className="office-card" data-reveal>
              <Icon name="map" size={18} />
              <h3>{office.city}</h3>
              <p>{office.role}</p>
              <span>{office.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Work with us"
          title="Talk to the team"
          body="Whether that is a proof of concept, a partnership conversation or an application for one of our open roles."
          primary={{ label: 'Contact sales', href: '/contact-sales' }}
          secondary={{ label: 'See open roles', href: '/company/careers' }}
        />
      </Section>
    </PageShell>
  );
}
