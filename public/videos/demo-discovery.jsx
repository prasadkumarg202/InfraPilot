/* INFRsre demo film — Infrastructure discovery. Scenes for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3', vm:'#9F7AEA',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={ in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)), pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI) };
const frac=x=>x-Math.floor(x);
/* phases: 0 Opening,1 Scope,2 Scan,3 Classify,4 Dependencies,5 CMDB sync,6 Inventory live,7 Outro */
const CAM=[
  {s:1.00,x:0,y:0},{s:1.02,x:0,y:0},{s:1.16,x:150,y:30},{s:1.10,x:-80,y:0},
  {s:1.12,x:-80,y:0},{s:1.22,x:-140,y:-20},{s:1.18,x:-170,y:-55},{s:1.04,x:0,y:0},{s:1.00,x:0,y:0}];
const CAPTIONS=[
  "You can't automate what you can't see. Discovery comes first.",
  'Point INFRsre at your network — agentless, read-only credentials from the vault.',
  'The scan sweeps every subnet: WMI, SSH, database and hypervisor APIs.',
  'Everything gets classified — OS, databases, middleware, virtualization.',
  'Connection flows become a dependency graph: app → database → storage.',
  'The inventory syncs to ServiceNow CMDB — CIs, relationships, reconciled.',
  'A live inventory and dependency graph — the foundation for every automation.',
  ''];
const PANEL=['none','scope','scan','classify','graph','sync','done','done'];
const CLS=[C.blue,C.green,C.green,C.red3,C.gold,C.green,C.red3,C.vm];
const DOTS=[]; for(let i=0;i<88;i++){ const col=i%11,row=Math.floor(i/11);
  DOTS.push({x:24+col*56+Math.sin(i*13.37)*10, y:56+row*38+Math.cos(i*7.7)*7, c:CLS[i%8],
    rev:2.03+(col/11)*0.86+frac(i*0.37)*0.05, cls:3.08+frac(i*0.618)*0.72}); }
const GNODES=[
  {x:120,y:96,l:'web-pay-01',c:C.blue},{x:300,y:80,l:'api-pay-02',c:C.blue},
  {x:470,y:110,l:'SQL-PRD-14',c:C.red3},{x:250,y:210,l:'redis-06',c:C.red3},
  {x:430,y:236,l:'kafka-03',c:C.gold},{x:580,y:190,l:'SAN-VOL-7',c:C.t3}];
