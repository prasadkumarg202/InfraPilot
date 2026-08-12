import { PageShell } from '@/components/layout/PageShell';
import { Section, Icon, Badge } from '@/components/primitives';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { Ambient } from '@/components/primitives';
import { site } from '@/content/site.config';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function ContactSalesPage() {
  return (
    <PageShell current="/contact-sales" breadcrumbs={[{ label: 'Contact sales', href: '/contact-sales' }]}>
      <section className="page-intro" style={{ paddingBottom: 0 }}>
        <Ambient aurora mesh noise />
        <div className="container container--wide">
          <div className="contact">
            <div className="contact__copy">
              <span className="eyebrow">Contact sales</span>
              <h1 className="page-intro__title">Tell us about your estate</h1>
              <p className="page-intro__lede">
                A solutions architect — not a qualification desk — will read this and
                reply within one business day. If a proof of concept is the right next
                step, we will propose a scope and a measurement plan before anything
                commercial happens.
              </p>

              <h2 className="contact__section-title">What happens next</h2>
              <ul className="contact__points">
                {[
                  { icon: 'clock' as const, title: 'One business day', body: 'Every enquiry is answered by a named engineer.' },
                  { icon: 'shieldCheck' as const, title: 'Security pack on request', body: 'SOC 2 report, penetration test summary and completed questionnaires under NDA.' },
                  { icon: 'target' as const, title: 'Scoped proof of concept', body: 'Two weeks, in your environment, against a real change with your approvals.' },
                ].map((point) => (
                  <li key={point.title}>
                    <span className="icon-plate icon-plate--sm">
                      <Icon name={point.icon} size={16} />
                    </span>
                    <span>
                      <strong>{point.title}</strong>
                      <span>{point.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="contact__direct">
                <p className="docs__nav-title">Prefer to reach us directly</p>
                <a href={`mailto:${site.email.sales}`}>
                  <Icon name="mail" size={15} />
                  {site.email.sales}
                </a>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
                  <Icon name="phone" size={15} />
                  {site.phone}
                </a>
                <span>
                  <Icon name="map" size={15} />
                  {site.address.street}, {site.address.city}
                </span>
              </div>
            </div>

            <form className="contact__form" noValidate>
              <div className="row row--between" style={{ marginBottom: 'var(--space-2)' }}>
                <h2 className="contact__form-title">Start a conversation</h2>
                <Badge tone="accent">No sales sequence</Badge>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="first-name">First name<span className="label__required">*</span></label>
                  <input className="input" id="first-name" name="firstName" autoComplete="given-name" required />
                </div>
                <div className="field">
                  <label className="label" htmlFor="last-name">Last name<span className="label__required">*</span></label>
                  <input className="input" id="last-name" name="lastName" autoComplete="family-name" required />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="email">Work email<span className="label__required">*</span></label>
                <input className="input" id="email" name="email" type="email" autoComplete="email" required />
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="company">Company<span className="label__required">*</span></label>
                  <input className="input" id="company" name="company" autoComplete="organization" required />
                </div>
                <div className="field">
                  <label className="label" htmlFor="role">Role</label>
                  <input className="input" id="role" name="role" autoComplete="organization-title" />
                </div>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="estate">Approximate estate size</label>
                  <select className="select" id="estate" name="estate" defaultValue="">
                    <option value="" disabled>Select a range</option>
                    <option>Under 500 nodes</option>
                    <option>500 – 2,500 nodes</option>
                    <option>2,500 – 10,000 nodes</option>
                    <option>10,000 – 40,000 nodes</option>
                    <option>Over 40,000 nodes</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label" htmlFor="interest">Primary interest</label>
                  <select className="select" id="interest" name="interest" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Patch orchestration</option>
                    <option>Database automation</option>
                    <option>Migration programme</option>
                    <option>Compliance automation</option>
                    <option>Incident response and self-healing</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="message">What are you trying to solve?</label>
                <textarea className="textarea" id="message" name="message" placeholder="The workflow that costs your team the most hours this quarter is usually the most useful place to start." />
                <span className="field__hint">The more specific, the more useful our first reply will be.</span>
              </div>

              <label className="checkbox">
                <input type="checkbox" name="securityPack" />
                <span>Send the security pack as well (SOC 2, penetration test summary, architecture documentation)</span>
              </label>

              <button type="submit" className="btn btn--primary btn--lg btn--block">
                Send enquiry
                <Icon name="arrowRight" size={18} className="btn__icon btn__icon--shift" />
              </button>

              <p className="field__hint">
                We use this information only to respond to your enquiry. No marketing
                sequence, no data sold, unsubscribe not required because you are not
                subscribed to anything.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Section size="sm">
        <CustomerLogos limit={8} label="Teams already running Infrapilot" />
      </Section>
    </PageShell>
  );
}
