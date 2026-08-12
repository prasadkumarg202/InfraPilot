import { PageShell } from '@/components/layout/PageShell';
import { Hero } from '@/components/marketing/Hero';
import {
  Ambient,
  ButtonLink,
  Icon,
  Section,
  SectionHead,
} from '@/components/primitives';
import {
  CtaBand,
  FeatureGrid,
  IntegrationGrid,
  Split,
  StatBand,
  TechMatrix,
  Testimonials,
} from '@/components/marketing/sections';
import { DemoTheatre } from '@/components/demos/DemoTheatre';
import { Island } from '@/lib/islands';
import { pillars } from '@/content/platform';
import { integrations, totalTechnologies } from '@/content/technologies';
import { TopologyGraph, paymentsEstate } from '@/components/visualizations/TopologyGraph';
import { WorkflowCanvas } from '@/components/visualizations/WorkflowCanvas';
import { PolicyPanel } from '@/components/visualizations/PolicyPanel';
import { CopilotPanel } from '@/components/visualizations/CopilotPanel';
import { faqSchema, toNextMetadata } from '@/lib/seo';
import { homeFaq } from '@/content/faq';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

export default function HomePage() {
  return (
    <PageShell current="/">
      <Hero />

      {/* ------------------------------------------------------- The problem */}
      <Section tone="panel" size="sm">
        <SectionHead
          align="center"
          eyebrow="The operating problem"
          title="Estates grew. Operating models did not."
          lede="Most enterprises now run more infrastructure than any team can hold in its head — across more platforms, in more places, under more regulation. The work did not get harder. It got wider."
        />
        <FeatureGrid
          columns={3}
          items={[
            {
              icon: 'clock',
              title: 'Change moves at the speed of coordination',
              body: 'A quarterly patch cycle is rarely limited by execution time. It is limited by how long it takes to agree a sequence, secure a window and find the person who knows what depends on what.',
            },
            {
              icon: 'alertTriangle',
              title: 'The map is always out of date',
              body: 'CMDBs describe what was intended. Production describes what happened. The gap between them is where the outages live — and it widens with every undocumented change.',
            },
            {
              icon: 'users',
              title: 'Expertise does not scale linearly',
              body: 'The engineers who can safely upgrade a WebLogic cluster or an Oracle RAC estate are the same ones you need for everything else. Hiring more of them is not the answer available to most organisations.',
            },
          ]}
        />
      </Section>

      {/* ------------------------------------------------------ Proof metrics */}
      <Section size="sm">
        <SectionHead
          eyebrow="Measured outcomes"
          title="What changes when operations run themselves"
          lede="Figures below are medians across enterprise deployments with estates above 10,000 instances, measured against each customer’s own pre-deployment baseline."
        />
        <StatBand />
      </Section>

      {/* ------------------------------------------------------------ Pillars */}
      <Section tone="inset">
        <Ambient aurora mesh={false} noise />
        <SectionHead
          align="center"
          eyebrow="The platform"
          title="Four capabilities, one control plane"
          lede="Discovery feeds the workflow engine. The policy engine constrains it. The intelligence layer learns from every run and makes the next one safer."
        />

        <div className="pillar-stack">
          <Split
            eyebrow={pillars[0].eyebrow}
            title={pillars[0].title}
            body={pillars[0].body}
            points={pillars[0].points}
            cta={{ label: 'Explore discovery', href: '/platform#discovery' }}
            visual={
              <div className="viz-frame ticked">
                <div className="viz-frame__head">
                  <span>Live dependency graph</span>
                  <span className="viz-frame__meta" data-numeric>
                    21,662 nodes · 84,109 edges
                  </span>
                </div>
                <div className="viz-frame__body">
                  <TopologyGraph
                    nodes={paymentsEstate.nodes}
                    edges={paymentsEstate.edges}
                    width={680}
                    height={340}
                    idPrefix="pillar-topo"
                  />
                </div>
              </div>
            }
          />

          <Split
            reverse
            eyebrow={pillars[1].eyebrow}
            title={pillars[1].title}
            body={pillars[1].body}
            points={pillars[1].points}
            cta={{ label: 'See the workflow engine', href: '/platform#workflow' }}
            visual={<WorkflowCanvas />}
          />

          <Split
            eyebrow={pillars[2].eyebrow}
            title={pillars[2].title}
            body={pillars[2].body}
            points={pillars[2].points}
            cta={{ label: 'Read the security model', href: '/security' }}
            visual={<PolicyPanel />}
          />

          <Split
            reverse
            eyebrow={pillars[3].eyebrow}
            title={pillars[3].title}
            body={pillars[3].body}
            points={pillars[3].points}
            cta={{ label: 'Meet the Copilot', href: '/platform#copilot' }}
            visual={<CopilotPanel />}
          />
        </div>
      </Section>

      {/* ---------------------------------------------------- Interactive demo */}
      <Section id="demos" tone="panel">
        <SectionHead
          eyebrow="See it work"
          title="Six real scenarios, running now"
          lede="These are scripted replays of production workflows — the same phases, gates and evidence an operator sees in the console. Pick one and watch it run."
          actions={
            <ButtonLink href="/book-demo" variant="outline" iconRight="arrowRight">
              Book a live walkthrough
            </ButtonLink>
          }
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Island name="DemoTheatre">
            <DemoTheatre />
          </Island>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Coverage */}
      <Section>
        <SectionHead
          eyebrow="Coverage"
          title={`${totalTechnologies} technologies under one operating model`}
          lede="Breadth is the point. An automation platform that covers only the modern half of your estate leaves the risky half exactly where it was."
          actions={
            <ButtonLink href="/integrations" variant="link" iconRight="arrowRight">
              Browse all integrations
            </ButtonLink>
          }
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <TechMatrix />
        </div>
      </Section>

      {/* ------------------------------------------------------ Integrations */}
      <Section tone="inset" size="sm">
        <SectionHead
          align="center"
          eyebrow="Integrations"
          title="Fits the stack you already operate"
          lede="Certified connectors for the systems that own your change records, your secrets, your pipelines and your telemetry."
        />
        <div style={{ marginTop: 'var(--space-10)' }}>
          <IntegrationGrid items={integrations.filter((i) => i.featured)} />
        </div>
      </Section>

      {/* ------------------------------------------------------- Testimonials */}
      <Section>
        <SectionHead
          eyebrow="Customers"
          title="Estates that stopped waiting on change windows"
          lede="Banking, insurance, healthcare, telecommunications and manufacturing — organisations where an unplanned outage is a regulatory event, not an inconvenience."
          actions={
            <ButtonLink href="/case-studies" variant="link" iconRight="arrowRight">
              Read the case studies
            </ButtonLink>
          }
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <Testimonials limit={3} />
        </div>
      </Section>

      {/* --------------------------------------------------------------- FAQ */}
      <Section tone="panel" size="sm">
        <div className="faq-layout">
          <SectionHead
            eyebrow="Common questions"
            title="Answers before the first call"
            lede="The three questions that come up in almost every evaluation."
          />
          <div className="faq-list">
            {homeFaq.map((item) => (
              <div key={item.question} className="faq-item" data-reveal>
                <h3 className="faq-item__q">
                  <Icon name="alertCircle" size={16} />
                  {item.question}
                </h3>
                <p className="faq-item__a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <Section size="sm">
        <CtaBand />
      </Section>
    </PageShell>
  );
}
