import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { industries } from '@/content/solutions';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function IndustriesPage() {
  return (
    <PageShell
      current="/industries"
      breadcrumbs={[{ label: 'Industries', href: '/industries' }]}
    >
      <PageIntro
        eyebrow="Industries"
        title={
          <>
            Built for estates where{' '}
            <span className="text-gradient">an outage is a regulatory event</span>
          </>
        }
        lede="Ten sectors, each with its own obligations, windows and inherited complexity. What they share is a change volume that outgrew the operating model built to handle it."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Read case studies', href: '/case-studies' }}
      />

      <Section size="sm" tightTop>
        <CustomerLogos limit={8} label="Regulated estates running on Infrapilot" />
      </Section>

      <Section tightTop>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article
              key={industry.id}
              id={industry.id}
              className="industry-card"
              data-reveal
            >
              <header className="industry-card__head">
                <span className="icon-plate">
                  <Icon name={industry.icon} size={20} />
                </span>
                <h2 className="industry-card__title">{industry.name}</h2>
              </header>

              <p className="industry-card__summary">{industry.summary}</p>

              <div className="industry-card__section">
                <h3>Operating pressure</h3>
                <ul>
                  {industry.pressures.map((pressure) => (
                    <li key={pressure}>
                      <Icon name="alertCircle" size={13} />
                      {pressure}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="industry-card__section">
                <h3>Frameworks covered</h3>
                <div className="industry-card__regs">
                  {industry.regulations.map((regulation) => (
                    <Badge key={regulation} tone="outline">
                      {regulation}
                    </Badge>
                  ))}
                </div>
              </div>

              <footer className="industry-card__foot">
                <span className="industry-card__customer">{industry.customer}</span>
                <span className="industry-card__outcome">{industry.outcome}</span>
              </footer>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead
          align="center"
          eyebrow="Common ground"
          title="The obligations differ. The control model does not."
          lede="Every framework in the list above ultimately asks the same three questions: what do you run, who changed it, and can you prove the change was authorised. Infrapilot answers all three from a single record."
        />
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Sector briefing"
          title="Request the briefing for your sector"
          body="Each includes the control mappings, a reference deployment for that regulatory environment, and the measured results from a comparable estate."
          primary={{ label: 'Contact sales', href: '/contact-sales' }}
          secondary={{ label: 'Book demo', href: '/book-demo' }}
        />
      </Section>
    </PageShell>
  );
}
