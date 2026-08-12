import { ButtonLink, Icon, Badge } from '@/components/primitives';
import { plans, comparison } from '@/content/pricing';
import { cx } from '@/lib/utils';

export function PricingCards() {
  return (
    <div className="pricing-grid">
      {plans.map((plan, index) => (
        <article
          key={plan.id}
          className={cx('plan', plan.highlighted && 'plan--featured')}
          data-reveal
          style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
        >
          {plan.highlighted && (
            <span className="plan__flag">
              <Icon name="sparkles" size={12} />
              Most deployed
            </span>
          )}
          <header className="plan__head">
            <h2 className="plan__name">{plan.name}</h2>
            <p className="plan__tagline">{plan.tagline}</p>
          </header>

          <div className="plan__price">
            <span className="plan__price-value" data-numeric>
              {plan.priceLabel}
            </span>
            <span className="plan__price-note">{plan.priceNote}</span>
          </div>

          <ButtonLink
            href={plan.cta.href}
            variant={plan.highlighted ? 'primary' : 'secondary'}
            block
            iconRight="arrowRight"
          >
            {plan.cta.label}
          </ButtonLink>

          <p className="plan__best-for">
            <strong>Best for </strong>
            {plan.bestFor}
          </p>

          <ul className="plan__includes">
            {plan.includes.map((item) => (
              <li key={item}>
                <Icon name="check" size={14} />
                {item}
              </li>
            ))}
          </ul>

          <dl className="plan__limits">
            {plan.limits.map((limit) => (
              <div key={limit.label}>
                <dt>{limit.label}</dt>
                <dd data-numeric>{limit.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <span className="cmp__yes" aria-label="Included">
        <Icon name="check" size={15} />
      </span>
    );
  if (value === false)
    return (
      <span className="cmp__no" aria-label="Not included">
        <Icon name="minus" size={15} />
      </span>
    );
  return <span className="cmp__text">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="cmp">
      <div className="cmp__scroll">
        <table className="cmp__table">
          <caption className="sr-only">
            Feature comparison across Foundation, Enterprise and Sovereign plans
          </caption>
          <thead>
            <tr>
              <th scope="col">Capability</th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col">
                  <span className="cmp__plan-name">{plan.name}</span>
                  {plan.highlighted && <Badge tone="accent">Popular</Badge>}
                </th>
              ))}
            </tr>
          </thead>
          {comparison.map((group) => (
            <tbody key={group.group}>
              <tr className="cmp__group">
                <th scope="colgroup" colSpan={4}>
                  {group.group}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>
                    <Cell value={row.foundation} />
                  </td>
                  <td>
                    <Cell value={row.enterprise} />
                  </td>
                  <td>
                    <Cell value={row.sovereign} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
