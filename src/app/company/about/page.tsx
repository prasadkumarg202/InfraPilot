import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead } from '@/components/primitives';
import { CtaBand, StatBand } from '@/components/marketing/sections';
import { values } from '@/content/company';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const TIMELINE = [
  { year: '2019', title: 'Founded in Austin', body: 'Started by a platform engineering team who had spent a decade watching change programmes stall on coordination rather than capability.' },
  { year: '2020', title: 'First production deployment', body: 'A regional bank automated SQL Server patching across 2,400 instances. The wave planner and the policy engine both came out of that engagement.' },
  { year: '2022', title: 'Beyond databases', body: 'Operating systems, middleware and cloud added to the managed set after customers made clear that a platform covering half the estate solves half the problem.' },
  { year: '2023', title: 'SOC 2 Type II and ISO 27001', body: 'The certification programme completed, alongside the architectural work to remove standing privilege entirely.' },
  { year: '2024', title: 'The intelligence layer', body: 'Risk prediction, root cause analysis and Copilot shipped — with the constraint, set on day one, that nothing executes without an approval path.' },
  { year: '2025', title: 'Public sector and air-gapped', body: 'The Sovereign deployment model released for disconnected estates, and the FedRAMP Moderate assessment begun with agency sponsorship.' },
  { year: '2026', title: 'Forty enterprise estates', body: 'Now operating in banking, insurance, healthcare, telecommunications, manufacturing, energy and the public sector across four continents.' },
];

export default function AboutPage() {
  return (
    <PageShell
      current="/company"
      breadcrumbs={[
        { label: 'Company', href: '/company' },
        { label: 'About', href: '/company/about' },
      ]}
    >
      <PageIntro
        eyebrow="About"
        title={
          <>
            Estates grew faster than{' '}
            <span className="text-gradient">the ways we run them</span>
          </>
        }
        lede="Every enterprise we work with has more infrastructure than any individual can hold in their head, spread across more platforms than any single team can specialise in. Infrapilot exists because that gap does not close by hiring."
      />

      <Section size="sm" tightTop>
        <div className="prose" style={{ maxWidth: '46rem' }}>
          <p>
            The founding observation was narrow and specific. Across two large banks,
            the elapsed time of an infrastructure change programme correlated almost
            not at all with the technical difficulty of the change. It correlated with
            how many people had to agree on a sequence, and with how confident anyone
            was about what would break.
          </p>
          <p>
            Both of those are information problems. If the dependency graph is accurate
            and continuously maintained, the sequence is derivable rather than
            negotiable. If the guardrails are expressed as code and evaluated before
            execution, the confidence question has an answer that does not depend on
            who is in the room.
          </p>
          <p>
            That is the whole thesis. Everything the platform does — discovery,
            workflow, policy, the intelligence layer — exists to make those two things
            true at a scale where no team could maintain them by hand.
          </p>
          <p>
            We are deliberately unfashionable about one thing. The platform never
            executes a change nobody authorised. Full autonomy is technically within
            reach for a much wider class of change than we permit, and we do not permit
            it, because an organisation that cannot explain why a change happened has
            traded a coordination problem for an accountability one.
          </p>
        </div>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead eyebrow="Measured" title="What the platform has delivered" />
        <StatBand />
      </Section>

      <Section>
        <SectionHead eyebrow="History" title="How we got here" />
        <ol className="timeline">
          {TIMELINE.map((entry) => (
            <li key={entry.year} className="timeline__item" data-reveal>
              <span className="timeline__year" data-numeric>{entry.year}</span>
              <div className="timeline__content">
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="inset">
        <SectionHead eyebrow="Principles" title="What we believe" />
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

      <Section size="sm">
        <CtaBand />
      </Section>
    </PageShell>
  );
}
