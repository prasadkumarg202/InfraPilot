import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, ButtonLink } from '@/components/primitives';
import { CtaBand, StatBand, Testimonials } from '@/components/marketing/sections';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { customers } from '@/content/customers';
import { caseStudies } from '@/content/resources';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function CustomersPage() {
  return (
    <PageShell
      current="/customers"
      breadcrumbs={[{ label: 'Customers', href: '/customers' }]}
    >
      <PageIntro
        eyebrow="Customers"
        title={
          <>
            Estates where{' '}
            <span className="text-gradient">the change window is the constraint</span>
          </>
        }
        lede="Infrapilot runs in organisations where infrastructure change is measured in tens of thousands of assets, reviewed by regulators, and visible to millions of people when it goes wrong."
        primary={{ label: 'Read case studies', href: '/case-studies' }}
        secondary={{ label: 'Book demo', href: '/book-demo' }}
      />

      <Section size="sm" tightTop>
        <StatBand />
      </Section>

      <Section tone="panel" size="sm">
        <CustomerLogos limit={12} label="Selected customers" />
      </Section>

      <Section>
        <SectionHead
          eyebrow="By the estate"
          title="Who runs Infrapilot, and at what scale"
        />
        <div className="customer-grid">
          {customers.map((customer) => (
            <article key={customer.id} className="customer-card" data-reveal>
              <span className="customer-card__sector">{customer.sector}</span>
              <h3 className="customer-card__name">{customer.name}</h3>
              <p className="customer-card__estate" data-numeric>
                {customer.estate}
              </p>
              {customer.headline && (
                <p className="customer-card__headline">
                  <Icon name="trendingUp" size={14} />
                  {customer.headline}
                </p>
              )}
              <span className="customer-card__region">{customer.region}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="inset">
        <SectionHead
          eyebrow="Case studies"
          title="Three programmes in detail"
          lede="Written with the customer, reviewed by their engineering leadership, and published with the measurement methodology intact."
          actions={
            <ButtonLink href="/case-studies" variant="outline" iconRight="arrowRight">
              All case studies
            </ButtonLink>
          }
        />
        <div className="case-teasers">
          {caseStudies.map((study) => (
            <a
              key={study.id}
              className="case-teaser"
              href={`/case-studies#${study.id}`}
              data-reveal
            >
              <span className="case-teaser__industry">{study.industry}</span>
              <h3 className="case-teaser__title">{study.title}</h3>
              <div className="case-teaser__results">
                {study.results.slice(0, 2).map((result) => (
                  <span key={result.label}>
                    <strong data-numeric>{result.value}</strong>
                    {result.label}
                  </span>
                ))}
              </div>
              <span className="case-teaser__cta">
                Read the case study
                <Icon name="arrowRight" size={14} />
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="In their words" title="What changed for the team" />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Testimonials limit={6} />
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Reference calls"
          title="Talk to someone who has already done this"
          body="We will introduce you to a customer in your sector, at a comparable scale, who deployed within the last eighteen months — with no account team on the call."
          primary={{ label: 'Request a reference', href: '/contact-sales' }}
          secondary={{ label: 'Book demo', href: '/book-demo' }}
        />
      </Section>
    </PageShell>
  );
}