const GEDGES=[[0,1,4.30],[1,2,4.42],[1,3,4.56],[2,5,4.70],[1,4,4.84],[4,2,4.95]];
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
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>Infrastructure discovery</div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:C.t3,lineHeight:1.5}}>No inventory yet…</div>
    </div>);
  if(kind==='scope'){ const rows=[
      ['Scan scope','4 subnets · 10.20.0.0/16',0.12],['Credentials','read-only · from vault',0.28],
      ['Method','agentless — WMI · SSH · APIs',0.44],['Schedule','continuous · rescan every 6h',0.60]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Discovery scope</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)',padding:'3px 0'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
              <div style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
            </div>);})}
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid '+C.line,opacity:M.in(t,0.68,0.82)}}>
          <span style={{fontFamily:F.m,fontSize:12,color:C.blue,whiteSpace:'nowrap'}}>Starting scan — nothing installed on targets</span>
        </div>
      </div>);
  }
  if(kind==='scan') return <SeqList title="Agentless scan" meta="4 subnets" u={u} rows={[
      ['Ping sweep & port fingerprint',2.30],['WMI / SSH interrogation',2.55],
      ['Database & middleware probes',2.80],['Hypervisor & cloud APIs',2.95]]}
      note="read-only · no agents · no reboots" noteAt={2.96}/>;
  if(kind==='classify') return <SeqList title="Classification" meta="1,240 hosts" u={u} rows={[
      ['Windows Server — 486',3.30],['Linux — 754',3.50],['Databases — 412 instances',3.70],
      ['Middleware — 388 services',3.85],['VMware & Kubernetes — 96',3.95]]}/>;
  if(kind==='graph') return <SeqList title="Dependency mapping" meta="flows" u={u} rows={[
      ['Connection flows sampled',4.35],['App → database bindings resolved',4.55],
      ['Storage paths mapped',4.75],['Impact graph built — 3,861 edges',4.95]]}/>;
  if(kind==='sync') return <SeqList title="CMDB sync · ServiceNow" meta="reconcile" u={u} rows={[
      ['Match against existing CIs — 928',5.30],['Create 312 new CIs',5.55],
      ['Push 2,406 relationships',5.80],['Reconcile & certify',5.95]]}
      note="CMDB is now a live mirror, not a spreadsheet" noteAt={5.96}/>;
  /* done */
  return <SeqList title="Inventory live" meta="baseline" u={u} rows={[
      ['1,240 servers under management',6.25],['Dependency graph — 3,861 edges',6.45],
      ['Configuration drift baseline set',6.65],['Rescan scheduled — every 6h',6.85]]}
      note="every INFRsre module now shares this graph" noteAt={6.9} badge="DISCOVERY LIVE" badgeAt={6.82}/>;
}
function Board({u,xfB}){
  const sweep=cl(u-2,0,1);
  const sweepO=M.in(u,2.0,2.06)*(1-M.in(u,2.92,3.0));
  const dim=1-0.72*M.in(u,4.0,4.25);
  const found=DOTS.reduce((n,d)=>n+(u>=d.rev?1:0),0);
  const legendO=M.in(u,3.15,3.35);
  const syncO=M.in(u,5.05,5.25);
  const ci=Math.round(312*M.in(u,5.3,5.85)), rel=Math.round(2406*M.in(u,5.45,5.95));
  return (
    <div style={{position:'absolute',inset:0}}>
      {/* live board (dots + graph + sync) */}
      <div style={{position:'absolute',inset:0,opacity:1-xfB}}>
        {u<2.02 && (
          <div style={{position:'absolute',left:0,top:40,right:10,height:330,border:'1px dashed '+C.line2,borderRadius:12,
            display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.m,fontSize:11,color:C.t4}}>unscanned network</div>)}
        {DOTS.map((d,i)=>{ const r=M.in(u,d.rev,d.rev+0.06); if(r<=0.001) return null;
          const classed=u>=d.cls;
          return <span key={i} style={{position:'absolute',left:d.x,top:d.y,width:8,height:8,borderRadius:'50%',
            opacity:r*dim,transform:'scale('+M.pop(r)+')',background:classed?d.c:'#4A566B'}}></span>;})}
        {sweepO>0.001 && (
          <div style={{position:'absolute',left:24+sweep*590,top:44,width:2,height:322,background:'linear-gradient(180deg,transparent,'+C.red3+',transparent)',opacity:sweepO}}></div>)}
        {u>2.05&&u<3.98 && (
          <div style={{position:'absolute',right:14,top:44,fontFamily:F.m,fontSize:12,color:C.blue,whiteSpace:'nowrap'}}>discovered: {Math.round(found*14.1)} CIs</div>)}
        <div style={{position:'absolute',left:24,bottom:6,display:'flex',gap:14,opacity:legendO*dim}}>
          {[['Windows',C.blue,486],['Linux',C.green,754],['Databases',C.red3,412],['Middleware',C.gold,388],['VM/K8s',C.vm,96]].map((l,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.m,fontSize:10,color:C.t3,whiteSpace:'nowrap'}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:l[1]}}></span>{l[0]} {l[2]}</span>))}
        </div>
        <svg style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none'}} width="640" height="400">
          {GEDGES.map((eg,k)=>{ const d1=M.in(u,eg[2],eg[2]+0.14); if(d1<=0.001) return null;
            const a=GNODES[eg[0]],b=GNODES[eg[1]];
            return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.t3} strokeWidth="1.8"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1-d1} opacity="0.85"/>;})}
        </svg>
        {GNODES.map((n,j)=>{ const e=M.in(u,4.08+j*0.07,4.2+j*0.07); if(e<=0.001) return null;
          return (
            <div key={j} style={{position:'absolute',left:n.x-9,top:n.y-9,opacity:e,transform:'scale('+M.pop(e)+')'}}>
              <span style={{display:'block',width:18,height:18,borderRadius:'50%',background:C.panel,border:'2.5px solid '+n.c,boxSizing:'border-box'}}></span>
              <span style={{position:'absolute',left:'50%',top:-16,transform:'translateX(-50%)',fontFamily:F.m,fontSize:9.5,color:C.t1,whiteSpace:'nowrap'}}>{n.l}</span>
            </div>);})}
        {syncO>0.001 && (
          <div style={{position:'absolute',right:6,bottom:34,width:210,opacity:syncO,transform:'translateY('+(10*(1-syncO))+'px)',
            background:C.card,border:'1px solid '+C.line2,borderRadius:10,padding:'12px 14px'}}>
            <div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:C.t1,marginBottom:6,whiteSpace:'nowrap'}}>ServiceNow CMDB</div>
            <div style={{fontFamily:F.m,fontSize:11,color:C.t3,lineHeight:1.7,whiteSpace:'nowrap'}}>new CIs      {ci}</div>
            <div style={{fontFamily:F.m,fontSize:11,color:C.t3,lineHeight:1.7,whiteSpace:'nowrap'}}>updated      928</div>
            <div style={{fontFamily:F.m,fontSize:11,color:C.t3,lineHeight:1.7,whiteSpace:'nowrap'}}>relationships {rel}</div>
          </div>)}
      </div>
      {/* summary board */}
      <div style={{position:'absolute',inset:0,opacity:xfB,display:xfB>0.001?'block':'none'}}>
        <div style={{position:'absolute',left:0,top:60,right:10,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {[['1,240','servers under management',C.green,6.20],['412','database instances',C.red3,6.35],
            ['3,861','dependencies mapped',C.blue,6.50],['6h','continuous rescan cadence',C.gold,6.65]].map((d,i)=>{
            const e=M.in(u,d[3],d[3]+0.14);
            return (
              <div key={i} style={{opacity:e,transform:'scale('+M.pop(e)+')',background:C.card,border:'1px solid '+C.line2,borderRadius:12,padding:'24px 22px'}}>
                <div style={{fontFamily:F.m,fontSize:34,color:d[2],whiteSpace:'nowrap'}}>{d[0]}</div>
                <div style={{fontFamily:F.b,fontSize:13,color:C.t3,marginTop:4,whiteSpace:'nowrap'}}>{d[1]}</div>
              </div>);})}
        </div>
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
  const xfB=ph>=6?(ph===6?M.in(p,0,0.2):1):0;
  const cap=CAPTIONS[ph],prevCap=ph>0?CAPTIONS[ph-1]:cap;
  const cxf=cap===prevCap?1:M.in(p,0,0.15);
  const titleO=ph===0?M.in(p,0.08,0.22)*(1-M.in(p,0.78,0.92)):0;
  const scrim=ph===7?M.in(p,0.05,0.25):0;
  const st=[ph===7?M.in(p,0.26,0.40):0,ph===7?M.in(p,0.34,0.48):0,ph===7?M.in(p,0.42,0.56):0];
  const lg=ph===7?M.in(p,0.58,0.74):0;
  const gt=(window.__dsOff||(window.__dsOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  return (
    <div data-screen-label={'Discovery demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · INFRASTRUCTURE DISCOVERY</span>
      </div>
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — infrastructure discovery</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:'#fff',background:C.red,padding:'3px 8px',borderRadius:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',opacity:0.6+0.4*Math.sin(localTime*5)}}></span>LIVE</span>
          </div>
          <div style={{display:'flex',gap:14,padding:14,height:'calc(100% - 72px)',boxSizing:'border-box'}}>
            <div style={{flex:'0 0 372px',position:'relative'}}>
              {xf<1 && <div style={{position:'absolute',inset:0,opacity:1-xf}}><Panel kind={prevKind} t={1} u={u}/></div>}
              <div style={{position:'absolute',inset:0,opacity:xf}}><Panel kind={kind} t={tCur} u={u}/></div>
            </div>
            <div style={{flex:1,position:'relative'}}>
              <div style={{position:'absolute',left:0,top:2,fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap'}}>
                {u>1.3?'NETWORK · 10.20.0.0/16 · 4 SUBNETS':'NETWORK'}</div>
              <div style={{position:'relative',height:400,marginTop:14}}>
                <Board u={u} xfB={xfB}/>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>mode: agentless · read-only</span><span style={{whiteSpace:'nowrap'}}>cadence: every 6h</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
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
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>Infrastructure discovery</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>A live inventory and dependency graph of everything you run</div>
        </div>)}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            {[['1,240','servers discovered',C.gold],['3,861','dependencies mapped',C.blue],['100%','agentless · read-only',C.green]].map((d,i)=>(
              <div key={i} style={{opacity:st[i],transform:'scale('+M.pop(st[i])+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 30px',textAlign:'center'}}>
                <div style={{fontFamily:F.m,fontSize:d[0].length>6?28:38,color:d[2],whiteSpace:'nowrap',lineHeight:'46px'}}>{d[0]}</div>
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
function DiscoveryVideo(){
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
window.DiscoveryVideo = DiscoveryVideo;
