/**
 * Visual QA harness.
 *
 * Serves `out/` and screenshots the requested routes at desktop, tablet and
 * mobile widths. Waits for fonts and for reveal animations to settle so shots
 * are stable between runs. Also reports any console errors the page produced,
 * which is how hydration problems surface without a browser open.
 *
 *   node tools/shoot.mjs [route ...] [--width=1440] [--full] [--theme=light]
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'out');
const SHOTS = path.join(ROOT, 'shots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      let file = path.join(OUT, url);
      if (!path.extname(file)) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('not found: ' + url);
        return;
      }
      const body = await fsp.readFile(file);
      res.writeHead(200, {
        'content-type': MIME[path.extname(file)] || 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(body);
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(String(error));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const args = process.argv.slice(2);
const routes = args.filter((a) => !a.startsWith('--'));
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    }),
);

const VIEWPORTS = flags.width
  ? [{ name: 'custom', width: Number(flags.width), height: Number(flags.height || 1000) }]
  : [
      { name: 'desktop', width: 1440, height: 950 },
      ...(flags.all ? [{ name: 'tablet', width: 834, height: 1100 }] : []),
      ...(flags.all ? [{ name: 'mobile', width: 390, height: 844 }] : []),
    ];

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
await fsp.mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const targets = routes.length ? routes : ['/'];
let problems = 0;

for (const route of targets) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: Number(flags.dpr || 2),
      colorScheme: flags.theme === 'light' ? 'light' : 'dark',
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

    await page.goto(base + route, { waitUntil: 'networkidle' });
    if (flags.theme === 'light') {
      await page.evaluate(() =>
        document.documentElement.setAttribute('data-theme', 'light'),
      );
    }
    await page.evaluate(() => document.fonts.ready);
    // Let scroll-reveal fire across the whole document, then return to top.
    if (flags.full) {
      // `behavior: 'instant'` is required: the document sets
      // `scroll-behavior: smooth`, and successive smooth scrolls cancel each
      // other, leaving the page at the top with nothing revealed.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 110));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }
    await page.waitForTimeout(flags.full ? 900 : 700);

    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    const suffix = flags.theme === 'light' ? '-light' : '';
    const file = path.join(SHOTS, `${slug}-${vp.name}${suffix}.png`);
    // `animations: 'disabled'` matters for --full: a full-page capture on a
    // long page with running ambient loops keeps repainting and Playwright's
    // 30s default expires before it ever gets a stable frame.
    await page.screenshot({
      path: file,
      fullPage: Boolean(flags.full),
      animations: 'disabled',
      timeout: flags.full ? 120000 : 30000,
    });

    const size = (await fsp.stat(file)).size;
    console.log(
      `  ${route.padEnd(22)} ${vp.name.padEnd(8)} ${(size / 1024).toFixed(0)} KB`,
    );
    if (errors.length) {
      problems += errors.length;
      errors.slice(0, 6).forEach((e) => console.log(`      ! ${e.slice(0, 180)}`));
    }
    await context.close();
  }
}

await browser.close();
server.close();
console.log(problems ? `\n${problems} console error(s)` : '\nno console errors');
