import { PageShell } from '@/components/layout/PageShell';
import { Section, ButtonLink, Icon, Ambient } from '@/components/primitives';

export default function NotFound() {
  return (
    <PageShell>
      <section className="page-intro" style={{ minHeight: '58vh' }}>
        <Ambient aurora mesh noise vignette />
        <div className="container container--wide">
          <div className="page-intro__inner">
            <span className="eyebrow">Error 404</span>
            <h1 className="page-intro__title">
              This page is not in the{' '}
              <span className="text-gradient">dependency graph</span>
            </h1>
            <p className="page-intro__lede">
              The address you followed does not resolve. It may have moved, or the
              link that brought you here may be out of date.
            </p>
            <div className="page-intro__actions">
              <ButtonLink href="/" size="lg" iconRight="arrowRight">
                Back to home
              </ButtonLink>
              <ButtonLink href="/docs" variant="secondary" size="lg">
                Search the documentation
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section size="sm" tightTop>
        <div className="assurance-grid">
          {[
            { icon: 'layers' as const, title: 'Platform', body: 'How discovery, workflow, policy and the intelligence layer fit together.', href: '/platform' },
            { icon: 'grid' as const, title: 'Products', body: 'Twenty-eight modules across the operations lifecycle.', href: '/products' },
            { icon: 'book' as const, title: 'Documentation', body: 'Deployment guides, references and the runbook library.', href: '/docs' },
            { icon: 'mail' as const, title: 'Contact sales', body: 'Talk to a solutions architect about your estate.', href: '/contact-sales' },
          ].map((item) => (
            <a key={item.title} className="assurance" href={item.href}>
              <span className="icon-plate icon-plate--sm">
                <Icon name={item.icon} size={16} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </a>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
