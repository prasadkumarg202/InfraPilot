import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cx } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

/* ================================================================== BUTTON */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'link'
  | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Nudges the trailing icon on hover — reserve for forward navigation. */
  animateIcon?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface ButtonLinkProps
  extends ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string;
}

function buttonClass({
  variant = 'primary',
  size = 'md',
  block,
  className,
}: ButtonBaseProps): string {
  return cx(
    'btn',
    `btn--${variant}`,
    size !== 'md' && `btn--${size}`,
    block && 'btn--block',
    className,
  );
}

function buttonInner({
  iconLeft,
  iconRight,
  animateIcon,
  children,
  size,
}: ButtonBaseProps) {
  const iconSize = size === 'xs' ? 13 : size === 'sm' ? 15 : size === 'lg' || size === 'xl' ? 19 : 17;
  return (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSize} className="btn__icon" />}
      {children}
      {iconRight && (
        <Icon
          name={iconRight}
          size={iconSize}
          className={cx('btn__icon', animateIcon && 'btn__icon--shift')}
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  block,
  iconLeft,
  iconRight,
  animateIcon = true,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={buttonClass({ variant, size, block, className })}
      {...rest}
    >
      {buttonInner({ iconLeft, iconRight, animateIcon, children, size })}
    </a>
  );
}

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'children'
    > {}

export function Button({
  variant,
  size,
  block,
  iconLeft,
  iconRight,
  animateIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, block, className })}
      {...rest}
    >
      {buttonInner({ iconLeft, iconRight, animateIcon, children, size })}
    </button>
  );
}

/* =================================================================== BADGE */

export type BadgeTone =
  | 'accent'
  | 'violet'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  live?: boolean;
  large?: boolean;
  children: ReactNode;
}

export function Badge({
  tone = 'neutral',
  dot,
  live,
  large,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx('badge', `badge--${tone}`, large && 'badge--lg', className)}
      {...rest}
    >
      {(dot || live) && (
        <span className={cx('badge__dot', live && 'badge__dot--live')} />
      )}
      {children}
    </span>
  );
}

/* ==================================================================== CARD */

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'glass' | 'flat' | 'inset' | 'raised';
  interactive?: boolean;
  edge?: boolean;
  spotlight?: boolean;
  as?: 'div' | 'article' | 'li' | 'section';
  children: ReactNode;
}

export function Card({
  variant = 'default',
  interactive,
  edge,
  spotlight,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cx(
        'card',
        variant !== 'default' && `card--${variant}`,
        interactive && 'card--interactive',
        edge && 'card--edge',
        spotlight && 'card--spotlight',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ================================================================= SECTION */

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'panel' | 'inset';
  container?: 'default' | 'wide' | 'narrow' | 'none';
  tightTop?: boolean;
  tightBottom?: boolean;
  children: ReactNode;
}

export function Section({
  size = 'md',
  tone = 'default',
  container = 'default',
  tightTop,
  tightBottom,
  className,
  children,
  ...rest
}: SectionProps) {
  const inner =
    container === 'none' ? (
      children
    ) : (
      <div
        className={cx(
          'container',
          container === 'wide' && 'container--wide',
          container === 'narrow' && 'container--narrow',
        )}
      >
        {children}
      </div>
    );

  return (
    <section
      className={cx(
        'section',
        size !== 'md' && `section--${size}`,
        tone !== 'default' && `section--${tone}`,
        tightTop && 'section--tight-top',
        tightBottom && 'section--tight-bottom',
        className,
      )}
      {...rest}
    >
      {inner}
    </section>
  );
}

/* ========================================================== SECTION HEADER */

export interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  actions?: ReactNode;
  /** Renders the title as an h1 — use once per page. */
  level?: 1 | 2 | 3;
  className?: string;
  id?: string;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
  actions,
  level = 2,
  className,
  id,
}: SectionHeadProps) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3';
  return (
    <div
      className={cx(
        'section-head',
        align === 'center' && 'section-head--center',
        className,
      )}
      data-reveal
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="section-head__title" id={id}>
        {title}
      </Heading>
      {lede && <p className="section-head__lede">{lede}</p>}
      {actions && (
        <div
          className={cx('row row--wrap', align === 'center' && 'row--center')}
          style={{ marginTop: 'var(--space-2)' }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}

/* =================================================================== STATS */

export interface StatProps {
  value: string;
  label: string;
  delta?: { value: string; direction: 'up' | 'down' | 'flat' };
  plain?: boolean;
}

export function Stat({ value, label, delta, plain }: StatProps) {
  return (
    <div className="stat">
      <span className={cx('stat__value', plain && 'stat__value--plain')}>
        {value}
      </span>
      <span className="stat__label">{label}</span>
      {delta && (
        <span className={cx('stat__delta', `stat__delta--${delta.direction}`)}>
          <Icon
            name={
              delta.direction === 'up'
                ? 'trendingUp'
                : delta.direction === 'down'
                  ? 'trendingDown'
                  : 'minus'
            }
            size={13}
          />
          {delta.value}
        </span>
      )}
    </div>
  );
}

/* =================================================================== ALERT */

export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
  className?: string;
}

const ALERT_ICON: Record<string, IconName> = {
  info: 'alertCircle',
  success: 'checkCircle',
  warning: 'alertTriangle',
  danger: 'alertTriangle',
};

export function Alert({
  tone = 'info',
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div className={cx('alert', `alert--${tone}`, className)} role="note">
      <Icon name={ALERT_ICON[tone]} size={18} className="alert__icon" />
      <div>
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__body">{children}</div>
      </div>
    </div>
  );
}

/* ==================================================================== RULE */

export function Rule({ className }: { className?: string }) {
  return <hr className={cx('rule', className)} />;
}

/* ================================================================= AMBIENT */

export interface AmbientProps {
  aurora?: boolean;
  mesh?: boolean | 'fine';
  floor?: boolean;
  noise?: boolean;
  vignette?: boolean;
}

/**
 * Decorative background field. Every layer is optional so sections can dial
 * intensity down as the page descends — a full-strength field on every
 * section would flatten the hierarchy it exists to create.
 */
export function Ambient({
  aurora = true,
  mesh = true,
  floor = false,
  noise = true,
  vignette = false,
}: AmbientProps) {
  return (
    <div className="ambient" aria-hidden="true" data-ambient>
      {aurora && <div className="ambient__aurora" />}
      {mesh && (
        <div
          className={cx('ambient__mesh', mesh === 'fine' && 'ambient__mesh--fine')}
        />
      )}
      {floor && <div className="ambient__floor" />}
      {noise && <div className="ambient__noise" />}
      {vignette && <div className="ambient__vignette" />}
    </div>
  );
}

export { Icon, iconNames } from './Icon';
export type { IconName };
export { Logo, LogoMark } from './Logo';
