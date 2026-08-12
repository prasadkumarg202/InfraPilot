import { customers, type Customer } from '@/content/customers';
import { cx } from '@/lib/utils';

/**
 * Customer logo wall.
 *
 * Each lockup is drawn rather than imported as a bitmap: a geometric mark on a
 * 24×24 grid plus a letter-spaced wordmark. Drawing them means they inherit
 * the current text colour, stay sharp at any density, and cost no requests.
 */

function Mark({ shape }: { shape: Customer['mark'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (shape) {
    case 'orbit':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9.6" ry="4.6" />
          <ellipse cx="12" cy="12" rx="9.6" ry="4.6" transform="rotate(60 12 12)" />
        </svg>
      );
    case 'prism':
      return (
        <svg {...common}>
          <path d="M12 2.8 21 19.4H3Z" />
          <path d="M12 2.8V19.4M7.5 11.1h9" />
        </svg>
      );
    case 'arc':
      return (
        <svg {...common}>
          <path d="M3.2 19a8.8 8.8 0 0 1 17.6 0" />
          <path d="M7.6 19a4.4 4.4 0 0 1 8.8 0" />
          <circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3.2" y="3.2" width="7.2" height="7.2" rx="1.4" />
          <rect x="13.6" y="3.2" width="7.2" height="7.2" rx="1.4" />
          <rect x="3.2" y="13.6" width="7.2" height="7.2" rx="1.4" />
          <rect x="13.6" y="13.6" width="7.2" height="7.2" rx="1.4" fill="currentColor" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 2.8 4.6 5.9v5.6c0 4.3 3.1 8.3 7.4 9.4 4.3-1.1 7.4-5.1 7.4-9.4V5.9Z" />
          <path d="M12 7.4v8.4" />
        </svg>
      );
    case 'wave':
      return (
        <svg {...common}>
          <path d="M2.6 15.4c2.4-5 4.7-5 7.1 0s4.7 5 7.1 0 4.7-5 4.6 0" />
          <path d="M2.6 9.4c2.4-5 4.7-5 7.1 0" opacity="0.5" />
        </svg>
      );
    case 'delta':
      return (
        <svg {...common}>
          <path d="M12 3.4 20.6 20H3.4Z" />
          <path d="m8.4 20 3.6-7 3.6 7" fill="currentColor" />
        </svg>
      );
    case 'hex':
      return (
        <svg {...common}>
          <path d="M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3Z" />
          <path d="M12 8.2 16.4 10.7v5L12 18.2 7.6 15.7v-5Z" fill="currentColor" stroke="none" opacity="0.85" />
        </svg>
      );
  }
}

export function CustomerLogo({ customer }: { customer: Customer }) {
  return (
    <span className="clogo" title={customer.name}>
      <span className="clogo__mark">
        <Mark shape={customer.mark} />
      </span>
      <span className="clogo__word">{customer.wordmark}</span>
    </span>
  );
}

export interface CustomerLogosProps {
  /** Limit to the first N entries. */
  limit?: number;
  /** Continuous marquee instead of a static row. */
  marquee?: boolean;
  label?: string;
  className?: string;
}

export function CustomerLogos({
  limit = 7,
  marquee = false,
  label = 'Trusted by infrastructure teams at',
  className,
}: CustomerLogosProps) {
  const shown = customers.slice(0, limit);

  if (marquee) {
    return (
      <div className={cx('logo-marquee', className)}>
        {label && <p className="logo-wall__label">{label}</p>}
        <div className="logo-marquee__viewport">
          <div className="logo-marquee__track" data-ambient>
            {[...customers, ...customers].map((customer, index) => (
              <CustomerLogo key={`${customer.id}-${index}`} customer={customer} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('logo-wall', className)} data-reveal="fade">
      {label && <p className="logo-wall__label">{label}</p>}
      <div className="logo-wall__row">
        {shown.map((customer) => (
          <CustomerLogo key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
