/* INFRsre demo film — SQL Server build automation. Scenes for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={ in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)), pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI) };
/* phases: 0 Opening,1 Intake,2 Create VM,3 Drives,4 Pre-build,5 Install,6 Post-build,7 Health,8 Outro */
const CAM=[
  {s:1.00,x:0,y:0},{s:1.02,x:0,y:0},{s:1.16,x:150,y:30},{s:1.20,x:-130,y:75},
  {s:1.18,x:-130,y:-30},{s:1.14,x:120,y:20},{s:1.20,x:-130,y:75},{s:1.14,x:120,y:20},
  {s:1.04,x:0,y:0},{s:1.00,x:0,y:0}];
const CAPTIONS=[
  'A new production SQL Server, built hands-free from an intake request.',
  'Intake RITM0067342: OS, SQL version, latest CU, compute — and the full drive layout.',
  'The VM is created first — six disks attached, powered on, domain joined.',
  'Drives formatted and labeled: OS, binaries, data, logs, backups, TempDB.',
  'Pre-build steps: service accounts, firewall, power plan, IFI, lock pages.',
  'SQL Server 2022 installs unattended to D:\\SQLBin — then the latest CU.',
  'Post-build: max memory, MAXDOP, TempDB files and company-policy hardening.',
  'Health checks pass — the server is handed over and the request closes.',
  ''];
const PANEL=['none','intake','vm','drives','pre','install','post','health','health'];
const TW=190;
const VM={name:'SQLNEW-04', x:206, y:34, steps:[
  [0,'awaiting build',C.t4],
  [2.10,'provisioning VM…',C.gold,[2.10,2.55]],
  [2.75,'powered on · domain joined',C.green],
  [4.10,'pre-build steps…',C.gold,[4.10,4.88]],
  [4.90,'pre-build complete',C.green],
  [5.10,'installing SQL 2022…',C.gold,[5.10,5.75]],
  [5.80,'SQL 2022 CU12 · D:\\SQLBin',C.green],
  [6.10,'applying policy…',C.gold,[6.10,6.90]],
  [6.95,'configured per policy',C.green],
  [7.10,'health checks…',C.gold,[7.10,7.75]],
  [7.80,'healthy · handed over',C.green]]};
const DRIVES=[
  {l:'C:',label:'OS',size:'150 GB',fmt:'NTFS 4K'},
  {l:'D:',label:'SQLBin',size:'100 GB',fmt:'NTFS 64K'},
  {l:'E:',label:'SQLData',size:'500 GB',fmt:'NTFS 64K'},
  {l:'F:',label:'SQLLogs',size:'250 GB',fmt:'NTFS 64K'},
  {l:'G:',label:'Backups',size:'1 TB',fmt:'NTFS 64K'},
  {l:'I:',label:'TempDB',size:'200 GB',fmt:'NTFS 64K'}];
