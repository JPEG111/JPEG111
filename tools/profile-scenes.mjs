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
  hero:['Source selected','Build executes','Route configured','Service available'],
  anydeploy:['Source selected','Build on device','Connection interrupted','Route recovered'],
  orbs:['Queue discovered','Client unavailable','Action awaiting verification','Confirmed; advance queue'],
  instavault:['Media imported','Text extracted','Semantic links indexed','Matching results retrieved'],
  jarvis:['Audio captured','Transcript ready','Tool selected','Sentence queued for speech'],
  lumina:['Typed document loaded','Block moved','Content reflows','Pages ready to print'],
  luminal:['Front camera','Three-quarter camera','Profile camera','Composite stage']
};

export const stateCss=Array.from({length:4},(_,i)=>{
  const a=i*25,b=(i+1)*25;
  return `.state-${i}{animation:s${i} 16s steps(1,end) infinite}@keyframes s${i}{${i?'0%,':''}${i?a-.01:0}%{opacity:${i?0:1}}${a}%{opacity:1}${b-.01}%{opacity:1}${b}%,100%{opacity:0}}`;
}).join('')+'.state{opacity:0}.state.final{opacity:1}@media(prefers-reduced-motion:reduce){.state{animation:none!important;opacity:0!important}.state.final{opacity:1!important}}';

export const sceneDefs=`<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#314d69"/><stop offset=".5" stop-color="#182b40"/><stop offset="1" stop-color="#0c1523"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#19394a" stop-opacity=".8"/><stop offset="1" stop-color="#0a1728" stop-opacity=".95"/></linearGradient><radialGradient id="board-glow"><stop stop-color="#54d9ff" stop-opacity=".13"/><stop offset="1" stop-color="#54d9ff" stop-opacity="0"/></radialGradient>`;

const frames=(key,fn)=>stateNames[key].map((name,i)=>`<g class="state state-${i}${i===3?' final':''}" data-state="${i}" aria-label="${esc(name)}">${fn(i,name)}</g>`).join('');
const caption=(i,name,c=C.cyan)=>label(18,405,`${String(i+1).padStart(2,'0')} / ${name.toUpperCase()}`,16,c);
const at=(body,x,y,w=600,h=430)=>`<g transform="translate(${x} ${y}) scale(${w/600} ${h/430})">${body}</g>`;
const check=(x,y,c=C.lime)=>line(`M${x} ${y}l6 6 12-15`,c);

// Orthographic projection and shaded faces, with real depth and surface details.
const P=(x,y,z)=>[300+(x-z)*.82,282+(x+z)*.38-y*.96];
function cuboid(x,y,z,w,h,d,top='url(#metal)',side='#142438',front='#0c1626',edge='#36516c'){
  const a=P(x,y+h,z),b=P(x+w,y+h,z),c=P(x+w,y+h,z+d),e=P(x,y+h,z+d);
  const f=P(x,y,z+d),g=P(x+w,y,z+d),j=P(x+w,y,z);
  return poly([e,c,g,f],front,edge)+poly([b,j,g,c],side,edge)+poly([a,b,c,e],top,edge);
}
const surface=(x,y,z,w,d,fill,stroke)=>poly([P(x,y,z),P(x+w,y,z),P(x+w,y,z+d),P(x,y,z+d)],fill,stroke);
function circuit(points,c='#2b5966') {return line(points.map((p,i)=>(i?'L':'M')+P(...p).join(' ')).join(' '),c);}

export function hardwareScene(x,y,w,h){
  let b='<ellipse cx="300" cy="303" rx="290" ry="150" fill="url(#board-glow)"/>';
  b+=cuboid(-170,-24,-140,340,22,280,'#122c34','#0a1b2b','#0a1420','#28485a');
  for(let i=0;i<9;i++){
    const xx=-145+i*34;
    b+=circuit([[xx,0,120],[xx,0,55],[-45+i*10,0,22]],i%2?'#315347':'#22546c');
    b+=circuit([[-145,0,-100+i*20],[-96,0,-100+i*20],[-48,0,-28+i*7]]);
  }
  // Memory banks, control chips, connectors and underside pins are separate solids.
  for(let i=0;i<4;i++){
    b+=cuboid(90+i*17,1,-80,11,30,115,'#345744','#162e2c','#132624','#477668');
    for(let j=0;j<5;j++)b+=cuboid(91+i*17,22,-70+j*21,8,10,13,'#456b65','#193b3d','#0b252c');
  }
  for(let i=0;i<5;i++)b+=cuboid(-145+i*29,2,88,20,15,22,'#39556a','#192f43','#0b2030');
  for(let i=0;i<6;i++)b+=cuboid(-148,1,-110+i*24,18,19,17,'#546478','#1a2a3c','#162236');
  b+=cuboid(-71,3,-58,126,19,118,'#243c50','#1b2c40','#0d1e30');
  b+=cuboid(-57,42,-44,98,17,90,'#436477','#203e54','#172c43');
  b+=surface(-45,60,-32,74,66,'#1d3e4c',C.cyan);
  // Exploded heat spreader and nine individually shaded cooling fins.
  for(let i=0;i<4;i++)b+=circuit([[-52+i*28,65,-39],[-52+i*28,97,-39]],'#38526a');
  b+=cuboid(-65,99,-51,114,10,103,'#3b5a70','#203649','#152b3d');
  for(let i=0;i<9;i++)b+=cuboid(-60+i*12,109,-45,5,27,92,'#718d9f','#2b465d','#1b3046','#4e7089');
  // Raised storage slab and I/O bridge.
  b+=cuboid(-115,2,-105,73,12,36,'#29465b','#1b3046','#0b1e30');
  b+=cuboid(45,0,86,113,22,34,'#374e65','#1b2d43','#132236');
  for(let i=0;i<5;i++)b+=surface(52+i*20,23,92,12,21,'#08111d','#5b7b88');
  b+=frames('hero',(i,name)=>{
    let s=rect(20,10,560,51,'#0b1624',i===3?C.lime:C.cyan,8)+label(37,42,name.toUpperCase(),20,i===3?C.lime:C.cyan);
    const area=[[-115,15,-105,73,36],[-45,61,-32,74,66],[45,24,86,113,34],[-45,61,-32,74,66]][i];
    s+=surface(...area,'#c5ff5c30',i===0?C.cyan:C.lime);
    if(i===1)s+=circuit([[-95,17,-90],[-35,61,-20],[10,61,16]],C.lime);
    if(i>=2)s+=circuit([[15,2,22],[55,2,65],[105,25,98]],i===3?C.lime:C.cyan);
    const labels=[['SOURCE','BUILD','ROUTE','RUN'],['READY','ACTIVE','WAIT','WAIT'],['READY','DONE','ACTIVE','WAIT'],['READY','DONE','READY','READY']][i];
    if(i===0){labels.splice(0,4,'ACTIVE','WAIT','WAIT','WAIT');}
    ['REPO','CPU','PORT','APP'].forEach((n,k)=>{s+=label(25+k*147,365,n,15,C.muted)+label(25+k*147,384,labels[k],14,labels[k]==='WAIT'?C.muted:C.lime);});
    return s;
  });
  return at(b,x,y,w,h);
}

