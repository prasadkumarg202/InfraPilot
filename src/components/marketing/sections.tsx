import type { ReactNode } from 'react';
import {
  Badge,
  ButtonLink,
  Card,
  Icon,
  SectionHead,
  type IconName,
} from '@/components/primitives';
import { proofMetrics } from '@/content/customers';
import { testimonials, type Testimonial } from '@/content/testimonials';
import { techGroups, integrations, type Integration } from '@/content/technologies';
import { modules, stageMeta, type ModuleStage, type ProductModule } from '@/content/platform';
import { cx } from '@/lib/utils';

/* ============================================================== STAT BAND */

export function StatBand({
  items = proofMetrics,
}: {
  items?: Array<{ value: string; label: string; detail: string }>;
}) {
  return (
    <div className="stat-band">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="stat-band__item"
          data-reveal
          style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
        >
          <span className="stat-band__value">{item.value}</span>
          <span className="stat-band__label">{item.label}</span>
          <span className="stat-band__detail">{item.detail}</span>
        </div>
      ))}
    </div>
  );
}

/* ========================================================= FEATURE CARDS */

export interface FeatureItem {
  icon: IconName;
  title: string;
  body: string;
  href?: string;
  badge?: string;
}

export function FeatureGrid({
  items,
  columns,
}: {
  items: FeatureItem[];
  columns?: number;
}) {
  // Column count is expressed as a data attribute rather than an inline
  // grid-template, so the responsive rules in CSS can still take over. An
  // inline style would win at every breakpoint and force four columns onto a
  // phone.
  return (
    <div className="feature-grid" data-cols={columns ? String(columns) : undefined}>
      {items.map((item, index) => (
        <Card
          key={item.title}
          interactive={Boolean(item.href)}
          edge
          spotlight
          data-reveal
          style={{ '--reveal-delay': `${index * 60}ms` } as React.CSSProperties}
        >
          <span className="icon-plate">
            <Icon name={item.icon} size={20} />
          </span>
          <h3 className="card__title">
            {item.href ? <a href={item.href}>{item.title}</a> : item.title}
            {item.badge && (
              <>
                {' '}
                <Badge tone="accent">{item.badge}</Badge>
              </>
            )}
          </h3>
          <p className="card__body">{item.body}</p>
          {item.href && (
            <span className="card__footer">
              <span className="btn btn--link">
                Learn more
                <Icon name="arrowRight" size={15} className="btn__icon btn__icon--shift" />
              </span>
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}

/* ================================================================ SPLIT */

export function Split({
  eyebrow,
  title,
  body,
  points,
  visual,
  reverse,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points?: Array<{ title: string; body: string }>;
  visual: ReactNode;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <div className={cx('split', reverse && 'split--reverse')}>
      <div className="split__copy" data-reveal={reverse ? 'right' : 'left'}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="split__title">{title}</h2>
        <p className="split__body">{body}</p>
        {points && (
          <ul className="split__points">
            {points.map((point) => (
              <li key={point.title}>
                <span className="split__point-marker" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                <span>
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <div>
            <ButtonLink href={cta.href} variant="outline" iconRight="arrowRight">
              {cta.label}
            </ButtonLink>
          </div>
        )}
      </div>
      <div className="split__visual" data-reveal={reverse ? 'left' : 'right'}>
        {visual}
      </div>
    </div>
  );
}

/* ======================================================== MODULE CATALOGUE */

export function ModuleGrid({
  stage,
  items,
}: {
  stage?: ModuleStage;
  items?: ProductModule[];
}) {
  const list = items ?? (stage ? modules.filter((m) => m.stage === stage) : modules);
  return (
    <div className="module-grid">
      {list.map((module, index) => (
        <article
          key={module.id}
          id={module.id}
          className="module-card"
          data-reveal
          style={{ '--reveal-delay': `${(index % 4) * 60}ms` } as React.CSSProperties}
        >
          <span className="module-card__icon">
            <Icon name={module.icon} size={18} />
          </span>
          <h3 className="module-card__title">{module.name}</h3>
          <p className="module-card__summary">{module.summary}</p>
          <p className="module-card__detail">{module.detail}</p>
          <ul className="module-card__outcomes">
            {module.outcomes.map((outcome) => (
              <li key={outcome}>
                <Icon name="check" size={13} />
                {outcome}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function StageHeader({ stage }: { stage: ModuleStage }) {
  const meta = stageMeta[stage];
  return (
    <div className="stage-header" data-reveal>
      <span className="stage-header__icon">
        <Icon name={meta.icon} size={20} />
      </span>
      <div>
        <h2 className="stage-header__title">{meta.label}</h2>
        <p className="stage-header__body">{meta.description}</p>
      </div>
      <span className="stage-header__count" data-numeric>
        {modules.filter((m) => m.stage === stage).length} modules
      </span>
    </div>
  );
}

/* ======================================================= TECHNOLOGY MATRIX */

export function TechMatrix() {
  return (
    <div className="tech-matrix">
      {techGroups.map((group, index) => (
        <div
          key={group.id}
          className="tech-group"
          data-reveal
          style={{ '--reveal-delay': `${index * 50}ms` } as React.CSSProperties}
        >
          <div className="tech-group__head">
            <span className="icon-plate icon-plate--sm">
              <Icon name={group.icon} size={16} />
            </span>
            <div>
              <h3 className="tech-group__title">{group.label}</h3>
              <span className="tech-group__count" data-numeric>
                {group.items.length} supported
              </span>
            </div>
          </div>
          <p className="tech-group__blurb">{group.blurb}</p>
          <ul className="tech-group__items">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ============================================================ INTEGRATIONS */

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <article className={cx('integration-card', `is-${integration.accent}`)}>
      <div className="integration-card__head">
        <span className="integration-card__mono" aria-hidden="true">
          {integration.monogram}
        </span>
        <div>
          <h3 className="integration-card__name">{integration.name}</h3>
          <span className="integration-card__category">{integration.category}</span>
        </div>
        {integration.featured && <Badge tone="accent">Certified</Badge>}
      </div>
      <p className="integration-card__blurb">{integration.blurb}</p>
      <ul className="integration-card__caps">
        {integration.capabilities.map((cap) => (
          <li key={cap}>{cap}</li>
        ))}
      </ul>
    </article>
  );
}

export function IntegrationGrid({ items }: { items?: Integration[] }) {
  const list = items ?? integrations;
  return (
    <div className="integration-grid">
      {list.map((integration, index) => (
        <div
          key={integration.id}
          data-reveal
          style={{ '--reveal-delay': `${(index % 4) * 60}ms` } as React.CSSProperties}
        >
          <IntegrationCard integration={integration} />
        </div>
      ))}
    </div>
  );
}

/* ============================================================ TESTIMONIALS */

export function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="quote-card">
      <svg
        className="quote-card__mark"
        width="26"
        height="20"
        viewBox="0 0 26 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 20V11.2C0 5 3.6 1.1 10.2 0l.9 3.1C7.6 4.2 5.8 6.2 5.6 9h4.1v11H0Zm15.4 0V11.2C15.4 5 19 1.1 25.6 0l.9 3.1c-3.5 1.1-5.3 3.1-5.5 5.9H25v11h-9.6Z" />
      </svg>
      <blockquote className="quote-card__text">{item.quote}</blockquote>
      {item.metric && (
        <div className="quote-card__metric">
          <span className="quote-card__metric-value">{item.metric.value}</span>
          <span className="quote-card__metric-label">{item.metric.label}</span>
        </div>
      )}
      <figcaption className="quote-card__footer">
        <span className="quote-card__avatar" aria-hidden="true">
          {item.initials}
        </span>
        <span>
          <span className="quote-card__name">{item.name}</span>
          <span className="quote-card__role">
            {item.role} · {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ limit = 3 }: { limit?: number }) {
  return (
    <div className="quote-grid">
      {testimonials.slice(0, limit).map((item, index) => (
        <div
          key={item.id}
          data-reveal
          style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
        >
          <QuoteCard item={item} />
        </div>
      ))}
    </div>
  );
}

/* ================================================================= CTA */

export function CtaBand({
  eyebrow = 'Get started',
  title = 'See it run against your own estate',
  body = 'A proof of concept takes two weeks. We deploy inside your network, discover a scoped part of your estate, and run a real change end to end — with your team holding the approvals.',
  primary = { label: 'Book demo', href: '/book-demo' },
  secondary = { label: 'Contact sales', href: '/contact-sales' },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="cta-band" data-reveal="scale">
      <div className="cta-band__mesh" aria-hidden="true" />
      <div className="cta-band__inner">
        <div className="cta-band__copy">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__body">{body}</p>
        </div>
        <div className="cta-band__actions">
          <ButtonLink href={primary.href} size="lg" iconRight="arrowRight">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export { SectionHead };
