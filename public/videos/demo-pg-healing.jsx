/* INFRsre demo film — PostgreSQL auto-healing. Scene components for animations-v2 SceneStage. */
const C = { bg:'#0C1424', panel:'#14203A', card:'#1E2C49', line:'rgba(233,236,242,.09)', line2:'rgba(233,236,242,.14)',
  red:'#E11B22', red3:'#F17D77', gold:'#E8A020', green:'#1E9E62', blue:'#7FB3E3',
  t1:'#F4F6FA', t2:'#B4BCCB', t3:'#8C97AC', t4:'#64708A' };
const F = { d:"'Anek Latin',system-ui,sans-serif", b:"'Noto Sans',system-ui,sans-serif", m:"'IBM Plex Mono',monospace" };
const cl = (v,a,b)=>Math.max(a,Math.min(b,v));
const sm = t=>{ t=cl(t,0,1); return t*t*(3-2*t); };
const M = {
  in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)),
  pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI),
};
/* camera end-state per phase (start of phase p == end of phase p-1) */
const CAM = [
  {s:1.00,x:0,y:0},   // start
  {s:1.03,x:0,y:0},   // end Opening
  {s:1.24,x:205,y:70},// end Detect (focus feed)
  {s:1.22,x:-185,y:-92},// end Root cause (focus detail)
  {s:1.18,x:-160,y:-78},// end Remediate
  {s:1.03,x:0,y:0},   // end Validate
  {s:1.00,x:0,y:0},   // end Outro
];
const FEED = [
  {ph:0,at:0.00,c:C.green,t:'02:38:12',m:'PATCH-4211 wave 2 complete — 412 hosts, 0 failed'},
  {ph:0,at:0.00,c:C.blue, t:'02:39:40',m:'Compliance scan queued — 12,412 nodes'},
  {ph:1,at:0.22,c:C.red,  t:'02:41:07',m:'P1 · PostgreSQL service stopped on PG-PRD-07',alert:true},
  {ph:2,at:0.22,c:C.blue, t:'02:41:31',m:'Incident INC0051633 created in ServiceNow — priority P1'},
  {ph:3,at:0.12,c:C.gold, t:'02:42:02',m:'Runbook RB-1204 invoked — start PostgreSQL service'},
  {ph:4,at:0.30,c:C.green,t:'02:44:19',m:'Service running — 9 databases online, INC0051633 closed'},
];
const CAPTIONS = [
  'The INFRsre operations console, watching 40,000 nodes. A P1 is about to happen.',
  '02:41:07 — the postgresql-16 service stops unexpectedly. INFRsre sees it instantly.',
  'An incident is created in ServiceNow automatically — INC0051633, priority P1.',
  'Runbook RB-1204 executes: the service is started and verified. Nobody is paged.',
  'Databases back online — the incident is updated and closed, audit trail attached.',
  '',
];
const DETAIL_KIND = ['estate','alert','incident','runbook','valid','valid'];

function spikeAmp(u){ return M.in(u,1.2,1.7)*(1-M.in(u,4.1,4.7)); }

