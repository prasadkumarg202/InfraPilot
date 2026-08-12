import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Badge, ButtonLink } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { events } from '@/content/company';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function EventsPage() {
  return (
    <PageShell
      current="/company"
      breadcrumbs={[
        { label: 'Company', href: '/company' },
        { label: 'Events', href: '/company/events' },
      ]}
    >
      <PageIntro
        eyebrow="Events"
        title={
          <>
            Sessions run by engineers,{' '}
            <span className="text-gradient">not by marketing</span>
          </>
        }
        lede="Technical sessions with the customer teams who did the work, regulatory roundtables under Chatham House rule, and workshops where you build something rather than watch a deck."
        primary={{ label: 'Contact us about an event', href: '/contact-sales' }}
      />

      <Section size="sm" tightTop>
        <SectionHead eyebrow="Upcoming" title="Next five sessions" />
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.name}>
              <article className="event" data-reveal>
                <div className="event__date">
                  <Icon name="calendar" size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="event__body">
                  <div className="row row--wrap">
                    <Badge tone="accent">{event.kind}</Badge>
                    <span className="article__meta">{event.location}</span>
                  </div>
                  <h3 className="event__title">{event.name}</h3>
                  <p className="event__desc">{event.description}</p>
                </div>
                <div className="event__action">
                  <ButtonLink href="/contact-sales" variant="secondary" size="sm" iconRight="arrowRight">
                    {event.cta}
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead
          align="center"
          eyebrow="On demand"
          title="Missed one?"
          lede="Every webinar is recorded and published without registration, usually within 48 hours. Roundtables are not recorded, by design."
          actions={
            <ButtonLink href="/resources" variant="outline" iconRight="arrowRight">
              Browse the library
            </ButtonLink>
          }
        />
      </Section>

      <Section size="sm">
        <CtaBand />
      </Section>
    </PageShell>
  );
}
