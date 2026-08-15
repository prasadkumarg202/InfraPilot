/* INFRsre demo film — SQL Server migration (Migration Factory). Scenes for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={ in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)), pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI) };
/* phases: 0 Opening,1 Inputs,2 Backups,3 Restore,4 Log+recovery,5 AG config,6 Post,7 Outro */
const CAM=[
  {s:1.00,x:0,y:0},{s:1.02,x:0,y:0},{s:1.16,x:150,y:30},{s:1.20,x:-130,y:75},
  {s:1.20,x:-130,y:-45},{s:1.18,x:-130,y:-40},{s:1.08,x:-50,y:0},{s:1.14,x:120,y:15},{s:1.00,x:0,y:0}];
const CAPTIONS=[
  'Four payment databases must move from PostgreSQL 12 to a new PostgreSQL 16 cluster.',
  'Source, destination and change request — INFRsre plans the whole migration.',
  'pg_basebackup snapshots the source — verified with checksums.',
  'Base backups restore onto every node — standbys in recovery.',
  'WAL catch-up streams — the new primary is promoted, replicas keep streaming.',
  'Replication configured: sync pair with automatic failover, async remote for DR.',
  'Post-upgrade: ANALYZE, amcheck, maintenance jobs — then the CR closes.',
  ''];
const PANEL=['none','req','backup','restore','logrec','agcfg','post','post'];
const TW=190,TH=88;
const SRV=[
  {name:'PG-LEG-05', x:110, y:40, role:u=>['SOURCE · PG 12',C.t3], steps:[
    [0,'online · 4 databases',C.t4],
    [2.10,'pg_basebackup 4 DBs…',C.gold,[2.10,2.85]],
    [2.85,'backups verified · 42.4 GB',C.green],
    [4.10,'final WAL ship…',C.gold,[4.10,4.30]],
    [4.30,'read-only · cutover done',C.blue]]},
  {name:'PGC-16A', x:10, y:266, role:u=>u<5.25?['REPLICA',C.t3]:['PRIMARY',C.gold], steps:[
    [0,'provisioned · PG 16',C.t4],
    [3.05,'restoring base…',C.gold,[3.05,3.40]],
    [3.40,'restored · standby',C.blue],
    [4.35,'promote — primary',C.gold,[4.35,4.60]],
    [4.60,'online · promoted',C.green],
    [5.75,'sync · auto failover',C.green]]},
  {name:'PGC-16B', x:204, y:266, role:u=>u<5.25?['REPLICA',C.t3]:['SECONDARY',C.t3], steps:[
    [0,'provisioned · PG 16',C.t4],
    [3.25,'restoring base…',C.gold,[3.25,3.60]],
    [3.60,'restored · standby',C.blue],
    [4.50,'streaming WAL',C.gold,[4.50,4.75]],
    [4.75,'standby · streaming',C.blue],
    [5.75,'sync · auto failover',C.green]]},
  {name:'PGC-16C', x:452, y:266, role:u=>u<5.25?['REPLICA',C.t3]:['REMOTE · ASYNC',C.blue], steps:[
    [0,'provisioned · PG 16',C.t4],
    [3.45,'restoring base…',C.gold,[3.45,3.85]],
    [3.85,'restored · standby',C.blue],
    [4.60,'streaming WAL',C.gold,[4.60,4.85]],
    [4.85,'standby · streaming',C.blue],
    [5.90,'asynchronous · healthy',C.blue]]}];