function device(x,y,on){
  return poly([[x,y+30],[x+84,y],[x+139,y+32],[x+53,y+66]],'#29465c','#5b8095')+poly([[x+53,y+66],[x+139,y+32],[x+139,y+137],[x+53,y+176]],'#13283b','#3d6078')+poly([[x,y+30],[x+53,y+66],[x+53,y+176],[x,y+140]],'#0b1728','#35546e')+line(`M${x+66} ${y+87}l57-27m-57 48 57-27m-57 48 57-27`,'#3d6374')+circle(x+66,y+149,4,on?C.lime:C.muted);
}
function deployment(){
  let b=poly([[22,310],[300,190],[578,310],[300,403]],'#081421','#1b3044');
  b+=device(56,170,true)+device(266,228,true);
  b+=label(70,164,'SOURCE',15,C.cyan)+label(282,219,'YOUR DEVICE',15,C.lime);
  b+=frames('anydeploy',(i,name)=>{
    let s=rect(330,23,245,104,'url(#glass)',i===2?C.red:i===3?C.lime:C.line,10);
    s+=label(347,51,'PUBLIC ENDPOINT',14,C.muted)+text(347,87,['NOT BUILT','BUILDING','RECONNECTING','ROUTE READY'][i],21,i===2?C.red:i===3?C.lime:C.ink,'font-weight="750"');
    s+=line('M194 260L271 294',i===0?C.muted:C.lime);
    s+=line('M402 285L462 251V127',i===2?C.red:i===3?C.lime:C.line,i===2?'stroke-dasharray="6 9"':'');
    if(i===2)s+=line('M450 193l24 24m0-24-24 24',C.red);
    else if(i===3)s+=check(541,102);
    s+=rect(26,26,253,100,'#0c1928',C.line,8)+label(43,51,'DEPLOYMENT RECEIPT',14,C.cyan);
    const rows=[['repository selected','awaiting build'],['process created','proxy configured'],['process retained','route unavailable'],['same process retained','route restored']][i];
    rows.forEach((r,j)=>s+=label(43,80+j*25,r,16,j?C.muted:C.ink));
    return s+caption(i,name,i===2?C.red:C.lime);
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

function voiceScene(){
  return frames('jarvis',(i,name)=>{
    let s=rect(12,12,576,355,'#0b1725',C.line,16)+label(32,45,'EXAMPLE / VOICE → TOOL → SPEECH',16,C.cyan);
    const phases=['AUDIO BUFFER','TRANSCRIPT','TOOL ROUTE','SPEECH QUEUE'];
    phases.forEach((z,k)=>s+=rect(32+k*138,72,124,38,k===i?'#173b48':'#0d1b2b',k===i?C.cyan:C.line,6)+label(94+k*138,97,z,11,k===i?C.cyan:C.muted,'text-anchor="middle"'));
    if(i===0){
      for(let k=0;k<5;k++)s+=rect(40+k*105,148,87,64,'#14374a',C.cyan,6)+label(83+k*105,187,'CHUNK '+(k+1),12,C.cyan,'text-anchor="middle"');
      s+=label(40,258,'Captured speech waits for transcription.',17);
    }else if(i===1){s+=text(40,185,'“Open the project.”',32,C.ink,'font-weight="700"')+label(40,237,'WHISPER → TEXT',18,C.cyan);}
    else if(i===2){s+=label(40,167,'TOOL SELECTED',17,C.cyan)+text(40,215,'open_project()',30,C.lime,'class="mono"')+label(40,258,'Tool result becomes answer context.',17);}
    else {s+=rect(39,140,518,67,'#17352e',C.lime,8)+text(58,181,'“The project is open.”',29,C.lime)+label(40,254,'SENTENCE READY → TTS → PLAYBACK',17,C.cyan);}
    s+=label(32,339,'CHUNKS PRESERVE ORDER THROUGH THE PIPELINE',14,C.muted);
    return s+caption(i,name);
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
