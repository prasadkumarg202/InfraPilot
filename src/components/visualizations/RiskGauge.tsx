import { arcPath, clamp, cx } from '@/lib/utils';

/**
 * Change-risk gauge.
 *
 * A 240° arc rather than a full ring: the gap at the bottom gives the value
 * label a home and stops the shape reading as a progress spinner. Colour is
 * driven by band, not by a continuous ramp, because operators act on the band
 * ("low / elevated / high") and a smooth gradient hides the threshold.
 */

export type RiskBand = 'low' | 'moderate' | 'elevated' | 'high';

export function riskBand(score: number): RiskBand {
  if (score < 25) return 'low';
  if (score < 50) return 'moderate';
  if (score < 75) return 'elevated';
  return 'high';
}

export interface RiskGaugeProps {
  /** 0–100. Higher means more likely to cause an incident. */
  score: number;
  size?: number;
  label?: string;
  showValue?: boolean;
  idPrefix?: string;
  className?: string;
}

export function RiskGauge({
  score,
  size = 120,
  label,
  showValue = true,
  idPrefix = 'gauge',
  className,
}: RiskGaugeProps) {
  const value = clamp(score, 0, 100);
  const band = riskBand(value);
  const sweep = 240;
  const start = -120;
  const radius = size / 2 - size * 0.09;
  const cx0 = size / 2;
  const cy0 = size / 2;

  const track = arcPath(cx0, cy0, radius, start, start + sweep);
  const fill = arcPath(cx0, cy0, radius, start, start + (sweep * value) / 100);

  // Tick marks at each band boundary so the reading has a scale to sit against.
  const ticks = [25, 50, 75].map((t) => {
    const angle = start + (sweep * t) / 100 - 90;
    const rad = (angle * Math.PI) / 180;
    const inner = radius - size * 0.055;
    const outer = radius + size * 0.035;
    return {
      x1: cx0 + inner * Math.cos(rad),
      y1: cy0 + inner * Math.sin(rad),
      x2: cx0 + outer * Math.cos(rad),
      y2: cy0 + outer * Math.sin(rad),
      key: t,
    };
  });

  return (
    <div className={cx('gauge', `gauge--${band}`, className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${label ?? 'Risk'} score ${value} out of 100, ${band}`}
      >
        <defs>
          <filter id={`${idPrefix}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={size * 0.035} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={track}
          className="gauge__track"
          strokeWidth={size * 0.075}
          strokeLinecap="round"
          fill="none"
        />
        {ticks.map((tick) => (
          <line
            key={tick.key}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            className="gauge__tick"
          />
        ))}
        <path
          d={fill}
          className="gauge__fill"
          strokeWidth={size * 0.075}
          strokeLinecap="round"
          fill="none"
          filter={`url(#${idPrefix}-glow)`}
        />
      </svg>

      {showValue && (
        <div className="gauge__readout">
          <span className="gauge__value" data-numeric>
            {value}
          </span>
          {label && <span className="gauge__label">{label}</span>}
        </div>
      )}
    </div>
  );
}
