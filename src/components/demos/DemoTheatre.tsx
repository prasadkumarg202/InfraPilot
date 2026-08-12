'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { demoScenarios, type DemoScenario } from '@/content/demos';
import { Badge, Icon } from '@/components/primitives';
import { TopologyGraph, paymentsEstate } from '@/components/visualizations/TopologyGraph';
import { cx, seededRandom, round } from '@/lib/utils';

/**
 * Demo theatre.
 *
 * Plays a scripted run of a real workflow. Each scenario is a sequence of
 * phases; the player emits one log line at a time and drives a scenario
 * specific visual from the same progress value, so the log, the progress bar
 * and the picture can never disagree.
 *
 * Autoplay starts only once the component is on screen and stops when it
 * leaves, so a page with several demos never runs timers the visitor can't see.
 */

const LINE_MS = 900;

export function DemoTheatre({ initial = 0 }: { initial?: number }) {
  const [active, setActive] = useState(initial);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLOListElement>(null);

  const scenario = demoScenarios[active];

  /** Flattened log stream so the player has one linear index to advance. */
  const stream = useMemo(() => {
    const out: Array<{
      phase: number;
      phaseId: string;
      text: string;
      tone: string;
    }> = [];
    scenario.phases.forEach((phase, phaseIndex) => {
      phase.logs.forEach((log) => {
        out.push({ phase: phaseIndex, phaseId: phase.id, text: log.text, tone: log.tone });
      });
    });
    return out;
  }, [scenario]);

  const total = stream.length;
  const finished = step >= total;
  const progress = total ? Math.min(step / total, 1) : 0;
  const currentPhase = finished
    ? scenario.phases.length - 1
    : (stream[Math.floor(step)]?.phase ?? 0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Autoplay once, the first time the theatre scrolls into view.
  const startedRef = useRef(false);
  useEffect(() => {
    if (visible && !startedRef.current) {
      startedRef.current = true;
      setPlaying(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!playing || !visible || finished) return;
    
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStep(total);
      setPlaying(false);
      return;
    }

    let frameId: number;
    let lastTime = performance.now();
    
    const tick = (time: number) => {
      const deltaMs = time - lastTime;
      lastTime = time;
      
      setStep((prevStep) => {
        // Convert the smooth delta into a fractional step increase
        // 1 step = LINE_MS milliseconds
        const newStep = prevStep + (deltaMs / LINE_MS);
        if (newStep >= total) {
          setPlaying(false);
          return total;
        }
        return newStep;
      });
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [playing, visible, finished, total]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step]);

  const select = useCallback((index: number) => {
    setActive(index);
    setStep(0);
    setPlaying(true);
  }, []);

  const restart = useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);

  return (
    <div className="theatre" ref={rootRef}>
      {/* -------------------------------------------------------- Scenarios */}
      <div className="theatre__tabs" role="tablist" aria-label="Demo scenarios">
        {demoScenarios.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`demo-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`demo-panel-${item.id}`}
            className={cx('theatre__tab', index === active && 'is-active')}
            onClick={() => select(index)}
          >
            <span className="theatre__tab-icon">
              <Icon name={item.icon} size={17} />
            </span>
            <span className="theatre__tab-text">
              <span className="theatre__tab-name">{item.name}</span>
              <span className="theatre__tab-line">{item.tagline}</span>
            </span>
          </button>
        ))}
      </div>

      {/* ----------------------------------------------------------- Stage */}
      <div
        className="theatre__stage"
        role="tabpanel"
        id={`demo-panel-${scenario.id}`}
        aria-labelledby={`demo-tab-${scenario.id}`}
      >
        <header className="theatre__head">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="theatre__title">{scenario.name}</h3>
              {scenario.film && (
                <span className="badge badge--accent" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                  🎬 {scenario.film}
                </span>
              )}
            </div>
            <p className="theatre__scope">{scenario.scope}</p>
          </div>
          <div className="theatre__controls">
            <Badge tone={finished ? 'success' : 'accent'} live={!finished && playing}>
              {finished ? 'Complete' : playing ? 'Running' : 'Paused'}
            </Badge>
            <button
              type="button"
              className="btn btn--ghost btn--icon btn--sm"
              onClick={() => (finished ? restart() : setPlaying((p) => !p))}
              aria-label={finished ? 'Replay' : playing ? 'Pause' : 'Play'}
            >
              <Icon name={finished ? 'refresh' : playing ? 'pause' : 'play'} size={16} />
            </button>
          </div>
        </header>

        <p className="theatre__description">{scenario.description}</p>

        {/* Cinematic Film Player Screen */}
        <div className="film-player">
          <div className="film-player__canvas">
            <div className="film-player__hud-top">
              <span className="film-player__live">
                <i className="film-player__dot" /> PLAYBACK · 1280×720 HD
              </span>
              <span className="film-player__phase-name">
                PHASE {currentPhase + 1} OF {scenario.phases.length}: {scenario.phases[currentPhase]?.label}
              </span>
            </div>

            <div className="film-player__scene">
              <ScenarioVisual scenario={scenario} progress={progress} />
            </div>

            {/* Floating Design Mode "Tweaks" Menu as seen in original Claude Artifact */}
            <div className="film-design-tweaks">
              <div className="film-design-tweaks__head">Tweaks</div>
              <button className="film-design-tweaks__btn">TIMELINE</button>
              <button className="film-design-tweaks__btn">Motion editor</button>
            </div>

            {/* Live Ticker Overlay at bottom of film screen */}
            <div className="film-player__hud-bottom">
              <div className="film-player__ticker">
                <span className="film-player__ticker-time">{timeStamp(Math.floor(step) > 0 ? Math.floor(step) - 1 : 0)}</span>
                <span className="film-player__ticker-text">
                  {stream[Math.floor(step) > 0 ? Math.floor(step) - 1 : 0]?.text ?? 'Initialising workflow replay engine…'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Video Timeline Scrubber */}
          <div className="film-player__timeline">
            <button
              type="button"
              className="film-player__play-btn"
              onClick={() => (finished ? restart() : setPlaying((p) => !p))}
            >
              <Icon name={finished ? 'refresh' : playing ? 'pause' : 'play'} size={14} />
            </button>

            <div
              className="film-player__track-container"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                setStep(Math.round(pct * total));
              }}
            >
              <div className="film-player__track">
                <div
                  className="film-player__fill"
                  style={{ width: `${progress * 100}%` }}
                />
                <div
                  className="film-player__thumb"
                  style={{ left: `${progress * 100}%` }}
                />
              </div>
            </div>

            <span className="film-player__time-readout" data-numeric>
              {timeStamp(Math.floor(step))} / {timeStamp(total)}
            </span>
          </div>
        </div>

        {/* Phase rail */}
        <ol className="theatre__phases">
          {scenario.phases.map((phase, index) => (
            <li
              key={phase.id}
              className={cx(
                index < currentPhase || finished ? 'is-done' : null,
                index === currentPhase && !finished ? 'is-active' : null,
              )}
            >
              <span className="theatre__phase-bar">
                <i
                  style={{
                    width:
                      index < currentPhase || finished
                        ? '100%'
                        : index === currentPhase
                          ? `${phaseProgress(stream, Math.floor(step), index)}%`
                          : '0%',
                  }}
                />
              </span>
              <span className="theatre__phase-label">{phase.label}</span>
            </li>
          ))}
        </ol>

        {/* Streamed Log Terminal */}
        <div className="theatre__log-container">
          <div className="theatre__log-head">
            <span>Terminal Event Ledger</span>
            <span data-numeric>{stream.slice(0, Math.floor(step)).length} / {total} logs</span>
          </div>
          <ol className="theatre__log" ref={logRef} aria-live="polite">
            {stream.slice(0, Math.floor(step)).map((line, index) => (
              <li key={`${line.phaseId}-${index}`} className={`is-${line.tone}`}>
                <span className="theatre__log-time" data-numeric>
                  {timeStamp(index)}
                </span>
                <span className="theatre__log-text">{line.text}</span>
              </li>
            ))}
            {!finished && (
              <li className="theatre__log-cursor" aria-hidden="true">
                <span className="theatre__log-time">…</span>
                <span className="theatre__log-text">
                  <i />
                </span>
              </li>
            )}
          </ol>
        </div>

        {/* Metrics */}
        <div className="theatre__metrics">
          {scenario.metrics.map((metric) => (
            <div key={metric.label} className="theatre__metric">
              <span className="theatre__metric-label">{metric.label}</span>
              <span className="theatre__metric-values">
                <span className="theatre__metric-from">{metric.from}</span>
                <Icon name="arrowRight" size={12} />
                <span className={cx('theatre__metric-to', finished && 'is-settled')}>
                  {finished ? metric.to : '—'}
                </span>
              </span>
            </div>
          ))}
        </div>

        {finished && (
          <p className="theatre__outcome">
            <Icon name="checkCircle" size={16} />
            {scenario.outcome}
          </p>
        )}
      </div>
    </div>
  );
}

function phaseProgress(
  stream: Array<{ phase: number }>,
  step: number,
  phase: number,
): number {
  const inPhase = stream.filter((l) => l.phase === phase).length;
  const before = stream.filter((l) => l.phase < phase).length;
  if (!inPhase) return 0;
  return Math.max(0, Math.min(100, ((step - before) / inPhase) * 100));
}

function timeStamp(index: number): string {
  const total = 8 + index * 37;
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `00:${m}:${s}`;
}

/* ==========================================================================
   SCENARIO VISUALS
   Each reads the same 0–1 progress value, so the picture and the log are
   always describing the same moment.
   ======================================================================= */

function ScenarioVisual({
  scenario,
  progress,
}: {
  scenario: DemoScenario;
  progress: number;
}) {
  switch (scenario.visual) {
    case 'waves':
      return <WaveVisual progress={progress} />;
    case 'migration':
      return <MigrationVisual progress={progress} />;
    case 'build':
      return <BuildVisual progress={progress} />;
    case 'evidence':
      return <EvidenceVisual progress={progress} />;
    case 'compliance':
      return <ComplianceVisual progress={progress} />;
    default:
      return (
        <div className="theatre__topology">
          <TopologyGraph
            nodes={paymentsEstate.nodes}
            edges={paymentsEstate.edges}
            width={620}
            height={300}
            idPrefix="demo-topo"
            compact
          />
        </div>
      );
  }
}

/* ---------------------------------------------------------------- Waves */

const WAVES = [
  { label: 'EMEA · wave 1', count: 238, start: 0.0 },
  { label: 'EMEA · wave 2', count: 214, start: 0.08 },
  { label: 'AMER · wave 1', count: 302, start: 0.2 },
  { label: 'AMER · wave 2', count: 288, start: 0.32 },
  { label: 'APAC · wave 1', count: 302, start: 0.46 },
  { label: 'APAC · wave 2', count: 264, start: 0.58 },
  { label: 'LATAM · wave 1', count: 246, start: 0.7 },
  { label: 'Trailing · retries', count: 250, start: 0.82 },
];

function WaveVisual({ progress }: { progress: number }) {
  return (
    <div className="viz-waves">
      {WAVES.map((wave, index) => {
        const local = Math.max(0, Math.min(1, (progress - wave.start) / 0.2));
        const done = Math.round(wave.count * local);
        const warn = index === 2 && local > 0.5;
        return (
          <div key={wave.label} className="viz-waves__row">
            <span className="viz-waves__label">{wave.label}</span>
            <span className="viz-waves__track">
              <i
                className={cx(local >= 1 ? 'is-done' : 'is-run', warn && 'has-warn')}
                style={{ width: `${local * 100}%` }}
              />
            </span>
            <span className="viz-waves__count" data-numeric>
              {done}/{wave.count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ Migration */

function MigrationVisual({ progress }: { progress: number }) {
  // Plain math mapping functions for inline style animation
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
  const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    const t = clamp((val - inMin) / (inMax - inMin), 0, 1);
    return outMin + t * (outMax - outMin);
  };

  // Compute smooth continuous values off the single `progress` time value
  const srcOpacity = mapRange(progress, 0, 0.05, 0, 1);
  const srcY = mapRange(progress, 0, 0.05, 10, 0);

  const eastOpacity = mapRange(progress, 0.1, 0.2, 0, 1);
  const eastY = mapRange(progress, 0.1, 0.2, 10, 0);

  const arrowOpacity = mapRange(progress, 0.5, 0.6, 0, 1);
  
  const westOpacity = mapRange(progress, 0.6, 0.7, 0, 1);
  const westY = mapRange(progress, 0.6, 0.7, 10, 0);

  const p1 = progress >= 0.15;
  const p2 = progress >= 0.35;
  const p3 = progress >= 0.55;
  const p4 = progress >= 0.75;
  const p5 = progress >= 0.9;

  return (
    <div className="claude-film-scene">
      {/* 2-column console window */}
      <div className="claude-film-window">
        <div className="claude-film-window__head">
          <div className="console__dots">
            <span />
            <span />
            <span />
          </div>
          <span className="claude-film-window__url">ops.infrsre.io — migration factory</span>
          <span className="film-live-pill">
            ● LIVE
          </span>
        </div>

        <div className="claude-film-window__body">
          {/* Left Column: Checklist */}
          <div className="claude-film-checklist" style={{ opacity: srcOpacity, transform: `translateY(${srcY}px)` }}>
            <div className="claude-film-checklist__head">
              <span className="claude-film-checklist__title">Always On configuration</span>
              <span className="claude-film-checklist__tag" data-numeric>AG-PAY11</span>
            </div>
            <ul className="claude-film-checklist__list">
              <li className={cx(p1 && 'is-checked')}>
                <Icon name={p1 ? 'checkCircle' : 'circle'} size={15} />
                <span>Create availability group AG-PAY11</span>
              </li>
              <li className={cx(p2 && 'is-checked')}>
                <Icon name={p2 ? 'checkCircle' : 'circle'} size={15} />
                <span>Join replicas 11B, 11C</span>
              </li>
              <li className={cx(p3 && 'is-checked')}>
                <Icon name={p3 ? 'checkCircle' : 'circle'} size={15} />
                <span>11A + 11B synchronous — automatic failover</span>
              </li>
              <li className={cx(p4 && 'is-checked')}>
                <Icon name={p4 ? 'checkCircle' : 'circle'} size={15} />
                <span>11C remote replica — asynchronous</span>
              </li>
              <li className={cx(p5 && 'is-checked')}>
                <Icon name={p5 ? 'checkCircle' : 'circle'} size={15} />
                <span>Add 4 databases — {p5 ? 'SYNCHRONIZED' : 'SYNCING…'}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Architecture Diagram */}
          <div className="claude-film-diagram">
            {/* Source */}
            <div className="claude-film-group" style={{ opacity: srcOpacity, transform: `translateY(${srcY}px)` }}>
              <span className="claude-film-group__eyebrow">SOURCE - SQL SERVER 2016</span>
              <div className="claude-film-card">
                <div className="claude-film-card__head">
                  <strong>SQL-LEG-08</strong>
                  <span className="film-chip">SOURCE - 2016</span>
                </div>
                <span className="claude-film-card__status">read-only · cutover done</span>
              </div>
            </div>

            {/* Destination Cluster */}
            <div className="claude-film-group">
              <span className="claude-film-group__eyebrow" style={{ opacity: eastOpacity }}>
                DESTINATION - ALWAYS ON AG - SQL SERVER 2022 - AG-PAY11
              </span>
              <div className="claude-film-dest-grid">
                {/* US-EAST */}
                <div className="claude-film-region" style={{ opacity: eastOpacity, transform: `translateY(${eastY}px)` }}>
                  <span className="claude-film-region__title">US-EAST DATA CENTER</span>
                  <div className="claude-film-node-pair">
                    <div className="claude-film-card is-primary">
                      <div className="claude-film-card__head">
                        <strong>SQLAG-11A</strong>
                        <span className="film-chip is-gold">PRIMARY</span>
                      </div>
                      <span className="claude-film-card__status is-ok">sync · auto failover</span>
                    </div>
                    <div className="claude-film-card is-secondary">
                      <div className="claude-film-card__head">
                        <strong>SQLAG-11B</strong>
                        <span className="film-chip is-blue">SECONDARY</span>
                      </div>
                      <span className="claude-film-card__status is-ok">sync · auto failover</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="claude-film-arrow" style={{ opacity: arrowOpacity }}>
                  <span>ASYNC</span>
                  <i>- - - &gt;</i>
                </div>

                {/* US-WEST */}
                <div className="claude-film-region" style={{ opacity: westOpacity, transform: `translateY(${westY}px)` }}>
                  <span className="claude-film-region__title">US-WEST DATA CENTER</span>
                  <div className="claude-film-card is-remote">
                    <div className="claude-film-card__head">
                      <strong>SQLAG-11C</strong>
                      <span className="film-chip is-cyan">REMOTE · ASYNC</span>
                    </div>
                    <span className="claude-film-card__status is-cyan">asynchronous · healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="claude-film-window__foot">
          <span>window: 01:00-05:00 IST</span>
          <span>rollback: source intact</span>
        </div>
      </div>

      {/* Subtitle Caption */}
      <div className="claude-film-caption" style={{ opacity: progress > 0.9 ? 1 : 0, transition: 'opacity 300ms' }}>
        AG configured: automatic failover on the sync pair, an async remote replica for DR.
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Build */

const BUILD_STEPS = [
  { label: 'VM & Storage Spec', detail: '8 vCPU / 64 GB / 64K Drives', icon: 'server' as const },
  { label: 'SQL 2022 + CU12', detail: 'Unattended Install', icon: 'package' as const },
  { label: 'Instance Tuning', detail: 'MAXDOP & TempDB Split', icon: 'sliders' as const },
  { label: 'Health Check Gate', detail: '100% Passed · Handover', icon: 'checkCircle' as const },
];

function BuildVisual({ progress }: { progress: number }) {
  return (
    <div className="viz-migration">
      <div className="viz-migration__rail">
        <span className="viz-migration__fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="viz-migration__stages">
        {BUILD_STEPS.map((step, index) => {
          const reached = progress >= index / BUILD_STEPS.length;
          return (
            <div
              key={step.label}
              className={cx('viz-migration__stage', reached && 'is-reached')}
            >
              <span className="viz-migration__icon">
                <Icon name={step.icon} size={16} />
              </span>
              <span className="viz-migration__value" data-numeric style={{ fontSize: '11px' }}>
                {reached ? step.detail : 'Pending'}
              </span>
              <span className="viz-migration__label">{step.label}</span>
            </div>
          );
        })}
      </div>
      <div className="viz-migration__lag">
        <span>Build Progress</span>
        <span data-numeric>
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Evidence */

const CANDIDATES = [
  { name: 'Statistics stale after index rebuild', confidence: 91, verdict: 'cause' },
  { name: 'Connection pool exhaustion', confidence: 38, verdict: 'symptom' },
  { name: 'Network path degradation', confidence: 6, verdict: 'ruled-out' },
  { name: 'Kafka consumer lag', confidence: 4, verdict: 'ruled-out' },
];

function EvidenceVisual({ progress }: { progress: number }) {
  const random = seededRandom(42);
  const series = Array.from({ length: 40 }, (_, i) => {
    const spike = i > 22 && i < 33 ? 3.2 : 0;
    const recovery = i >= 33 ? -0.2 : 0;
    return 0.9 + random() * 0.25 + spike + recovery;
  });
  const max = Math.max(...series);
  const shown = Math.round(series.length * Math.min(1, progress * 1.4));

  return (
    <div className="viz-evidence">
      <div className="viz-evidence__chart">
        <span className="viz-evidence__chart-label">Checkout p99 latency</span>
        <svg viewBox="0 0 300 74" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="20" x2="300" y2="20" className="viz-evidence__threshold" />
          {series.slice(0, shown).map((value, i) => (
            <rect
              key={i}
              x={i * 7.5}
              width="5"
              y={74 - (value / max) * 68}
              height={(value / max) * 68}
              className={value > 2 ? 'is-breach' : 'is-ok'}
            />
          ))}
        </svg>
      </div>
      <ul className="viz-evidence__candidates">
        {CANDIDATES.map((candidate, index) => {
          const reached = progress > 0.45 + index * 0.06;
          return (
            <li
              key={candidate.name}
              className={cx(`is-${candidate.verdict}`, reached && 'is-shown')}
            >
              <span className="viz-evidence__name">{candidate.name}</span>
              <span className="viz-evidence__bar">
                <i style={{ width: reached ? `${candidate.confidence}%` : '0%' }} />
              </span>
              <span className="viz-evidence__conf" data-numeric>
                {reached ? `${candidate.confidence}%` : '—'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------- Compliance */

function ComplianceVisual({ progress }: { progress: number }) {
  const random = seededRandom(7);
  const cells = Array.from({ length: 96 }, () => random());
  const posture = 87.4 + (99.1 - 87.4) * progress;

  return (
    <div className="viz-compliance">
      <div className="viz-compliance__head">
        <div>
          <span className="viz-compliance__value" data-numeric>
            {posture.toFixed(1)}%
          </span>
          <span className="viz-compliance__label">PCI DSS 4.0 posture</span>
        </div>
        <div className="viz-compliance__legend">
          <span>
            <i className="is-pass" /> Pass
          </span>
          <span>
            <i className="is-fail" /> Fail
          </span>
          <span>
            <i className="is-accepted" /> Accepted
          </span>
        </div>
      </div>
      <div className="viz-compliance__grid">
        {cells.map((seed, index) => {
          const wasFailing = seed > 0.86;
          const stillFailing = wasFailing && seed > 0.86 + progress * 0.11;
          const accepted = wasFailing && !stillFailing && seed > 0.965;
          return (
            <span
              key={index}
              className={cx(
                'viz-compliance__cell',
                stillFailing ? 'is-fail' : accepted ? 'is-accepted' : 'is-pass',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