const FLOWS=[
  {to:0,win:[3.05,3.40],c:C.red3},{to:1,win:[3.25,3.60],c:C.red3},{to:2,win:[3.45,3.85],c:C.red3},
  {to:0,win:[4.35,4.60],c:C.gold},{to:1,win:[4.50,4.75],c:C.gold},{to:2,win:[4.60,4.85],c:C.gold}];
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
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>Migration factory</div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:C.t3,lineHeight:1.5}}>Awaiting migration request…</div>
    </div>);
  if(kind==='req'){ const rows=[
      ['Source','PG-LEG-05 · PostgreSQL 12',0.12],['Destination','PGC-16 · 3-node cluster · PG 16',0.26],
      ['Change request','CHG0052330 · CAB approved',0.40],['Cutover window','Sat 01:00–05:00 IST',0.54]];
    const n=Math.round(4*M.in(t,0.62,0.85));
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Migration request</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)',padding:'3px 0'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
              <div style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
            </div>);})}
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid '+C.line,opacity:M.in(t,0.58,0.72)}}>
          <span style={{fontFamily:F.m,fontSize:12,color:C.blue,whiteSpace:'nowrap'}}>Discovering databases… {n}/4 · 42.4 GB</span>
        </div>
      </div>);
  }
  if(kind==='backup') return <SeqList title="pg_basebackup · PG-LEG-05" meta="checksums on" u={u} rows={[
      ['PayCore',2.25,'18.4 GB'],['PayAudit',2.42,'9.1 GB'],['PayArchive',2.60,'12.6 GB'],['PayRef',2.75,'2.3 GB']]}
      note="verified — WAL archiving continuous" noteAt={2.85}/>;
  if(kind==='restore') return <SeqList title="Restore base on all nodes" meta="standby mode" u={u} rows={[
      ['Copy backup set to replicas',3.05],['Restore on PGC-16A',3.40],['Restore on PGC-16B',3.60],['Restore on PGC-16C',3.85]]}
      note="4 databases × 3 replicas · parallel restore" noteAt={3.9}/>;
  if(kind==='logrec') return <SeqList title="WAL catch-up & promote" meta="cutover" u={u} rows={[
      ['Final WAL segment shipped',4.30],['Promote 16A — new primary',4.60],
      ['16B streaming from primary',4.75],['16C streaming — async remote',4.85]]}
      note="source frozen read-only · downtime clock: 4m 20s" noteAt={4.9}/>;
  if(kind==='agcfg') return <SeqList title="Replication configuration" meta="PG-PAY16" u={u} rows={[
      ['Create replication slots · PG-PAY16',5.18],['Attach replicas 16B, 16C',5.38],
      ['16A + 16B synchronous · automatic failover',5.58],['16C remote replica — asynchronous',5.76],
      ['All 4 databases — in sync',5.92]]}
      note="listener pg-pay16.corp:5432 · DR via async remote" noteAt={5.96}/>;
  /* post */
  return <SeqList title="Post-upgrade steps" meta="RB-3120" u={u} rows={[
      ['ANALYZE all databases',6.20],['amcheck — 4/4 clean',6.45],['Maintenance jobs configured',6.70,'backup · index · integrity']]}
      note="ServiceNow CHG0052330 → Closed · evidence attached" noteAt={6.88} badge="CR CLOSED" badgeAt={6.82}/>;
}
function Tile({sv,u}){
  const [role,roleC]=sv.role(u);
  let cur=sv.steps[0];
  for(const s of sv.steps) if(u>=s[0]) cur=s;
  const win=cur[3];
  const prog=win?cl((u-win[0])/(win[1]-win[0]),0,1):0;
  const active=!!win&&u<win[1];
  return (
    <div style={{position:'absolute',left:sv.x,top:sv.y,width:TW,height:TH,background:C.card,
      border:'1px solid '+(active?'rgba(232,160,32,.55)':cur[2]===C.green?'rgba(30,158,98,.55)':C.line2),
      borderRadius:10,padding:'10px 12px',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:6}}>
        <span style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{sv.name}</span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:8.5,letterSpacing:'.07em',color:roleC,border:'1px solid '+C.line2,padding:'2px 6px',borderRadius:999,whiteSpace:'nowrap'}}>{role}</span>
      </div>
      <div style={{marginTop:8,overflow:'hidden'}}>
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
function Flow({u,to,win,c}){
  const o=M.in(u,win[0],win[0]+0.06)*(1-M.in(u,win[1]-0.05,win[1]));
  if(o<=0.001) return null;
  const draw=M.in(u,win[0],win[1]-0.05);
  const x1=110+TW/2, y1=40+TH, x2=SRV[to+1].x+TW/2, y2=266;
  const my=(y1+y2)/2;
  const d=`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2-4}`;
  return (
    <svg style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none',opacity:o}} width="620" height="420">
      <path d={d} fill="none" stroke={c} strokeWidth="2.5" strokeDasharray="6 6" strokeDashoffset={-u*30} opacity={draw}/>
      {draw>0.85 && <circle cx={x2} cy={y2-4} r="4" fill={c}/>}
    </svg>);
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
  const gt=(window.__mgOff||(window.__mgOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  return (
    <div data-screen-label={'PG upgrade demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · POSTGRESQL UPGRADE</span>
      </div>
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — migration factory</span>
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
                <div style={{position:'absolute',left:0,top:16,fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap'}}>SOURCE · POSTGRESQL 12</div>
                <div style={{position:'absolute',left:0,top:214,fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap'}}>DESTINATION · STREAMING CLUSTER · POSTGRESQL 16 {u>5.15?'· PG-PAY16':''}</div>
                <div style={{position:'absolute',left:0,top:236,width:402,height:134,border:'1px dashed rgba(233,236,242,.24)',borderRadius:12,boxSizing:'border-box'}}>
                  <div style={{position:'absolute',left:12,top:-7,padding:'0 6px',background:C.panel,fontFamily:F.d,fontWeight:800,fontSize:9,letterSpacing:'.08em',color:C.red3,whiteSpace:'nowrap'}}>US-EAST DATA CENTER</div>
                </div>
                <div style={{position:'absolute',left:444,top:236,width:206,height:134,border:'1px dashed rgba(233,236,242,.24)',borderRadius:12,boxSizing:'border-box'}}>
                  <div style={{position:'absolute',left:12,top:-7,padding:'0 6px',background:C.panel,fontFamily:F.d,fontWeight:800,fontSize:9,letterSpacing:'.08em',color:C.red3,whiteSpace:'nowrap'}}>US-WEST DATA CENTER</div>
                </div>
                {(()=>{ const o=M.in(u,5.72,5.88); if(o<=0.001) return null; return (
                  <svg style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none',opacity:o}} width="660" height="420">
                    <line x1="402" y1="310" x2="440" y2="310" stroke={C.blue} strokeWidth="2" strokeDasharray="5 5" strokeDashoffset={-u*28}/>
                    <path d="M 440 310 l -7 -4 v 8 z" fill={C.blue}/>
                    <text x="421" y="298" textAnchor="middle" fill={C.blue} fontFamily={F.d} fontWeight="800" fontSize="8.5" letterSpacing=".06em">ASYNC</text>
                  </svg>); })()}
                {FLOWS.map((f,i)=><Flow key={i} u={u} to={f.to} win={f.win} c={f.c}/>)}
                {SRV.map(sv=><Tile key={sv.name} sv={sv} u={u}/>)}
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>window: 01:00–05:00 IST</span><span style={{whiteSpace:'nowrap'}}>rollback: source intact</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
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
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>PostgreSQL upgrade factory</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>PostgreSQL 12 → 16, end to end — near-zero downtime</div>
        </div>)}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            {[['4','databases upgraded',C.t1],['4m 20s','cutover downtime',C.green],['CHG0052330','closed with evidence',C.gold]].map((d,i)=>(
              <div key={i} style={{opacity:st[i],transform:'scale('+M.pop(st[i])+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 30px',textAlign:'center'}}>
                <div style={{fontFamily:F.m,fontSize:d[0].length>6?24:38,color:d[2],whiteSpace:'nowrap',lineHeight:'46px'}}>{d[0]}</div>
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
function SqlMigrationVideo(){
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
window.SqlMigrationVideo = SqlMigrationVideo;
