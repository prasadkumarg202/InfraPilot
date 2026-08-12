import { Icon, Badge, type IconName } from '@/components/primitives';
import { TopologyGraph, paymentsEstate } from './TopologyGraph';
import { RiskGauge } from './RiskGauge';
import { cx } from '@/lib/utils';

/**
 * Control-plane console.
 *
 * The hero product shot. Every panel is real markup rather than a screenshot,
 * so it stays crisp at any density, respects the active theme, and animates
 * without loading a video. Data is fixed sample data from a payments estate
 * change window — the same estate used on the platform page, so the story
 * stays continuous as a visitor moves through the site.
 */

const ESTATE_TREE: Array<{
  label: string;
  icon: IconName;
  count: string;
  active?: boolean;
  children?: Array<{ label: string; count: string; state?: 'ok' | 'run' | 'warn' }>;
}> = [
  {
    label: 'Databases',
    icon: 'database',
    count: '4,812',
    active: true,
    children: [
      { label: 'SQL Server', count: '2,104', state: 'run' },
      { label: 'Oracle', count: '1,286', state: 'warn' },
      { label: 'PostgreSQL', count: '918', state: 'ok' },
      { label: 'MongoDB', count: '504', state: 'ok' },
    ],
  },
  { label: 'Operating systems', icon: 'server', count: '12,904' },
  { label: 'Middleware', icon: 'layers', count: '3,118' },
  { label: 'Kubernetes', icon: 'container', count: '642' },
  { label: 'Cloud accounts', icon: 'cloud', count: '186' },
];

const RUN_STEPS = [
  { label: 'Pre-flight validation', status: 'done', duration: '2m 14s' },
  { label: 'Snapshot & backup verify', status: 'done', duration: '11m 02s' },
  { label: 'Drain traffic from node B', status: 'done', duration: '48s' },
  { label: 'Apply CU19 + OS rollup', status: 'running', duration: '06m 31s' },
  { label: 'Post-patch health checks', status: 'pending', duration: '~4m' },
  { label: 'Return to service', status: 'pending', duration: '~1m' },
];

const EVENT_FEED = [
  { time: '02:14:08', kind: 'ok', text: 'pay-sql-01 · availability group failover verified' },
  { time: '02:13:44', kind: 'ai', text: 'Copilot re-sequenced 3 nodes to protect quorum' },
  { time: '02:12:19', kind: 'ok', text: 'edge-lb-02 · connections drained (0 active)' },
  { time: '02:11:57', kind: 'warn', text: 'ledger-ora · replication lag 4.2s — within threshold' },
  { time: '02:10:03', kind: 'ok', text: 'Change CHG0048812 approved by CAB policy' },
];

const TIMELINE_LANES = [
  { label: 'EMEA · wave 1', segments: [{ w: 34, tone: 'done' }, { w: 12, tone: 'run' }, { w: 54, tone: 'idle' }] },
  { label: 'EMEA · wave 2', segments: [{ w: 22, tone: 'done' }, { w: 10, tone: 'run' }, { w: 68, tone: 'idle' }] },
  { label: 'AMER · wave 1', segments: [{ w: 58, tone: 'done' }, { w: 8, tone: 'warn' }, { w: 34, tone: 'idle' }] },
  { label: 'APAC · wave 1', segments: [{ w: 76, tone: 'done' }, { w: 24, tone: 'idle' }] },
];

