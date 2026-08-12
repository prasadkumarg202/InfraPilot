'use client';

import { useEffect } from 'react';
import { Ambient, ButtonLink, Button } from '@/components/primitives';

/**
 * Route-level error boundary. Renders inside the shell so a failed page still
 * has navigation, and reports the digest so a support conversation can start
 * from an identifier rather than a description.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[route error]', error);
  }, [error]);

  return (
    <section className="page-intro" style={{ minHeight: '70vh' }}>
      <Ambient aurora mesh noise vignette />
      <div className="container container--wide">
        <div className="page-intro__inner">
          <span className="eyebrow">Something went wrong</span>
          <h1 className="page-intro__title">This page failed to render</h1>
          <p className="page-intro__lede">
            The failure has been logged. Retrying usually resolves it; if it does
            not, quoting the reference below will let support find the exact event.
          </p>
          {error.digest && (
            <p className="text-mono" style={{ color: 'var(--text-quaternary)' }}>
              Reference: {error.digest}
            </p>
          )}
          <div className="page-intro__actions">
            <Button size="lg" onClick={reset} iconLeft="refresh">
              Try again
            </Button>
            <ButtonLink href="/" variant="secondary" size="lg">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
