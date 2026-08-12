import type { SVGProps } from 'react';

/**
 * Icon system.
 *
 * A hand-drawn set on a 24×24 grid with a 1.6 stroke, round caps and round
 * joins. Everything is authored against the same optical rules — 2px keyline
 * inset, 4px minimum corner radius, no closed counters below 3px — so icons
 * sit together without one reading heavier than its neighbours. Stroke
 * inherits `currentColor`, so an icon takes the colour of whatever it sits in.
 */

export type IconName =
  | 'activity'
  | 'alertCircle'
  | 'alertTriangle'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUpRight'
  | 'bell'
  | 'book'
  | 'box'
  | 'briefcase'
  | 'building'
  | 'calendar'
  | 'chartBar'
  | 'check'
  | 'checkCircle'
  | 'chevronDown'
  | 'chevronRight'
  | 'circle'
  | 'clock'
  | 'cloud'
  | 'code'
  | 'compass'
  | 'container'
  | 'cpu'
  | 'database'
  | 'external'
  | 'eye'
  | 'file'
  | 'filter'
  | 'gauge'
  | 'gitBranch'
  | 'globe'
  | 'grid'
  | 'heart'
  | 'key'
  | 'layers'
  | 'lifebuoy'
  | 'lightning'
  | 'link'
  | 'lock'
  | 'mail'
  | 'map'
  | 'menu'
  | 'minus'
  | 'moon'
  | 'network'
  | 'package'
  | 'pause'
  | 'phone'
  | 'play'
  | 'plus'
  | 'refresh'
  | 'rewind'
  | 'route'
  | 'search'
  | 'server'
  | 'settings'
  | 'shield'
  | 'shieldCheck'
  | 'sliders'
  | 'sparkles'
  | 'stack'
  | 'sun'
  | 'target'
  | 'terminal'
  | 'trendingDown'
  | 'trendingUp'
  | 'users'
  | 'workflow'
  | 'x'
  | 'zap';

