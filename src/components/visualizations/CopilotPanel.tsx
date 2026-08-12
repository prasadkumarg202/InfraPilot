import { Icon, Badge } from '@/components/primitives';

/**
 * Copilot panel.
 *
 * A grounded answer with its sources attached. The citation row is the
 * important part of the design — it is what separates an operational
 * assistant from a chatbot, and it is what a change advisory board will ask
 * for when the answer is used to justify a decision.
 */

const SOURCES = [
  { label: 'Dependency graph', detail: '14 nodes on path' },
  { label: 'Change history', detail: '3 changes in 6h' },
  { label: 'Query store', detail: 'pay-sql-01' },
  { label: 'Runbook RB-0412', detail: 'Index maintenance' },
];

export function CopilotPanel() {
  return (
    <div className="viz-frame ticked">
      <div className="viz-frame__head">
        <span>
          <Icon name="sparkles" size={13} /> Copilot
        </span>
        <Badge tone="violet" dot>
          Grounded in your estate
        </Badge>
      </div>

      <div className="copilot">
        <div className="copilot__turn copilot__turn--user">
          <span className="copilot__avatar">RA</span>
          <p>Why did checkout latency spike at 02:14, and what should I do about it?</p>
        </div>

        <div className="copilot__turn copilot__turn--ai">
          <span className="copilot__avatar copilot__avatar--ai">
            <Icon name="sparkles" size={14} />
          </span>
          <div className="copilot__answer">
            <p>
              Checkout p99 rose to <strong>4.8s</strong> at 02:14:08, against a 1.2s
              threshold. The most likely cause is{' '}
              <strong>stale statistics on four objects in pay-sql-01</strong> following
              the index rebuild in CHG0048790 at 01:52.
            </p>
            <ul className="copilot__reasons">
              <li>
                <Icon name="check" size={12} />
                Query plans regressed on the four objects touched by the rebuild
              </li>
              <li>
                <Icon name="check" size={12} />
                Connection pool saturation follows the latency rise by 40s — symptom,
                not cause
              </li>
              <li>
                <Icon name="check" size={12} />
                Network path and consumer lag both flat through the window
              </li>
            </ul>
            <div className="copilot__proposal">
              <span className="copilot__proposal-head">
                <Icon name="workflow" size={13} />
                Proposed remediation · requires your approval
              </span>
              <code>UPDATE STATISTICS ... WITH FULLSCAN</code>
              <span className="copilot__proposal-meta">
                4 objects · est. 3m 10s · rollback not required · risk 6/100
              </span>
            </div>
            <div className="copilot__sources">
              <span className="copilot__sources-label">Evidence</span>
              {SOURCES.map((source) => (
                <span key={source.label} className="copilot__source">
                  <strong>{source.label}</strong>
                  <span>{source.detail}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="viz-frame__foot">
        <span>
          <Icon name="shieldCheck" size={13} />
          Cannot execute without an approval path
        </span>
        <span>
          <Icon name="lock" size={13} />
          Your data is never used for model training
        </span>
      </div>
    </div>
  );
}