function Chart({u}){
  const A = spikeAmp(u);
  const pts=[]; for(let i=0;i<=48;i++){ const x=i*11;
    let y=86+Math.sin(i*1.7)*5+Math.sin(i*7.3)*3;
    const g=Math.exp(-Math.pow(i-36,2)/26);
    y-=A*g*54+A*g*Math.sin(i*5+u*6)*7;
    pts.push(x+','+y.toFixed(1)); }
  const d=pts.join(' ');
  const lat=Math.round(A*412);
  return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'12px 16px 8px',position:'relative'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <span style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t2}}>PG-PRD-07 · connection errors</span>
        <span style={{fontFamily:F.m,fontSize:16,color:A>0.4?C.red3:C.green,whiteSpace:'nowrap'}}>{lat} err/s</span>
      </div>
      <svg width="528" height="112" viewBox="0 0 528 112" style={{display:'block'}}>
        <line x1="0" y1="86" x2="528" y2="86" stroke={C.line2} strokeDasharray="3 5"/>
        <polyline points={d} fill="none" stroke={C.green} strokeWidth="2.5" opacity={1-A} strokeLinejoin="round"/>
        <polyline points={d} fill="none" stroke={C.red3} strokeWidth="2.5" opacity={A} strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Feed({phase,p}){
  const H=62;
  const rev = FEED.map(it => phase>it.ph?1: phase<it.ph?0: M.in(p,it.at,it.at+0.14));
  return (
    <div style={{position:'relative',height:H*FEED.length}}>
      {FEED.map((it,k)=>{ const r=rev[k]; if(r<=0.001) return null;
        let off=0; for(let j=k+1;j<FEED.length;j++) off+=rev[j]*H;
        return (
          <div key={k} style={{position:'absolute',left:0,right:0,top:off,opacity:r,
            transform:'translateX('+(-14*(1-r))+'px)',display:'flex',gap:10,alignItems:'flex-start',
            padding:'9px 12px',borderRadius:8,background:it.alert?'rgba(225,27,34,.10)':'rgba(233,236,242,.04)',
            border:'1px solid '+(it.alert?'rgba(241,125,119,.45)':C.line),height:H-10,boxSizing:'border-box'}}>
            <span style={{fontFamily:F.m,fontSize:10.5,color:C.t4,paddingTop:2,flex:'0 0 54px'}}>{it.t}</span>
            <span style={{width:8,height:8,borderRadius:'50%',marginTop:4,flex:'0 0 auto',background:it.c}}></span>
            <span style={{fontFamily:F.b,fontSize:12.5,lineHeight:1.4,color:it.alert?C.t1:C.t2,fontWeight:it.alert?700:400}}>{it.m}</span>
          </div>);
      })}
    </div>
  );
}

