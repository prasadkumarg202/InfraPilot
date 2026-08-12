import type { Config } from 'tailwindcss';

/**
 * Tailwind is wired to the same design tokens as the CSS layer, so a utility
 * class and a component style can never disagree about what "accent" means.
 * Preflight is disabled because `src/styles/base.css` already owns the reset.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        base: 'var(--bg-base)',
        subtle: 'var(--bg-subtle)',
        surface: 'var(--bg-surface)',
        raised: 'var(--bg-raised)',
        overlay: 'var(--bg-overlay)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
          text: 'var(--accent-text)',
        },
        arc: {
          DEFAULT: 'var(--accent-2)',
          muted: 'var(--accent-2-muted)',
          text: 'var(--accent-2-text)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        fg: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          quaternary: 'var(--text-quaternary)',
        },
        line: {
          hairline: 'var(--border-hairline)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--glow-accent)',
      },
      transitionTimingFunction: {
        swift: 'var(--ease-swift)',
        flow: 'var(--ease-flow)',
        spring: 'var(--ease-spring)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        wide: 'var(--container-wide)',
        narrow: 'var(--container-narrow)',
      },
    },
  },
  plugins: [],
};

export default config;
