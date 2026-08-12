import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Section, SectionHead } from '@/components/primitives';
import {
  CtaBand,
  ModuleGrid,
  StageHeader,
} from '@/components/marketing/sections';
import { modules, stageMeta, type ModuleStage } from '@/content/platform';
import { toNextMetadata } from '@/lib/seo';
import { meta } from './meta';

const STAGES: ModuleStage[] = ['discover', 'build', 'operate', 'govern'];

export const metadata = toNextMetadata(meta);

export default function ProductsPage() {
  return (
    <PageShell
      current="/products"
      breadcrumbs={[{ label: 'Products', href: '/products' }]}
    >
      <PageIntro
        eyebrow="Products"
        title={
          <>
            Twenty-eight modules.{' '}
            <span className="text-gradient">One control plane.</span>
          </>
        }
        lede="Start with the part of the estate that hurts most. Every module shares the same discovery data, the same policy engine and the same audit record, so expanding scope never means re-platforming."
        primary={{ label: 'Book demo', href: '/book-demo' }}
        secondary={{ label: 'Compare plans', href: '/pricing' }}
        stats={[
          { value: '28', label: 'Product modules' },
          { value: '4', label: 'Lifecycle stages' },
          { value: '77', label: 'Supported technologies' },
          { value: '1', label: 'Deployment to operate them' },
        ]}
      />

      <Section size="sm" tightTop>
        <div className="stage-nav">
          {STAGES.map((stage) => (
            <a key={stage} href={`#${stage}`} className="stage-nav__item">
              <span className="stage-nav__label">{stageMeta[stage].label}</span>
              <span className="stage-nav__count" data-numeric>
                {modules.filter((m) => m.stage === stage).length}
              </span>
            </a>
          ))}
        </div>
      </Section>

      {STAGES.map((stage, index) => (
        <Section
          key={stage}
          id={stage}
          tone={index % 2 === 1 ? 'panel' : 'default'}
          size="sm"
        >
          <StageHeader stage={stage} />
          <ModuleGrid stage={stage} />
        </Section>
      ))}

      <Section tone="inset" size="sm">
        <SectionHead
          align="center"
          eyebrow="Deployment"
          title="Adopt in the order that suits your risk appetite"
          lede="Most organisations begin with discovery and a single automation domain, prove the control model, then widen scope one estate at a time."
        />
        <ol className="adoption">
          {[
            {
              phase: 'Weeks 1–2',
              title: 'Discover',
              body: 'Deploy the control plane and a runner. Complete inventory and dependency map for the agreed scope, reconciled against your CMDB.',
            },
            {
              phase: 'Weeks 3–6',
              title: 'Automate one domain',
              body: 'Pick the highest-friction workflow — usually patching or provisioning — and take it from manual runbook to governed automation with your approvals in place.',
            },
            {
              phase: 'Quarter 2',
              title: 'Widen the estate',
              body: 'Extend coverage across engines and regions. Policy, approvals and audit are already defined, so each new domain inherits the control model.',
            },
            {
              phase: 'Quarter 3 onward',
              title: 'Move to unattended',
              body: 'Promote well-precedented, low-risk change to policy-bounded self-healing. Human attention moves to the changes that actually warrant it.',
            },
          ].map((step, index) => (
            <li key={step.title} className="adoption__step" data-reveal>
              <span className="adoption__index" data-numeric>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="adoption__phase">{step.phase}</span>
                <h3 className="adoption__title">{step.title}</h3>
                <p className="adoption__body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section size="sm">
        <CtaBand
          eyebrow="Next step"
          title="Which module would you start with?"
          body="Tell us the workflow that costs your team the most hours this quarter. We will show you exactly how it looks once it is automated, using your own estate as the example."
        />
      </Section>
    </PageShell>
  );
}
