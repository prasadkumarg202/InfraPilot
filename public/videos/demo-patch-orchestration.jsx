/* INFRsre demo film — Patch orchestration (SQL Server). Scenes for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={ in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)), pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI) };
/* phases: 0 Opening,1 CR,2 Pre-checks,3 Topology,4 AG,5 FCI,6 Standalone,7 Outro */
const CAM=[
  {s:1.00,x:0,y:0},{s:1.02,x:0,y:0},{s:1.16,x:150,y:30},{s:1.16,x:150,y:20},
  {s:1.04,x:0,y:0},{s:1.20,x:-120,y:85},{s:1.20,x:-120,y:-25},{s:1.03,x:0,y:0},{s:1.00,x:0,y:0}];
const CAPTIONS=[
  'A March security patch is due across the SQL Server estate.',
  'Enter the change request — INFRsre pulls the affected servers from ServiceNow.',
  'Pre-checks run everywhere: backups, disk, AG health, quorum, rollback snapshots.',
  'Topology detected — standalone, Always On AG, failover cluster. Each gets its own strategy.',
  'Always On AG: patch the secondary replicas first, then failover, then the former primary.',
  'Failover cluster: passive node first, a controlled failover, then the previous active node.',
  'The standalone server completes the wave — CHG0042917 is updated and closed.',
  ''];
const PANEL=['none','cr','pre','topo','agseq','fciseq','done','done'];
/* servers: patch windows in global u (phase+progress) */
const SERVERS=[
  {name:'SQLAG-01A', grp:'ag',  slot:0, patch:[4.75,4.97]},
  {name:'SQLAG-01B', grp:'ag',  slot:1, patch:[4.05,4.35]},
  {name:'SQLAG-01C', grp:'ag',  slot:2, patch:[4.20,4.50]},
  {name:'SQLFCI-02A',grp:'fci', slot:0, patch:[5.65,5.95]},
  {name:'SQLFCI-02B',grp:'fci', slot:1, patch:[5.05,5.35]},
  {name:'SQL-APP-03',grp:'sa',  slot:0, patch:[6.10,6.50]}];
