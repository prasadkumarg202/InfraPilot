import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, Icon, Badge } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { caseStudies } from '@/content/resources';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function CaseStudiesPage() {
  return (
    <PageShell
      current="/case-studies"
      breadcrumbs={[{ label: 'Case studies', href: '/case-studies' }]}
    >
      <PageIntro
        eyebrow="Case studies"
        title={
          <>
            Programmes that shipped,{' '}
            <span className="text-gradient">with the numbers attached</span>
          </>
        }
        lede="Each of these was written with the customer and reviewed by their engineering leadership. Where a figure is a median or a projection, we say so."
        primary={{ label: 'Request a reference call', href: '/contact-sales' }}
        secondary={{ label: 'Book demo', href: '/book-demo' }}
      />

      <Section tightTop>
        <div className="case-stack">
          {caseStudies.map((study) => (
            <article key={study.id} id={study.id} className="case" data-reveal>
              <header className="case__head">
                <div className="case__meta">
                  <Badge tone="accent">{study.industry}</Badge>
                  <span className="case__scope">{study.scope}</span>
                </div>
                <h2 className="case__title">{study.title}</h2>
              </header>

              <div className="case__results">
                {study.results.map((result) => (
                  <div key={result.label} className="case__result">
                    <span className="case__result-value" data-numeric>
                      {result.value}
                    </span>
                    <span className="case__result-label">{result.label}</span>
                  </div>
                ))}
              </div>

              <div className="case__body">
                <section>
                  <h3 className="case__sub">The challenge</h3>
                  <p>{study.challenge}</p>
                </section>
                <section>
                  <h3 className="case__sub">What was done</h3>
                  <p>{study.approach}</p>
                </section>
              </div>

              <figure className="case__quote">
                <blockquote>{study.quote.text}</blockquote>
                <figcaption>
                  <strong>{study.quote.name}</strong>
                  <span>{study.quote.role}</span>
                </figcaption>
              </figure>

              <footer className="case__foot">
                <span>
                  <Icon name="clock" size={13} />
                  {study.timeframe}
                </span>
                <span>
                  <Icon name="grid" size={13} />
                  {study.scope}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Your turn"
          title="What would your case study measure?"
          body="Every proof of concept starts by agreeing what success looks like numerically. Bring the metric you are accountable for and we will design the engagement around proving it."
        />
      </Section>
    </PageShell>
  );
}
