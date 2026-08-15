/* INFRsre demo film — Compliance automation. Scenes for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={ in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)), pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI) };
/* phases: 0 Opening,1 Policies,2 Scan,3 Findings,4 Remediate,5 Evidence,6 Dashboard,7 Outro */
const CAM=[
  {s:1.00,x:0,y:0},{s:1.02,x:0,y:0},{s:1.16,x:150,y:30},{s:1.14,x:-110,y:10},
  {s:1.20,x:-190,y:-60},{s:1.14,x:-110,y:0},{s:1.14,x:120,y:20},{s:1.06,x:-40,y:0},{s:1.00,x:0,y:0}];
const CAPTIONS=[
  "Compliance isn't a quarterly scramble — it's continuous.",
  'CIS, PCI-DSS and your own baseline, applied to the whole estate.',
  'Every control evaluated automatically — no agents, no spreadsheets.',
  '37 findings, ranked by severity and mapped to owners.',
  'Most findings fix themselves — runbooks remediate, exceptions get filed.',
  'Evidence is hashed, signed and filed — audit-ready by default.',
  'The estate at a glance: SQL Server, Oracle and middleware compliance.',
  ''];
const PANEL=['none','policies','scan','findings','remediate','evidence','dash','dash'];
const PLAT=[
  {name:'SQL Server', count:218, scan:[2.10,2.72], pre:94.5, fin:99.1, findings:9,  badge:['COMPLIANT',C.green]},
  {name:'Oracle',     count:84,  scan:[2.22,2.82], pre:91.7, fin:97.6, findings:8,  badge:['1 EXCEPTION',C.gold]},
  {name:'Middleware', count:388, scan:[2.34,2.90], pre:89.9, fin:96.2, findings:12, badge:['2 EXCEPTIONS',C.gold]},
  {name:'Windows',    count:486, scan:[2.46,2.94], pre:95.2, fin:98.9, findings:5,  badge:['COMPLIANT',C.green]},
  {name:'Linux',      count:754, scan:[2.56,2.98], pre:96.4, fin:99.4, findings:3,  badge:['COMPLIANT',C.green]}];
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
          </div>);})}
      {note && <div style={{fontFamily:F.m,fontSize:11,color:C.t4,marginTop:8,opacity:M.in(u,noteAt,noteAt+0.12),whiteSpace:'nowrap'}}>{note}</div>}
      {badge && <div style={{position:'absolute',right:18,top:14,opacity:M.in(u,badgeAt,badgeAt+0.15),transform:'scale('+M.pop(M.in(u,badgeAt,badgeAt+0.15))+')',
        fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:C.green,padding:'4px 10px',borderRadius:5,whiteSpace:'nowrap'}}>{badge}</div>}
    </div>);
}
function Panel({kind,t,u}){
  if(kind==='none') return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'16px 18px',height:'100%',boxSizing:'border-box'}}>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>Compliance automation</div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:C.t3,lineHeight:1.5}}>Next scheduled scan in 00:12…</div>
    </div>);
  if(kind==='policies'){ const rows=[
      ['Policy packs','CIS v8 · PCI-DSS 4.0 · baseline v3.2',0.12],['Scope','1,240 servers · 690 DB & middleware',0.28],
      ['Mode','continuous · full scan every 24h',0.44],['Enforcement','auto-remediate + filed exceptions',0.60]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Policy engine</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)',padding:'3px 0'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
              <div style={{fontFamily:F.m,fontSize:11.5,color:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
            </div>);})}
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid '+C.line,opacity:M.in(t,0.68,0.82)}}>
          <span style={{fontFamily:F.m,fontSize:12,color:C.blue,whiteSpace:'nowrap'}}>1,412 controls loaded · starting scan</span>
        </div>
      </div>);
  }
  if(kind==='scan') return <SeqList title="Continuous scan" meta="1,412 controls" u={u} rows={[
      ['Collect configurations — agentless',2.30],['Evaluate CIS benchmarks',2.55],
      ['SQL Server & Oracle checks',2.80],['Middleware TLS & hardening',2.95]]}/>;
  if(kind==='findings') return <SeqList title="Findings · 37 total" meta="ranked" u={u} rows={[
      ['Critical — 6',3.30],['High — 14',3.50],['Medium — 17',3.70]]}
      note="xp_cmdshell · TLS 1.0 · weak password policy" noteAt={3.85}/>;
  if(kind==='remediate') return <SeqList title="Auto-remediation" meta="RB-5xxx" u={u} rows={[
      ['Runbooks fix 31 findings',4.35],['xp_cmdshell disabled — 4 servers',4.55],
      ['TLS 1.0 disabled — 11 nodes',4.75],['3 exceptions filed & approved',4.92]]}/>;
  if(kind==='evidence') return <SeqList title="Evidence & filing" meta="signed" u={u} rows={[
      ['Hash & sign control results',5.25],['Capture configs & screenshots',5.45],
      ['Bundle filed to GRC',5.65],['ServiceNow task closed',5.85]]}
      note="every action carries its evidence trail" noteAt={5.9}/>;
  /* dash */
  return <SeqList title="Compliance dashboard" meta="live" u={u} rows={[
      ['Estate compliance — 97.8%',6.25],['SQL Server — 99.1% · 218 servers',6.42],
      ['Oracle — 97.6% · 84 servers',6.58],['Middleware — 96.2% · 388 servers',6.74]]}
      note="refreshed after every scan · audit-ready" noteAt={6.9} badge="AUDIT READY" badgeAt={6.84}/>;
}
function PlatRow({pl,i,u}){
  const appear=M.in(u,2.02+i*0.05,2.12+i*0.05);
  if(appear<=0.001) return null;
  const [sa,sb]=pl.scan;
  const scanning=u>sa&&u<sb;
  const scanned=u>=sb;
  const scanProg=cl((u-sa)/(sb-sa),0,1);
  const fix=M.in(u,4.20,4.90);
  const pct=scanned? pl.pre+(pl.fin-pl.pre)*fix : 0;
  const barColor= !scanned? C.gold : pct>=98? C.green : pct>=95? C.gold : C.red3;
  const openF=Math.round(pl.findings*(1-fix));
  const badgeE=M.in(u,6.30+i*0.09,6.45+i*0.09);
  let status;
  if(scanning) status=<span style={{fontFamily:F.m,fontSize:11,color:C.gold,whiteSpace:'nowrap'}}>scanning… {Math.round(scanProg*100)}%</span>;
  else if(!scanned) status=<span style={{fontFamily:F.m,fontSize:11,color:C.t4,whiteSpace:'nowrap'}}>queued</span>;
  else if(u<4.2) status=<span style={{fontFamily:F.m,fontSize:11,color:pl.findings>7?C.red3:C.gold,whiteSpace:'nowrap'}}>{pl.findings} findings</span>;
  else if(u<6.3) status=<span style={{fontFamily:F.m,fontSize:11,color:openF>0?C.gold:C.green,whiteSpace:'nowrap'}}>{openF>0?openF+' open':'resolved ✓'}</span>;
  else status=(
    <span style={{opacity:badgeE,transform:'scale('+M.pop(badgeE)+')',display:'inline-block',fontFamily:F.d,fontWeight:800,fontSize:8.5,
      letterSpacing:'.07em',color:pl.badge[1]===C.green?'#fff':'#3a2708',background:pl.badge[1],padding:'3px 8px',borderRadius:999,whiteSpace:'nowrap'}}>{pl.badge[0]}</span>);
  return (
    <div style={{display:'grid',gridTemplateColumns:'150px 1fr 64px 110px',gap:12,alignItems:'center',padding:'11px 0',
      borderBottom:'1px solid '+C.line,opacity:appear}}>
      <div>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13.5,color:C.t1,whiteSpace:'nowrap'}}>{pl.name}</div>
        <div style={{fontFamily:F.m,fontSize:10,color:C.t4,whiteSpace:'nowrap'}}>{pl.count} servers</div>
      </div>
      <div style={{height:9,borderRadius:999,background:'rgba(233,236,242,.08)',overflow:'hidden'}}>
        <div style={{height:'100%',borderRadius:999,width:(scanning?scanProg*100:scanned?pct:0)+'%',background:barColor}}></div>
      </div>
      <div style={{fontFamily:F.m,fontSize:12,color:scanned?barColor:C.t4,textAlign:'right',whiteSpace:'nowrap'}}>{scanned?pct.toFixed(1)+'%':'—'}</div>
      <div style={{textAlign:'right'}}>{status}</div>
    </div>);
}
function FindingsCard({u}){
  const o=M.in(u,3.15,3.35)*(1-M.in(u,4.86,4.98));
  if(o<=0.001) return null;
  const sev=[['CRIT','6',C.red],['HIGH','14',C.gold],['MED','17',C.blue]];
  const items=[['xp_cmdshell enabled — 4 SQL Servers',4.50],['TLS 1.0 active — 11 middleware nodes',4.70],['Password policy below baseline',4.85]];
  return (
    <div style={{position:'absolute',right:0,bottom:8,width:280,opacity:o,transform:'translateY('+(12*(1-M.in(u,3.15,3.35)))+'px)',
      background:C.card,border:'1px solid rgba(241,125,119,.4)',borderRadius:10,padding:'12px 14px'}}>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        {sev.map((s,i)=>{ const e=M.in(u,3.25+i*0.12,3.38+i*0.12);
          return <span key={i} style={{opacity:e,transform:'scale('+M.pop(e)+')',fontFamily:F.d,fontWeight:800,fontSize:9,
            letterSpacing:'.06em',color:'#fff',background:s[2],padding:'3px 8px',borderRadius:5,whiteSpace:'nowrap'}}>{s[0]} {s[1]}</span>;})}
      </div>
      {items.map((it,i)=>{ const e=M.in(u,3.55+i*0.12,3.68+i*0.12); const fx=M.in(u,it[1]-0.05,it[1]+0.05);
        return (
          <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'4px 0',opacity:e}}>
            <Check e={fx}/>
            <span style={{fontFamily:F.m,fontSize:10.5,color:fx>0?C.t3:C.t1,whiteSpace:'nowrap',textDecoration:fx>0.5?'line-through':'none'}}>{it[0]}</span>
          </div>);})}
      {u>4.2&&u<4.95 && <div style={{fontFamily:F.m,fontSize:10,color:C.gold,marginTop:4,whiteSpace:'nowrap'}}>auto-remediating…</div>}
    </div>);
}
function Donut({u}){
  const e=M.in(u,6.15,6.45);
  if(e<=0.001) return null;
  const pct=97.8*e;
  return (
    <div style={{position:'absolute',right:6,bottom:2,opacity:e,display:'flex',alignItems:'center',gap:12}}>
      <div style={{position:'relative',width:86,height:86,borderRadius:'50%',
        background:'conic-gradient('+C.green+' 0 '+pct+'%, rgba(233,236,242,.1) '+pct+'% 100%)'}}>
        <div style={{position:'absolute',inset:9,borderRadius:'50%',background:C.panel,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <span style={{fontFamily:F.m,fontSize:17,color:'#fff',whiteSpace:'nowrap'}}>{pct.toFixed(1)}%</span>
          <span style={{fontSize:8.5,color:C.t4,whiteSpace:'nowrap'}}>estate</span>
        </div>
      </div>
      <div style={{fontFamily:F.m,fontSize:10.5,color:C.t3,lineHeight:1.7,whiteSpace:'nowrap'}}>CIS v8 · PCI-DSS 4.0<br/>3 approved exceptions<br/>evidence filed to GRC</div>
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
  const scrim=ph===7?M.in(p,0.05,0.25):0;
  const st=[ph===7?M.in(p,0.26,0.40):0,ph===7?M.in(p,0.34,0.48):0,ph===7?M.in(p,0.42,0.56):0];
  const lg=ph===7?M.in(p,0.58,0.74):0;
  const gt=(window.__cpOff||(window.__cpOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  return (
    <div data-screen-label={'Compliance demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · COMPLIANCE AUTOMATION</span>
      </div>
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — compliance automation</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:'#fff',background:C.red,padding:'3px 8px',borderRadius:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',opacity:0.6+0.4*Math.sin(localTime*5)}}></span>LIVE</span>
          </div>
          <div style={{display:'flex',gap:14,padding:14,height:'calc(100% - 72px)',boxSizing:'border-box'}}>
            <div style={{flex:'0 0 372px',position:'relative'}}>
              {xf<1 && <div style={{position:'absolute',inset:0,opacity:1-xf}}><Panel kind={prevKind} t={1} u={u}/></div>}
              <div style={{position:'absolute',inset:0,opacity:xf}}><Panel kind={kind} t={tCur} u={u}/></div>
            </div>
            <div style={{flex:1,position:'relative'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,margin:'2px 0 4px',whiteSpace:'nowrap'}}>
                ESTATE COMPLIANCE {u>1.3?'· CIS V8 · PCI-DSS 4.0 · BASELINE V3.2':''}</div>
              <div style={{position:'relative',height:400}}>
                {u<2.0 && (
                  <div style={{position:'absolute',left:0,top:12,right:10,height:300,border:'1px dashed '+C.line2,borderRadius:12,
                    display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.m,fontSize:11,color:C.t4}}>awaiting scan</div>)}
                <div style={{position:'absolute',left:0,top:2,right:10}}>
                  {PLAT.map((pl,i)=><PlatRow key={pl.name} pl={pl} i={i} u={u}/>)}
                </div>
                <FindingsCard u={u}/>
                <Donut u={u}/>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>controls: 1,412 active</span><span style={{whiteSpace:'nowrap'}}>scan cadence: 24h</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
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
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>Compliance automation</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>CIS, PCI and your own policies — with filed evidence</div>
        </div>)}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            {[['97.8%','estate compliance',C.green],['31','findings auto-fixed',C.gold],['100%','evidence filed',C.blue]].map((d,i)=>(
              <div key={i} style={{opacity:st[i],transform:'scale('+M.pop(st[i])+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 30px',textAlign:'center'}}>
                <div style={{fontFamily:F.m,fontSize:38,color:d[2],whiteSpace:'nowrap',lineHeight:'46px'}}>{d[0]}</div>
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
function ComplianceVideo(){
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
window.ComplianceVideo = ComplianceVideo;
