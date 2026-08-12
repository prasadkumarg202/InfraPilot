import { site } from '@/content/site.config';
import { cx } from '@/lib/utils';

/**
 * Brand mark.
 *
 * Three isometric plates stacked on a shared axis — the estate as layers, seen
 * on edge. The top plate carries the gold highlight and the two beneath it the
 * vermillion, which is the same order the two brand colours appear in the demo
 * films.
 *
 * The plates are separated by a full 3-unit gutter on a 40-unit grid rather
 * than the 1.5 that would look better at large sizes. At 16px a narrower
 * gutter closes up and the mark reads as a single blob, and a favicon that
 * fails is worse than a wordmark that is slightly loose.
 */

interface MarkProps {
  size?: number;
  className?: string;
  /** Renders in a single colour instead of the brand palette. */
  monochrome?: boolean;
  idPrefix?: string;
}

export function LogoMark({
  size = 32,
  className,
  monochrome = false,
  idPrefix = 'lm',
}: MarkProps) {
  const topId = `${idPrefix}-top`;
  const midId = `${idPrefix}-mid`;
  const botId = `${idPrefix}-bot`;

  /** An isometric plate centred on x=20, with its top vertex at `y`. */
  const plate = (y: number, halfWidth = 15, depth = 7.5) =>
    `M20 ${y} L${20 + halfWidth} ${y + depth} L20 ${y + depth * 2} L${20 - halfWidth} ${y + depth} Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label={`${site.name} logo`}
      className={className}
    >
      <defs>
        <linearGradient id={topId} x1="5" y1="10" x2="35" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f7c463" />
          <stop offset="100%" stopColor="#e8a020" />
        </linearGradient>
        <linearGradient id={midId} x1="5" y1="24" x2="35" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f04a4f" />
          <stop offset="100%" stopColor="#e11b22" />
        </linearGradient>
        <linearGradient id={botId} x1="5" y1="37" x2="35" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e11b22" />
          <stop offset="100%" stopColor="#a10f14" />
        </linearGradient>
      </defs>

      {/* Bottom plate — widest, carrying the load. */}
      <path
        d={plate(27.5, 14.5, 5.75)}
        fill={monochrome ? 'currentColor' : `url(#${botId})`}
        opacity={monochrome ? 0.45 : 1}
      />
      {/* Middle plate */}
      <path
        d={plate(14, 12.5, 6)}
        fill={monochrome ? 'currentColor' : `url(#${midId})`}
        opacity={monochrome ? 0.72 : 1}
      />
      {/* Top plate — gold, and the narrowest. The plates widen as they descend
          so the silhouette reads as load-bearing rather than as a pile. */}
      <path
        d={plate(2, 10.5, 5)}
        fill={monochrome ? 'currentColor' : `url(#${topId})`}
      />
    </svg>
  );
}

interface LogoProps extends MarkProps {
  /** Hides the wordmark, leaving just the mark. */
  markOnly?: boolean;
  /** Optional product lockup, e.g. "Docs" or "Platform". */
  suffix?: string;
}

export function Logo({
  size = 30,
  className,
  monochrome = false,
  markOnly = false,
  suffix,
  idPrefix = 'logo',
}: LogoProps) {
  return (
    <span className={cx('logo', className)}>
      <LogoMark size={size} monochrome={monochrome} idPrefix={idPrefix} />
      {!markOnly && (
        <span className="logo__word">
          Iron<span className="logo__word-accent">stack</span>
        </span>
      )}
      {suffix && (
        <>
          <span className="logo__divider" aria-hidden="true" />
          <span className="logo__suffix">{suffix}</span>
        </>
      )}
    </span>
  );
}
