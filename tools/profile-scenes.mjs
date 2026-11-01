import {renderMaze} from './profile-maze.mjs';
// README-safe SVG illustrations. Frames are documented examples, never telemetry.
const C={ink:'#f3f7ff',muted:'#94a8c2',line:'#263b53',lime:'#c5ff5c',cyan:'#54d9ff',purple:'#a18aff',red:'#ff816f'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const text=(x,y,s,n=19,c=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${c}" ${extra}>${esc(s)}</text>`;
const label=(x,y,s,n=15,c=C.muted,extra='')=>text(x,y,s,n,c,`class="mono" letter-spacing=".8" ${extra}`);
const rect=(x,y,w,h,fill='#0d1929',stroke=C.line,rx=12)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const line=(d,c=C.line,extra='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="2" ${extra}/>`;
const circle=(x,y,r,c,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
const poly=(points,fill,stroke='#36516c',extra='')=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" ${extra}/>`;

export const stateNames={
  hero:['Ask the next question','Follow the thread','Reconsider the route','Build from the connection'],
  anydeploy:['Choose the source and target','Build on the chosen device','Serve for the project type','Choose how to reach it'],
  orbs:['Queue discovered','Client unavailable','Action awaiting verification','Confirmed; advance queue'],
  instavault:['Media imported','Text extracted','Semantic links indexed','Matching results retrieved'],
  jarvis:['Listening to input','Transcribing the signal','Routing the request','Speaking the response'],
  lumina:['Typed document loaded','Block moved','Content reflows','Pages ready to print'],
  luminal:['Front camera','Three-quarter camera','Profile camera','Composite stage']
};

export const stateCss=Array.from({length:4},(_,i)=>{
  const a=i*25,b=(i+1)*25;
  return `.state-${i}{animation:s${i} 16s steps(1,end) infinite}@keyframes s${i}{${i?'0%,':''}${i?a-.01:0}%{opacity:${i?0:1}}${a}%{opacity:1}${b-.01}%{opacity:1}${b}%,100%{opacity:0}}`;
}).join('')+'.state{opacity:0}.state.final{opacity:1}@media(prefers-reduced-motion:reduce){.state{animation:none!important;opacity:0!important}.state.final{opacity:1!important}}';

export const sceneDefs=`<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#314d69"/><stop offset=".5" stop-color="#182b40"/><stop offset="1" stop-color="#0c1523"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#19394a" stop-opacity=".8"/><stop offset="1" stop-color="#0a1728" stop-opacity=".95"/></linearGradient><radialGradient id="board-glow"><stop stop-color="#54d9ff" stop-opacity=".13"/><stop offset="1" stop-color="#54d9ff" stop-opacity="0"/></radialGradient>`;
export const voiceCss='.voice-capture{animation:capture 16s linear infinite}.voice-play{animation:playback 16s linear infinite}@keyframes capture{0%{width:0}24.99%,100%{width:570px}}@keyframes playback{0%,74.99%{width:0}75%{width:0}99.99%{width:570px}100%{width:0}}@media(prefers-reduced-motion:reduce){.voice-capture,.voice-play{animation:none!important;width:570px!important}}';

const frames=(key,fn)=>stateNames[key].map((name,i)=>`<g class="state state-${i}${i===3?' final':''}" data-state="${i}" aria-label="${esc(name)}">${fn(i,name)}</g>`).join('');
const caption=(i,name,c=C.cyan)=>label(18,405,`${String(i+1).padStart(2,'0')} / ${name.toUpperCase()}`,16,c);
const at=(body,x,y,w=600,h=430)=>`<g transform="translate(${x} ${y}) scale(${w/600} ${h/430})">${body}</g>`;
const check=(x,y,c=C.lime)=>line(`M${x} ${y}l6 6 12-15`,c);

export function mazeScene(x,y,w,h){return at(renderMaze(),x,y,w,h);}

function deployment(){
  let b=rect(12,16,326,331,'#0b1422',C.line,14)+label(29,45,'anyDeploy / DESKTOP',17,C.lime)+line('M12 59H338');
  b+=poly([[572,72],[580,80],[580,325],[572,333]],'#172a3e','#314d65');
  b+=rect(402,65,170,270,'#182a3c','#58758b',20)+rect(411,76,152,246,'#071321','#233e54',13)+rect(457,80,60,8,'#263e50','#263e50',4);
  b+=label(487,109,'ANDROID / TERMUX',11,C.cyan,'text-anchor="middle"');
  b+=line('M338 195H402',C.line)+label(340,179,'TARGET',11,C.muted);
  b+=frames('anydeploy',(i,name)=>{
    let f=label(30,87,['SOURCE + TARGET','BUILD ON TARGET','SERVE BY PROJECT TYPE','REACHABILITY'][i],17,C.lime);
    if(i===0){
      f+=rect(29,108,291,69,'#142338',C.line,7)+label(42,130,'SOURCE',12,C.muted)+text(42,159,'GitHub repo / ZIP',21);
      f+=rect(29,191,291,69,'#152d31',C.lime,7)+label(42,213,'SELECTED DEVICE',12,C.muted)+text(42,242,'Android / Termux',21,C.lime);
      f+=label(29,306,'Desktop controls the deployment.',14,C.muted);
      f+=label(487,185,'TARGET',19,C.cyan,'text-anchor="middle"')+label(487,216,'CONNECTED',13,C.lime,'text-anchor="middle"');
    }else if(i===1){
      ['DETECT PROJECT','INSTALL DEPENDENCIES','BUILD OUTPUT'].forEach((v,k)=>f+=rect(29,110+k*59,291,44,'#122539',k===2?C.lime:C.line,7)+label(42,138+k*59,v,16,k===2?C.lime:C.ink));
      f+=label(29,315,'Source is processed on the device.',14,C.muted);
      ['detect','install','build'].forEach((v,k)=>f+=label(429,168+k*36,'> '+v,15,k===2?C.lime:C.cyan));
    }else if(i===2){
      f+=label(29,114,'CONDITIONAL RUNTIME PATHS',12,C.muted);
      f+=rect(29,130,291,59,'#1c352a',C.lime,7)+label(42,155,'STATIC FILES',14,C.lime)+text(42,178,'Build output → nginx',18);
      f+=rect(29,204,291,59,'#101b2b',C.line,7)+label(42,229,'APP / API',14,C.muted)+text(42,252,'Process → PM2',18,C.muted);
      f+=label(29,310,'This example is a static site.',14,C.lime);
      f+=label(487,171,'STATIC',19,C.lime,'text-anchor="middle"')+label(487,205,'nginx',23,C.ink,'text-anchor="middle"')+label(487,240,'serving files',12,C.muted,'text-anchor="middle"');
    }else{
      ['LOCAL / LAN','TEMPORARY LINK','CUSTOM DOMAIN'].forEach((v,k)=>f+=rect(29,111+k*57,291,43,k===0?'#1c352a':'#101b2b',k===0?C.lime:C.line,7)+label(42,139+k*57,v,16,k===0?C.lime:C.muted));
      f+=label(29,310,'Mode controls reachability.',14,C.muted);
      f+=label(487,174,'LAN',26,C.lime,'text-anchor="middle"')+label(487,211,'READY',19,C.ink,'text-anchor="middle"')+check(477,253);
    }
    f+=label(26,375,'EXAMPLE / REPOSITORY → LOCAL STATIC SITE',14,C.muted);
    return f+caption(i,name,C.lime);
  });
  return b;
}

function queueScene(){
  let b=rect(12,12,576,354,'#0a1321',C.line,16)+label(31,45,'CLIENT / STATE INSPECTOR',17,C.cyan)+line('M12 61H588');
  b+=label(35,99,'SAMPLE QUEUE',15)+label(330,99,'OBSERVATION',15);
  b+=frames('orbs',(i,name)=>{
    let s='';
    const statuses=[['READY','WAIT','WAIT'],['WAITING','WAIT','WAIT'],['VERIFY','WAIT','WAIT'],['DONE','READY','WAIT']][i];
    ['QUEST A','QUEST B','QUEST C'].forEach((q,k)=>{
      const active=(i===3?k===1:k===0),yy=117+k*67;
      s+=rect(30,yy,263,52,active?'#133040':'#0b1928',active?C.cyan:C.line,7)+label(46,yy+33,q,17,C.ink)+label(278,yy+33,statuses[k],14,k===0&&i===3?C.lime:C.cyan,'text-anchor="end"');
    });
    s+=rect(323,117,236,187,'#0b1b2c',i===1?C.red:C.line,9);
    const lines=[['CLIENT FOUND','target located','ready to inspect'],['CLIENT LOST','deadline retained','no action replay'],['ACTION SENT','result uncertain','check client again'],['RESULT CONFIRMED','queue advances','state saved']][i];
    lines.forEach((z,j)=>s+=label(339,152+j*38,z,j===0?17:15,j===0?(i===1?C.red:C.lime):C.muted));
    s+=label(32,344,i===1?'RETRY WITHIN THE EXISTING DEADLINE':'OBSERVE → ACT → VERIFY → SAVE',16,i===1?C.red:C.cyan);
    return s+caption(i,name);
  });
  return b;
}

function mediaCard(x,y,type,color){
  let b=rect(x,y,102,116,'#132237',C.line,8)+rect(x+9,y+10,84,64,'#1d3048',color,5);
  if(type==='VIDEO')b+=poly([[x+42,y+26],[x+42,y+57],[x+67,y+42]],color,color);
  else if(type==='IMAGE')b+=poly([[x+14,y+63],[x+38,y+34],[x+53,y+49],[x+70,y+26],[x+87,y+63]],'#537483',color);
  else b+=line(`M${x+24} ${y+28}h54m-54 15h44m-44 15h50`,color);
  return b+label(x+10,y+101,type,13,C.ink);
}
function vaultScene(){
  let b=frames('instavault',(i,name)=>{
    let s=rect(12,12,576,355,'#0b1220',C.line,15)+label(31,43,'EXAMPLE / SAVED MEDIA LIBRARY',16,C.purple);
    if(i<2){
      s+=mediaCard(35,74,'IMAGE',C.purple)+mediaCard(154,74,'VIDEO',C.cyan)+mediaCard(273,74,'TEXT',C.lime);
      s+=rect(400,74,163,202,'#121d30',C.purple,10)+label(416,102,i?'ENRICHMENT':'IMPORT',16,C.purple);
      const lines=i?['OCR text','tags linked','embeddings','indexed']:['image saved','video saved','text saved','AI optional'];
      lines.forEach((z,j)=>s+=label(416,140+j*33,z,14,j===3?C.lime:C.muted));
      s+=label(35,249,i?'TEXT → TAGS → VECTOR INDEX':'FILES KEPT IN A LOCAL LIBRARY',17,i?C.lime:C.purple);
    } else {
      const nodes=[[104,166],[227,141],[275,245],[418,177],[476,286]];
      for(const [a,z] of [[0,1],[0,2],[1,3],[2,3],[3,4]])s+=line(`M${nodes[a][0]} ${nodes[a][1]}L${nodes[z][0]} ${nodes[z][1]}`,i===3&&(z===3||a===3)?C.lime:'#5d4c8c');
      nodes.forEach(([xx,yy],k)=>{s+=circle(xx,yy,k===3?28:20,k===3&&i===3?'#29412a':'#221b3b',`stroke="${k===3&&i===3?C.lime:C.purple}" stroke-width="2"`)+label(xx,yy+5,['IMG','TAG','TXT','HIT','VID'][k],11,C.ink,'text-anchor="middle"');});
      s+=rect(31,69,530,38,'#131d2d',i===3?C.lime:C.line,8)+label(45,94,i===3?'SEARCH: camera notes → matching media':'RELATED ITEMS / SEMANTIC INDEX',16,i===3?C.lime:C.purple);
    }
    s+=label(32,341,['FILES IMPORTED / ENRICHMENT OPTIONAL','LOCAL TEXT AND EMBEDDINGS READY','MEDIA ↔ TEXT ↔ TOPIC CONNECTIONS','RESULT RETRIEVED FROM THE LOCAL INDEX'][i],14,C.muted);
    return s+caption(i,name,C.purple);
  });
  return b;
}

export function projectScene(key,x,y,w,h){
  const render={anydeploy:deployment,orbs:queueScene,instavault:vaultScene}[key];
  if(!render)throw new Error('Unknown project scene');
  return at(render(),x,y,w,h);
}

const inputEnvelope=[2,3,4,8,13,27,44,29,17,8,4,12,31,50,42,22,9,3,6,20,37,53,32,12,5,11,25,40,31,15,7,4,14,29,17,3,2,2];
const speechEnvelope=[2,8,20,38,51,36,14,8,4,10,23,41,30,16,5,3,8,25,45,50,28,12,4,9,24,37,22,7,3,12,29,43,25,9,3,2,2,2];
export const audioExample={inputEnvelope,speechEnvelope};
function audioWave(values,active,colour){
  let out='';const centre=168;
  values.forEach((amplitude,k)=>{
    const x=34+k*14.2,half=amplitude*(active?1:.42);
    if(active)out+=`<rect x="${x-4}" y="${centre-half-2}" width="8" height="${half*2+4}" rx="4" fill="${colour}" opacity=".12"/>`;
    out+=`<rect x="${x-2}" y="${centre-half}" width="4" height="${half*2}" rx="2" fill="${colour}" opacity="${active?'.92':'.32'}"/>`;
  });
  return out;
}
function voiceScene(){
  const clips='<defs><clipPath id="voice-captured" clipPathUnits="userSpaceOnUse"><rect x="25" y="100" width="0" height="130" class="voice-capture"/></clipPath><clipPath id="voice-played" clipPathUnits="userSpaceOnUse"><rect x="25" y="100" width="0" height="130" class="voice-play"/></clipPath></defs>';
  return clips+frames('jarvis',(i,name)=>{
    const activeColour=i===3?C.lime:C.cyan;
    let f=rect(12,12,576,355,'#091523',C.line,16)+label(31,43,'JARVIS / VOICE PIPELINE',17,C.cyan);
    f+=label(31,77,i===3?'TTS OUTPUT':'MIC INPUT / CAPTURED AUDIO',14,C.muted)+label(567,77,['LISTEN','TRANSCRIBE','ROUTE','SPEAK'][i],15,activeColour,'text-anchor="end"');
    f+=line('M30 168H568','#203748');
    const wave=audioWave(i===3?speechEnvelope:inputEnvelope,i===0||i===3,activeColour);
    f+=i===0||i===3?'<g clip-path="url(#'+(i===0?'voice-captured':'voice-played')+')">'+wave+'</g>':wave;
    f+=label(31,237,'ILLUSTRATIVE SIGNAL / EXAMPLE REQUEST',12,C.muted);
    ['MIC','WHISPER','MODEL / TOOL','SPEECH'].forEach((phase,k)=>{
      const x=30+k*139;
      f+=rect(x,257,124,39,k===i?'#153745':'#0e1a2a',k===i?activeColour:C.line,7)+label(x+62,282,phase,12,k===i?activeColour:C.muted,'text-anchor="middle"');
      if(k<3)f+=line('M'+(x+124)+' 277h15',k<i?activeColour:C.line);
    });
    const detail=['Wake word → capture the request','Whisper → “Open Chrome.”','open_app("chrome") → tool result','Sentence → TTS → audio playback'][i];
    f+=label(31,333,detail,16,i===2?C.lime:C.ink);
    return f+caption(i,name,activeColour);
  });
}

function page(x,y,w,h,rows=5,selected=false){
  let s=rect(x,y,w,h,'#1a2a3b','#506780',3)+rect(x+15,y+17,w-30,22,'#385a60',selected?C.lime:C.line,2);
  for(let j=0;j<rows;j++)s+=line(`M${x+15} ${y+64+j*20}h${w-30-(j%2)*24}`,'#60778f');
  return s;
}
function documentScene(){
  return frames('lumina',(i,name)=>{
    let s=rect(12,12,576,355,'#0b1421',C.line,16)+label(32,45,'EXAMPLE / ONE DOCUMENT MODEL',16,C.lime);
    if(i<2){
      s+=page(205,72,177,254,6,true);
      const yy=i===0?145:213;
      s+=rect(189,yy,210,54,'#1e463d',C.lime,0)+label(203,yy+32,'CONTENT BLOCK',15,C.lime);
      s+=poly([[418,yy+24],[418,yy+57],[427,yy+47],[437,yy+64],[446,yy+58],[436,yy+42],[451,yy+42]],'#edfbd9',C.lime);
      s+=label(36,351,i===0?'MODEL → TEMPLATE':'POINTER CHANGE → LAYOUT OVERRIDE',14,C.muted);
    }else{
      s+=page(111,88,166,231,5,true)+page(303,88,166,231,3,false);
      s+=rect(317,146,138,54,'#1b4237',C.lime,0)+label(326,178,'REFLOWED',13,C.lime);
      s+=label(170,343,'PAGE 1',14,C.muted,'text-anchor="middle"')+label(386,343,'PAGE 2',14,C.muted,'text-anchor="middle"');
      if(i===3)s+=rect(405,57,157,37,'#223c2b',C.lime,5)+label(420,82,'PRINT READY',15,C.lime);
    }
    return s+caption(i,name,C.lime);
  });
}

function subject(angle){
  const a=angle*Math.PI/180;
  const project=(x,y,z)=>{const xx=x*Math.cos(a)+z*Math.sin(a),zz=-x*Math.sin(a)+z*Math.cos(a);return [290+xx,229-y+zz*.23];};
  const v=[[-54,0,-54],[54,0,-54],[54,0,54],[-54,0,54],[-54,116,-54],[54,116,-54],[54,116,54],[-54,116,54]].map(p=>project(...p));
  return poly([v[0],v[1],v[5],v[4]],'#544978',C.purple)+poly([v[1],v[2],v[6],v[5]],'#332d57',C.purple)+poly([v[3],v[2],v[6],v[7]],'#252345',C.purple)+poly([v[4],v[5],v[6],v[7]],'#7a659b',C.purple);
}
function cameraScene(){
  return frames('luminal',(i,name)=>{
    const angle=[0,45,90,45][i];
    let s=rect(12,12,576,355,'#0b1323',C.line,16)+label(32,45,'EXAMPLE / CAMERA-DRIVEN GENERATION',16,C.purple);
    s+=poly([[77,256],[291,172],[511,256],[291,338]],'#101e31','#293951')+subject(angle);
    s+=label(35,88,'CAMERA '+angle+'°',20,C.purple)+label(35,116,i===3?'COMPOSITE STAGE':'SOURCE ANALYSIS REUSED',14,C.muted);
    s+=line('M432 156L353 118M432 156L354 248M353 118L354 248',C.cyan,'stroke-dasharray="5 6"')+rect(431,135,78,52,'#254151',C.cyan,7)+poly([[508,149],[536,137],[536,187],[508,176]],'#1b3046',C.cyan);
    if(i===3)s+=rect(31,309,526,37,'#25223d',C.purple,7)+label(46,334,'SUBJECT + SCENE → COMPOSITE → FACE',15,C.purple);
    return s+caption(i,name,C.purple);
  });
}

export function labScene(key,x,y,w,h){return at({jarvis:voiceScene,lumina:documentScene,luminal:cameraScene}[key](),x,y,w,h);}

export function sectionScene(key,x,y,summary){
  if(key==='stack')return label(x,y,'PUBLIC REPO LANGUAGES',14,C.muted)+text(x,y+43,summary.languages.map(l=>l.name).slice(0,2).join(' / ')||'Unclassified',28,C.cyan,'font-weight="700"')+label(x,y+72,'FULL TOOLCHAIN BELOW ↓',13,C.muted);
  if(key==='roadmap')return label(x,y,'NEXT ENGINEERING WORK',14,C.muted)+label(x,y+35,'SETUP → RECOVERY → RELEASE',17,C.lime)+label(x,y+67,'GOALS / NOT COMPLETION METRICS',12,C.muted);
  const days=summary.recentDays.slice(-28),max=Math.max(1,...days.map(d=>d.contributionCount));
  let b=label(x,y,'ACTUAL CONTRIBUTION DAYS',14,C.muted);
  days.forEach((d,i)=>b+=`<rect x="${x+i*10}" y="${y+16}" width="7" height="${12+d.contributionCount/max*38}" rx="2" fill="${d.contributionCount?C.purple:'#233248'}"><title>${d.date}: ${d.contributionCount} contributions</title></rect>`);
  return b+label(x,y+78,'LAST 28 DAYS / UTC',12,C.muted);
}
