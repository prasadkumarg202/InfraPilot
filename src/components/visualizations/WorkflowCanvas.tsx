import { Icon, Badge, type IconName } from '@/components/primitives';

/**
 * Workflow canvas.
 *
 * A representation of the visual authoring surface: nodes placed on a grid,
 * typed connectors between them, and the branch that handles failure drawn as
 * prominently as the happy path — which is the argument the picture is making.
 */

interface CanvasNode {
  id: string;
  label: string;
  sub: string;
  icon: IconName;
  x: number;
  y: number;
  tone: 'start' | 'action' | 'gate' | 'human' | 'rollback' | 'end';
}

/** x/y are percentages of the canvas; nodes are centred on their coordinate,
 *  so x must stay within NODE_W/2 of both edges. */
const NODES: CanvasNode[] = [
  { id: 'start', label: 'Window opens', sub: 'Schedule trigger', icon: 'clock', x: 13, y: 26, tone: 'start' },
  { id: 'policy', label: 'Policy evaluation', sub: '7 guardrails', icon: 'shieldCheck', x: 38, y: 26, tone: 'gate' },
  { id: 'snapshot', label: 'Snapshot & verify', sub: 'Backup chain', icon: 'database', x: 63, y: 14, tone: 'action' },
  { id: 'drain', label: 'Drain traffic', sub: 'Load balancer', icon: 'route', x: 63, y: 44, tone: 'action' },
  { id: 'apply', label: 'Apply update', sub: 'Wave 1 of 9', icon: 'package', x: 87, y: 29, tone: 'action' },
  { id: 'health', label: 'Health gate', sub: '12 assertions', icon: 'activity', x: 38, y: 74, tone: 'gate' },
  { id: 'rollback', label: 'Rollback', sub: 'On gate failure', icon: 'rewind', x: 13, y: 74, tone: 'rollback' },
];

const EDGES: Array<{ from: string; to: string; label?: string; kind?: 'fail' }> = [
  { from: 'start', to: 'policy' },
  { from: 'policy', to: 'snapshot' },
  { from: 'policy', to: 'drain' },
  { from: 'snapshot', to: 'apply' },
  { from: 'drain', to: 'apply' },
  { from: 'apply', to: 'health' },
  { from: 'health', to: 'rollback', kind: 'fail' },
];

const NODE_W = 22;
const NODE_H = 15;
/** Half the visual height of a node in canvas units, for wire attachment. */
const HALF_H = 9;

export function WorkflowCanvas() {
  const byId = new Map(NODES.map((n) => [n.id, n]));

  return (
    <div className="viz-frame ticked">
      <div className="viz-frame__head">
        <span>Workflow · sql-server-cu-rollup</span>
        <span className="viz-frame__actions">
          <Badge tone="neutral">v14</Badge>
          <Badge tone="accent">YAML in sync</Badge>
        </span>
      </div>

      <div className="workflow">
        <div className="workflow__palette" aria-hidden="true">
          {(['play', 'shieldCheck', 'database', 'route', 'package', 'users', 'rewind'] as IconName[]).map(
            (icon) => (
              <span key={icon} className="workflow__palette-item">
                <Icon name={icon} size={15} />
              </span>
            ),
          )}
        </div>

        <div className="workflow__canvas">
          <svg
            className="workflow__wires"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {EDGES.map((edge) => {
              const a = byId.get(edge.from)!;
              const b = byId.get(edge.to)!;
              let d: string;
              if (b.x >= a.x) {
                // Forward: leave the right edge, enter the left edge.
                const x1 = a.x + NODE_W / 2;
                const x2 = b.x - NODE_W / 2;
                const mid = (x1 + x2) / 2;
                const d1 = `M ${x1} ${a.y} C ${mid} ${a.y}, ${mid} ${b.y}, ${x2} ${b.y}`;
                d = d1;
              } else {
                // Backward wrap: leave the bottom, enter the right edge.
                const x1 = a.x;
                const y1 = a.y + HALF_H;
                const x2 = b.x + NODE_W / 2;
                const y2 = b.y;
                const midY = (y1 + y2) / 2;
                d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2 + 8} ${y2 - 14}, ${x2} ${y2}`;
              }
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path
                    d={d}
                    className={edge.kind === 'fail' ? 'workflow__wire is-fail' : 'workflow__wire'}
                  />
                  {edge.kind !== 'fail' && <path d={d} className="workflow__wire-pulse" />}
                </g>
              );
            })}
          </svg>

          {NODES.map((node) => (
            <div
              key={node.id}
              className={`workflow__node is-${node.tone}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${NODE_W}%`,
                minHeight: `${NODE_H}%`,
              }}
            >
              <span className="workflow__node-icon">
                <Icon name={node.icon} size={13} />
              </span>
              <span className="workflow__node-text">
                <span className="workflow__node-label">{node.label}</span>
                <span className="workflow__node-sub">{node.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="viz-frame__foot">
        <span>
          <Icon name="gitBranch" size={13} />
          main · 3 approvals required
        </span>
        <span>
          <Icon name="rewind" size={13} />
          Rollback rehearsed 4h ago
        </span>
      </div>
    </div>
  );
}
