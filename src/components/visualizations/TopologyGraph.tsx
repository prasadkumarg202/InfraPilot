import { Fragment } from 'react';
import { cx, round } from '@/lib/utils';

/**
 * Dependency topology.
 *
 * A layered directed graph rendered as SVG. Layout is deterministic — layers
 * on the x axis, evenly distributed on y with a per-node offset derived from
 * its index — so server and client markup match exactly and screenshots are
 * reproducible.
 *
 * Edges carry a travelling pulse to show automation propagating through the
 * estate. The pulse is a dashed stroke animated with SMIL-free CSS, which
 * keeps it on the compositor and costs no main-thread work.
 */

export type NodeKind =
  | 'edge'
  | 'app'
  | 'middleware'
  | 'database'
  | 'storage'
  | 'platform';

export type NodeState = 'healthy' | 'target' | 'inflight' | 'complete' | 'risk';

export interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  layer: number;
  /** Vertical slot within the layer, 0-indexed. */
  slot: number;
  kind: NodeKind;
  state?: NodeState;
}

export interface GraphEdge {
  from: string;
  to: string;
  /** Renders the travelling pulse. */
  active?: boolean;
  /** Staggers the pulse so the estate lights up in sequence. */
  delay?: number;
}

export interface TopologyGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number;
  height?: number;
  layerCount?: number;
  slotCounts?: number[];
  className?: string;
  showLabels?: boolean;
  idPrefix?: string;
  compact?: boolean;
}

/** Glyphs are drawn on a 20×20 box centred at (10,10) inside each node. */
const KIND_GLYPH: Record<NodeKind, string> = {
  // Load balancer: traffic splitting across three paths
  edge: 'M10 4v4M10 8H5v4M10 8h5v4M5 12v3M10 8v7M15 12v3',
  // Application: a window with a title bar
  app: 'M4.5 5.5h11v9h-11zM4.5 8.5h11',
  // Message broker: a queue of messages moving right
  middleware: 'M4 6.5h6M4 10h9M4 13.5h6M13 6.5l3 3.5-3 3.5',
  // Database: cylinder
  database: 'M10 4.5c3 0 5.3.9 5.3 2s-2.3 2-5.3 2-5.3-.9-5.3-2 2.3-2 5.3-2ZM4.7 6.5v7c0 1.1 2.3 2 5.3 2s5.3-.9 5.3-2v-7',
  // Storage: stacked volumes
  storage: 'M4.5 6h11v3.2h-11zM4.5 10.8h11V14h-11zM7 7.6v.1M7 12.4v.1',
  // Platform / cluster: hexagon with a core
  platform: 'M10 3.6 16 7v6l-6 3.4L4 13V7ZM10 8.2 12.6 9.7v3L10 14.2 7.4 12.7v-3Z',
};

const STATE_TOKEN: Record<NodeState, string> = {
  healthy: 'var(--topo-idle)',
  target: 'var(--topo-target)',
  inflight: 'var(--topo-inflight)',
  complete: 'var(--topo-complete)',
  risk: 'var(--topo-risk)',
};

