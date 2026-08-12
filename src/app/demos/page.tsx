import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, ButtonLink } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { DemoTheatre } from '@/components/demos/DemoTheatre';
import { Island } from '@/lib/islands';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function DemosPage() {
  return (
    <PageShell
      current="/demos"
      breadcrumbs={[{ label: 'Demos', href: '/demos' }]}
    >
      <PageIntro
        eyebrow="Interactive Demos"
        title={
          <>
            Six real production workflows,{' '}
            <span className="text-gradient">running live in your browser</span>
          </>
        }
        lede="These are scripted replays of real production runs — with the exact log output, policy checks, topology graphs and evidence audit chains captured during execution. Select any scenario below to test."
        primary={{ label: 'Book live walkthrough', href: '/book-demo' }}
        secondary={{ label: 'Explore platform', href: '/platform' }}
      />

      <Section tone="panel">
        <SectionHead
          eyebrow="Interactive Theatre"
          title="Interactive Workflow Simulator"
          lede="Select a tab to switch scenarios, play/pause execution, or inspect the phase progression and evidence logs."
        />
        <div style={{ marginTop: 'var(--space-8)' }}>
          <Island name="DemoTheatre">
            <DemoTheatre />
          </Island>
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Custom demonstration"
          title="Want to test these workflows on your own estate architecture?"
          body="Book a 30-minute deep-dive with a solutions engineer. We'll run a live demonstration tuned to your database version, patch policy, or compliance framework."
          primary={{ label: 'Book custom demo', href: '/book-demo' }}
          secondary={{ label: 'Contact sales', href: '/contact-sales' }}
        />
      </Section>
    </PageShell>
  );
}
