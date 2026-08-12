import { PageShell } from '@/components/layout/PageShell';
import { Section, Icon, Badge, Ambient } from '@/components/primitives';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const AGENDA = [
  { time: '0–5 min', title: 'Your estate', body: 'What you run, where the friction is, and what you are accountable for improving this year.' },
  { time: '5–20 min', title: 'Discovery and topology', body: 'A live estate model, impact analysis on a real asset, and how the dependency graph is built and evidenced.' },
  { time: '20–35 min', title: 'A governed change, end to end', body: 'Wave planning, policy evaluation, approval routing, execution with health gates, and rollback — on a live environment.' },
  { time: '35–45 min', title: 'Deployment and next steps', body: 'Architecture for your environment, security review path, and whether a proof of concept makes sense.' },
];

export default function BookDemoPage() {
  return (
    <PageShell current="/book-demo" breadcrumbs={[{ label: 'Book demo', href: '/book-demo' }]}>
      <section className="page-intro" style={{ paddingBottom: 0 }}>
        <Ambient aurora mesh noise />
        <div className="container container--wide">
          <div className="contact">
            <div className="contact__copy">
              <span className="eyebrow">Book a demo</span>
              <h1 className="page-intro__title">Forty-five minutes, on a live system</h1>
              <p className="page-intro__lede">
                No slideware. A solutions architect runs a real change against a live
                estate, including the parts that fail — because how a platform behaves
                when a health gate trips is more informative than how it behaves when
                everything works.
              </p>

              <h2 className="contact__section-title">What the session covers</h2>
              <ol className="agenda">
                {AGENDA.map((item) => (
                  <li key={item.title} className="agenda__item">
                    <span className="agenda__time" data-numeric>{item.time}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="alert alert--info" role="note">
                <Icon name="sparkles" size={18} className="alert__icon" />
                <div>
                  <div className="alert__title">Bring your hardest change</div>
                  <div className="alert__body">
                    The most useful demos are the ones where you describe the window
                    your team dreads and we model it live. Mention it in the form and
                    we will prepare the scenario in advance.
                  </div>
                </div>
              </div>
            </div>

            <form className="contact__form" noValidate>
              <div className="row row--between" style={{ marginBottom: 'var(--space-2)' }}>
                <h2 className="contact__form-title">Request a session</h2>
                <Badge tone="success" dot>Usually within 48h</Badge>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="d-first">First name<span className="label__required">*</span></label>
                  <input className="input" id="d-first" name="firstName" autoComplete="given-name" required />
                </div>
                <div className="field">
                  <label className="label" htmlFor="d-last">Last name<span className="label__required">*</span></label>
                  <input className="input" id="d-last" name="lastName" autoComplete="family-name" required />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="d-email">Work email<span className="label__required">*</span></label>
                <input className="input" id="d-email" name="email" type="email" autoComplete="email" required />
              </div>

              <div className="field">
                <label className="label" htmlFor="d-company">Company<span className="label__required">*</span></label>
                <input className="input" id="d-company" name="company" autoComplete="organization" required />
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="d-region">Time zone</label>
                  <select className="select" id="d-region" name="timezone" defaultValue="">
                    <option value="" disabled>Select</option>
                    <option>Americas</option>
                    <option>Europe, Middle East &amp; Africa</option>
                    <option>Asia Pacific</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label" htmlFor="d-size">Estate size</label>
                  <select className="select" id="d-size" name="estate" defaultValue="">
                    <option value="" disabled>Select a range</option>
                    <option>Under 500 nodes</option>
                    <option>500 – 2,500 nodes</option>
                    <option>2,500 – 10,000 nodes</option>
                    <option>Over 10,000 nodes</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="d-scenario">Which scenario should we prepare?</label>
                <textarea className="textarea" id="d-scenario" name="scenario" placeholder="For example: a quarterly cumulative update across an availability-group estate with a six-hour window." />
              </div>

              <label className="checkbox">
                <input type="checkbox" name="technical" />
                <span>Include a technical deep dive on architecture and security</span>
              </label>

              <button type="submit" className="btn btn--primary btn--lg btn--block">
                Request demo
                <Icon name="arrowRight" size={18} className="btn__icon btn__icon--shift" />
              </button>

              <p className="field__hint">
                We will propose three times within two business days. Sessions are run
                by a solutions architect, and you are welcome to bring your security
                team.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Section size="sm">
        <CustomerLogos limit={8} label="Recently demoed for teams at" />
      </Section>
    </PageShell>
  );
}