export function ControlPlaneConsole({ className }: { className?: string }) {
  return (
    <div className={cx('console', className)}>
      <div className="console__frame ticked">
        {/* ------------------------------------------------------ Title bar */}
        <div className="console__titlebar">
          <div className="console__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <nav className="console__crumbs" aria-label="Console location">
            <span>Production</span>
            <Icon name="chevronRight" size={11} />
            <span>Change window</span>
            <Icon name="chevronRight" size={11} />
            <strong>CW-2841 · Q3 database rollup</strong>
          </nav>
          <div className="console__titlebar-right">
            <span className="console__clock" data-numeric>
              02:14:11 UTC
            </span>
            <Badge tone="success" live>
              Executing
            </Badge>
          </div>
        </div>

        {/* ---------------------------------------------------------- Body */}
        <div className="console__body">
          {/* Icon rail */}
          <div className="console__rail" role="presentation">
            {(['grid', 'network', 'workflow', 'shieldCheck', 'chartBar', 'settings'] as IconName[]).map(
              (icon, i) => (
                <span key={icon} className={cx('console__rail-item', i === 1 && 'is-active')}>
                  <Icon name={icon} size={17} />
                </span>
              ),
            )}
          </div>

          {/* Estate tree */}
          <aside className="console__panel console__panel--tree">
            <div className="console__panel-head">
              <span>Estate</span>
              <span className="console__count" data-numeric>
                21,662
              </span>
            </div>
            <ul className="console__tree">
              {ESTATE_TREE.map((group) => (
                <li key={group.label}>
                  <span className={cx('console__tree-row', group.active && 'is-active')}>
                    <Icon name={group.icon} size={15} />
                    <span className="console__tree-label">{group.label}</span>
                    <span className="console__tree-count" data-numeric>
                      {group.count}
                    </span>
                  </span>
                  {group.children && (
                    <ul className="console__subtree">
                      {group.children.map((child) => (
                        <li key={child.label}>
                          <span className="console__tree-row console__tree-row--child">
                            <span className={cx('console__dot', `is-${child.state}`)} />
                            <span className="console__tree-label">{child.label}</span>
                            <span className="console__tree-count" data-numeric>
                              {child.count}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Topology + timeline */}
          <div className="console__main">
            <div className="console__panel console__panel--graph">
              <div className="console__panel-head">
                <span>Dependency topology</span>
                <span className="console__legend">
                  <span className="console__legend-item">
                    <i className="is-complete" /> Complete
                  </span>
                  <span className="console__legend-item">
                    <i className="is-inflight" /> In flight
                  </span>
                  <span className="console__legend-item">
                    <i className="is-target" /> Queued
                  </span>
                  <span className="console__legend-item">
                    <i className="is-risk" /> Attention
                  </span>
                </span>
              </div>
              <div className="console__graph">
                <TopologyGraph
                  nodes={paymentsEstate.nodes}
                  edges={paymentsEstate.edges}
                  width={780}
                  height={352}
                  idPrefix="hero"
                />
              </div>
            </div>

            <div className="console__panel console__panel--timeline">
              <div className="console__panel-head">
                <span>Execution waves</span>
                <span className="console__count" data-numeric>
                  1,284 / 2,104 instances
                </span>
              </div>
              <div className="console__lanes">
                {TIMELINE_LANES.map((lane) => (
                  <div key={lane.label} className="console__lane">
                    <span className="console__lane-label">{lane.label}</span>
                    <span className="console__lane-track">
                      {lane.segments.map((segment, i) => (
                        <i
                          key={i}
                          className={`is-${segment.tone}`}
                          style={{ width: `${segment.w}%` }}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Run detail */}
          <aside className="console__panel console__panel--run">
            <div className="console__panel-head">
              <span>Run 9F2C</span>
              <Badge tone="accent">Automated</Badge>
            </div>

            <div className="console__risk">
              <RiskGauge score={18} idPrefix="hero-risk" size={92} />
              <div className="console__risk-meta">
                <span className="console__risk-title">Change risk</span>
                <span className="console__risk-value">Low · 18/100</span>
                <span className="console__risk-note">
                  Modelled on 4,206 comparable prior changes
                </span>
              </div>
            </div>

            <ol className="console__steps">
              {RUN_STEPS.map((step) => (
                <li key={step.label} className={`is-${step.status}`}>
                  <span className="console__step-marker" aria-hidden="true" />
                  <span className="console__step-label">{step.label}</span>
                  <span className="console__step-time" data-numeric>
                    {step.duration}
                  </span>
                </li>
              ))}
            </ol>

            <div className="console__feed">
              <p className="console__feed-title">Live events</p>
              <ul>
                {EVENT_FEED.map((event) => (
                  <li key={event.time} className={`is-${event.kind}`}>
                    <span className="console__feed-time" data-numeric>
                      {event.time}
                    </span>
                    <span className="console__feed-text">{event.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Reflection under the console — anchors it to the page. */}
      <div className="console__reflection" aria-hidden="true" />
    </div>
  );
}
