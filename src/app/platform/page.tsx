import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import {
  ButtonLink,
  Icon,
  Section,
  SectionHead,
  Badge,
} from '@/components/primitives';
import {
  CtaBand,
  FeatureGrid,
  Split,
  Testimonials,
} from '@/components/marketing/sections';
import { CustomerLogos } from '@/components/marketing/CustomerLogos';
import { ControlPlaneConsole } from '@/components/visualizations/ControlPlaneConsole';
import { ArchitectureDiagram } from '@/components/visualizations/ArchitectureDiagram';
import { WorkflowCanvas } from '@/components/visualizations/WorkflowCanvas';
import { PolicyPanel } from '@/components/visualizations/PolicyPanel';
import { CopilotPanel } from '@/components/visualizations/CopilotPanel';
import { RiskGauge } from '@/components/visualizations/RiskGauge';
import {
  TopologyGraph,
  paymentsEstate,
} from '@/components/visualizations/TopologyGraph';
import { pillars } from '@/content/platform';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const RISK_FACTORS = [
  { label: 'Comparable prior changes', value: '4,206', weight: 'Strong evidence' },
  { label: 'Failure rate in comparable set', value: '0.4%', weight: 'Low' },
  { label: 'Blast radius', value: '238 of 21,662', weight: 'Contained' },
  { label: 'Rollback rehearsed', value: '4h ago', weight: 'Verified' },
  { label: 'Change volume in window', value: '3 concurrent', weight: 'Normal' },
];

