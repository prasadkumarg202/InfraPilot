/**
 * Layout probe. Reports the rendered height of every top-level section so an
 * unexpectedly tall block can be found without opening a browser.
 *
 *   node tools/measure.mjs [route] [selector]
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

const route = process.argv[2] || '/';
const selector = process.argv[3] || 'main > *';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
await page.goto(`http://127.0.0.1:${server.address().port}${route}`, {
  waitUntil: 'networkidle',
});
const rows = await page.evaluate((sel) => {
  const out = [];
  document.querySelectorAll(sel).forEach((el) => {
    const rect = el.getBoundingClientRect();
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className || '').toString().slice(0, 60),
      id: el.id,
      h: Math.round(rect.height),
      w: Math.round(rect.width),
    });
  });
  return {
    docHeight: document.documentElement.scrollHeight,
    docWidth: document.documentElement.scrollWidth,
    rows: out,
  };
}, selector);

console.log(`document: ${rows.docWidth} × ${rows.docHeight}`);
rows.rows.forEach((r) =>
  console.log(
    `  ${String(r.h).padStart(6)}px  ${String(r.w).padStart(5)}w  ${r.tag}${r.id ? '#' + r.id : ''}.${r.cls}`,
  ),
);

await browser.close();
server.close();
