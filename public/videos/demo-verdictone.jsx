/* Verdictone product animation — 59s, scenes for animations-v2 SceneStage. */
const C={bg:'#0A111F',card:'#101A2E',card2:'#16233B',line:'rgba(233,236,242,.09)',line2:'rgba(233,236,242,.16)',
  red:'#E11B22',red3:'#F17D77',green:'#2FB57C',gold:'#E8A020',blue:'#7FB3E3',
  t1:'#F4F6FA',t2:'#B4BCCB',t3:'#8C97AC',t4:'#64708A'};
const F={d:"'Anek Latin',system-ui,sans-serif",b:"'Noto Sans',system-ui,sans-serif",m:"'IBM Plex Mono',monospace"};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const sm=t=>{t=cl(t,0,1);return t*t*(3-2*t);};
const M={in:(p,a,b)=>sm((p-a)/Math.max(b-a,1e-6)),pop:e=>0.6+0.4*sm(e)+0.12*Math.sin(sm(e)*Math.PI)};
/* Scenes: 0 Problem 7s, 1 Turn 8s, 2 Agent 13s, 3 Score 10s, 4 Breadth 10s, 5 Close 11s */
const FRAMEWORKS=['SOC 2','ISO 27001','GDPR','PCI-DSS','HIPAA'];
const ALERTS=[];
for(let i=0;i<26;i++){const fr=(n)=>{const x=Math.sin(i*12.9898*n)*43758.5453;return x-Math.floor(x);};
  ALERTS.push({x:120+fr(1)*1560,y:180+fr(2)*700,w:180+fr(3)*120,at:0.42+ (i/26)*0.5,
    msg:['Control failing','Public S3 bucket','MFA not enforced','Encryption off','Stale access key','Audit log gap'][i%6]});}