export default function PlatformPage() {
  return (
    <PageShell
      current="/platform"
      breadcrumbs={[{ label: 'Platform', href: '/platform' }]}
    >
      <PageIntro
        eyebrow="Platform"
        title={
          <>
            One control plane for the{' '}
            <span className="text-gradient">entire infrastructure lifecycle</span>
          </>
        }
        lede="Infrapilot discovers what you run, models how it connects, and executes change against that model under policy you control. Four capabilities, deployed as one system, operated by one team."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Read the architecture', href: '#architecture' }}
        stats={[
          { value: '48h', label: 'To a complete estate inventory' },
          { value: '180+', label: 'Certified integrations' },
          { value: '99.98%', label: 'Automated change success rate' },
          { value: '0', label: 'Credentials stored by the platform' },
        ]}
      />

      <Section size="sm" tightTop id="tour">
        <div data-reveal="scale">
          <ControlPlaneConsole />
        </div>
        <CustomerLogos limit={7} label="Operating production estates at" />
      </Section>

      {/* ------------------------------------------------------------ Pillars */}
      <Section tone="panel" id="discovery">
        <Split
          eyebrow={pillars[0].eyebrow}
          title={pillars[0].title}
          body={pillars[0].body}
          points={pillars[0].points}
          cta={{ label: 'See discovery in the demo', href: '/#demos' }}
          visual={
            <div className="viz-frame ticked">
              <div className="viz-frame__head">
                <span>Impact analysis · pay-sql-01</span>
                <span className="viz-frame__meta" data-numeric>
                  14 services affected
                </span>
              </div>
              <div className="viz-frame__body">
                <TopologyGraph
                  nodes={paymentsEstate.nodes}
                  edges={paymentsEstate.edges}
                  width={680}
                  height={340}
                  idPrefix="plat-topo"
                />
              </div>
              <div className="viz-frame__foot">
                <span>
                  <Icon name="network" size={13} />
                  Rebuilt every 15 minutes
                </span>
                <span>
                  <Icon name="eye" size={13} />
                  Evidence on every edge
                </span>
              </div>
            </div>
          }
        />
      </Section>

      <Section id="workflow">
        <Split
          reverse
          eyebrow={pillars[1].eyebrow}
          title={pillars[1].title}
          body={pillars[1].body}
          points={pillars[1].points}
          cta={{ label: 'Browse the module catalogue', href: '/products' }}
          visual={<WorkflowCanvas />}
        />

        <div style={{ marginTop: 'var(--space-16)' }}>
          <FeatureGrid
            columns={4}
            items={[
              {
                icon: 'refresh',
                title: 'Durable execution',
                body: 'A run survives control-plane restarts, network partitions and runner failure. It resumes from the last completed step rather than starting again.',
              },
              {
                icon: 'gitBranch',
                title: 'Versioned as code',
                body: 'Every workflow, policy and runbook lives in Git. Changes arrive as pull requests and are reviewable as diffs.',
              },
              {
                icon: 'users',
                title: 'Human tasks in-line',
                body: 'Approvals, manual verifications and business sign-off are steps in the workflow, not an out-of-band email thread.',
              },
              {
                icon: 'rewind',
                title: 'Deterministic replay',
                body: 'Any past run can be replayed step by step with its exact inputs, which is what makes post-incident review tractable.',
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="inset" id="policy">
        <Split
          eyebrow={pillars[2].eyebrow}
          title={pillars[2].title}
          body={pillars[2].body}
          points={pillars[2].points}
          cta={{ label: 'Read the security model', href: '/security' }}
          visual={<PolicyPanel />}
        />
      </Section>

      {/* --------------------------------------------------------- Intelligence */}
      <Section id="copilot">
        <Split
          reverse
          eyebrow={pillars[3].eyebrow}
          title={pillars[3].title}
          body={pillars[3].body}
          points={pillars[3].points}
          cta={{ label: 'See root cause analysis run', href: '/#demos' }}
          visual={<CopilotPanel />}
        />
      </Section>

      <Section tone="panel" id="risk">
        <div className="split">
          <div className="split__copy" data-reveal="left">
            <span className="eyebrow">Risk prediction</span>
            <h2 className="split__title">
              Every change carries a score, and the score shows its working
            </h2>
            <p className="split__body">
              Risk is modelled from your own change history — how often changes of
              this shape, against this class of asset, in this window, have failed
              before. A number nobody can interrogate is a number nobody will trust,
              so each contributing factor is listed with its weight.
            </p>
            <p className="split__body">
              Policy consumes the score directly. Low-risk, well-precedented change
              can be pre-authorised; anything above your threshold routes to a human
              with the evidence already attached.
            </p>
            <div>
              <ButtonLink href="/products#approval" variant="outline" iconRight="arrowRight">
                See the approval engine
              </ButtonLink>
            </div>
          </div>

          <div className="split__visual" data-reveal="right">
            <div className="viz-frame ticked">
              <div className="viz-frame__head">
                <span>Change risk · CHG0048812</span>
                <Badge tone="success" dot>
                  Below threshold
                </Badge>
              </div>
              <div className="risk-panel">
                <div className="risk-panel__gauge">
                  <RiskGauge score={18} size={148} label="Risk" idPrefix="plat-risk" />
                  <span className="risk-panel__band">Low · limit 40</span>
                </div>
                <ul className="risk-panel__factors">
                  {RISK_FACTORS.map((factor) => (
                    <li key={factor.label}>
                      <span className="risk-panel__factor-label">{factor.label}</span>
                      <span className="risk-panel__factor-value" data-numeric>
                        {factor.value}
                      </span>
                      <span className="risk-panel__factor-weight">{factor.weight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="viz-frame__foot">
                <span>
                  <Icon name="target" size={13} />
                  Model retrained nightly on your history
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- Digital twin */}
      <Section id="twin" tone="inset">
        <SectionHead
          align="center"
          eyebrow="Infrastructure digital twin"
          title="Rehearse the change before it touches production"
          lede="The knowledge graph is a model you can execute against. Run the workflow in simulation, see which assertions would fail, and fix the plan before the window opens."
        />
        <FeatureGrid
          columns={3}
          items={[
            {
              icon: 'box',
              title: 'Simulated execution',
              body: 'Every step runs against the modelled estate, producing the same wave plan, the same gates and the same predicted duration — without touching a host.',
            },
            {
              icon: 'compass',
              title: 'What-if analysis',
              body: 'Change a constraint — a shorter window, a node out for maintenance, a frozen region — and see how the plan reshapes before you commit to it.',
            },
            {
              icon: 'chartBar',
              title: 'Capacity projection',
              body: 'Model growth against current trend to find the month a cluster runs out of headroom, and raise the remediation as planned work rather than an incident.',
            },
          ]}
        />
      </Section>

      {/* -------------------------------------------------------- Architecture */}
      <Section id="architecture">
        <SectionHead
          eyebrow="Reference architecture"
          title="Where each part runs, and what crosses the boundary"
          lede="Infrapilot deploys as a self-hosted control plane or a dedicated single-tenant instance. In both models, runners live in your network, connect outbound only, and hold no long-lived credentials."
          actions={
            <ButtonLink href="/security" variant="link" iconRight="arrowRight">
              Full security documentation
            </ButtonLink>
          }
        />
        <div style={{ marginTop: 'var(--space-12)' }}>
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section tone="panel" size="sm">
        <SectionHead
          eyebrow="In production"
          title="What teams say after the first quarter"
        />
        <div style={{ marginTop: 'var(--space-10)' }}>
          <Testimonials limit={3} />
        </div>
      </Section>

      <Section size="sm">
        <CtaBand
          title="Bring your hardest change window"
          body="The most useful proof of concept is the one your team is dreading. We will scope it, model it, and run it with your approvals in the loop."
        />
      </Section>
    </PageShell>
  );
}
