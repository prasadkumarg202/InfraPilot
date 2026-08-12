/**
 * Finds the elements responsible for horizontal overflow at a given width.
 * Reports the widest offenders rather than every descendant of one.
 *
 *   node tools/overflow.mjs /platform 390
 */
import http from 'node:http';import fs from 'node:fs';import fsp from 'node:fs/promises';import path from 'node:path';
import { chromium } from 'playwright';
const OUT=path.resolve(import.meta.dirname,'..','out');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.webmanifest':'application/json'};
const server=http.createServer(async(req,res)=>{let u=decodeURIComponent((req.url||'/').split('?')[0]);let f=path.join(OUT,u);if(!path.extname(f))f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});res.end(await fsp.readFile(f));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const route=process.argv[2]||'/';const width=Number(process.argv[3]||390);
const b=await chromium.launch();
const p=await b.newPage({viewport:{width,height:900}});
await p.goto(`http://127.0.0.1:${server.address().port}${route}`,{waitUntil:'networkidle'});
const out=await p.evaluate((w)=>{
  const rows=[];
  document.querySelectorAll('body *').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.right>w+1||r.left<-1){
      const cs=getComputedStyle(el);
      if(cs.position==='fixed')return;
      // Ignore anything an ancestor already clips — it cannot widen the page.
      let a=el.parentElement, clipped=false;
      while(a && a!==document.body){
        const acs=getComputedStyle(a);
        if(acs.overflowX!=='visible'||acs.overflow!=='visible'){clipped=true;break;}
        a=a.parentElement;
      }
      if(clipped)return;
      rows.push({tag:el.tagName.toLowerCase(),cls:(el.className||'').toString().slice(0,60),right:Math.round(r.right),left:Math.round(r.left),w:Math.round(r.width),overflowX:cs.overflowX});
    }
  });
  return rows;
},width);
// Report only elements whose parent is not itself overflowing — the source.
const keys=new Set(out.map(r=>r.tag+'|'+r.cls));
out.slice(0,25).forEach(r=>console.log(`${String(r.right).padStart(5)}px right  w=${String(r.w).padStart(4)}  ovx=${r.overflowX.padEnd(8)} ${r.tag}.${r.cls}`));
console.log(`\n${out.length} overflowing element(s)`);
await b.close();server.close();