function Check({e}){
  return (
    <span style={{width:16,height:16,borderRadius:'50%',flex:'0 0 auto',display:'inline-flex',alignItems:'center',justifyContent:'center',
      border:'2px solid '+(e>0?C.green:C.line2),background:e>0?C.green:'transparent',transform:'scale('+(e>0?M.pop(e):1)+')'}}>
      {e>0.2 && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5.5l2.5 2.5 4.5-6" stroke="#0C1424" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
    </span>);
}
function SeqList({title,meta,rows,u,note,noteAt,badge,badgeAt}){
  return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box',position:'relative'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:10,gap:12}}>
        <span style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,whiteSpace:'nowrap'}}>{title}</span>
        <span style={{fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>{meta}</span>
      </div>
      {rows.map((r,i)=>{ const e=M.in(u,r[1]-0.06,r[1]+0.06);
        return (
          <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'6px 0'}}>
            <Check e={e}/>
            <span style={{fontFamily:F.m,fontSize:12,color:e>0?C.t1:C.t4,whiteSpace:'nowrap'}}>{r[0]}</span>
            {r[2] && <span style={{fontFamily:F.m,fontSize:10.5,color:C.t4,marginLeft:'auto',opacity:e,whiteSpace:'nowrap'}}>{r[2]}</span>}
          </div>);})}
      {note && <div style={{fontFamily:F.m,fontSize:11,color:C.t4,marginTop:8,opacity:M.in(u,noteAt,noteAt+0.12),whiteSpace:'nowrap'}}>{note}</div>}
      {badge && <div style={{position:'absolute',right:18,top:14,opacity:M.in(u,badgeAt,badgeAt+0.15),transform:'scale('+M.pop(M.in(u,badgeAt,badgeAt+0.15))+')',
        fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:C.green,padding:'4px 10px',borderRadius:5,whiteSpace:'nowrap'}}>{badge}</div>}
    </div>);
}
function Panel({kind,t,u}){
  if(kind==='none') return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'16px 18px',height:'100%',boxSizing:'border-box'}}>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>Build automation</div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:C.t3,lineHeight:1.5}}>Awaiting intake request…</div>
    </div>);
  if(kind==='intake'){ const rows=[
      ['Intake request','RITM0067342 · approved',0.10],['Operating system','Windows Server 2022',0.22],
      ['SQL Server','2022 Enterprise + CU12',0.34],['Compute','8 vCPU · 64 GB RAM',0.46],
      ['SQL binaries','D:\\SQLBin',0.58]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Intake · server build spec</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.10);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)',padding:'2px 0'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
              <div style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
            </div>);})}
        <div style={{marginTop:8,paddingTop:8,borderTop:'1px solid '+C.line,opacity:M.in(t,0.66,0.80)}}>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,marginBottom:3}}>DRIVE LAYOUT</div>
          <div style={{fontFamily:F.m,fontSize:10.5,color:C.t2,lineHeight:1.6,whiteSpace:'nowrap'}}>C: OS 150 · D: binaries 100 · E: data 500</div>
          <div style={{fontFamily:F.m,fontSize:10.5,color:C.t2,lineHeight:1.6,whiteSpace:'nowrap'}}>F: logs 250 · G: backups 1 TB · I: tempdb 200</div>
        </div>
      </div>);
  }
  if(kind==='vm') return <SeqList title="Create VM · SQLNEW-04" meta="vSphere" u={u} rows={[
      ['Create VM from WS2022 template',2.35],['Attach 6 data disks',2.55],
      ['Power on · join domain',2.75],['Register CI in CMDB',2.90]]}
      note="host cluster: PRD-EAST-02 · 8 vCPU · 64 GB" noteAt={2.92}/>;
  if(kind==='drives') return <SeqList title="Format & label drives" meta="6 volumes" u={u} rows={[
      ['Format NTFS — 64K for SQL volumes',3.45],['Label volumes (SQLData, SQLLogs…)',3.70],
      ['Assign letters C D E F G I',3.85],['Verify allocation unit sizes',3.95]]}
      note="E: F: G: I: at 64K · C: at 4K default" noteAt={3.96}/>;
  if(kind==='pre') return <SeqList title="Pre-build steps" meta="RB-4102" u={u} rows={[
      ['Service accounts from vault',4.20],['Firewall — 1433 / 5022',4.40],
      ['Power plan — high performance',4.55],['Instant file initialization',4.70],['Lock pages in memory',4.85]]}/>;
  if(kind==='install') return <SeqList title="Install SQL Server 2022" meta="unattended" u={u} rows={[
      ['Mount SQL 2022 media',5.15],['Setup — binaries to D:\\SQLBin',5.45],
      ['Apply CU12 (KB5054531)',5.70],['Services running · instance up',5.90]]}
      note="data → E: · logs → F: · tempdb → I: · backups → G:" noteAt={5.92}/>;
  if(kind==='post') return <SeqList title="Post-build configuration" meta="policy v3.2" u={u} rows={[
      ['Max memory — 51,200 MB',6.20],['MAXDOP 8 · cost threshold 50',6.40],
      ['TempDB — 8 files on I:',6.60],['Company policy hardening',6.78],['Maintenance jobs configured',6.92]]}/>;
  /* health */
  return <SeqList title="Health checks & handover" meta="24 checks" u={u} rows={[
      ['Connectivity & authentication',7.15],['Test backup to G: verified',7.35],
      ['Perf counters — all green',7.55],['Monitoring & alerting enrolled',7.70]]}
      note="ServiceNow RITM0067342 → Closed · docs attached" noteAt={7.88} badge="BUILD COMPLETE" badgeAt={7.82}/>;
}
function VmTile({u}){
  let cur=VM.steps[0];
  for(const s of VM.steps) if(u>=s[0]) cur=s;
  const win=cur[3];
  const prog=win?cl((u-win[0])/(win[1]-win[0]),0,1):0;
  const active=!!win&&u<win[1];
  const vis=M.in(u,2.08,2.2);
  if(vis<=0.001) return (
    <div style={{position:'absolute',left:VM.x,top:VM.y,width:TW,height:92,border:'1px dashed '+C.line2,borderRadius:10,
      display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.m,fontSize:11,color:C.t4}}>no VM yet</div>);
  return (
    <div style={{position:'absolute',left:VM.x,top:VM.y,width:TW,height:92,opacity:vis,transform:'scale('+M.pop(vis)+')',
      background:C.card,border:'1px solid '+(active?'rgba(232,160,32,.55)':cur[2]===C.green?'rgba(30,158,98,.55)':C.line2),
      borderRadius:10,padding:'10px 12px',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:6}}>
        <span style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>SQLNEW-04</span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:8.5,letterSpacing:'.07em',color:C.t3,border:'1px solid '+C.line2,padding:'2px 6px',borderRadius:999,whiteSpace:'nowrap'}}>NEW BUILD</span>
      </div>
      <div style={{fontFamily:F.m,fontSize:10,color:C.t4,marginTop:3,whiteSpace:'nowrap'}}>WS2022 · 8 vCPU · 64 GB</div>
      <div style={{marginTop:6,overflow:'hidden'}}>
        {active ? (
          <div>
            <div style={{fontFamily:F.m,fontSize:10.5,color:C.gold,whiteSpace:'nowrap',marginBottom:4}}>{cur[1]} {Math.round(prog*100)}%</div>
            <div style={{height:5,borderRadius:999,background:'rgba(233,236,242,.08)',overflow:'hidden'}}>
              <div style={{height:'100%',width:(prog*100)+'%',background:C.gold,borderRadius:999}}></div>
            </div>
          </div>)
        : <span style={{fontFamily:F.m,fontSize:11,color:cur[2],whiteSpace:'nowrap'}}>{cur[1]}</span>}
      </div>
    </div>);
}
function DriveTile({d,i,u}){
  const x=(i%3)*206, y=Math.floor(i/3)*96+196;
  const appear=M.in(u,2.42+i*0.05,2.52+i*0.05);
  if(appear<=0.001) return null;
  const fa=3.10+i*0.10, fb=fa+0.18;
  const prog=cl((u-fa)/(fb-fa),0,1);
  const formatting=u>fa&&u<fb, done=u>=fb;
  const labeled=u>=fb+0.05;
  return (
    <div style={{position:'absolute',left:x,top:y,width:TW,height:80,opacity:appear,transform:'scale('+M.pop(appear)+')',
      background:C.card,border:'1px solid '+(formatting?'rgba(232,160,32,.55)':done?'rgba(30,158,98,.55)':C.line2),
      borderRadius:10,padding:'9px 12px',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:6}}>
        <span style={{fontFamily:F.m,fontSize:14,fontWeight:600,color:C.t1,whiteSpace:'nowrap'}}>{d.l} <span style={{fontSize:11,color:labeled?C.blue:C.t4}}>{labeled?d.label:'—'}</span></span>
        <span style={{fontFamily:F.m,fontSize:10,color:C.t4,whiteSpace:'nowrap'}}>{d.size}</span>
      </div>
      <div style={{marginTop:7,overflow:'hidden'}}>
        {formatting ? (
          <div>
            <div style={{fontFamily:F.m,fontSize:10.5,color:C.gold,whiteSpace:'nowrap',marginBottom:4}}>formatting {d.fmt}… {Math.round(prog*100)}%</div>
            <div style={{height:5,borderRadius:999,background:'rgba(233,236,242,.08)',overflow:'hidden'}}>
              <div style={{height:'100%',width:(prog*100)+'%',background:C.gold,borderRadius:999}}></div>
            </div>
          </div>)
        : done ? <span style={{fontFamily:F.m,fontSize:11,color:C.green,whiteSpace:'nowrap'}}>{d.fmt} · labeled ✓</span>
        : <span style={{fontFamily:F.m,fontSize:11,color:C.t4,whiteSpace:'nowrap'}}>RAW · attached</span>}
      </div>
    </div>);
}
function Demo(){
  const {localTime,progress,index}=useScene();
  const ph=index,p=progress,u=ph+p;
  const a=CAM[ph],b=CAM[ph+1],e=sm(p);
  const cam={s:a.s+(b.s-a.s)*e,x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e};
  const kind=PANEL[ph],prevKind=ph>0?PANEL[ph-1]:kind;
  const xf=prevKind===kind?1:M.in(p,0,0.18);
  const tCur=cl((p-(prevKind===kind?0:0.18))/(prevKind===kind?1:0.82),0,1);
  const cap=CAPTIONS[ph],prevCap=ph>0?CAPTIONS[ph-1]:cap;
  const cxf=cap===prevCap?1:M.in(p,0,0.15);
  const titleO=ph===0?M.in(p,0.08,0.22)*(1-M.in(p,0.78,0.92)):0;
  const scrim=ph===8?M.in(p,0.05,0.25):0;
  const st=[ph===8?M.in(p,0.26,0.40):0,ph===8?M.in(p,0.34,0.48):0,ph===8?M.in(p,0.42,0.56):0];
  const lg=ph===8?M.in(p,0.58,0.74):0;
  const gt=(window.__bdOff||(window.__bdOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  return (
    <div data-screen-label={'SQL build demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · SQL SERVER BUILD AUTOMATION</span>
      </div>
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — build automation</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:'#fff',background:C.red,padding:'3px 8px',borderRadius:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',opacity:0.6+0.4*Math.sin(localTime*5)}}></span>LIVE</span>
          </div>
          <div style={{display:'flex',gap:14,padding:14,height:'calc(100% - 72px)',boxSizing:'border-box'}}>
            <div style={{flex:'0 0 372px',position:'relative'}}>
              {xf<1 && <div style={{position:'absolute',inset:0,opacity:1-xf}}><Panel kind={prevKind} t={1} u={u}/></div>}
              <div style={{position:'absolute',inset:0,opacity:xf}}><Panel kind={kind} t={tCur} u={u}/></div>
            </div>
            <div style={{flex:1,position:'relative'}}>
              <div style={{position:'relative',height:410,marginTop:4}}>
                <div style={{position:'absolute',left:0,top:12,fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap'}}>NEW BUILD · SQLNEW-04 {u>1.4?'· RITM0067342':''}</div>
                <VmTile u={u}/>
                <div style={{position:'absolute',left:0,top:172,fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap',opacity:M.in(u,2.4,2.55)}}>DRIVE LAYOUT</div>
                {DRIVES.map((d,i)=><DriveTile key={d.l} d={d} i={i} u={u}/>)}
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>template: WS2022-SQL-v3.2</span><span style={{whiteSpace:'nowrap'}}>policy: company baseline</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
          </div>
        </div>
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:26,display:'flex',justifyContent:'center'}}>
        <div style={{position:'relative',minHeight:34,display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(12,20,36,.85)',padding:'6px 18px',borderRadius:999}}>
          {cxf<1 && <span style={{position:'absolute',whiteSpace:'nowrap',opacity:1-cxf,fontFamily:F.d,fontWeight:600,fontSize:16,color:C.t2}}>{prevCap}</span>}
          <span style={{whiteSpace:'nowrap',opacity:cxf*(cap?1:0),fontFamily:F.d,fontWeight:600,fontSize:16,color:C.t2}}>{cap}</span>
        </div>
      </div>
      {titleO>0 && (
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
          opacity:titleO,background:'rgba(12,20,36,'+(0.72*titleO)+')',width:'100%',textAlign:'center'}}>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:11,letterSpacing:'.12em',color:C.gold,marginBottom:12,whiteSpace:'nowrap'}}>INFRSRE PRODUCT DEMO</div>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>SQL Server build automation</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>From intake request to production-ready, zero touch</div>
        </div>)}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            {[['38 min','intake to production',C.t1],['0','manual steps',C.green],['RITM0067342','closed with docs',C.gold]].map((d,i)=>(
              <div key={i} style={{opacity:st[i],transform:'scale('+M.pop(st[i])+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 30px',textAlign:'center'}}>
                <div style={{fontFamily:F.m,fontSize:d[0].length>7?24:38,color:d[2],whiteSpace:'nowrap',lineHeight:'46px'}}>{d[0]}</div>
                <div style={{fontFamily:F.b,fontSize:13,color:C.t3,marginTop:4,whiteSpace:'nowrap'}}>{d[1]}</div>
              </div>))}
          </div>
          <div style={{opacity:lg,textAlign:'center'}}>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:34,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></div>
            <div style={{fontFamily:F.b,fontSize:14,color:C.t3,marginTop:6}}>Autonomous infrastructure operations · infrsre.io</div>
          </div>
        </div>)}
    </div>);
}
function SqlBuildVideo(){
  const [t,setTweak]=useTweaks(window.TWEAK_DEFAULTS);
  const scenes=JSON.parse(window.OM_SCENES).reduce((o,s)=>(o[s.name]=Demo,o),{});
  return (
    <div style={{display:'flex',justifyContent:'center',background:'#0C1424'}}>
      <SceneStage width={1280} height={720} bg="#0C1424" scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {scenes}
      </SceneStage>
      <TweaksPanel>
        <TweakSection label="Timeline"/>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v=>setTweak('motionEditor',v)}/>
      </TweaksPanel>
    </div>);
}
window.SqlBuildVideo = SqlBuildVideo;
