/**
 * Produces a single self-contained HTML file per route.
 *
 * Fonts, the client bundle, brand SVGs and the OG image are inlined as data
 * URLs, and internal links are rewritten to the sibling files. The result opens
 * directly from disk over `file://` with no server, which is the fastest way to
 * put the real thing in front of someone.
 *
 *   node tools/inline.mjs [route ...]
 */

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'out');
const DEST = path.join(ROOT, 'standalone');

const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      '/',
      '/platform',
      '/products',
      '/solutions',
      '/industries',
      '/integrations',
      '/customers',
      '/pricing',
      '/security',
      '/resources',
      '/docs',
      '/api',
      '/blog',
      '/case-studies',
      '/partners',
      '/company',
      '/company/about',
      '/company/leadership',
      '/company/careers',
      '/company/events',
      '/contact-sales',
      '/book-demo',
      '/design-system',
    ];

const fileFor = (route) =>
  route === '/' ? 'index.html' : `${route.replace(/^\//, '').replace(/\//g, '-')}.html`;

async function dataUrl(relative, mime) {
  const full = path.join(OUT, relative);
  if (!existsSync(full)) return null;
  const buffer = await fs.readFile(full);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

await fs.rm(DEST, { recursive: true, force: true });
await fs.mkdir(DEST, { recursive: true });

const sansRoman = await dataUrl('fonts/NotoSans-Variable.woff', 'font/woff');
const sansItalic = await dataUrl('fonts/NotoSans-Italic-Variable.woff', 'font/woff');
const displayRoman = await dataUrl('fonts/AnekLatin-Variable.woff', 'font/woff');
const monoRegular = await dataUrl('fonts/IBMPlexMono-Regular.woff2', 'font/woff2');
const monoMedium = await dataUrl('fonts/IBMPlexMono-Medium.woff2', 'font/woff2');
const monoSemiBold = await dataUrl('fonts/IBMPlexMono-SemiBold.woff2', 'font/woff2');
const favicon = await dataUrl('brand/favicon.svg', 'image/svg+xml');
const clientJs = await fs.readFile(path.join(OUT, 'client.js'), 'utf8');

let written = 0;

for (const route of ROUTES) {
  const source = path.join(OUT, route === '/' ? '' : route, 'index.html');
  if (!existsSync(source)) continue;
  let html = await fs.readFile(source, 'utf8');

  // Fonts → data URLs so nothing is requested over the network.
  // The variable faces are declared twice in tokens.css — once as
  // `woff-variations`, once as plain `woff`, so a browser that understands
  // neither keyword still gets a usable src. Both copies have to be rewritten,
  // hence replaceAll rather than replace.
  for (const [file, data] of [
    ['/fonts/NotoSans-Variable.woff', sansRoman],
    ['/fonts/NotoSans-Italic-Variable.woff', sansItalic],
    ['/fonts/AnekLatin-Variable.woff', displayRoman],
    ['/fonts/IBMPlexMono-Regular.woff2', monoRegular],
    ['/fonts/IBMPlexMono-Medium.woff2', monoMedium],
    ['/fonts/IBMPlexMono-SemiBold.woff2', monoSemiBold],
  ]) {
    if (data) html = html.replaceAll(`url('${file}')`, `url('${data}')`);
  }

  // Preloads point at paths that no longer exist in a single file.
  html = html.replace(/\n\s*<link rel="preload"[^>]*>/g, '');
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    favicon ? `<link rel="icon" href="${favicon}" type="image/svg+xml" />` : '',
  );
  html = html.replace(/\n\s*<link rel="apple-touch-icon"[^>]*>/g, '');
  html = html.replace(/\n\s*<link rel="manifest"[^>]*>/g, '');
  html = html.replace(/\n\s*<link rel="sitemap"[^>]*>/g, '');

  // Client bundle inlined.
  //
  // The replacement MUST be a function. React's bundle contains the literal
  // `"$&/"` (its key-escaping helper), and in a replacement *string* `$&`
  // means "the text that was matched" — so a plain string replace silently
  // rewrote three fragments of React's own source into a copy of this very
  // script tag, producing a bundle that parsed but threw at runtime. A
  // replacer function receives no such interpretation.
  html = html.replace(
    '<script type="module" src="/client.js"></script>',
    () => `<script type="module">${clientJs}</script>`,
  );

  // Internal links → sibling files, keeping fragments intact.
  html = html.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (match, href, hash = '') => {
    if (href.startsWith('/fonts') || href.startsWith('/brand') || href.startsWith('/og')) {
      return 'href="#"';
    }
    const normalised = href.replace(/\/$/, '') || '/';
    if (!ROUTES.includes(normalised)) return `href="#"${hash ? '' : ''}`;
    return `href="${fileFor(normalised)}${hash}"`;
  });

  await fs.writeFile(path.join(DEST, fileFor(route)), html, 'utf8');
  written += 1;
}

console.log(`${written} standalone page(s) → standalone/`);
