import { footerNav, legalNav } from '@/content/navigation';
import { site } from '@/content/site.config';
import { Logo, Icon, Badge } from '@/components/primitives';

/** Global footer. Also carries the compliance strip and regional presence. */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__ambient" aria-hidden="true" data-ambient>
        <div className="site-footer__glow" />
      </div>

      <div className="container container--wide site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo size={32} idPrefix="ftr" />
            <p className="site-footer__mission">{site.mission}</p>
            <ul className="site-footer__social" aria-label="Social links">
              <li>
                <a href={site.social.linkedin} aria-label="LinkedIn" rel="noreferrer">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.36 1.59-2.36 3.23V21h-4V9Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.x} aria-label="X" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.github} aria-label="GitHub" rel="noreferrer">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.youtube} aria-label="YouTube" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            {footerNav.map((column) => (
              <div key={column.title} className="site-footer__column">
                <p className="site-footer__column-title">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a href={link.href}>
                        {link.label}
                        {link.badge && <Badge tone="accent">{link.badge}</Badge>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__compliance">
          <div className="site-footer__certs" aria-label="Certifications">
            {['SOC 2 Type II', 'ISO/IEC 27001', 'PCI DSS ready', 'HIPAA', 'GDPR', 'FedRAMP in process'].map(
              (cert) => (
                <span key={cert} className="cert-chip">
                  <Icon name="shieldCheck" size={13} />
                  {cert}
                </span>
              ),
            )}
          </div>
          <a className="site-footer__status" href="/resources#status">
            <span className="badge__dot badge__dot--live" />
            All systems operational
          </a>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="site-footer__legal">
            {legalNav.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className="site-footer__regions">
            {site.locations.join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
