'use client';

import { useEffect, useRef, useState } from 'react';
import { primaryNav } from '@/content/navigation';
import { Logo, Icon, Badge, type IconName } from '@/components/primitives';
import { cx } from '@/lib/utils';

/**
 * Site header.
 *
 * A mega-menu that opens on hover for pointer users and on Enter/Space for
 * keyboard users, with Escape and outside-click closing it. The panel is kept
 * in the DOM and toggled with `hidden` so its contents remain crawlable and
 * the open transition has something to animate from.
 */

export function Header({ current }: { current?: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A literal rather than useId(): there is exactly one header per document,
  // and useId() would derive different values on the server (whole-page tree)
  // and on the client (island tree), breaking hydration.
  const idBase = 'nav';

  useEffect(() => {
    const stored =
      typeof document !== 'undefined'
        ? (document.documentElement.getAttribute('data-theme') as
            | 'dark'
            | 'light'
            | null)
        : null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('infrapilot-theme', next);
    } catch {
      /* storage can be unavailable in embedded contexts; theme still applies */
    }
  }

  /** Small grace period so the pointer can cross the gap to the panel. */
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="site-header" data-site-header>
      <div className="site-header__inner container container--wide">
        <a href="/" className="site-header__brand" aria-label="Infrapilot home">
          <Logo size={30} idPrefix="hdr" />
        </a>

        <nav
          className="site-nav hide-sm"
          aria-label="Primary"
          ref={navRef}
          onMouseLeave={scheduleClose}
        >
          <ul className="site-nav__list">
            {primaryNav.map((group) => {
              const hasMenu = Boolean(group.columns?.length);
              const panelId = `${idBase}-${group.label}`;
              const isOpen = openMenu === group.label;
              return (
                <li
                  key={group.label}
                  className="site-nav__item"
                  onMouseEnter={() => {
                    cancelClose();
                    if (hasMenu) setOpenMenu(group.label);
                  }}
                >
                  <a
                    href={group.href ?? '#'}
                    className={cx(
                      'site-nav__link',
                      current === group.href && 'is-current',
                      isOpen && 'is-open',
                    )}
                    aria-expanded={hasMenu ? isOpen : undefined}
                    aria-controls={hasMenu ? panelId : undefined}
                    aria-current={current === group.href ? 'page' : undefined}
                    onKeyDown={(event) => {
                      if (hasMenu && (event.key === 'ArrowDown' || event.key === ' ')) {
                        event.preventDefault();
                        setOpenMenu(isOpen ? null : group.label);
                      }
                    }}
                  >
                    {group.label}
                    {hasMenu && (
                      <Icon
                        name="chevronDown"
                        size={13}
                        className="site-nav__caret"
                      />
                    )}
                  </a>

                  {hasMenu && (
                    <div
                      id={panelId}
                      className="megamenu"
                      hidden={!isOpen}
                      onMouseEnter={cancelClose}
                    >
                      <div className="megamenu__inner">
                        <div className="megamenu__columns">
                          {group.columns!.map((column) => (
                            <div key={column.title} className="megamenu__column">
                              <p className="megamenu__title">{column.title}</p>
                              <ul className="megamenu__links">
                                {column.links.map((link) => (
                                  <li key={link.href + link.label}>
                                    <a href={link.href} className="megamenu__link">
                                      {link.icon && (
                                        <span className="megamenu__icon">
                                          <Icon
                                            name={link.icon as IconName}
                                            size={16}
                                          />
                                        </span>
                                      )}
                                      <span className="megamenu__text">
                                        <span className="megamenu__label">
                                          {link.label}
                                          {link.badge && (
                                            <Badge tone="accent">{link.badge}</Badge>
                                          )}
                                        </span>
                                        {link.description && (
                                          <span className="megamenu__desc">
                                            {link.description}
                                          </span>
                                        )}
                                      </span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {group.featured && (
                          <a className="megamenu__feature" href={group.featured.href}>
                            <span className="eyebrow">{group.featured.eyebrow}</span>
                            <span className="megamenu__feature-title">
                              {group.featured.title}
                            </span>
                            <span className="megamenu__feature-body">
                              {group.featured.body}
                            </span>
                            <span className="megamenu__feature-cta">
                              {group.featured.cta}
                              <Icon name="arrowRight" size={15} />
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm hide-sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          </button>
          <a href="/contact-sales" className="btn btn--ghost btn--sm hide-sm">
            Contact sales
          </a>
          <a href="/book-demo" className="btn btn--primary btn--sm">
            Book demo
          </a>
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm show-sm"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          <nav aria-label="Mobile" className="mobile-nav__inner">
            {primaryNav.map((group) => (
              <div key={group.label} className="mobile-nav__group">
                <a href={group.href ?? '#'} className="mobile-nav__heading">
                  {group.label}
                </a>
                {group.columns?.map((column) => (
                  <ul key={column.title} className="mobile-nav__links">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
            <div className="mobile-nav__actions">
              <a href="/contact-sales" className="btn btn--secondary btn--block">
                Contact sales
              </a>
              <a href="/book-demo" className="btn btn--primary btn--block">
                Book demo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
