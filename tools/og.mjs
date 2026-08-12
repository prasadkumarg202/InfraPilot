/**
 * Generates the OpenGraph card.
 *
 * Rendered through the real design system in headless Chromium rather than
 * drawn by hand, so the social card cannot drift from the site's typography
 * and palette. Run after a build; writes public/og/default.png.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const fontDisplay = await fs.readFile(
  path.join(ROOT, 'public/fonts/AnekLatin-Variable.woff'),
);
const fontSans = await fs.readFile(
  path.join(ROOT, 'public/fonts/NotoSans-Variable.woff'),
);
const fontMono = await fs.readFile(
  path.join(ROOT, 'public/fonts/IBMPlexMono-Medium.woff2'),
);
const mark = await fs.readFile(path.join(ROOT, 'public/brand/logo-mark.svg'), 'utf8');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face{font-family:Display;src:url(data:font/woff;base64,${fontDisplay.toString('base64')}) format('woff');font-weight:100 800}
@font-face{font-family:Sans;src:url(data:font/woff;base64,${fontSans.toString('base64')}) format('woff');font-weight:100 900}
@font-face{font-family:Mono;src:url(data:font/woff2;base64,${fontMono.toString('base64')}) format('woff2');font-weight:500}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#060b16;font-family:Sans;color:#f4f7fc;overflow:hidden;position:relative;
 -webkit-font-smoothing:antialiased}
.mesh{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;
 -webkit-mask-image:radial-gradient(120% 100% at 20% 0%,#000 20%,transparent 78%)}
.aurora{position:absolute;width:900px;height:900px;left:-180px;top:-320px;border-radius:50%;
 background:radial-gradient(circle,rgba(240,78,35,.30),transparent 62%);filter:blur(90px)}
.aurora2{position:absolute;width:820px;height:820px;right:-220px;bottom:-380px;border-radius:50%;
 background:radial-gradient(circle,rgba(232,160,32,.26),transparent 62%);filter:blur(90px)}
.wrap{position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px}
.brand{display:flex;align-items:center;gap:14px}
.brand svg{width:48px;height:48px}
.brand span{font-family:Display;font-size:31px;font-weight:600;letter-spacing:-.02em}
.brand span b{font-weight:600;color:#ff7a45}
h1{font-family:Display;font-size:60px;line-height:1.08;letter-spacing:-.026em;font-weight:600;max-width:16ch}
.grad{background:linear-gradient(96deg,#ff8a5c 4%,#f04e23 48%,#e8a020 98%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p{margin-top:26px;font-size:23px;line-height:1.5;color:#b3bed2;max-width:34ch;letter-spacing:-.012em}
.foot{display:flex;align-items:center;gap:28px;font-family:Mono;font-size:16px;color:#8e9cb6;letter-spacing:.02em}
.foot i{width:6px;height:6px;border-radius:50%;background:#34c77b;display:inline-block;margin-right:9px;
 box-shadow:0 0 0 4px rgba(52,199,123,.18)}
.rule{height:1px;background:linear-gradient(90deg,rgba(255,255,255,.16),transparent);margin-bottom:26px}
</style></head><body>
<div class="aurora"></div><div class="aurora2"></div><div class="mesh"></div>
<div class="wrap">
  <div class="brand">${mark}<span>Iron<b>stack</b></span></div>
  <div>
    <h1>Autonomous infrastructure operations <span class="grad">for modern enterprises</span></h1>
    <p>Discovery, patching, upgrades, migrations, compliance and self-healing — from one intelligent platform.</p>
  </div>
  <div>
    <div class="rule"></div>
    <div class="foot"><span><i></i>77 technologies</span><span>180+ integrations</span><span>SOC 2 · ISO 27001 · PCI ready</span><span style="margin-left:auto">infrapilot.io</span></div>
  </div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await fs.mkdir(path.join(ROOT, 'public/og'), { recursive: true });
await page.screenshot({ path: path.join(ROOT, 'public/og/default.png') });
await browser.close();
console.log('public/og/default.png written');
