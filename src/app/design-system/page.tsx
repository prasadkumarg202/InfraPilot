import { PageShell } from '@/components/layout/PageShell';
import { PageIntro } from '@/components/marketing/PageIntro';
import {
  Section,
  SectionHead,
  Button,
  ButtonLink,
  Badge,
  Card,
  Alert,
  Icon,
  Stat,
  iconNames,
} from '@/components/primitives';
import { Accordion } from '@/components/marketing/Accordion';
import { RiskGauge } from '@/components/visualizations/RiskGauge';
import { Island } from '@/lib/islands';
import { toNextMetadata } from '@/lib/seo';
import { designSystemFaq } from '@/content/faq';
import { meta } from './meta';

export const metadata = toNextMetadata(meta);

const TYPE_SCALE = [
  { token: '--text-7xl', label: 'Display', sample: 'Autonomous operations' },
  { token: '--text-5xl', label: 'Page title', sample: 'One control plane' },
  { token: '--text-4xl', label: 'Section title', sample: 'Four capabilities' },
  { token: '--text-2xl', label: 'Card title', sample: 'Patch orchestration' },
  { token: '--text-lg', label: 'Lede', sample: 'Automate discovery and provisioning' },
  { token: '--text-md', label: 'Body', sample: 'Automation is only as safe as the map it works from.' },
  { token: '--text-sm', label: 'Caption', sample: 'Modelled on 4,206 comparable prior changes' },
  { token: '--text-2xs', label: 'Eyebrow', sample: 'DEPENDENCY TOPOLOGY' },
];

const NEUTRALS = ['--bg-canvas', '--bg-base', '--bg-subtle', '--bg-surface', '--bg-raised', '--bg-overlay'];
const ACCENTS = ['--ion-300', '--ion-400', '--ion-500', '--ion-700', '--arc-300', '--arc-400', '--arc-600'];
const STATUS = ['--success-400', '--warning-400', '--danger-400', '--info-400'];
const CHARTS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5', '--chart-6', '--chart-7', '--chart-8'];
const SPACING = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'];

