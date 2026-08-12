/** Shared helpers used across components. Framework-agnostic. */

/** Conditional className joiner. */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Deterministic pseudo-random generator (mulberry32).
 *
 * Every generated data series on the site — sparklines, chart noise, node
 * positions — runs through a seeded PRNG rather than Math.random(). Server
 * and client therefore produce byte-identical markup, so hydration never
 * mismatches, and screenshots are reproducible between builds.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Round to a fixed number of decimals, returning a number (not a string). */
export function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/** Format a number with thousands separators, locale-stable. */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Compact notation for large counts: 1_240_000 -> "1.24M". */
export function formatCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000_000)
    return `${round(value / 1_000_000_000, 2)}B`;
  if (Math.abs(value) >= 1_000_000) return `${round(value / 1_000_000, 2)}M`;
  if (Math.abs(value) >= 1_000) return `${round(value / 1_000, 1)}K`;
  return String(value);
}

/** Seconds -> "4h 12m" / "12m 30s" / "45s". */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return s ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Build an SVG path for a smooth line through points using Catmull-Rom
 * converted to cubic Béziers. Tension 0 gives a taut curve that still reads
 * as data rather than decoration.
 */
export function smoothPath(
  points: Array<[number, number]>,
  tension = 0.22,
): string {
  if (points.length < 2) return '';
  const d: string[] = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * (1 + tension);
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * (1 + tension);
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * (1 + tension);
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * (1 + tension);
    d.push(
      `C ${round(c1x, 2)} ${round(c1y, 2)}, ${round(c2x, 2)} ${round(c2y, 2)}, ${round(p2[0], 2)} ${round(p2[1], 2)}`,
    );
  }
  return d.join(' ');
}

/** Map a data series into SVG coordinates for a given box. */
export function toPoints(
  values: number[],
  width: number,
  height: number,
  padding = 0,
  min?: number,
  max?: number,
): Array<[number, number]> {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const step = values.length > 1 ? innerW / (values.length - 1) : 0;
  return values.map((v, i) => [
    round(padding + i * step, 2),
    round(padding + innerH - ((v - lo) / span) * innerH, 2),
  ]);
}

/** Describe an SVG arc, used by the gauge and risk-score components. */
export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const toXY = (angle: number): [number, number] => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [
      round(cx + radius * Math.cos(rad), 3),
      round(cy + radius * Math.sin(rad), 3),
    ];
  };
  const [sx, sy] = toXY(endAngle);
  const [ex, ey] = toXY(startAngle);
  const large = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 0 ${ex} ${ey}`;
}
