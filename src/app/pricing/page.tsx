import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead, Icon, Alert } from '@/components/primitives';
import { CtaBand } from '@/components/marketing/sections';
import { PricingCards, ComparisonTable } from '@/components/marketing/Pricing';
import { Accordion } from '@/components/marketing/Accordion';
import { Island } from '@/lib/islands';
import { pricingFaq } from '@/content/pricing';
import { faqSchema, toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function PricingPage() {
  return (
    <PageShell
      current="/pricing"
      breadcrumbs={[{ label: 'Pricing', href: '/pricing' }]}
    >
      <PageIntro
        eyebrow="Pricing"
        title={
          <>
            Priced by what you manage,{' '}
            <span className="text-gradient">not by what you switch on</span>
          </>
        }
        lede="One rate per managed node. Every module in your plan is available immediately, so widening automation coverage is an engineering decision rather than a procurement cycle."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Talk to sales', href: '/contact-sales' }}
      />

      <Section size="sm" tightTop>
        <PricingCards />
        <div style={{ marginTop: 'var(--space-8)', maxWidth: '52rem' }}>
          <Alert tone="info" title="Every plan includes a two-week proof of concept">
            Run in your environment, against your estate, with your approvals in the
            loop. It concludes with a real automated change executed end to end and a
            written assessment of measured effort saved — whether or not you proceed.
          </Alert>
        </div>
      </Section>

      <Section tone="panel">
        <SectionHead
          eyebrow="Compare"
          title="What each plan includes"
          lede="Capability differences only — support terms, retention and deployment model are listed at the bottom of each group."
        />
        <div style={{ marginTop: 'var(--space-10)' }}>
          <ComparisonTable />
        </div>
      </Section>

      <Section>
        <SectionHead
          align="center"
          eyebrow="What is always included"
          title="No plan removes the parts that make automation safe"
        />
        <div className="assurance-grid">
          {[
            {
              icon: 'lock' as const,
              title: 'Zero standing privilege',
              body: 'Credentials brokered per execution from your vault on every plan, including Foundation.',
            },
            {
              icon: 'book' as const,
              title: 'Complete audit record',
              body: 'Every action, approval and output written to the append-only ledger. Retention differs; completeness does not.',
            },
            {
              icon: 'shieldCheck' as const,
              title: 'Policy before execution',
              body: 'Guardrails are evaluated ahead of every step regardless of tier. Control is not an upsell.',
            },
            {
              icon: 'code' as const,
              title: 'Full API access',
              body: 'Everything the console can do is available over REST, with webhooks and event streaming.',
            },
          ].map((item) => (
            <div key={item.title} className="assurance" data-reveal>
              <span className="icon-plate icon-plate--sm">
                <Icon name={item.icon} size={16} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="inset">
        <div className="faq-layout">
          <SectionHead
            eyebrow="Commercial questions"
            title="How the model works in practice"
            lede="If your question is not here, sales will answer it on the first call rather than the third."
          />
          <Island name="Accordion" props={{ items: pricingFaq, idPrefix: 'pricing', defaultOpen: [0] }}>
            <Accordion items={pricingFaq} idPrefix="pricing" defaultOpen={[0]} />
          </Island>
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Get a number"
          title="Ask for a modelled quote"
          body="Send us an approximate node count by platform and region. We will return a costed proposal with a projected effort-saving model built from comparable deployments."
          primary={{ label: 'Contact sales', href: '/contact-sales' }}
          secondary={{ label: 'Book demo', href: '/book-demo' }}
        />
      </Section>
    </PageShell>
  );
}