export function TopologyGraph({
  nodes,
  edges,
  width = 760,
  height = 420,
  layerCount,
  slotCounts,
  className,
  showLabels = true,
  idPrefix = 'topo',
  compact = false,
}: TopologyGraphProps) {
  const layers = layerCount ?? Math.max(...nodes.map((n) => n.layer)) + 1;
  const padX = compact ? 56 : 92;
  const padTop = compact ? 24 : 30;
  /** Labels hang below each node, so the bottom needs more room than the top. */
  const padBottom = showLabels ? (compact ? 34 : 48) : padTop;
  const nodeR = compact ? 13 : 17;

  const counts =
    slotCounts ??
    Array.from({ length: layers }, (_, layer) =>
      nodes.filter((n) => n.layer === layer).length,
    );

  // A single row pitch shared by every layer, so a two-node layer sits centred
  // against a three-node layer instead of stretching to the same full height.
  // Stretching is what makes layered graphs read as a tangle.
  const maxCount = Math.max(...counts, 1);
  const usableH = height - padTop - padBottom;
  const pitch = maxCount > 1 ? usableH / (maxCount - 1) : 0;

  function position(node: GraphNode): { x: number; y: number } {
    const usableW = width - padX * 2;
    const x = layers > 1 ? padX + (usableW / (layers - 1)) * node.layer : width / 2;
    const count = counts[node.layer] || 1;
    const layerHeight = (count - 1) * pitch;
    const top = padTop + (usableH - layerHeight) / 2;
    const y = count > 1 ? top + pitch * node.slot : padTop + usableH / 2;
    return { x: round(x, 1), y: round(y, 1) };
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cx('topo', className)}
      role="img"
      aria-label="Dependency topology showing automation propagating across estate layers"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${idPrefix}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--topo-edge)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="var(--topo-edge)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--topo-edge)" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="30%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <filter id={`${idPrefix}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* Edges are drawn first so nodes always sit above them. */}
      <g className="topo__edges">
        {edges.map((edge, index) => {
          const a = byId.get(edge.from);
          const b = byId.get(edge.to);
          if (!a || !b) return null;
          const pa = position(a);
          const pb = position(b);
          // Horizontal-first cubic keeps the exit and entry perpendicular to
          // the node, which reads as a wiring diagram rather than a web.
          const dx = (pb.x - pa.x) * 0.5;
          const d = `M ${pa.x + nodeR} ${pa.y} C ${pa.x + nodeR + dx} ${pa.y}, ${pb.x - nodeR - dx} ${pb.y}, ${pb.x - nodeR} ${pb.y}`;
          return (
            <Fragment key={`${edge.from}-${edge.to}-${index}`}>
              <path d={d} className="topo__edge" stroke={`url(#${idPrefix}-edge)`} />
              {edge.active && (
                <path
                  d={d}
                  className="topo__pulse"
                  style={{ animationDelay: `${edge.delay ?? index * 0.24}s` }}
                />
              )}
            </Fragment>
          );
        })}
      </g>

      <g className="topo__nodes">
        {nodes.map((node) => {
          const { x, y } = position(node);
          const state = node.state ?? 'healthy';
          const color = STATE_TOKEN[state];
          return (
            <g
              key={node.id}
              transform={`translate(${x} ${y})`}
              className={cx('topo__node', `is-${state}`)}
              style={{ color }}
            >
              {(state === 'inflight' || state === 'risk') && (
                <circle r={nodeR * 2.4} fill={`url(#${idPrefix}-halo)`} className="topo__halo" />
              )}
              <circle r={nodeR} className="topo__node-bg" />
              <circle r={nodeR} className="topo__node-ring" />
              <g
                transform={`translate(${-10 * (nodeR / 17)} ${-10 * (nodeR / 17)}) scale(${nodeR / 17})`}
                className="topo__glyph"
              >
                <path d={KIND_GLYPH[node.kind]} />
              </g>
              {state === 'inflight' && (
                <circle r={nodeR} className="topo__spinner" />
              )}
              {showLabels && (
                <g className="topo__label" transform={`translate(0 ${nodeR + 15})`}>
                  <text textAnchor="middle" className="topo__label-main">
                    {node.label}
                  </text>
                  {node.sublabel && !compact && (
                    <text textAnchor="middle" y="13" className="topo__label-sub">
                      {node.sublabel}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Sample estate used by the hero console and the platform page. Modelled on a
   payments stack: edge tier, application tier, messaging, data tier, storage.
   ---------------------------------------------------------------------- */

export const paymentsEstate: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: 'lb-1', label: 'edge-lb-01', sublabel: 'NGINX', layer: 0, slot: 0, kind: 'edge', state: 'complete' },
    { id: 'lb-2', label: 'edge-lb-02', sublabel: 'NGINX', layer: 0, slot: 1, kind: 'edge', state: 'complete' },
    { id: 'app-1', label: 'pay-api-a', sublabel: 'Tomcat 10', layer: 1, slot: 0, kind: 'app', state: 'complete' },
    { id: 'app-2', label: 'pay-api-b', sublabel: 'Tomcat 10', layer: 1, slot: 1, kind: 'app', state: 'inflight' },
    { id: 'app-3', label: 'ledger-svc', sublabel: 'WildFly', layer: 1, slot: 2, kind: 'app', state: 'target' },
    { id: 'mq-1', label: 'kafka-01', sublabel: '3-broker', layer: 2, slot: 0, kind: 'middleware', state: 'complete' },
    { id: 'mq-2', label: 'mq-series', sublabel: 'IBM MQ 9.3', layer: 2, slot: 1, kind: 'middleware', state: 'target' },
    { id: 'db-1', label: 'pay-sql-01', sublabel: 'SQL Server AG', layer: 3, slot: 0, kind: 'database', state: 'inflight' },
    { id: 'db-2', label: 'ledger-ora', sublabel: 'Oracle 19c RAC', layer: 3, slot: 1, kind: 'database', state: 'risk' },
    { id: 'db-3', label: 'cache-01', sublabel: 'Redis Cluster', layer: 3, slot: 2, kind: 'database', state: 'healthy' },
    { id: 'st-1', label: 'vol-prod', sublabel: 'Managed disk', layer: 4, slot: 0, kind: 'storage', state: 'healthy' },
    { id: 'st-2', label: 'backup-vault', sublabel: 'Immutable', layer: 4, slot: 1, kind: 'storage', state: 'healthy' },
  ],
  edges: [
    { from: 'lb-1', to: 'app-1', active: true, delay: 0 },
    { from: 'lb-1', to: 'app-2', active: true, delay: 0.3 },
    { from: 'lb-2', to: 'app-2', active: true, delay: 0.5 },
    { from: 'lb-2', to: 'app-3', active: true, delay: 0.7 },
    { from: 'app-1', to: 'mq-1', active: true, delay: 1.0 },
    { from: 'app-2', to: 'mq-1', active: true, delay: 1.2 },
    { from: 'app-3', to: 'mq-2', active: true, delay: 1.4 },
    { from: 'app-1', to: 'db-1', active: true, delay: 1.6 },
    { from: 'app-2', to: 'db-1', active: true, delay: 1.8 },
    { from: 'app-3', to: 'db-2', active: true, delay: 2.0 },
    { from: 'mq-1', to: 'db-3' },
    { from: 'mq-2', to: 'db-2', active: true, delay: 2.2 },
    { from: 'db-1', to: 'st-1', active: true, delay: 2.6 },
    { from: 'db-2', to: 'st-1' },
    { from: 'db-1', to: 'st-2' },
    { from: 'db-2', to: 'st-2', active: true, delay: 2.9 },
  ],
};