function Detail({kind,t,pulseT}){
  if(kind==='estate') return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,height:'100%'}}>
      {[['40,213','nodes healthy',C.green],['214','policies active',C.t1],['0','open incidents',C.green]].map((d,i)=>(
        <div key={i} style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'16px 14px'}}>
          <div style={{fontFamily:F.m,fontSize:24,color:d[2]}}>{d[0]}</div>
          <div style={{fontFamily:F.b,fontSize:11.5,color:C.t4,marginTop:4}}>{d[1]}</div>
        </div>))}
    </div>);
  if(kind==='alert') return (
    <div style={{background:C.card,border:'1px solid rgba(241,125,119,.45)',borderRadius:10,padding:'16px 18px',height:'100%',boxSizing:'border-box'}}>
      <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',background:C.red,color:'#fff',padding:'3px 8px',borderRadius:5}}>P1</span>
        <span style={{fontFamily:F.m,fontSize:12,color:C.t3,whiteSpace:'nowrap'}}>heartbeat lost · confirmed twice</span>
      </div>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:17,color:C.t1,marginBottom:6}}>PostgreSQL service stopped on PG-PRD-07</div>
      <div style={{fontFamily:F.b,fontSize:12.5,lineHeight:1.5,color:C.t3}}>postgresql-16 terminated unexpectedly · payment settlement cluster · Mumbai region. 9 databases offline — settlement API fails over in ~9 minutes if not restored.</div>
    </div>);
  if(kind==='incident'){ const rows=[
      ['Number','INC0051633',0.06],['Priority','P1 — Critical',0.18],
      ['Configuration item','PG-PRD-07 · PostgreSQL 16',0.30],['State','In Progress — automated',0.42],
      ['Assigned to','INFRsre autonomous ops',0.54],['Opened','02:41:31 · created by INFRsre',0.66]];
    const badge=M.in(t,0.74,0.9);
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box',position:'relative'}}>
        <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:8}}>ServiceNow · incident record</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:20,rowGap:4}}>
          {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
            return (
              <div key={i} style={{opacity:e,transform:'translateY('+(6*(1-e))+'px)'}}>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:9.5,letterSpacing:'.08em',color:C.t4,textTransform:'uppercase'}}>{r[0]}</div>
                <div style={{fontFamily:F.m,fontSize:12,color:r[1].indexOf('P1')===0?C.red3:C.t1,whiteSpace:'nowrap'}}>{r[1]}</div>
              </div>);})}
        </div>
        <div style={{position:'absolute',right:18,top:14,opacity:badge,transform:'scale('+M.pop(badge)+')',
          fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:C.blue,padding:'4px 10px',borderRadius:5,whiteSpace:'nowrap'}}>AUTO-CREATED</div>
      </div>);
  }
  if(kind==='runbook'){ const steps=[
      ['Validate state — postgresql-16 stopped','02:42:04',0.10],['Check event log & disk — fault is clean','02:42:19',0.32],
      ['Start postgresql-16 service','02:42:47',0.54],['Verify 9 databases online · health checks','02:43:31',0.76]];
    return (
      <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'14px 18px',height:'100%',boxSizing:'border-box'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <span style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1}}>Runbook RB-1204 · start PostgreSQL service</span>
          <span style={{fontFamily:F.m,fontSize:11,color:C.t4,whiteSpace:'nowrap'}}>no approval · policy P-114</span>
        </div>
        {steps.map((s,i)=>{ const e=M.in(t,s[2],s[2]+0.1);
          return (
            <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'5px 0'}}>
              <span style={{width:16,height:16,borderRadius:'50%',flex:'0 0 auto',display:'flex',alignItems:'center',justifyContent:'center',
                border:'2px solid '+(e>0?C.green:C.line2),background:e>0?C.green:'transparent',transform:'scale('+(e>0?M.pop(e):1)+')'}}>
                {e>0.2 && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5.5l2.5 2.5 4.5-6" stroke="#0C1424" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
              </span>
              <span style={{fontFamily:F.m,fontSize:12.5,color:e>0?C.t1:C.t4,flex:1}}>{s[0]}</span>
              <span style={{fontFamily:F.m,fontSize:10.5,color:C.t4,opacity:e}}>{s[1]}</span>
            </div>);})}
        <div style={{height:6,borderRadius:999,background:'rgba(233,236,242,.08)',marginTop:8,overflow:'hidden'}}>
          <div style={{height:'100%',width:(cl(t,0,1)*100)+'%',background:C.green,borderRadius:999}}></div>
        </div>
      </div>);
  }
  /* valid */
  const rows=[['postgresql-16 service','running',0.10],['Databases online','9/9',0.30],['Connection errors','0 /s · baseline',0.50]];
  const badge=M.in(t,0.68,0.85);
  return (
    <div style={{background:C.card,border:'1px solid '+C.line,borderRadius:10,padding:'16px 18px',height:'100%',boxSizing:'border-box',position:'relative'}}>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t1,marginBottom:10}}>Post-remediation validation</div>
      {rows.map((r,i)=>{ const e=M.in(t,r[2],r[2]+0.12);
        return (
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',opacity:e,transform:'translateY('+(6*(1-e))+'px)'}}>
            <span style={{fontFamily:F.b,fontSize:13,color:C.t3}}>{r[0]}</span>
            <span style={{fontFamily:F.m,fontSize:12.5,color:C.green,whiteSpace:'nowrap',marginLeft:12}}>{r[1]}</span>
          </div>);})}
      <div style={{position:'absolute',right:18,top:14,opacity:badge,transform:'scale('+M.pop(badge)+')',
        fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:C.green,padding:'4px 10px',borderRadius:5}}>INCIDENT CLOSED</div>
      <div style={{fontFamily:F.m,fontSize:11,color:C.t4,marginTop:8,opacity:M.in(t,0.78,0.92),whiteSpace:'nowrap'}}>ServiceNow INC0051633 → Closed · resolution notes + audit trail attached</div>
    </div>);
}

