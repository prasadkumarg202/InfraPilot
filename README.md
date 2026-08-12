# Infrapilot — Web Platform

Marketing site and design system for **Infrapilot**, an AI-powered enterprise
infrastructure automation platform.

Next.js 15 · React 19 · TypeScript · token-driven CSS design system · zero
runtime dependencies for the visual layer.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## What is in here

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, control-plane console, platform pillars, interactive demos, coverage, integrations, customers, FAQ |
| `/platform` | How the control plane works, plus the reference architecture |
| `/products` | All 28 modules, grouped by lifecycle stage |
| `/solutions` | Five outcome-led solutions, plus by-team and by-industry entry points |
| `/industries` | Ten regulated sectors with framework coverage |
| `/integrations` | Certified connectors, the full catalogue, and the connector SDK |
| `/customers` · `/case-studies` | Reference estates and three detailed programmes |
| `/pricing` | Three plans, full comparison matrix, commercial FAQ |
| `/security` | Trust centre — certifications, control model, data handling |
| `/docs` · `/api` | Documentation shell and API reference |
| `/resources` · `/blog` | Briefs, status, changelog, editorial |
| `/company/*` | About, leadership, careers, events |
| `/contact-sales` · `/book-demo` | Conversion pages |
| `/design-system` | Live component and token reference (noindex) |

---

## Architecture

```
src/
  app/                        # Next.js App Router
    <route>/
      page.tsx                # the page component
      meta.ts                 # PageMeta — see "Why meta.ts" below
    layout.tsx                # root layout, fonts, JSON-LD
    globals.css               # imports the design-system layers in order
    sitemap.ts robots.ts      # generated SEO surfaces
    error.tsx not-found.tsx   # route boundaries
  components/
    primitives/               # atoms: Button, Badge, Card, Section, Icon, Logo
    layout/                   # Header, Footer, PageShell, Breadcrumbs
    marketing/                # Hero, sections, Pricing, Accordion, logo walls
    visualizations/           # TopologyGraph, ControlPlaneConsole, RiskGauge,
                              # WorkflowCanvas, PolicyPanel, CopilotPanel,
                              # ArchitectureDiagram
    demos/                    # DemoTheatre — the interactive scenario player
  content/                    # all copy and data, no strings in components
    site.config.ts            # brand name, domain, contact — single source
    navigation.ts platform.ts technologies.ts solutions.ts
    customers.ts testimonials.ts pricing.ts resources.ts company.ts
    demos.ts faq.ts
  lib/
    seo.ts                    # metadata, JSON-LD, canonical, breadcrumbs
    utils.ts                  # cx, seeded PRNG, SVG path helpers
    islands.tsx               # hydration boundary abstraction
  styles/                     # the design system, in cascade order
    tokens.css                # ← the only file with raw values
    base.css layout.css components.css chrome.css
    visualizations.css marketing.css sections.css pages.css content.css
tools/                        # local render + QA harness (not shipped to prod)
public/
  fonts/  brand/  og/
```

### Atomic layering

`primitives → layout → marketing/visualizations → app routes`. A component
never imports from a layer above it. Content is injected as props from
`src/content`, so no component holds a hard-coded string a marketer would want
to change.

### Why `meta.ts` sits beside every `page.tsx`

Next.js validates the export surface of App Router entry files and rejects any
named export outside its allow-list (`metadata`, `generateMetadata`,
`viewport`, route-segment config). The page metadata object is also needed by
the static render harness in `tools/`, so it lives in a sibling module that
both consumers import. `page.tsx` exports only `metadata` and the default
component.

---

## Design system

**Everything resolves to a token.** `src/styles/tokens.css` is the only file
that contains a raw colour, size or timing value. Components reference
*semantic* tokens (`--bg-surface`, `--accent-text`, `--border-hairline`), which
resolve per theme — which is what makes a second theme a data change rather
than a rewrite.

