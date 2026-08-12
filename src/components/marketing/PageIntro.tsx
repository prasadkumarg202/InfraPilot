import type { ReactNode } from 'react';
import { Ambient, ButtonLink } from '@/components/primitives';

/**
 * Standard page opener. Every interior page uses the same shape so the site
 * has one recognisable rhythm — eyebrow, headline, lede, actions, then an
 * optional inline stat row.
 */
export function PageIntro({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  stats,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  stats?: Array<{ value: string; label: string }>;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <Ambient aurora mesh noise vignette={false} />
      <div className="container container--wide">
        <div className="page-intro__inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-intro__title">{title}</h1>
          <p className="page-intro__lede">{lede}</p>
          {(primary || secondary) && (
            <div className="page-intro__actions">
              {primary && (
                <ButtonLink href={primary.href} size="lg" iconRight="arrowRight">
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>

        {stats && (
          <div className="page-intro__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="page-intro__stat">
                <span className="page-intro__stat-value" data-numeric>
                  {stat.value}
                </span>
                <span className="page-intro__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
