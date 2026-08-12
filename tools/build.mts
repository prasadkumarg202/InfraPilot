/**
 * Static render harness.
 *
 * Server-renders every route in the manifest to HTML, bundles the client
 * islands, inlines the design-system CSS, and writes a browsable site to
 * `out/`. This exists so the component library can be rendered, screenshotted
 * and visually reviewed without a running Next.js dev server — the shipped
 * application uses the same components under the App Router.
 */

import { mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import * as esbuild from 'esbuild';

import { routes } from './pages';
import { buildHead } from '@/lib/seo';
import { site } from '@/content/site.config';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const OUT = path.join(ROOT, 'out');
const SRC = path.join(ROOT, 'src');

const STYLE_ORDER = [
  'tokens.css',
  'base.css',
  'layout.css',
  'components.css',
  'chrome.css',
  'visualizations.css',
  'marketing.css',
  'sections.css',
  'pages.css',
  'content.css',
];

/** Small SVG noise plate, inlined as a data URL so no network request. */
function noiseTexture(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)" opacity="1"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

async function collectCss(): Promise<string> {
  const parts: string[] = [];
  for (const file of STYLE_ORDER) {
    const full = path.join(SRC, 'styles', file);
    if (existsSync(full)) {
      parts.push(`/* ===== ${file} ===== */\n${await readFile(full, 'utf8')}`);
    }
  }
  // The noise texture is generated rather than shipped as a binary asset.
  parts.unshift(`:root { --noise-texture: ${noiseTexture()}; }`);
  return parts.join('\n\n');
}

/**
 * Boot script. Runs before paint to apply the stored theme (avoiding a
 * flash of the wrong palette) and strips the `no-js` class.
 */
const BOOT_SCRIPT = `
(function () {
  var d = document.documentElement;
  d.classList.remove('no-js');
  try {
    var stored = localStorage.getItem('infrapilot-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    d.setAttribute('data-theme', theme);
  } catch (e) {
    d.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

function documentHtml(opts: {
  head: ReturnType<typeof buildHead>;
  body: string;
  css: string;
}): string {
  const { head, body, css } = opts;
  const metaTags = head.meta
    .map((m) => {
      const key = 'property' in m ? 'property' : 'name';
      return `    <meta ${key}="${m[key]}" content="${escapeAttr(m.content)}" />`;
    })
    .join('\n');

  const jsonLd = head.jsonLd
    .map(
      (doc) =>
        `    <script type="application/ld+json">${JSON.stringify(doc)}</script>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="en" data-theme="dark" class="no-js">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${escapeHtml(head.title)}</title>
    <link rel="canonical" href="${head.canonicalUrl}" />
${metaTags}
    <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="preload" href="/fonts/NotoSans-Variable.woff" as="font" type="font/woff" crossorigin />
    <link rel="preload" href="/fonts/AnekLatin-Variable.woff" as="font" type="font/woff" crossorigin />
    <script>${BOOT_SCRIPT}</script>
    <style>${css}</style>
${jsonLd}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to main content</a>
${body}
    <script type="module" src="/client.js"></script>
  </body>
</html>
`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

async function bundleClient(): Promise<void> {
  await esbuild.build({
    entryPoints: [path.join(ROOT, 'tools', 'client-entry.tsx')],
    outfile: path.join(OUT, 'client.js'),
    bundle: true,
    format: 'esm',
    target: ['es2022'],
    jsx: 'automatic',
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: { '@': SRC },
    logLevel: 'warning',
  });
}

async function main(): Promise<void> {
  const started = Date.now();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const css = await collectCss();

  // Static assets
  if (existsSync(path.join(ROOT, 'public'))) {
    await cp(path.join(ROOT, 'public'), OUT, { recursive: true });
  }

  let rendered = 0;
  for (const route of routes) {
    let mod: Awaited<ReturnType<typeof route.load>>;
    try {
      mod = await route.load();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // A route whose module does not exist yet is skipped rather than
      // failing the whole build, so pages can land incrementally.
      if (/Cannot find module|ERR_MODULE_NOT_FOUND/.test(message)) {
        console.warn(`  · ${route.path.padEnd(26)} not implemented — skipped`);
        continue;
      }
      console.error(`  ✗ ${route.path} — failed to render`);
      throw error;
    }

    const { meta } = await route.meta();
    const head = buildHead(meta, route.path === '/');
    const body = renderToString(createElement(mod.default));
    const html = documentHtml({ head, body, css });

    const dir =
      route.path === '/' ? OUT : path.join(OUT, route.path.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html, 'utf8');
    rendered += 1;
    console.log(`  ✓ ${route.path.padEnd(26)} ${(html.length / 1024).toFixed(0)} KB`);
  }

  await bundleClient();
  await writeSitemap();
  await writeRobots();
  await writeManifest();

  console.log(
    `\n${rendered} routes rendered in ${((Date.now() - started) / 1000).toFixed(2)}s → out/`,
  );
}

async function writeSitemap(): Promise<void> {
  const today = '2026-08-06';
  const priority = (p: string): string => {
    if (p === '/') return '1.0';
    if (['/platform', '/products', '/pricing', '/solutions'].includes(p))
      return '0.9';
    if (p.startsWith('/company')) return '0.6';
    return '0.8';
  };
  const urls = routes
    .filter((r) => r.path !== '/design-system')
    .map(
      (r) => `  <url>
    <loc>${site.url}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/blog' ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority(r.path)}</priority>
  </url>`,
    )
    .join('\n');

  await writeFile(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    'utf8',
  );
}

async function writeRobots(): Promise<void> {
  await writeFile(
    path.join(OUT, 'robots.txt'),
    `# ${site.legalName}
User-agent: *
Allow: /
Disallow: /api/internal/
Disallow: /*?utm_

User-agent: GPTBot
Allow: /

Sitemap: ${site.url}/sitemap.xml
Host: ${site.domain}
`,
    'utf8',
  );
}

async function writeManifest(): Promise<void> {
  await writeFile(
    path.join(OUT, 'site.webmanifest'),
    JSON.stringify(
      {
        name: `${site.name} — ${site.tagline}`,
        short_name: site.name,
        description: site.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#06080c',
        theme_color: '#06080c',
        icons: [
          { src: '/brand/logo-mark.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      null,
      2,
    ),
    'utf8',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
