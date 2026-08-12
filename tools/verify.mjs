import http from 'node:http';import fs from 'node:fs';import fsp from 'node:fs/promises';import path from 'node:path';
import { chromium } from 'playwright';
const OUT='/home/claude/site/out';
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.webmanifest':'application/json'};
const server=http.createServer(async(req,res)=>{let u=decodeURIComponent((req.url||'/').split('?')[0]);let f=path.join(OUT,u);if(!path.extname(f))f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});res.end(await fsp.readFile(f));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const routes=['/','/platform','/products','/solutions','/industries','/integrations','/customers','/pricing','/security','/resources','/docs','/api','/blog','/case-studies','/partners','/company','/company/about','/company/leadership','/company/careers','/company/events','/contact-sales','/book-demo','/design-system'];
const b=await chromium.launch();
let bad=0;
for(const r of routes){
  const c=await b.newContext({viewport:{width:1440,height:950}});
  const p=await c.newPage();
  const errs=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200));});
  p.on('pageerror',e=>errs.push('pageerror: '+e.message.slice(0,200)));
  await p.goto(base+r,{waitUntil:'networkidle'});
  await p.waitForTimeout(700);
  // horizontal overflow check
  const ov=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  const overflow = ov.sw > ov.cw + 1;
  if(errs.length||overflow){bad++;console.log(r, overflow?`H-OVERFLOW ${ov.sw}>${ov.cw}`:'', errs.join(' | '));}
  await c.close();
}
// mobile overflow
for(const r of ['/','/pricing','/docs','/design-system','/platform']){
  const c=await b.newContext({viewport:{width:390,height:844}});
  const p=await c.newPage();
  await p.goto(base+r,{waitUntil:'networkidle'});
  const ov=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  if(ov.sw>ov.cw+1){bad++;console.log('MOBILE',r,`H-OVERFLOW ${ov.sw}>${ov.cw}`);}
  await c.close();
}
await b.close();server.close();
console.log(bad? `\n${bad} route(s) with problems` : '\nAll routes clean: no console errors, no horizontal overflow');