export default function DesignSystemPage() {
  return (
    <PageShell
      current="/design-system"
      breadcrumbs={[{ label: 'Design system', href: '/design-system' }]}
    >
      <PageIntro
        eyebrow="Design system"
        title={
          <>
            The tokens and components{' '}
            <span className="text-gradient">this site is built from</span>
          </>
        }
        lede="One source of visual truth, consumed by both the marketing site and the product console. Nothing below is a mockup — every element on this page is the live component."
        stats={[
          { value: '2', label: 'Themes, independently authored' },
          { value: '68', label: 'Icons on a single grid' },
          { value: '8', label: 'Chart colours, contrast-checked' },
          { value: 'AA', label: 'WCAG 2.2 conformance target' },
        ]}
      />

      {/* ------------------------------------------------------------- Colour */}
      <Section size="sm" tightTop>
        <SectionHead
          eyebrow="Colour"
          title="Semantic tokens, not raw values"
          lede="Components never reference a hex value. They reference a semantic token, which resolves per theme — which is what makes a second theme a data change rather than a rewrite."
        />
        <div className="ds-swatch-groups">
          {[
            { name: 'Surfaces', tokens: NEUTRALS },
            { name: 'Brand accents', tokens: ACCENTS },
            { name: 'Status', tokens: STATUS },
            { name: 'Categorical chart ramp', tokens: CHARTS },
          ].map((group) => (
            <div key={group.name} className="ds-swatch-group">
              <p className="docs__nav-title">{group.name}</p>
              <div className="ds-swatches">
                {group.tokens.map((token) => (
                  <div key={token} className="ds-swatch">
                    <span
                      className="ds-swatch__chip"
                      style={{ background: `var(${token})` }}
                    />
                    <code>{token}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Typography */}
      <Section tone="panel">
        <SectionHead
          eyebrow="Typography"
          title="Inter Variable, with optical sizing"
          lede="Headlines use the display optical size so apertures tighten as type grows — the difference between a headline that was drawn and one that was scaled. Numerals are tabular everywhere a value can change."
        />
        <div className="ds-type">
          {TYPE_SCALE.map((entry) => (
            <div key={entry.token} className="ds-type__row">
              <div className="ds-type__meta">
                <code>{entry.token}</code>
                <span>{entry.label}</span>
              </div>
              <p
                className="ds-type__sample"
                style={{ fontSize: `var(${entry.token})` }}
              >
                {entry.sample}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ Spacing */}
      <Section>
        <SectionHead
          eyebrow="Spacing & grid"
          title="A 4px base, named by step"
          lede="Steps are referenced by name rather than by pixel value so the scale can be retuned without a find-and-replace across the codebase."
        />
        <div className="ds-spacing">
          {SPACING.map((step) => (
            <div key={step} className="ds-spacing__row">
              <code>--space-{step}</code>
              <span
                className="ds-spacing__bar"
                style={{ width: `var(--space-${step})` }}
              />
              <span className="ds-spacing__value" data-numeric>
                {Number(step) * 4}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------- Components */}
      <Section tone="inset">
        <SectionHead eyebrow="Components" title="The primitive layer" />

        <div className="ds-grid">
          <div className="ds-panel">
            <p className="docs__nav-title">Buttons</p>
            <div className="ds-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="ds-row">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="ds-row">
              <Button iconLeft="play">With leading icon</Button>
              <Button iconRight="arrowRight" animateIcon>
                With trailing icon
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Badges</p>
            <div className="ds-row">
              <Badge tone="accent">Accent</Badge>
              <Badge tone="violet">Violet</Badge>
              <Badge tone="success" dot>
                Success
              </Badge>
              <Badge tone="warning" dot>
                Warning
              </Badge>
              <Badge tone="danger" dot>
                Danger
              </Badge>
              <Badge tone="info">Info</Badge>
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="outline">Outline</Badge>
              <Badge tone="success" live>
                Live
              </Badge>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Alerts</p>
            <div className="stack">
              <Alert tone="info" title="Informational">
                Runners connect outbound only. No inbound firewall rules are required.
              </Alert>
              <Alert tone="success" title="Change complete">
                2,102 of 2,104 instances patched. Two rolled back automatically and
                re-queued.
              </Alert>
              <Alert tone="warning" title="Approaching freeze">
                Production change freeze begins in six days.
              </Alert>
              <Alert tone="danger" title="Health gate failed">
                Replication lag exceeded threshold on two nodes. Wave halted.
              </Alert>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Form controls</p>
            <div className="stack">
              <div className="field">
                <label className="label" htmlFor="ds-input">
                  Work email<span className="label__required">*</span>
                </label>
                <input className="input" id="ds-input" placeholder="you@company.com" />
                <span className="field__hint">Used only to respond to your enquiry.</span>
              </div>
              <div className="field">
                <label className="label" htmlFor="ds-select">
                  Estate size
                </label>
                <select className="select" id="ds-select" defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under 500 nodes</option>
                  <option>500 – 2,500 nodes</option>
                  <option>Over 2,500 nodes</option>
                </select>
              </div>
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                <span>Send the security pack as well</span>
              </label>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Cards</p>
            <div className="grid grid--2">
              <Card interactive edge spotlight>
                <span className="icon-plate">
                  <Icon name="workflow" size={20} />
                </span>
                <h3 className="card__title">Interactive card</h3>
                <p className="card__body">
                  Lifts three pixels on hover with a gradient edge and a cursor-tracking
                  spotlight.
                </p>
              </Card>
              <Card variant="glass">
                <span className="icon-plate icon-plate--violet">
                  <Icon name="sparkles" size={20} />
                </span>
                <h3 className="card__title">Glass card</h3>
                <p className="card__body">
                  Backdrop blur with saturation lift, for surfaces that sit over the
                  ambient field.
                </p>
              </Card>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Data display</p>
            <div className="ds-row" style={{ alignItems: 'center', gap: 'var(--space-8)' }}>
              <Stat
                value="99.98%"
                label="Change success rate"
                delta={{ value: '0.4pt', direction: 'up' }}
              />
              <Stat
                value="4h 12m"
                label="Median patch window"
                delta={{ value: '38%', direction: 'down' }}
              />
              <RiskGauge score={18} size={104} label="Risk" idPrefix="ds-g1" />
              <RiskGauge score={62} size={104} label="Risk" idPrefix="ds-g2" />
              <RiskGauge score={88} size={104} label="Risk" idPrefix="ds-g3" />
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Table</p>
            <div className="table-wrap">
              <table className="table table--compact">
                <thead>
                  <tr>
                    <th scope="col">Instance</th>
                    <th scope="col">Engine</th>
                    <th scope="col">Wave</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="table__cell--num">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['pay-sql-01', 'SQL Server 2022', 'EMEA · 1', 'success', '6m 31s'],
                    ['ledger-ora', 'Oracle 19c RAC', 'EMEA · 1', 'warning', '11m 04s'],
                    ['cache-01', 'Redis 7.2', 'EMEA · 2', 'success', '48s'],
                    ['pay-api-b', 'Tomcat 10', 'AMER · 1', 'danger', '2m 12s'],
                  ].map(([name, engine, wave, status, duration]) => (
                    <tr key={name}>
                      <td className="table__cell--primary text-mono">{name}</td>
                      <td>{engine}</td>
                      <td className="text-mono">{wave}</td>
                      <td>
                        <Badge
                          tone={
                            status === 'success'
                              ? 'success'
                              : status === 'warning'
                                ? 'warning'
                                : 'danger'
                          }
                          dot
                        >
                          {status === 'success'
                            ? 'Complete'
                            : status === 'warning'
                              ? 'Retried'
                              : 'Rolled back'}
                        </Badge>
                      </td>
                      <td className="table__cell--num text-mono">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ds-panel">
            <p className="docs__nav-title">Accordion</p>
            <Island name="Accordion" props={{ items: designSystemFaq, idPrefix: 'ds', defaultOpen: [0] }}>
              <Accordion items={designSystemFaq} idPrefix="ds" defaultOpen={[0]} />
            </Island>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Icons */}
      <Section tone="panel">
        <SectionHead
          eyebrow="Iconography"
          title={`${iconNames.length} icons on one grid`}
          lede="Drawn on a 24×24 grid with a 1.6 stroke, round caps and round joins. Stroke inherits currentColor, so an icon takes the colour of whatever it sits in."
        />
        <div className="ds-icons">
          {iconNames.map((name) => (
            <div key={name} className="ds-icon">
              <Icon name={name} size={22} />
              <code>{name}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ Accessibility */}
      <Section>
        <SectionHead
          eyebrow="Accessibility"
          title="Rules that are enforced, not aspired to"
        />
        <div className="assurance-grid">
          {[
            { icon: 'eye' as const, title: 'Contrast', body: 'Body text clears 7:1 against its background in both themes; secondary text clears 4.5:1. Chart colours are checked for adjacent-hue separation, not just contrast.' },
            { icon: 'grid' as const, title: 'Targets', body: 'Interactive targets are at least 44×44 CSS pixels on touch pointers, with hit areas extended beyond the visible bounds where the visual would otherwise be too small.' },
            { icon: 'key' as const, title: 'Keyboard', body: 'Every interactive element is reachable and operable by keyboard. Focus rings appear for keyboard users only, so pointer interaction stays clean.' },
            { icon: 'pause' as const, title: 'Motion', body: 'Ambient animation stops entirely under prefers-reduced-motion; state transitions collapse to near-instant so interfaces still read as responsive.' },
          ].map((item) => (
            <div key={item.title} className="assurance">
              <span className="icon-plate icon-plate--sm">
                <Icon name={item.icon} size={16} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-10)' }}>
          <ButtonLink href="/docs" variant="outline" iconRight="arrowRight">
            Component documentation
          </ButtonLink>
        </div>
      </Section>
    </PageShell>
  );
}
