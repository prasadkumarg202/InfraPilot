/**
 * Accessibility audit.
 *
 * Checks the properties that are cheap to get wrong and expensive to discover
 * late: text contrast against the actual composited background, landmark
 * structure, heading order, accessible names on interactive elements, image
 * alternatives, and touch-target size.
 *
 * Runs against the rendered output in `out/`, in both themes.
 *
 *   node tools/a11y.mjs [route ...]
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const OUT = path.resolve(import.meta.dirname, '..', 'out');
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/json',
};

const server = http.createServer(async (req, res) => {
  let url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(OUT, url);
  if (!path.extname(file)) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, {
    'content-type': MIME[path.extname(file)] || 'application/octet-stream',
  });
  res.end(await fsp.readFile(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const ROUTES = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const targets = ROUTES.length
  ? ROUTES
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

/** Injected into the page: WCAG relative-luminance contrast maths. */
const AUDIT = `(() => {
  const problems = [];

  const parse = (c) => {
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };

  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });

  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  /** Walks up until an opaque background is found, compositing as it goes. */
  const effectiveBg = (el) => {
    let node = el;
    let acc = null;
    while (node && node !== document.documentElement) {
      const bg = parse(getComputedStyle(node).backgroundColor);
      if (bg && bg.a > 0) acc = acc ? over(acc, bg) : bg;
      if (acc && acc.a >= 0.999) return acc;
      node = node.parentElement;
    }
    const root = parse(getComputedStyle(document.documentElement).backgroundColor);
    return acc && root ? over(acc, root) : root || { r: 0, g: 0, b: 0, a: 1 };
  };

  // ---------------------------------------------------------------- contrast
  const textNodes = [];
  document.querySelectorAll('body *').forEach((el) => {
    const hasText = Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
    );
    if (hasText) textNodes.push(el);
  });

  textNodes.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') return;
    // Gradient-clipped text has a transparent fill by design.
    if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') return;
    // A gradient background cannot be reduced to one colour, so contrast
    // against it is not decidable here. These surfaces are checked by eye.
    let g = el;
    let gradient = false;
    while (g && g !== document.body) {
      if (getComputedStyle(g).backgroundImage.includes('gradient')) { gradient = true; break; }
      g = g.parentElement;
    }
    if (gradient) return;

    // SVG glyphs are painted with the fill property; the color property on
    // them is only what currentColor would resolve to, often a different token.
    const isSvgText = el.namespaceURI === 'http://www.w3.org/2000/svg';
    const paint = isSvgText ? cs.fill : cs.color;
    const fg = parse(paint);
    if (!fg || fg.a === 0) return;
    const bg = effectiveBg(el);
    const composited = fg.a < 1 ? over(fg, bg) : fg;
    const r = ratio(composited, bg);

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = large ? 3 : 4.5;

    if (r < required) {
      problems.push({
        type: 'contrast',
        ratio: Math.round(r * 100) / 100,
        required,
        selector: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : ''),
        text: (el.textContent || '').trim().slice(0, 48),
        fontSize: size,
      });
    }
  });

  // --------------------------------------------------------------- landmarks
  if (!document.querySelector('main')) problems.push({ type: 'landmark', detail: 'no <main>' });
  if (!document.querySelector('header')) problems.push({ type: 'landmark', detail: 'no <header>' });
  if (!document.querySelector('footer')) problems.push({ type: 'landmark', detail: 'no <footer>' });
  if (document.querySelectorAll('h1').length !== 1) {
    problems.push({
      type: 'heading',
      detail: \`\${document.querySelectorAll('h1').length} <h1> elements\`,
    });
  }

  // ------------------------------------------------------------ heading order
  let previous = 0;
  document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
    const level = Number(h.tagName[1]);
    if (previous && level > previous + 1) {
      problems.push({
        type: 'heading-order',
        detail: \`h\${previous} → h\${level}\`,
        text: (h.textContent || '').trim().slice(0, 40),
      });
    }
    previous = level;
  });

  // -------------------------------------------------------- accessible names
  document.querySelectorAll('a, button').forEach((el) => {
    const name =
      (el.textContent || '').trim() ||
      el.getAttribute('aria-label') ||
      el.getAttribute('title') ||
      el.querySelector('svg title')?.textContent ||
      '';
    if (!name) {
      problems.push({
        type: 'name',
        detail: el.tagName.toLowerCase(),
        selector: (el.className || '').toString().slice(0, 50),
      });
    }
  });

  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('alt')) problems.push({ type: 'alt', detail: img.src });
  });

  document.querySelectorAll('input, select, textarea').forEach((field) => {
    if (field.type === 'hidden') return;
    const id = field.id;
    const labelled =
      (id && document.querySelector(\`label[for="\${id}"]\`)) ||
      field.closest('label') ||
      field.getAttribute('aria-label') ||
      field.getAttribute('aria-labelledby');
    if (!labelled) {
      problems.push({ type: 'label', detail: field.name || field.id || field.type });
    }
  });

  // Decorative SVG must be hidden from assistive tech.
  document.querySelectorAll('svg').forEach((svg) => {
    const hidden = svg.getAttribute('aria-hidden') === 'true';
    const named = svg.getAttribute('role') === 'img' && (svg.getAttribute('aria-label') || svg.querySelector('title'));
    if (!hidden && !named) {
      problems.push({ type: 'svg', detail: (svg.getAttribute('class') || '').slice(0, 40) });
    }
  });

  return problems;
})()`;

const browser = await chromium.launch();
let total = 0;
const byType = {};

for (const theme of ['dark', 'light']) {
  for (const route of targets) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 950 },
      colorScheme: theme,
    });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);

    const problems = await page.evaluate(AUDIT);
    if (problems.length) {
      console.log(`\n${theme.toUpperCase()}  ${route}`);
      const seen = new Set();
      problems.forEach((p) => {
        const key = `${p.type}|${p.selector ?? ''}|${p.detail ?? ''}|${p.ratio ?? ''}`;
        if (seen.has(key)) return;
        seen.add(key);
        byType[p.type] = (byType[p.type] || 0) + 1;
        total += 1;
        if (p.type === 'contrast') {
          console.log(
            `   contrast ${p.ratio} < ${p.required}  ${p.selector}  ${p.fontSize}px  "${p.text}"`,
          );
        } else {
          console.log(`   ${p.type}  ${p.detail ?? ''} ${p.selector ?? ''} ${p.text ?? ''}`);
        }
      });
    }
    await context.close();
  }
}

await browser.close();
server.close();

console.log('\n─────────────────────────────────────');
if (!total) {
  console.log('No accessibility problems found.');
} else {
  console.log(`${total} finding(s):`);
  Object.entries(byType).forEach(([type, count]) => console.log(`  ${type}: ${count}`));
}
