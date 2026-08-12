import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge } from '@/components/primitives';
import { CtaBand, FeatureGrid } from '@/components/marketing/sections';
import { openRoles } from '@/content/company';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function CareersPage() {
  const teams = Array.from(new Set(openRoles.map((r) => r.team)));
  return (
    <PageShell
      current="/company"
      breadcrumbs={[
        { label: 'Company', href: '/company' },
        { label: 'Careers', href: '/company/careers' },
      ]}
    >
      <PageIntro
        eyebrow="Careers"
        title={
          <>
            Build software that runs{' '}
            <span className="text-gradient">other people's production</span>
          </>
        }
        lede="It is a demanding constraint and the reason the work is interesting. Every design decision has to hold up when it is executing against twenty thousand instances at two in the morning."
        primary={{ label: 'See open roles', href: '#roles' }}
        secondary={{ label: 'Read about the company', href: '/company/about' }}
        stats={[
          { value: '9', label: 'Open roles' },
          { value: '340', label: 'People today' },
          { value: '4', label: 'Engineering locations' },
          { value: '62%', label: 'Engineering as share of headcount' },
        ]}
      />

      <Section size="sm" tightTop>
        <SectionHead eyebrow="How we work" title="What to expect" />
        <FeatureGrid
          columns={3}
          items={[
            { icon: 'workflow', title: 'Small teams, wide ownership', body: 'Teams of four to seven own a capability end to end, including its reliability, its documentation and its on-call rotation.' },
            { icon: 'globe', title: 'Remote by construction', body: 'Written-first communication, recorded decisions, and meeting-light weeks. Four hub offices exist for people who prefer them, not as a requirement.' },
            { icon: 'shieldCheck', title: 'Real production stakes', body: 'Every engineer spends time with customer platform teams. It is difficult to design a safe abstraction for work you have never watched someone do.' },
          ]}
        />
      </Section>

      <Section tone="panel" id="roles">
        <SectionHead
          eyebrow="Open roles"
          title="Where we are hiring"
          actions={
            <div className="chip-row">
              {teams.map((team) => (
                <span key={team} className="chip">{team}</span>
              ))}
            </div>
          }
        />
        <ul className="role-list">
          {openRoles.map((role) => (
            <li key={role.title}>
              <a className="role" href="/contact-sales" data-reveal>
                <div>
                  <h3 className="role__title">{role.title}</h3>
                  <div className="role__meta">
                    <Badge tone="outline">{role.team}</Badge>
                    <span><Icon name="map" size={13} />{role.location}</span>
                    <span><Icon name="clock" size={13} />{role.type}</span>
                  </div>
                </div>
                <span className="role__cta">
                  Apply
                  <Icon name="arrowRight" size={15} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section size="sm">
        <SectionHead
          align="center"
          eyebrow="Hiring process"
          title="Four conversations, two weeks"
          lede="An introductory call, a technical conversation about work you have actually done, a practical exercise scoped to three hours, and a session with the team you would join. We pay for the exercise."
        />
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Nothing quite right?"
          title="Tell us what you would want to work on"
          body="We open roles when we meet people worth opening them for. If none of the listings fit but the problem interests you, write to us."
          primary={{ label: 'Get in touch', href: '/contact-sales' }}
          secondary={{ label: 'Read the blog', href: '/blog' }}
        />
      </Section>
    </PageShell>
  );
}
