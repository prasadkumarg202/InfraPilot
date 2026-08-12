import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Island } from '@/lib/islands';
import { Icon } from '@/components/primitives';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Page shell.
 *
 * Header is an island because it owns menu state and the theme toggle;
 * everything below it is static markup unless a page opts a widget in.
 */
export function PageShell({
  children,
  current,
  breadcrumbs,
}: {
  children: ReactNode;
  current?: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <>
      <Island name="Header" props={{ current }}>
        <Header current={current} />
      </Island>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <div className="container container--wide">
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          {items.map((item, index) => (
            <li key={item.href}>
              <Icon name="chevronRight" size={13} className="breadcrumbs__sep" />
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