function Card({style,children}){return <div style={Object.assign({background:C.card,border:'1px solid '+C.line,borderRadius:12},style)}>{children}</div>;}
function Scene0({p}){
  const beats=FRAMEWORKS.map((f,i)=>M.in(p,0.03+i*0.055,0.06+i*0.055));
  const dashO=M.in(p,0.36,0.44);
  return (
    <div style={{position:'absolute',inset:0,background:'#000'}}>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',gap:28,opacity:1-dashO*0.85}}>
        {FRAMEWORKS.map((f,i)=>(
          <span key={f} style={{fontFamily:F.d,fontWeight:800,fontSize:44,color:'#fff',opacity:beats[i],letterSpacing:'-0.01em',whiteSpace:'nowrap'}}>{f}.</span>))}
      </div>
      {dashO>0.001 && (
        <div style={{position:'absolute',inset:0,opacity:dashO}}>
          <div style={{position:'absolute',inset:0,background:C.bg,opacity:0.9}}></div>
          <div style={{position:'absolute',left:160,top:120,right:160,bottom:120,background:C.card,border:'1px solid '+C.line,borderRadius:14,opacity:0.5}}></div>
          {ALERTS.map((a,i)=>{const e=M.in(p,a.at,a.at+0.05);if(e<=0.001)return null;
            const flash=0.75+0.25*Math.sin(p*90+i*2.1);
            return (
              <div key={i} style={{position:'absolute',left:a.x,top:a.y,width:a.w,opacity:e,transform:'scale('+M.pop(e)+')',
                background:'rgba(225,27,34,.16)',border:'1px solid rgba(225,27,34,'+(0.55*flash)+')',borderRadius:8,padding:'10px 14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:C.red,opacity:flash}}></span>
                  <span style={{fontFamily:F.d,fontWeight:800,fontSize:10,letterSpacing:'.08em',color:C.red3,whiteSpace:'nowrap'}}>ALERT</span>
                </div>
                <div style={{fontFamily:F.m,fontSize:11.5,color:C.t2,marginTop:5,whiteSpace:'nowrap'}}>{a.msg}</div>
              </div>);})}
        </div>)}
    </div>);
}
function Scene1({p,localTime}){
  const freeze=M.in(p,0,0.12);
  const dim=M.in(p,0.1,0.3);
  const logoDraw=M.in(p,0.3,0.62);
  const tagO=M.in(p,0.62,0.78);
  const word='Verdictone';
  const n=Math.round(word.length*logoDraw);
  return (
    <div style={{position:'absolute',inset:0,background:C.bg}}>
      <div style={{position:'absolute',inset:0,opacity:0.5*(1-dim)}}>
        <div style={{position:'absolute',left:160,top:120,right:160,bottom:120,background:C.card,border:'1px solid '+C.line,borderRadius:14,opacity:0.5}}></div>
        {ALERTS.map((a,i)=>(
          <div key={i} style={{position:'absolute',left:a.x,top:a.y,width:a.w,background:'rgba(225,27,34,.12)',
            border:'1px solid rgba(225,27,34,.3)',borderRadius:8,padding:'10px 14px'}}>
            <div style={{fontFamily:F.m,fontSize:11.5,color:C.t3,whiteSpace:'nowrap'}}>{a.msg}</div>
          </div>))}
      </div>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:22}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <span style={{fontFamily:F.d,fontWeight:800,fontSize:88,letterSpacing:'-0.02em',color:'#fff',whiteSpace:'pre'}}>{word.slice(0,n)}</span>
          <span style={{display:'inline-block',width:6,height:74,background:C.red,marginLeft:8,opacity:0.4+0.6*Math.abs(Math.sin(localTime*4))}}></span>
        </div>
        <div style={{fontFamily:F.d,fontWeight:600,fontSize:24,color:C.t2,opacity:tagO,transform:'translateY('+(12*(1-tagO))+'px)',whiteSpace:'nowrap'}}>
          Doesn't just flag failing controls. <span style={{color:C.green,fontWeight:800}}>Fixes them.</span></div>
      </div>
    </div>);
}
function Scene2({p}){
  const cardIn=M.in(p,0.02,0.10);
  const plan=[['Restrict security group to VPC CIDR',0.16],['Enable TLS-only parameter group',0.24],['Rotate exposed credentials',0.32]];
  const diffO=M.in(p,0.38,0.48);
  const blastO=M.in(p,0.50,0.58);
  const approveO=M.in(p,0.60,0.66);
  const press=M.in(p,0.68,0.72);
  const sweep=M.in(p,0.72,0.86);
  const fixed=M.in(p,0.88,0.95);
  const green=fixed>0;
  return (
    <div style={{position:'absolute',inset:0,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:1240,opacity:cardIn,transform:'translateY('+(30*(1-cardIn))+'px)'}}>
        <Card style={{padding:'34px 40px',border:'1px solid '+(green?'rgba(47,181,124,.5)':'rgba(225,27,34,.35)'),position:'relative',overflow:'hidden'}}>
          {sweep>0&&sweep<1 && <div style={{position:'absolute',top:0,bottom:0,left:0,width:(sweep*100)+'%',background:'rgba(47,181,124,.07)'}}></div>}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:20}}>
            <div>
              <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
                <span style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:'#fff',background:green?C.green:C.red,padding:'4px 10px',borderRadius:5,whiteSpace:'nowrap'}}>{green?'FIXED':'FINDING'}</span>
                <span style={{fontFamily:F.m,fontSize:13,color:C.t3,whiteSpace:'nowrap'}}>{green?'Evidence attached · audit trail signed':'Gap score 4.8 / 5'}</span>
              </div>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:30,color:'#fff',whiteSpace:'nowrap'}}>Production database open to the internet</div>
            </div>
            <div style={{opacity:approveO,transform:'scale('+(press>0&&press<1?0.94:M.pop(approveO))+')'}}>
              <span style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:'#fff',background:sweep>0?C.green:C.red,padding:'12px 28px',borderRadius:10,whiteSpace:'nowrap',display:'inline-block'}}>{sweep>=1?'✓ Applied':sweep>0?'Applying…':'Approve'}</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:28,marginTop:26}}>
            <div>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,marginBottom:10}}>AGENT PLAN</div>
              {plan.map((s,i)=>{const e=M.in(p,s[1],s[1]+0.06);const done=sweep>=(i+1)/3;
                return (
                  <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'7px 0',opacity:e}}>
                    <span style={{width:17,height:17,borderRadius:'50%',border:'2px solid '+(done?C.green:C.line2),background:done?C.green:'transparent',display:'inline-flex',alignItems:'center',justifyContent:'center',flex:'0 0 auto'}}>
                      {done && <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5.5l2.5 2.5 4.5-6" stroke="#0A111F" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
                    </span>
                    <span style={{fontFamily:F.m,fontSize:14,color:C.t1,whiteSpace:'nowrap'}}>{s[0]}</span>
                  </div>);})}
              <div style={{marginTop:14,opacity:blastO,transform:'translateY('+(8*(1-blastO))+'px)'}}>
                <span style={{fontFamily:F.m,fontSize:12.5,color:C.gold,border:'1px solid rgba(232,160,32,.4)',background:'rgba(232,160,32,.1)',padding:'6px 12px',borderRadius:999,whiteSpace:'nowrap'}}>Blast radius: 2 resources · 0 apps affected</span>
              </div>
            </div>
            <div style={{background:'#0B1526',border:'1px solid '+C.line,borderRadius:10,padding:'16px 20px',opacity:diffO,fontFamily:F.m,fontSize:13.5,lineHeight:2}}>
              <div style={{color:C.t4}}>security_group.tf</div>
              <div style={{color:C.red3,background:'rgba(225,27,34,.1)',whiteSpace:'nowrap'}}>- cidr_blocks = ["0.0.0.0/0"]</div>
              <div style={{color:C.green,background:'rgba(47,181,124,.08)',whiteSpace:'nowrap'}}>+ cidr_blocks = ["10.20.0.0/16"]</div>
              <div style={{color:C.green,background:'rgba(47,181,124,.08)',whiteSpace:'nowrap'}}>+ description = "VPC-internal only"</div>
            </div>
          </div>
        </Card>
      </div>
    </div>);
}
function Scene3({p}){
  const o=M.in(p,0.02,0.12);
  const dialP=M.in(p,0.12,0.55);
  const score=(3.2-1.4*dialP).toFixed(1);
  const comp=Math.round(87+4*M.in(p,0.3,0.7));
  const gaps=[['Access control',4.2],['Encryption',3.8],['Logging',3.1],['Vendor mgmt',2.6],['Change mgmt',2.2]];
  const dateShift=M.in(p,0.62,0.85);
  return (
    <div style={{position:'absolute',inset:0,background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',gap:36,opacity:o}}>
      <Card style={{width:360,padding:'34px',textAlign:'center'}}>
        <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,marginBottom:18}}>SECURITY POSTURE</div>
        <div style={{position:'relative',width:210,height:210,margin:'0 auto',borderRadius:'50%',
          background:'conic-gradient('+(dialP>0.6?C.green:C.gold)+' 0 '+((1-(score-1)/4)*100)+'%, rgba(233,236,242,.08) 0 100%)'}}>
          <div style={{position:'absolute',inset:16,borderRadius:'50%',background:C.card,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontFamily:F.m,fontSize:58,color:'#fff',lineHeight:1}}>{score}</span>
            <span style={{fontFamily:F.m,fontSize:12,color:C.t4,marginTop:6}}>risk · lower is better</span>
          </div>
        </div>
        <div style={{fontFamily:F.m,fontSize:15,color:C.green,marginTop:18,whiteSpace:'nowrap'}}>compliance {comp}% ▲</div>
      </Card>
      <div style={{width:560,display:'flex',flexDirection:'column',gap:16}}>
        <Card style={{padding:'26px 30px'}}>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,marginBottom:14}}>GAPS · SCORED 1–5</div>
          {gaps.map((g,i)=>{const shrink=M.in(p,0.2+i*0.09,0.36+i*0.09);const v=g[1]-(g[1]-1)*shrink*0.7;
            return (
              <div key={i} style={{display:'grid',gridTemplateColumns:'150px 1fr 44px',gap:14,alignItems:'center',padding:'7px 0'}}>
                <span style={{fontFamily:F.d,fontWeight:600,fontSize:14,color:C.t2,whiteSpace:'nowrap'}}>{g[0]}</span>
                <div style={{height:9,borderRadius:999,background:'rgba(233,236,242,.07)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:(v/5*100)+'%',borderRadius:999,background:v>3.5?C.red:v>2.5?C.gold:C.green}}></div>
                </div>
                <span style={{fontFamily:F.m,fontSize:13,color:v>3.5?C.red3:v>2.5?C.gold:C.green,textAlign:'right'}}>{v.toFixed(1)}</span>
              </div>);})}
        </Card>
        <Card style={{padding:'20px 30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontFamily:F.d,fontWeight:700,fontSize:16,color:C.t1,whiteSpace:'nowrap'}}>Audit-ready</span>
          <div style={{position:'relative',width:220,height:34,overflow:'hidden'}}>
            <span style={{position:'absolute',right:0,top:0,fontFamily:F.m,fontSize:19,color:C.t4,opacity:1-dateShift,textDecoration:dateShift>0.4?'line-through':'none',whiteSpace:'nowrap'}}>Sep 21</span>
            <span style={{position:'absolute',right:0,top:0,fontFamily:F.m,fontSize:19,color:C.green,opacity:dateShift,transform:'translateY('+(14*(1-dateShift))+'px)',whiteSpace:'nowrap'}}>Sep 12 · 9 days earlier</span>
          </div>
        </Card>
      </div>
    </div>);
}
function Scene4({p}){
  const cut=p<0.25?0:p<0.5?1:p<0.75?2:3;
  const cp=(p%0.25)/0.25;
  const o=M.in(cp,0,0.15);
  const FW=['SOC 2','ISO 27001','GDPR','PCI-DSS','HIPAA','NIST CSF','CIS v8','SOC 1','ISO 27701'];
  const label=['One control satisfies many frameworks','Approvals from your phone','Questionnaires answered from live evidence','Every client in one console'][cut];
  return (
    <div style={{position:'absolute',inset:0,background:C.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:34}}>
      <div style={{height:520,display:'flex',alignItems:'center',justifyContent:'center',opacity:o}}>
        {cut===0 && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,width:820}}>
            {FW.map((f,i)=>{const e=M.in(cp,0.1+i*0.06,0.2+i*0.06);
              return <Card key={f} style={{padding:'24px 20px',textAlign:'center',opacity:e,transform:'scale('+M.pop(e)+')',
                border:'1px solid '+(i<5?'rgba(47,181,124,.45)':C.line)}}>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:'#fff',whiteSpace:'nowrap'}}>{f}</div>
                <div style={{fontFamily:F.m,fontSize:11.5,color:i<5?C.green:C.t4,marginTop:6,whiteSpace:'nowrap'}}>{i<5?'✓ satisfied by CTRL-114':'mapped'}</div>
              </Card>;})}
          </div>)}
        {cut===1 && (
          <div style={{width:300,height:520,background:C.card,border:'1px solid '+C.line2,borderRadius:36,padding:'22px 18px',boxSizing:'border-box'}}>
            <div style={{width:110,height:22,borderRadius:999,background:'#060b14',margin:'0 auto 22px'}}></div>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:'#fff',marginBottom:14}}>Verdictone</div>
            <Card style={{background:C.card2,padding:'16px'}}>
              <div style={{fontFamily:F.d,fontWeight:700,fontSize:14,color:C.t1,lineHeight:1.4}}>Fix ready: close port 22 on 3 hosts</div>
              <div style={{fontFamily:F.m,fontSize:11,color:C.t4,margin:'8px 0 14px'}}>blast radius: 3 resources · 0 apps</div>
              <div style={{display:'flex',gap:8}}>
                <span style={{flex:1,textAlign:'center',fontFamily:F.d,fontWeight:800,fontSize:13,color:'#fff',background:M.in(cp,0.55,0.7)>0.5?C.green:C.red,padding:'11px 0',borderRadius:9}}>{M.in(cp,0.55,0.7)>0.5?'✓ Approved':'Approve'}</span>
                <span style={{flex:1,textAlign:'center',fontFamily:F.d,fontWeight:700,fontSize:13,color:C.t3,border:'1px solid '+C.line2,padding:'11px 0',borderRadius:9}}>Later</span>
              </div>
            </Card>
          </div>)}
        {cut===2 && (
          <Card style={{width:760,padding:'26px 32px'}}>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:10.5,letterSpacing:'.08em',color:C.t4,marginBottom:16}}>SECURITY QUESTIONNAIRE · 214 QUESTIONS</div>
            {['Do you encrypt data at rest?','Is MFA enforced for all admin access?','How long are audit logs retained?','Do you run annual penetration tests?'].map((q,i)=>{
              const e=M.in(cp,0.15+i*0.16,0.3+i*0.16);
              return (
                <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 190px',gap:18,alignItems:'center',padding:'10px 0',borderBottom:'1px solid '+C.line}}>
                  <span style={{fontFamily:F.b,fontSize:15,color:C.t2}}>{q}</span>
                  <span style={{fontFamily:F.m,fontSize:12.5,color:C.green,opacity:e,whiteSpace:'nowrap'}}>✓ answered · evidence #{1120+i*7}</span>
                </div>);})}
          </Card>)}
        {cut===3 && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,width:900}}>
            {[['Meridian Financial','96%',C.green],['Northgate Health','91%',C.green],['Atlas Retail Co','88%',C.gold],['Corvus Logistics','94%',C.green],['Helio Energy','82%',C.gold],['Pinewood Legal','97%',C.green]].map((c,i)=>{
              const e=M.in(cp,0.1+i*0.07,0.22+i*0.07);
              return <Card key={i} style={{padding:'20px 22px',opacity:e,transform:'translateY('+(14*(1-e))+'px)'}}>
                <div style={{fontFamily:F.d,fontWeight:700,fontSize:16,color:'#fff',whiteSpace:'nowrap'}}>{c[0]}</div>
                <div style={{fontFamily:F.m,fontSize:22,color:c[2],marginTop:8}}>{c[1]}</div>
                <div style={{fontFamily:F.m,fontSize:10.5,color:C.t4,marginTop:2,whiteSpace:'nowrap'}}>compliant · monitored live</div>
              </Card>;})}
          </div>)}
      </div>
      <div style={{fontFamily:F.d,fontWeight:700,fontSize:22,color:C.t2,opacity:o,whiteSpace:'nowrap'}}>{label}</div>
    </div>);
}
function Scene5({p}){
  const vO=M.in(p,0.06,0.2);
  const nameO=M.in(p,0.22,0.36);
  const subO=M.in(p,0.4,0.54);
  const urlO=M.in(p,0.6,0.74);
  return (
    <div style={{position:'absolute',inset:0,background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:26}}>
      <div style={{width:110,height:110,borderRadius:24,background:C.red,display:'flex',alignItems:'center',justifyContent:'center',
        opacity:vO,transform:'scale('+M.pop(vO)+')'}}>
        <span style={{fontFamily:F.d,fontWeight:800,fontSize:64,color:'#fff',lineHeight:1}}>V</span>
      </div>
      <div style={{textAlign:'center'}}>
        <div style={{fontFamily:F.d,fontWeight:800,fontSize:54,color:'#fff',letterSpacing:'-0.015em',opacity:nameO,transform:'translateY('+(16*(1-nameO))+'px)',whiteSpace:'nowrap'}}>
          Verdictone — compliance that fixes itself</div>
        <div style={{fontFamily:F.b,fontSize:21,color:C.t3,marginTop:16,opacity:subO,whiteSpace:'nowrap'}}>
          Free to monitor. <span style={{color:C.gold,fontFamily:F.m}}>$4,900 flat</span> to get audited.</div>
        <div style={{fontFamily:F.m,fontSize:17,color:C.t4,marginTop:26,opacity:urlO,letterSpacing:'.06em'}}>verdictone.io</div>
      </div>
    </div>);
}
function Demo(){
  const {localTime,progress,index}=useScene();
  const scenes=[Scene0,Scene1,Scene2,Scene3,Scene4,Scene5];
  const S=scenes[index];
  return (
    <div data-screen-label={'Verdictone film · scene '+(index+1)} style={{position:'absolute',inset:0,background:C.bg,overflow:'hidden',fontFamily:F.b}}>
      <S p={progress} localTime={localTime}/>
    </div>);
}
function VerdictoneVideo(){
  const [t,setTweak]=useTweaks(window.TWEAK_DEFAULTS);
  const scenes=JSON.parse(window.OM_SCENES).reduce((o,s)=>(o[s.name]=Demo,o),{});
  return (
    <div style={{display:'flex',justifyContent:'center',background:C.bg}}>
      <SceneStage width={1920} height={1080} bg={C.bg} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        {scenes}
      </SceneStage>
      <TweaksPanel>
        <TweakSection label="Timeline"/>
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v=>setTweak('motionEditor',v)}/>
      </TweaksPanel>
    </div>);
}
window.VerdictoneVideo = VerdictoneVideo;
