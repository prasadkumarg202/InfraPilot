import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, ButtonLink } from '@/components/primitives';
import { CtaBand, Testimonials } from '@/components/marketing/sections';
import { outcomeSolutions, teamSolutions } from '@/content/solutions';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function SolutionsPage() {
  return (
    <PageShell
      current="/solutions"
      breadcrumbs={[{ label: 'Solutions', href: '/solutions' }]}
    >
      <PageIntro
        eyebrow="Solutions"
        title={
          <>
            Start from the outcome,{' '}
            <span className="text-gradient">not the feature list</span>
          </>
        }
        lede="Five problems account for most of what infrastructure organisations are asked to fix this year. Each one has a measured result behind it from a production estate."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'See the modules', href: '/products' }}
      />

      <Section size="sm" tightTop>
        <div className="solution-stack">
          {outcomeSolutions.map((solution, index) => (
            <article
              key={solution.id}
              id={solution.id}
              className="solution"
              data-reveal
            >
              <div className="solution__aside">
                <span className="solution__index" data-numeric>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="icon-plate icon-plate--lg">
                  <Icon name={solution.icon} size={22} />
                </span>
                <div className="solution__proof">
                  <span className="solution__proof-value" data-numeric>
                    {solution.proof.value}
                  </span>
                  <span className="solution__proof-label">{solution.proof.label}</span>
                  <span className="solution__proof-customer">
                    {solution.proof.customer}
                  </span>
                </div>
              </div>

              <div className="solution__body">
                <span className="eyebrow">{solution.eyebrow}</span>
                <h2 className="solution__title">{solution.title}</h2>
                <div className="solution__cols">
                  <div>
                    <h3 className="solution__sub">The problem</h3>
                    <p>{solution.problem}</p>
                  </div>
                  <div>
                    <h3 className="solution__sub">How Infrapilot addresses it</h3>
                    <p>{solution.approach}</p>
                  </div>
                </div>
                <ul className="solution__caps">
                  {solution.capabilities.map((capability) => (
                    <li key={capability}>
                      <Icon name="check" size={13} />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="By team"
          title="What changes for the people doing the work"
          lede="Automation programmes fail when they are designed for the org chart rather than for the person holding the pager."
        />
        <div className="team-grid">
          {teamSolutions.map((team) => (
            <article key={team.id} id={team.id} className="team-card" data-reveal>
              <span className="icon-plate">
                <Icon name={team.icon} size={20} />
              </span>
              <h3 className="team-card__title">{team.team}</h3>
              <div className="team-card__row">
                <span className="team-card__tag is-before">Today</span>
                <p>{team.pain}</p>
              </div>
              <div className="team-card__row">
                <span className="team-card__tag is-after">With Infrapilot</span>
                <p>{team.gain}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="By industry"
          title="Sector-specific pressure, same operating model"
          lede="Regulatory obligations differ. The underlying problem — change at a scale no team can coordinate manually — does not."
          actions={
            <ButtonLink href="/industries" variant="outline" iconRight="arrowRight">
              Explore industries
            </ButtonLink>
          }
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Testimonials limit={3} />
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Scope it"
          title="Which of these is on your plan this year?"
          body="Bring the objective and the constraint. We will map it to a deployment shape, a timeline and a measurable target before you commit to anything."
        />
      </Section>
    </PageShell>
  );
}