const GROUP_Y={ag:30,fci:170,sa:310};
const GROUP_LABEL={ag:'ALWAYS ON AG · SQLAG-01',fci:'FAILOVER CLUSTER · SQLFCI-02',sa:'STANDALONE'};
const TW=190,TH=88,GX=206;
function roleAt(name,u){
  if(name==='SQLAG-01A') return u<4.63?['PRIMARY',C.gold]:['SECONDARY',C.t3];
  if(name==='SQLAG-01B') return u<4.63?['SECONDARY',C.t3]:['PRIMARY',C.gold];
  if(name==='SQLAG-01C') return ['SECONDARY',C.t3];
  if(name==='SQLFCI-02A') return u<5.53?['ACTIVE',C.gold]:['PASSIVE',C.t3];
  if(name==='SQLFCI-02B') return u<5.53?['PASSIVE',C.t3]:['ACTIVE',C.gold];
  return ['STANDALONE',C.t3];
}
function tilePos(i,sv,u){
  const gx=sv.slot*GX, gy=GROUP_Y[sv.grp];
  const ux=(i%3)*GX, uy=Math.floor(i/3)*140+80;
  const e=M.in(u,3.05,3.4);
  return {x:ux+(gx-ux)*e, y:uy+(gy-uy)*e, grouped:e};
}
function Check({e,size}){ const s=size||16;
  return (
    <span style={{width:s,height:s,borderRadius:'50%',flex:'0 0 auto',display:'inline-flex',alignItems:'center',justifyContent:'center',
      border:'2px solid '+(e>0?C.green:C.line2),background:e>0?C.green:'transparent',transform:'scale('+(e>0?M.pop(e):1)+')'}}>
      {e>0.2 && <svg width={s-7} height={s-7} viewBox="0 0 10 10"><path d="M1.5 5.5l2.5 2.5 4.5-6" stroke="#0C1424" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
    </span>);
}
function SeqList({title,meta,rows,u}){
  return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
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
    </div>);
}
function Panel({kind,t,u}){
  if(kind==='none') return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'16px 18px',height:'100%',boxSizing:'border-box'}}>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>Patch orchestrator</div>
      <div style={{fontFamily:F.b,fontSize:12.5,color:C.t3,lineHeight:1.5}}>Awaiting change request…</div>
    </div>);
  if(kind==='cr'){ const rows=[
      ['Change request','CHG0042917',0.15],['Title','SQL Server 2022 — security CU (KB5046999)',0.28],
      ['Window','Sat 02:00–06:00 IST · CAB approved',0.41],['Risk','moderate · rollback armed',0.54]];
    const n=Math.round(6*M.in(t,0.6,0.85));
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>ServiceNow · change record</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)',padding:'3px 0'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
              <div style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
            </div>);})}
        <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid '+C.line,opacity:M.in(t,0.55,0.7)}}>
          <span style={{fontFamily:F.m,fontSize:12,color:C.blue,whiteSpace:'nowrap'}}>Fetching CIs from CMDB… {n}/6 servers</span>
        </div>
      </div>);
  }
  if(kind==='pre'){ const rows=[
      ['Full backups verified — 6/6',0.12],['Disk space & TempDB headroom',0.26],['AG replicas synchronized',0.40],
      ['Cluster quorum healthy',0.54],['No pending reboots',0.68],['Rollback snapshots armed',0.82]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <span style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,whiteSpace:'nowrap'}}>Pre-checks · 6 servers</span>
          <span style={{fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>automated</span>
        </div>
        {rows.map((r,i)=>{ const e=M.in(t,r[1],r[1]+0.1);
          return (
            <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'5px 0'}}>
              <Check e={e}/>
              <span style={{fontFamily:F.m,fontSize:12,color:e>0?C.t1:C.t4,whiteSpace:'nowrap'}}>{r[0]}</span>
            </div>);})}
      </div>);
  }
  if(kind==='topo'){ const rows=[
      ['Always On AG','3 replicas — secondaries first, then failover, then primary',C.gold,0.15],
      ['Failover cluster','2 nodes — passive first, failover, previous active',C.blue,0.40],
      ['Standalone','1 server — patch in window, no failover needed',C.t3,0.65]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Topology detected · strategy per group</div>
        {rows.map((r,i)=>{ const e=M.in(t,r[3],r[3]+0.14);
          return (
            <div key={i} style={{opacity:e,transform:'translateY('+(8*(1-e))+'px)',padding:'6px 0',display:'flex',gap:10}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:r[2],marginTop:5,flex:'0 0 auto'}}></span>
              <div>
                <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1}}>{r[0]}</div>
                <div style={{fontFamily:F.b,fontSize:11.5,color:C.t3,lineHeight:1.45}}>{r[1]}</div>
              </div>
            </div>);})}
      </div>);
  }
  if(kind==='agseq') return <SeqList title="Always On AG · SQLAG-01" meta="RB-2310" u={u} rows={[
    ['Patch secondary SQLAG-01B',4.35],['Patch secondary SQLAG-01C',4.50],
    ['Failover primary → 01B',4.72],['Patch former primary 01A',4.97]]}/>;
  if(kind==='fciseq') return <SeqList title="Failover cluster · SQLFCI-02" meta="RB-2311" u={u} rows={[
    ['Patch passive node 02B',5.35],['Controlled failover 02A → 02B',5.62],['Patch previous active 02A',5.95]]}/>;
  /* done */
  const badge=M.in(u,6.68,6.85);
  return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box',position:'relative'}}>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Wave complete</div>
      {[['All 6 servers patched — CU12',6.50],['Services & AG synchronized',6.60],['Validation checks 24/24 pass',6.68]].map((r,i)=>{
        const e=M.in(u,r[1]-0.06,r[1]+0.06);
        return (
          <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'6px 0'}}>
            <Check e={e}/>
            <span style={{fontFamily:F.m,fontSize:12,color:e>0?C.t1:C.t4,whiteSpace:'nowrap'}}>{r[0]}</span>
          </div>);})}
      <div style={{fontFamily:F.m,fontSize:11,color:C.t4,marginTop:8,opacity:M.in(u,6.8,6.92),whiteSpace:'nowrap'}}>ServiceNow CHG0042917 → Closed · evidence attached</div>
      <div style={{position:'absolute',right:18,top:14,opacity:badge,transform:'scale('+M.pop(badge)+')',
        fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:C.green,padding:'4px 10px',borderRadius:5,whiteSpace:'nowrap'}}>CR CLOSED</div>
    </div>);
}
function Tile({sv,i,u}){
  const pos=tilePos(i,sv,u);
  const appear=M.in(u,1.35+i*0.09,1.55+i*0.09);
  if(appear<=0.001) return null;
  const [role,roleC]=roleAt(sv.name,u);
  const [a,b]=sv.patch;
  const prog=cl((u-a)/(b-a),0,1);
  const done=u>=b, patching=u>a&&!done;
  const pre=M.in(u,2.2+i*0.1,2.35+i*0.1);
  const border= patching?'rgba(232,160,32,.55)': done?'rgba(30,158,98,.55)':C.line2;
  return (
    <div style={{position:'absolute',left:pos.x,top:pos.y,width:TW,height:TH,opacity:appear,
      transform:'scale('+M.pop(appear)+')',background:C.card,border:'1px solid '+border,borderRadius:10,
      padding:'10px 12px',boxSizing:'border-box'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:6}}>
        <span style={{fontFamily:F.m,fontSize:12,color:C.t1,whiteSpace:'nowrap'}}>{sv.name}</span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:8.5,letterSpacing:'.07em',color:roleC,border:'1px solid '+C.line2,padding:'2px 6px',borderRadius:999,whiteSpace:'nowrap'}}>{role}</span>
      </div>
      <div style={{marginTop:8}}>
        {done ? <span style={{fontFamily:F.m,fontSize:11,color:C.green,whiteSpace:'nowrap'}}>patched ✓ · CU12</span>
        : patching ? (
          <div>
            <div style={{fontFamily:F.m,fontSize:10.5,color:C.gold,whiteSpace:'nowrap',marginBottom:4}}>patching CU12… {Math.round(prog*100)}%</div>
            <div style={{height:5,borderRadius:999,background:'rgba(233,236,242,.08)',overflow:'hidden'}}>
              <div style={{height:'100%',width:(prog*100)+'%',background:C.gold,borderRadius:999}}></div>
            </div>
          </div>)
        : <span style={{fontFamily:F.m,fontSize:11,color:pre>0?C.blue:C.t4,whiteSpace:'nowrap'}}>{pre>0?'pre-checked ✓':'queued'}</span>}
      </div>
    </div>);
}
function FailoverArrow({u,from,to,win,label}){
  const o=M.in(u,win[0],win[0]+0.05)*(1-M.in(u,win[1]-0.04,win[1]));
  if(o<=0.001) return null;
  const draw=M.in(u,win[0],win[1]-0.04);
  const x1=from.x+TW/2, y1=from.y+TH, x2=to.x+TW/2, y2=to.y+TH;
  const my=Math.max(y1,y2)+26;
  const d=`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2+4}`;
  return (
    <svg style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none',opacity:o}} width="620" height="420">
      <path d={d} fill="none" stroke={C.red3} strokeWidth="2.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw}/>
      {draw>0.9 && <circle cx={x2} cy={y2+4} r="4" fill={C.red3}/>}
      <text x={(x1+x2)/2} y={my+16} textAnchor="middle" fill={C.red3} fontFamily={F.d} fontWeight="800" fontSize="10.5" letterSpacing=".08em">{label}</text>
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
  const gt=(window.__poOff||(window.__poOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  const agA=SERVERS[0],agB=SERVERS[1],fciA=SERVERS[3],fciB=SERVERS[4];
  const groupsVis=M.in(u,3.05,3.4);
  return (
    <div data-screen-label={'Patch orchestration demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · PATCH ORCHESTRATION</span>
      </div>
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — patch orchestrator</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:'#fff',background:C.red,padding:'3px 8px',borderRadius:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',opacity:0.6+0.4*Math.sin(localTime*5)}}></span>LIVE</span>
          </div>
          <div style={{display:'flex',gap:14,padding:14,height:'calc(100% - 72px)',boxSizing:'border-box'}}>
            <div style={{flex:'0 0 372px',position:'relative'}}>
              {xf<1 && <div style={{position:'absolute',inset:0,opacity:1-xf}}><Panel kind={prevKind} t={1} u={u}/></div>}
              <div style={{position:'absolute',inset:0,opacity:xf}}><Panel kind={kind} t={tCur} u={u}/></div>
            </div>
            <div style={{flex:1,position:'relative'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,margin:'2px 0 8px',whiteSpace:'nowrap'}}>
                PATCH TARGETS {u>1.4?'· CHG0042917':''}</div>
              <div style={{position:'relative',height:410}}>
                {Object.keys(GROUP_LABEL).map(g=>(
                  <div key={g} style={{position:'absolute',left:0,top:GROUP_Y[g]-20,opacity:groupsVis,
                    fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,whiteSpace:'nowrap'}}>{GROUP_LABEL[g]}</div>))}
                {SERVERS.map((sv,i)=><Tile key={sv.name} sv={sv} i={i} u={u}/>)}
                <FailoverArrow u={u} from={{x:agA.slot*GX,y:GROUP_Y.ag}} to={{x:agB.slot*GX,y:GROUP_Y.ag}} win={[4.55,4.72]} label="FAILOVER"/>
                <FailoverArrow u={u} from={{x:fciA.slot*GX,y:GROUP_Y.fci}} to={{x:fciB.slot*GX,y:GROUP_Y.fci}} win={[5.45,5.62]} label="FAILOVER"/>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>window: 02:00–06:00 IST</span><span style={{whiteSpace:'nowrap'}}>rollback: armed</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
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
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>Patch orchestration</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>One change request. Six SQL Servers. Zero downtime.</div>
        </div>)}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            {[['6','servers patched',C.t1],['0','downtime',C.green],['CHG0042917','closed with evidence',C.gold]].map((d,i)=>(
              <div key={i} style={{opacity:st[i],transform:'scale('+M.pop(st[i])+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 30px',textAlign:'center'}}>
                <div style={{fontFamily:F.m,fontSize:d[0].length>4?24:38,color:d[2],whiteSpace:'nowrap',lineHeight:'46px'}}>{d[0]}</div>
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
function PatchOrchVideo(){
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
window.PatchOrchVideo = PatchOrchVideo;