| Layer | Contents |
| --- | --- |
| `tokens.css` | Palette ramps, fluid type scale, spacing, radii, motion curves, z-layers, and the dark + light semantic sets |
| `base.css` | Reset, document defaults, scrollbars, focus, reduced-motion, high-contrast, print |
| `layout.css` | Container, grid, section rhythm, ambient background field, scroll reveal |
| `components.css` | Button, Card, Badge, Table, Tabs, Accordion, Alert, Form, Dialog, Tooltip, Code, Stat |
| `chrome.css` | Logo lockup, header, mega-menu, mobile nav, footer |
| `visualizations.css` | Topology, gauges, the control-plane console |
| `marketing.css` `sections.css` `pages.css` `content.css` | Page-level patterns |

The neutral ramp is navy rather than grey — anchored on `#0C1424`, `#14203A`
and `#1E2C49` so the three surface planes match the existing Infrapilot system,
with the steps between them interpolated. The accent is vermillion, warming to
gold at the end of the brand gradient.

Note the split between `--accent` and `--accent-text`. The vermillion that
reads correctly as a button fill only reaches 3.4:1 against the page surface —
fine behind white text, illegal as small text on navy — so type uses a lighter
step of the same ramp. Status colours were shifted for the same reason:
`warning` is orange rather than amber so it cannot be mistaken for brand gold,
and `danger` is rose-shifted so it cannot be mistaken for brand vermillion.

Light mode is **not** an inversion. It drops the ambient field to near nothing,
moves depth cues from light bloom to shadow, and darkens both accents so they
clear 4.5:1 against white. Every semantic token is redefined per theme.

Tailwind is configured (`tailwind.config.ts`) against the same tokens for
utility work, with `preflight` disabled because `base.css` already owns the
reset. It is deliberately not the source of visual truth.

### Typography

Three families, all self-hosted: **Anek Latin** for display, **Noto Sans** for
body, **IBM Plex Mono** for anything an operator would read as data. The first
two ship as subset variable `woff` (brotli was unavailable when they were
built, so `woff2` was not an option); Plex Mono ships as three static `woff2`
weights.

The `@font-face` rules live in `src/styles/tokens.css` rather than in
`next/font/local`. The same stylesheet is consumed by the offline harness in
`tools/`, and declaring the faces in two places would let the Next build and
the harness drift on exactly the thing that is hardest to catch in a
screenshot. The cost is that the preload hints in `layout.tsx` are written by
hand.

Anything numeric carries `data-numeric` for tabular figures.

### Icons

68 icons hand-drawn on a 24×24 grid with a 1.6 stroke, round caps and joins
(`src/components/primitives/Icon.tsx`). Stroke inherits `currentColor`.
`lucide-react` is available as a dependency for anything the set does not
cover.

---

## Visualisations

Every chart, graph and diagram is authored SVG or CSS. Nothing is a
screenshot, so everything stays sharp at any density, respects the active
theme, and animates without loading a video.

- **`TopologyGraph`** — layered directed graph with a shared row pitch so
  layers sit centred rather than stretched, and a travelling pulse on active
  edges. Layout is deterministic, so SSR and client markup match exactly.
- **`ControlPlaneConsole`** — the hero product shot: estate tree, topology,
  execution waves, risk gauge, step list and live event feed.
- **`DemoTheatre`** — six scripted scenario replays. Phases, log stream,
  metrics and a scenario-specific visual all read from the same progress value,
  so they can never disagree. Autoplays only when on screen.
- **`RiskGauge`**, **`WorkflowCanvas`**, **`PolicyPanel`**, **`CopilotPanel`**,
  **`ArchitectureDiagram`**.

All generated data runs through a seeded PRNG (`seededRandom` in
`lib/utils.ts`) rather than `Math.random()`, so server and client produce
byte-identical markup and screenshots are reproducible between builds.

---

## Accessibility

Targeting WCAG 2.2 AA, enforced rather than aspired to:

- Body text clears 7:1 against its background in both themes; secondary text
  clears 4.5:1.