const PATHS: Record<IconName, React.ReactNode> = {
  activity: <path d="M3 12h3.2l2.4-6.6 4.2 13L15.4 12H21" />,
  alertCircle: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 8v4.8M12 16.1v.1" />
    </>
  ),
  alertTriangle: (
    <>
      <path d="M10.5 4.2 2.9 17.4a1.7 1.7 0 0 0 1.5 2.6h15.2a1.7 1.7 0 0 0 1.5-2.6L13.5 4.2a1.7 1.7 0 0 0-3 0Z" />
      <path d="M12 9.4v4M12 16.4v.1" />
    </>
  ),
  arrowLeft: <path d="M20 12H4m0 0 6.2-6.2M4 12l6.2 6.2" />,
  arrowRight: <path d="M4 12h16m0 0-6.2-6.2M20 12l-6.2 6.2" />,
  arrowUpRight: <path d="M7 17 17 7m0 0h-7.6M17 7v7.6" />,
  bell: (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2.2 6.4-2.2 6.4h16.4S18 14 18 9Z" />
      <path d="M13.7 19a2 2 0 0 1-3.4 0" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.8A1.8 1.8 0 0 1 5.8 3H19v14.5H5.8A1.8 1.8 0 0 0 4 19.3V4.8Z" />
      <path d="M4 19.3A1.8 1.8 0 0 0 5.8 21H19v-3.5" />
      <path d="M8.2 7.6h6.6" />
    </>
  ),
  box: (
    <>
      <path d="M20.5 7.9v8.2a1.8 1.8 0 0 1-.94 1.58l-6.7 3.6a1.8 1.8 0 0 1-1.72 0l-6.7-3.6A1.8 1.8 0 0 1 3.5 16.1V7.9a1.8 1.8 0 0 1 .94-1.58l6.7-3.6a1.8 1.8 0 0 1 1.72 0l6.7 3.6A1.8 1.8 0 0 1 20.5 7.9Z" />
      <path d="m3.8 7 8.2 4.4L20.2 7M12 20.6v-9.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.8" y="7.4" width="18.4" height="12.6" rx="2" />
      <path d="M8.6 7.4V5.6a1.8 1.8 0 0 1 1.8-1.8h3.2a1.8 1.8 0 0 1 1.8 1.8v1.8" />
      <path d="M2.8 12.6h18.4" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.4V5.2a1.6 1.6 0 0 1 1.6-1.6h8.2a1.6 1.6 0 0 1 1.6 1.6v15.2" />
      <path d="M15.4 10.2h3a1.6 1.6 0 0 1 1.6 1.6v8.6" />
      <path d="M2.6 20.4h18.8M7.6 7.6h4M7.6 11.4h4M7.6 15.2h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.2" y="5" width="17.6" height="16" rx="2.2" />
      <path d="M3.2 9.8h17.6M8.2 3v4M15.8 3v4" />
    </>
  ),
  chartBar: (
    <>
      <path d="M3.4 20.6h17.2" />
      <path d="M6.8 20.6v-6.2M11.6 20.6V7.8M16.4 20.6v-9.4" />
    </>
  ),
  check: <path d="m4.5 12.4 5 5L19.5 6.8" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.2 12.2 2.6 2.6 5-5.4" />
    </>
  ),
  chevronDown: <path d="m5.8 9 6.2 6.2L18.2 9" />,
  chevronRight: <path d="m9.4 5.8 6.2 6.2-6.2 6.2" />,
  circle: <circle cx="12" cy="12" r="8.6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 1.9" />
    </>
  ),
  cloud: (
    <path d="M6.6 19.2A4.6 4.6 0 0 1 6 10.06a6 6 0 0 1 11.6-1.3A4.2 4.2 0 0 1 17.4 19.2Z" />
  ),
  code: <path d="m8.6 8.2-4.4 3.9 4.4 3.9M15.4 8.2l4.4 3.9-4.4 3.9M13.4 4.6l-2.8 15" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m15.4 8.6-1.9 4.9-4.9 1.9 1.9-4.9Z" />
    </>
  ),
  container: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="1.6" />
      <path d="M7.2 7v12M12 7v12M16.8 7v12M3 4.2h18" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="2" />
      <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="1" />
      <path d="M9.4 3.2v3.2M14.6 3.2v3.2M9.4 17.6v3.2M14.6 17.6v3.2M3.2 9.4h3.2M3.2 14.6h3.2M17.6 9.4h3.2M17.6 14.6h3.2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.8" rx="7.8" ry="3" />
      <path d="M4.2 5.8v12.4c0 1.66 3.49 3 7.8 3s7.8-1.34 7.8-3V5.8" />
      <path d="M4.2 12c0 1.66 3.49 3 7.8 3s7.8-1.34 7.8-3" />
    </>
  ),
  external: <path d="M13.6 4.4h6v6M19.6 4.4 11 13M17.4 14v4.6a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8V8.4a1.8 1.8 0 0 1 1.8-1.8H10" />,
  eye: (
    <>
      <path d="M1.9 12S5.6 5.4 12 5.4 22.1 12 22.1 12 18.4 18.6 12 18.6 1.9 12 1.9 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  file: (
    <>
      <path d="M13.4 3.2H7a1.8 1.8 0 0 0-1.8 1.8v14a1.8 1.8 0 0 0 1.8 1.8h10a1.8 1.8 0 0 0 1.8-1.8V8.6Z" />
      <path d="M13.4 3.2v5.4h5.4M8.6 13.4h6.8M8.6 16.8h4.4" />
    </>
  ),
  filter: <path d="M3.4 5h17.2l-6.8 8v6l-3.6-2v-4Z" />,
  gauge: (
    <>
      <path d="M3.6 17.6a9.4 9.4 0 1 1 16.8 0" />
      <path d="m12 12.6 4.2-4" />
      <circle cx="12" cy="13.6" r="1.5" />
    </>
  ),
  gitBranch: (
    <>
      <path d="M6.4 4.8v14.4" />
      <circle cx="6.4" cy="19.2" r="2" />
      <circle cx="6.4" cy="4.8" r="2" />
      <circle cx="17.6" cy="8.4" r="2" />
      <path d="M15.6 8.4h-3a3.2 3.2 0 0 0-3.2 3.2v1.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.4a13.4 13.4 0 0 1 0 17.2 13.4 13.4 0 0 1 0-17.2Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3.4" y="3.4" width="7.2" height="7.2" rx="1.6" />
      <rect x="13.4" y="3.4" width="7.2" height="7.2" rx="1.6" />
      <rect x="3.4" y="13.4" width="7.2" height="7.2" rx="1.6" />
      <rect x="13.4" y="13.4" width="7.2" height="7.2" rx="1.6" />
    </>
  ),
  heart: (
    <path d="M20.2 6.6a4.9 4.9 0 0 0-7 0L12 7.8l-1.2-1.2a4.9 4.9 0 1 0-7 7L12 21.8l8.2-8.2a4.9 4.9 0 0 0 0-7Z" />
  ),
  key: (
    <>
      <circle cx="7.6" cy="16.4" r="3.6" />
      <path d="m10.2 13.8 7.8-7.8M15.6 8.4l2.2 2.2M18 6l2.2 2.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2.8 8.8 4.6L12 12 3.2 7.4Z" />
      <path d="m3.2 12.4 8.8 4.6 8.8-4.6M3.2 17.2l8.8 4.6 8.8-4.6" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="m6 6 3.4 3.4M14.6 14.6 18 18M18 6l-3.4 3.4M9.4 14.6 6 18" />
    </>
  ),
  lightning: <path d="M13.4 2.4 4.6 13.2h6L10.6 21.6l8.8-10.8h-6Z" />,
  link: (
    <>
      <path d="M10 13.6a3.8 3.8 0 0 0 5.7.4l2.8-2.8a3.8 3.8 0 0 0-5.4-5.4l-1.6 1.6" />
      <path d="M14 10.4a3.8 3.8 0 0 0-5.7-.4l-2.8 2.8a3.8 3.8 0 0 0 5.4 5.4l1.6-1.6" />
    </>
  ),
  lock: (
    <>
      <rect x="4.2" y="10.4" width="15.6" height="10.4" rx="2.2" />
      <path d="M7.8 10.4V7.6a4.2 4.2 0 0 1 8.4 0v2.8" />
      <path d="M12 14.6v2.2" />
    </>
  ),
  mail: (
    <>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.2" />
      <path d="m2.6 7.4 8.44 5.6a1.8 1.8 0 0 0 1.92 0L21.4 7.4" />
    </>
  ),
  map: (
    <>
      <path d="m2.8 6.4 6-2.6v13.8l-6 2.6Z" />
      <path d="m8.8 3.8 6.4 2.8v13.6l-6.4-2.8" />
      <path d="m15.2 6.6 6-2.6v13.8l-6 2.4" />
    </>
  ),
  menu: <path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h16.8" />,
  minus: <path d="M5 12h14" />,
  moon: <path d="M20.4 14.2A8.8 8.8 0 0 1 9.8 3.6a8.8 8.8 0 1 0 10.6 10.6Z" />,
  network: (
    <>
      <rect x="9" y="2.8" width="6" height="5.2" rx="1.4" />
      <rect x="2.4" y="16" width="6" height="5.2" rx="1.4" />
      <rect x="15.6" y="16" width="6" height="5.2" rx="1.4" />
      <path d="M12 8v3.2M5.4 16v-2.4a1.4 1.4 0 0 1 1.4-1.4h10.4a1.4 1.4 0 0 1 1.4 1.4V16" />
    </>
  ),
  package: (
    <>
      <path d="M20.4 8.2v7.6a1.8 1.8 0 0 1-.92 1.57l-6.6 3.7a1.8 1.8 0 0 1-1.76 0l-6.6-3.7A1.8 1.8 0 0 1 3.6 15.8V8.2a1.8 1.8 0 0 1 .92-1.57l6.6-3.7a1.8 1.8 0 0 1 1.76 0l6.6 3.7A1.8 1.8 0 0 1 20.4 8.2Z" />
      <path d="m3.9 7.2 8.1 4.6 8.1-4.6M12 20.8v-9M7.9 4.9l8.2 4.6" />
    </>
  ),
  pause: <path d="M9 4.8v14.4M15 4.8v14.4" />,
  phone: (
    <path d="M20.6 16.9v2.6a1.8 1.8 0 0 1-1.96 1.8 17.6 17.6 0 0 1-7.66-2.73 17.3 17.3 0 0 1-5.32-5.32A17.6 17.6 0 0 1 2.93 5.56 1.8 1.8 0 0 1 4.72 3.6h2.6a1.8 1.8 0 0 1 1.8 1.55c.11.86.32 1.7.62 2.5a1.8 1.8 0 0 1-.4 1.9L8.24 10.65a14.4 14.4 0 0 0 5.11 5.11l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.64.51 2.5.62a1.8 1.8 0 0 1 1.55 1.83Z" />
  ),
  play: <path d="M7.4 4.9v14.2l11.6-7.1Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  refresh: (
    <>
      <path d="M20.4 11.4a8.4 8.4 0 0 0-14.6-4.6L2.8 9.6" />
      <path d="M2.8 4.4v5.2h5.2" />
      <path d="M3.6 12.6a8.4 8.4 0 0 0 14.6 4.6l3-2.8" />
      <path d="M21.2 19.6v-5.2H16" />
    </>
  ),
  rewind: <path d="M11.4 6.2v11.6L3.6 12ZM20.4 6.2v11.6L12.6 12Z" />,
  route: (
    <>
      <circle cx="5.6" cy="18.4" r="2.6" />
      <circle cx="18.4" cy="5.6" r="2.6" />
      <path d="M15.8 5.6h-4a3.6 3.6 0 0 0 0 7.2h.4a3.6 3.6 0 0 1 0 7.2h-4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m20.4 20.4-4.8-4.8" />
    </>
  ),
  server: (
    <>
      <rect x="2.8" y="3.4" width="18.4" height="7" rx="1.8" />
      <rect x="2.8" y="13.6" width="18.4" height="7" rx="1.8" />
      <path d="M6.6 6.9v.1M6.6 17.1v.1M10.4 6.9v.1M10.4 17.1v.1" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.2 14.6a1.6 1.6 0 0 0 .32 1.76l.06.06a1.9 1.9 0 1 1-2.7 2.7l-.06-.06a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.9 1.9 0 1 1-3.8 0v-.09a1.6 1.6 0 0 0-1.05-1.47 1.6 1.6 0 0 0-1.76.32l-.06.06a1.9 1.9 0 1 1-2.7-2.7l.06-.06a1.6 1.6 0 0 0 .32-1.76 1.6 1.6 0 0 0-1.47-.97H3.4a1.9 1.9 0 1 1 0-3.8h.09A1.6 1.6 0 0 0 4.96 8.9a1.6 1.6 0 0 0-.32-1.76l-.06-.06a1.9 1.9 0 1 1 2.7-2.7l.06.06a1.6 1.6 0 0 0 1.76.32h.08a1.6 1.6 0 0 0 .97-1.47V3.1a1.9 1.9 0 1 1 3.8 0v.09a1.6 1.6 0 0 0 .97 1.47 1.6 1.6 0 0 0 1.76-.32l.06-.06a1.9 1.9 0 1 1 2.7 2.7l-.06.06a1.6 1.6 0 0 0-.32 1.76v.08a1.6 1.6 0 0 0 1.47.97h.17a1.9 1.9 0 1 1 0 3.8h-.09a1.6 1.6 0 0 0-1.47.97Z" />
    </>
  ),
  shield: (
    <path d="M12 2.6 4.4 5.8v6.1c0 4.6 3.2 8.9 7.6 10 4.4-1.1 7.6-5.4 7.6-10V5.8Z" />
  ),
  shieldCheck: (
    <>
      <path d="M12 2.6 4.4 5.8v6.1c0 4.6 3.2 8.9 7.6 10 4.4-1.1 7.6-5.4 7.6-10V5.8Z" />
      <path d="m8.8 11.8 2.4 2.4 4.4-4.6" />
    </>
  ),
  sliders: <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />,
  sparkles: (
    <>
      <path d="M11 3.4 12.7 8l4.6 1.7-4.6 1.7L11 16l-1.7-4.6L4.7 9.7 9.3 8Z" />
      <path d="m18.4 14.4.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9Z" />
    </>
  ),
  stack: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="5.2" rx="1.6" />
      <rect x="3.2" y="10.4" width="17.6" height="5.2" rx="1.6" />
      <path d="M6.4 18.8h11.2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.4 12H2.2M21.8 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  terminal: <path d="M4.6 6.4 9.8 12l-5.2 5.6M12.4 18h7" />,
  trendingDown: <path d="M3.4 7.6 9.8 14l3.6-3.6 7.2 7.2m0 0v-5.4m0 5.4h-5.4" />,
  trendingUp: <path d="M3.4 16.4 9.8 10l3.6 3.6 7.2-7.2m0 0h-5.4m5.4 0v5.4" />,
  users: (
    <>
      <path d="M15.6 20.4v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.6v1.8" />
      <circle cx="9.3" cy="7.6" r="3.6" />
      <path d="M21 20.4v-1.8a3.6 3.6 0 0 0-2.7-3.48M15.9 4.12a3.6 3.6 0 0 1 0 6.97" />
    </>
  ),
  workflow: (
    <>
      <rect x="2.8" y="3" width="7" height="6" rx="1.6" />
      <rect x="14.2" y="15" width="7" height="6" rx="1.6" />
      <path d="M6.3 9v6.4a2.6 2.6 0 0 0 2.6 2.6h5.3" />
      <path d="M9.8 6h3.4a2.6 2.6 0 0 1 2.6 2.6V15" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  zap: <path d="M12.8 2.6 4.4 12.9h6.2l-.6 8.5 8.4-10.3h-6.2Z" />,
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  /** Marks the icon as meaningful; otherwise it is hidden from assistive tech. */
  title?: string;
}

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.6,
  title,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}

export const iconNames = Object.keys(PATHS) as IconName[];
