/**
 * Client entry for the static harness.
 *
 * Hydrates each island in place and installs the two global behaviours that
 * are not owned by any single component: scroll reveal and theme switching.
 * The Next.js build replaces this file with the framework's own client
 * runtime; the island components themselves are unchanged.
 */

import { hydrateRoot } from 'react-dom/client';
import { createElement } from 'react';
import { registry } from './island-registry';

function hydrateIslands(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-island]');
  nodes.forEach((node) => {
    const name = node.dataset.island;
    if (!name) return;
    const Component = registry[name];
    if (!Component) {
      console.warn(`[islands] no component registered for "${name}"`);
      return;
    }
    let props: Record<string, unknown> = {};
    const raw = node.dataset.islandProps;
    if (raw) {
      try {
        props = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        console.warn(`[islands] malformed props on "${name}"`);
      }
    }
    try {
      hydrateRoot(node, createElement(Component, props));
    } catch (error) {
      // A widget failing to hydrate must never take the page with it — the
      // server-rendered markup stays on screen as a static fallback.
      console.error(`[islands] "${name}" failed to hydrate`, error);
    }
  });
}

/**
 * Reveal-on-scroll.
 *
 * An IntersectionObserver handles the common case, backed by a throttled
 * scroll sweep. The sweep exists because an observer can miss elements during
 * fast or programmatic scrolling, and content that stays at opacity 0 is a
 * far worse outcome than a missing animation. Anything still hidden once the
 * user reaches the bottom of the document is revealed unconditionally.
 */
function installScrollReveal(): void {
  const pending = new Set<HTMLElement>(
    document.querySelectorAll<HTMLElement>('[data-reveal]'),
  );

  const reveal = (el: HTMLElement) => {
    el.classList.add('is-revealed');
    pending.delete(el);
  };

  if (!('IntersectionObserver' in window)) {
    pending.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0 },
  );
  pending.forEach((el) => observer.observe(el));

  let ticking = false;
  const sweep = () => {
    ticking = false;
    if (!pending.size) return;
    const limit = window.innerHeight - 40;
    Array.from(pending).forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < limit) {
        observer.unobserve(el);
        reveal(el);
      }
    });
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sweep);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', sweep, { passive: true });
  sweep();
}

/** Cursor-tracking spotlight on cards that opt in. */
function installSpotlight(): void {
  const cards = document.querySelectorAll<HTMLElement>('.card--spotlight');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

/** Header condenses once the page scrolls away from the top. */
function installHeaderState(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-condensed', window.scrollY > 12);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

function boot(): void {
  hydrateIslands();
  installScrollReveal();
  installSpotlight();
  installHeaderState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