- Focus rings appear for keyboard users only (`:focus-visible`), so pointer
  interaction stays clean.
- The mega-menu opens on hover for pointers and on Enter/Space/ArrowDown for
  keyboards, with Escape and outside-click closing it.
- Accordion panels stay in the DOM and animate via `grid-template-rows`, so
  answers remain crawlable and findable by in-page search while collapsed.
- `prefers-reduced-motion` stops every ambient loop entirely and collapses
  state transitions to near-instant.
- `prefers-contrast: more` raises border and text contrast.
- Skip link, landmark regions, and a visible `aria-current` on the active nav
  item.

---

## SEO

`src/lib/seo.ts` is the single source for metadata. Each route's `meta.ts`
declares a `PageMeta`; `toNextMetadata()` adapts it for the App Router
Metadata API and `buildHead()` renders the same data in the static harness, so
the two can never drift.

Includes: canonical URLs, OpenGraph and Twitter cards, a generated 1200×630 OG
image (`npm run og` renders it through the real design system in headless
Chromium, so the card cannot drift from the site), JSON-LD for `Organization`,
`WebSite`, `SoftwareApplication`, `BreadcrumbList` and `FAQPage`, generated
`sitemap.xml` and `robots.txt`, and security headers in `next.config.ts`.

### Core Web Vitals posture

- No client-side JavaScript for anything static — the header, the accordion and
  the demo player are the only interactive components.
- Fonts self-hosted and preloaded; `display: swap`; no third-party requests.
- Zero bitmap images above the fold. The hero visual is markup.
- The ambient background is composited (`transform`/`opacity` only) and hidden
  entirely under reduced-motion.
- The theme bootstrap is the only render-blocking script — ~300 bytes, inlined
  to prevent a flash of the wrong palette.

---

## Local render harness (`tools/`)

The repo carries a small offline harness used to render, screenshot and audit
the component library without a Next.js dev server. It is a development aid and
is not part of the production build.

```bash
bash tools/run.sh              # render every route to out/
node tools/shoot.mjs / --full  # screenshot a route (add --all, --theme=light)
node tools/measure.mjs /       # report section heights
node tools/a11y.mjs            # contrast, landmark and alt-text audit
node tools/verify.mjs          # console errors + horizontal overflow, every route
node tools/overflow.mjs /      # bisect which element overflows
node tools/inline.mjs          # emit fully self-contained single-file HTML
node tools/og.mjs              # regenerate the OpenGraph card
```

The contrast audit composites alpha layers up the ancestor chain rather than
reading the nearest declared background, because a translucent card on a
gradient does not have the colour its own rule says it has. It currently
reports **zero findings** in both themes.

`node_modules/next/` may contain an offline type stub — the package registry
was unreachable when this was built, so `tsc --noEmit` would otherwise fail on
framework imports for reasons unrelated to the code. `npm install` replaces it
with the real package.

`tools/pages.ts` mirrors the App Router route table. Adding a route means
adding a directory under `src/app` and an entry there.

---

## Renaming the company

Every reference to the company name, domain, contact details and social handles
in the entire codebase resolves through `src/content/site.config.ts`. Change
`name`, `legalName`, `domain` and `url` there, replace the brand assets in
`public/brand/`, update the mark in `src/components/primitives/Logo.tsx`, and
run `npm run og`. Nothing else needs to be touched — the site was rebranded
from its working name to Infrapilot this way, and that was the whole diff
outside the palette.

---

## Conventions

- **No strings in components.** Copy lives in `src/content`.
- **No raw values below `tokens.css`.** If you need a new colour or size, add a
  token.
- **Deterministic data.** Seeded PRNG only; never `Math.random()` or
  `Date.now()` in render.
- **British English** in customer-facing copy; American spelling in code
  identifiers.
- **Numbers are claims.** Every figure on the site traces to something in
  `src/content` with its methodology stated.

---

© Infrapilot Technologies, Inc.