function Demo(){
  const {localTime,progress,index} = useScene();
  const ph=index, p=progress, u=ph+p;
  /* camera */
  const a=CAM[ph], b=CAM[ph+1], e=sm(p);
  const cam={s:a.s+(b.s-a.s)*e, x:a.x+(b.x-a.x)*e, y:a.y+(b.y-a.y)*e};
  /* detail crossfade inside scene start */
  const kind=DETAIL_KIND[ph], prevKind=ph>0?DETAIL_KIND[ph-1]:kind;
  const xf = prevKind===kind?1:M.in(p,0,0.18);
  const tCur = cl((p-(prevKind===kind?0:0.18))/(prevKind===kind?1:0.82),0,1);
  /* caption crossfade */
  const cap=CAPTIONS[ph], prevCap=ph>0?CAPTIONS[ph-1]:cap;
  const cxf = cap===prevCap?1:M.in(p,0,0.15);
  /* opening lower-third */
  const titleO = ph===0 ? M.in(p,0.08,0.22)*(1-M.in(p,0.78,0.92)) : 0;
  /* outro */
  const scrim = ph===5 ? M.in(p,0.05,0.25) : 0;
  const st1 = ph===5?M.in(p,0.28,0.42):0, st2=ph===5?M.in(p,0.38,0.52):0, lg=ph===5?M.in(p,0.56,0.72):0;
  const gt = (window.__shOff||(window.__shOff=JSON.parse(window.OM_SCENES).map((s,i,arr)=>arr.slice(0,i).reduce((a,x)=>a+x.dur,0))))[ph]+localTime;
  return (
    <div data-screen-label={'Self-healing demo · t='+Math.floor(gt)+'s'}
      style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      {/* top bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:50,display:'flex',alignItems:'center',padding:'0 36px',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:19,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></span>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.1em',color:C.t4,whiteSpace:'nowrap'}}>PRODUCT DEMO · POSTGRESQL AUTO-HEALING</span>
      </div>
      {/* console (camera target) */}
      <div style={{position:'absolute',left:110,top:76,width:1060,height:526,
        transform:'scale('+cam.s+') translate('+cam.x+'px,'+cam.y+'px)',transformOrigin:'50% 50%'}}>
        <div style={{position:'absolute',inset:0,background:C.panel,border:'1px solid '+C.line2,borderRadius:12,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.45)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,padding:'11px 16px',borderBottom:'1px solid '+C.line,background:C.card}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.red3}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.gold}}></span>
            <span style={{width:9,height:9,borderRadius:'50%',background:C.green}}></span>
            <span style={{fontFamily:F.m,fontSize:11.5,color:C.t4,flex:1,textAlign:'center'}}>ops.infrsre.io — autonomous operations console</span>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:'#fff',background:C.red,padding:'3px 8px',borderRadius:5}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#fff',opacity:0.6+0.4*Math.sin(localTime*5)}}></span>LIVE</span>
          </div>
          <div style={{display:'flex',gap:14,padding:14,height:'calc(100% - 72px)',boxSizing:'border-box'}}>
            <div style={{flex:'0 0 408px',overflow:'hidden'}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,margin:'2px 0 8px'}}>EVENT STREAM</div>
              <Feed phase={ph} p={p}/>
            </div>
            <div style={{flex:1,display:'flex',flexDirection:'column',gap:12}}>
              <Chart u={u}/>
              <div style={{flex:1,position:'relative'}}>
                {xf<1 && <div style={{position:'absolute',inset:0,opacity:1-xf}}><Detail kind={prevKind} t={1} pulseT={localTime}/></div>}
                <div style={{position:'absolute',inset:0,opacity:xf}}><Detail kind={kind} t={tCur} pulseT={localTime}/></div>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',borderTop:'1px solid '+C.line,fontFamily:F.m,fontSize:10.5,color:C.t4,whiteSpace:'nowrap'}}>
            <span style={{whiteSpace:'nowrap'}}>self-healing: enabled</span><span style={{whiteSpace:'nowrap'}}>policy engine: 214 active</span><span style={{whiteSpace:'nowrap'}}>audit: signing all actions</span>
          </div>
        </div>
      </div>
      {/* caption */}
      <div style={{position:'absolute',left:0,right:0,bottom:26,display:'flex',justifyContent:'center'}}>
        <div style={{position:'relative',minHeight:34,display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(12,20,36,.85)',padding:'6px 18px',borderRadius:999}}>
          {cxf<1 && <span style={{position:'absolute',whiteSpace:'nowrap',opacity:1-cxf,fontFamily:F.d,fontWeight:600,fontSize:16,color:C.t2}}>{prevCap}</span>}
          <span style={{whiteSpace:'nowrap',opacity:cxf*(cap?1:0),fontFamily:F.d,fontWeight:600,fontSize:16,color:C.t2}}>{cap}</span>
        </div>
      </div>
      {/* opening lower-third */}
      {titleO>0 && (
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
          opacity:titleO,background:'rgba(12,20,36,'+(0.72*titleO)+')',width:'100%',textAlign:'center'}}>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:11,letterSpacing:'.12em',color:C.gold,marginBottom:12,whiteSpace:'nowrap'}}>INFRSRE PRODUCT DEMO</div>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:58,color:'#fff',letterSpacing:'-0.01em',whiteSpace:'nowrap',transform:'translateY('+(14*(1-titleO))+'px)'}}>PostgreSQL auto-healing</div>
          <div style={{fontFamily:F.b,fontSize:17,color:C.t2,marginTop:12,whiteSpace:'nowrap'}}>A P1 resolved with no human in the loop</div>
        </div>)}
      {/* outro */}
      {scrim>0 && (
        <div style={{position:'absolute',inset:0,background:'rgba(12,20,36,'+(0.88*scrim)+')',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
          <div style={{display:'flex',gap:18}}>
            <div style={{opacity:st1,transform:'scale('+M.pop(st1)+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 34px',textAlign:'center'}}>
              <div style={{fontFamily:F.m,fontSize:38,color:C.green,whiteSpace:'nowrap'}}>3m 12s</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.t3,marginTop:4,whiteSpace:'nowrap'}}>detection → recovery</div>
            </div>
            <div style={{opacity:st2,transform:'scale('+M.pop(st2)+')',background:C.panel,border:'1px solid '+C.line2,borderRadius:12,padding:'22px 34px',textAlign:'center'}}>
              <div style={{fontFamily:F.m,fontSize:38,color:'#fff'}}>0</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.t3,marginTop:4,whiteSpace:'nowrap'}}>humans paged</div>
            </div>
          </div>
          <div style={{opacity:lg,textAlign:'center'}}>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:34,color:'#fff'}}>INFR<span style={{color:C.red}}>sre</span></div>
            <div style={{fontFamily:F.b,fontSize:14,color:C.t3,marginTop:6}}>Autonomous infrastructure operations · infrsre.io</div>
          </div>
        </div>)}
    </div>
  );
}

function SelfHealVideo(){
  const [t,setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const scenes = JSON.parse(window.OM_SCENES).reduce((o,s)=>(o[s.name]=Demo,o),{});
  return (
    <div style={{display:'flex',justifyContent:'center',background:'#0C1424'}}>
      <SceneStage width={1280} height={720} bg="#0C1424" scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {scenes}
      </SceneStage>
      <TweaksPanel>
        <TweakSection label="Timeline"/>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v=>setTweak('motionEditor',v)}/>
      </TweaksPanel>
    </div>
  );
}
window.SelfHealVideo = SelfHealVideo;
