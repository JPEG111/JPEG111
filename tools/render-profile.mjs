import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('../assets/profile/',import.meta.url));
await mkdir(out,{recursive:true});
const C={bg:'#05070d',panel:'#0b111d',border:'#243143',muted:'#9baac1',ink:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff',purple:'#9780ff'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const tx=(x,y,s,n=28,color=C.ink,extra='')=>'<text x="'+x+'" y="'+y+'" font-size="'+n+'" fill="'+color+'" '+extra+'>'+esc(s)+'</text>';
const mono=(x,y,s,n=19,color=C.muted,extra='')=>{const cls=extra.match(/class="([^"]*)"/);return tx(x,y,s,n,color,'class="mono'+(cls?' '+cls[1]:'')+'" letter-spacing="1.4" '+extra.replace(/class="[^"]*"/,''));};
const box=(x,y,w,h,fill=C.panel,stroke=C.border,rx=18)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'"/>';
const ln=(d,color=C.border,extra='')=>'<path d="'+d+'" fill="none" stroke="'+color+'" '+(extra.includes('stroke-width=')?'':'stroke-width="2" ')+extra+'/>';
const dot=(x,y,r,color=C.lime,extra='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+color+'" '+extra+'/>';
const pill=(x,y,w,s,color=C.lime)=>box(x,y,w,42,'#101823',color,21)+mono(x+w/2,y+28,s,17,color,'text-anchor="middle"');
function wrap(w,h,title,body){
return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-labelledby="title desc"><title id="title">'+esc(title)+'</title><desc id="desc">Original dark artwork for Skandar / JPEG111. Workflow illustrations, not a live application or telemetry.</desc><defs><linearGradient id="border"><stop stop-color="#53617d"/><stop offset=".5" stop-color="#152239"/><stop offset="1" stop-color="#54d9ff" stop-opacity=".55"/></linearGradient><radialGradient id="halo"><stop stop-color="#54d9ff" stop-opacity=".18"/><stop offset="1" stop-color="#54d9ff" stop-opacity="0"/></radialGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#273950" stroke-opacity=".28"/></pattern><clipPath id="clip"><rect x="2" y="2" width="'+(w-4)+'" height="'+(h-4)+'" rx="28"/></clipPath></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}.orbit{transform-box:fill-box;transform-origin:center;animation:orbit 36s linear infinite}.reverse{animation-direction:reverse;animation-duration:54s}.signal{stroke-dasharray:8 22;animation:signal 7s linear infinite}.pulse{animation:pulse 3.6s ease-in-out infinite}.delay{animation-delay:1.2s}.scan{animation:scan 7s ease-in-out infinite}.line1{animation:lines 9s ease-in-out infinite}.line2{animation:lines 9s 1s ease-in-out infinite}.line3{animation:lines 9s 2s ease-in-out infinite}.float{animation:float 7s ease-in-out infinite}@keyframes orbit{to{transform:rotate(360deg)}}@keyframes signal{to{stroke-dashoffset:-360}}@keyframes pulse{50%{opacity:.28}}@keyframes scan{0%,100%{transform:translateX(-55px);opacity:.2}50%{transform:translateX(55px);opacity:.8}}@keyframes lines{0%,100%{opacity:.3}25%,75%{opacity:1}}@keyframes float{50%{transform:translateY(-10px)}}@media(prefers-reduced-motion:reduce){.orbit,.signal,.pulse,.scan,.line1,.line2,.line3,.float{animation:none!important}}</style><g clip-path="url(#clip)"><rect width="'+w+'" height="'+h+'" fill="'+C.bg+'"/><rect width="'+w+'" height="'+h+'" fill="url(#grid)"/>'+body+'</g><rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="28" fill="none" stroke="url(#border)" stroke-width="2"/></svg>\n';
}
function head(w,num,tag){return mono(42,51,num+' / '+tag,19,C.cyan)+mono(w-42,51,'JPEG111',19,C.muted,'text-anchor="end"')+ln('M42 78H'+(w-42));}
function orbit(cx,cy,r){
let b='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+70)+'" fill="url(#halo)"/>';
b+='<g class="orbit"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+C.cyan+'" stroke-opacity=".55" stroke-dasharray="2 15"/>'+dot(cx,cy-r,6,C.cyan)+'</g>';
b+='<g class="orbit reverse"><ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(r-36)+'" ry="'+(r-36)+'" fill="none" stroke="'+C.lime+'" stroke-opacity=".35" stroke-dasharray="55 25 3 25"/>'+dot(cx+r-36,cy,5)+'</g>';
b+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-75)+'" fill="#0c1624" stroke="'+C.border+'"/>'+tx(cx,cy-2,'BUILD',31,C.ink,'text-anchor="middle" font-weight="750"')+mono(cx,cy+34,'→ RUN',21,C.lime,'text-anchor="middle"');
for(const [dx,dy,s] of [[0,-r,'REPO'],[r,0,'DEVICE'],[0,r,'RUNTIME'],[-r,0,'ROUTE']])b+=box(cx+dx-57,cy+dy-20,114,40,'#0b1220',C.border,8)+mono(cx+dx,cy+dy+7,s,16,C.cyan,'text-anchor="middle"');
return b;
}
function hero(m){
const w=m?720:1440,h=m?990:820;
let b=head(w,'00','SKANDAR / SOFTWARE SYSTEMS');
b+=tx(42,m?188:248,'FOLLOW THE',m?73:118,C.ink,'font-weight="850" letter-spacing="-3"');
b+=tx(42,m?285:400,'CONNECTIONS.',m?66:105,C.lime,'font-weight="850" letter-spacing="-3"');
b+=tx(46,m?363:476,'Infrastructure. Local AI. Visual tools.',m?28:34,C.muted);
b+=tx(46,m?410:526,'Built across the whole system.',m?29:34,C.muted);
b+=orbit(m?360:1125,m?662:350,m?175:190);
const py=m?890:653;
if(m){b+=pill(42,py,285,'3 RELEASED APPS')+pill(347,py,330,'MORE IN THE LAB',C.cyan);}
else b+=pill(46,py,302,'3 RELEASED APPS')+pill(370,py,300,'VOICE + VISION',C.cyan)+pill(692,py,260,'VISUAL SYSTEMS',C.purple);
b+=ln('M42 '+(h-54)+'H'+(w-42))+mono(42,h-24,'WINDOWS / LINUX / YOUR HARDWARE',m?17:19)+mono(w-42,h-24,'EXPLORE ↓',m?17:19,C.lime,'text-anchor="end"');
return wrap(w,h,'Skandar / JPEG111. Infrastructure, local AI and visual software.',b);
}
const projects={
anydeploy:{n:'01',name:'anyDeploy',subtitle:'A deployment control plane for your own hardware.',mobileSub:['A deployment control plane','for your own hardware.'],color:C.lime,rows:[['PROVISION','nginx / PM2 / SSL'],['EXPOSE','Cloudflare Tunnel / DNS'],['RECOVER','Resume after Wi-Fi drops']],stages:['GITHUB REPO','DETECT / BUILD','PROCESS / PROXY','PUBLIC URL'],footer:['ANDROID / TERMUX','RASPBERRY PI','LINUX','WINDOWS / WSL2'],cmd:['repository → build → process','nginx + PM2 + TLS + tunnel','deploy / inspect / update']},
orbs:{n:'02',name:'Orbs',subtitle:'Desktop automation built around changing state.',mobileSub:['Desktop automation built','around changing state.'],color:C.cyan,rows:[['OBSERVE','Client state / quest queue'],['RECOVER','Bounded retries / deadlines'],['PRESERVE','Queues / preferences / updates']],stages:['OBSERVE CLIENT','WAIT / RECOVER','ACT / VERIFY','MANAGE QUEUE'],footer:['WINDOWS 10 / 11','EN / AR','SYSTEM TRAY','AUTO-UPDATES'],cmd:['observe → decide → act → check','keep deadlines across retries','avoid replaying uncertain actions']},
instavault:{n:'03',name:'InstaVault',subtitle:'A searchable local library from scattered media.',mobileSub:['A searchable local library','from scattered media.'],color:C.purple,rows:[['INGEST','Saved posts / shared media'],['ENRICH','Local AI / OCR / embeddings'],['EXPLORE','Graph / fuzzy + semantic search']],stages:['IMPORT MEDIA','EXTRACT / ENRICH','LINK / INDEX','SEARCH / EXPLORE'],footer:['ELECTRON / REACT','FASTAPI','LOCAL OLLAMA','OPTIONAL PACKS'],cmd:['media → text → embeddings','AI enrichment stays optional','transcription in its own process']}
};
function project(key,m){
const p=projects[key],w=m?720:1440,h=m?1180:820;
let b=head(w,p.n,'RELEASED SOFTWARE');
b+=tx(42,m?180:222,p.name,m?(key==='instavault'?93:104):136,p.color,'font-weight="800" letter-spacing="-4"');
if(m)p.mobileSub.forEach((s,i)=>b+=tx(46,240+i*44,s,31,C.muted));else b+=tx(46,311,p.subtitle,34,C.muted);
p.rows.forEach(([a,z],i)=>{const y=(m?344:365)+i*(m?78:65);b+=mono(48,y,a,m?19:19,p.color)+tx(m?48:208,m?y+36:y,z,m?28:28);});
if(!m){b+=box(46,565,680,137,'#090e17',C.border,14)+mono(67,597,'ILLUSTRATED WORKFLOW',14,C.muted);p.cmd.forEach((s,i)=>b+=mono(70,632+i*26,s,20,i===0?p.color:C.muted,'class="line'+(i+1)+'"'));}
const sx=m?150:865,sw=m?420:475,sy=m?610:332,step=m?89:88;
p.stages.forEach((s,i)=>{const y=sy+i*step;b+=box(sx,y,sw,62,'#101a29',i===3?p.color:C.border,12)+dot(sx+24,y+31,4,p.color,'class="pulse '+(i%2?'delay':'')+'"')+mono(sx+48,y+39,s,m?23:22,i===3?p.color:C.ink);if(i<3)b+=ln('M'+(sx+sw/2)+' '+(y+62)+'V'+(y+step),p.color,'class="signal"');});
const foot=m?1001:740;
p.footer.forEach((s,i)=>{const x=m?42+(i%2)*330:46+i*340;const y=m?foot+Math.floor(i/2)*56:foot;b+=pill(x,y,m?305:320,s,i%2?C.muted:p.color);});
b+=mono(w-42,m?1150:798,'OPEN PROJECT / RELEASES ↗',17,p.color,'text-anchor="end"');
return wrap(w,h,p.name+'. '+p.subtitle,b);
}
function engineering(m){
const w=m?720:1440,h=m?1150:620;
let b=head(w,'03','ENGINEERING NOTES');
b+=tx(42,m?162:164,'THE FAILURE PATH',m?59:80,C.ink,'font-weight="800" letter-spacing="-2"');
b+=tx(42,m?233:275,'IS PART OF THE PRODUCT.',m?44:70,C.lime,'font-weight="800" letter-spacing="-2"');
const data=[['01','NETWORK DROPS',['Reconnect and resume builds.','anyDeploy / v1.0.92'],C.lime],['02','INTERFACES MOVE',['Bound retries. Keep deadlines.','Orbs / v1.21.14'],C.cyan],['03','RELEASES CHANGE',['Retain queues and preferences.','Windows / Linux distribution'],C.purple]];
data.forEach(([n,s,lines,color],i)=>{const x=m?42:42+i*460,y=m?290+i*270:320,cw=m?636:434;b+=box(x,y,cw,m?240:248,'#0b121f',C.border,18)+mono(x+24,y+36,n+' / RECOVERY',17,color)+tx(x+24,y+93,s,m?32:29,C.ink,'font-weight="750"');lines.forEach((line,j)=>b+=tx(x+24,y+140+j*35,line,m?28:22,j===0?C.ink:C.muted));b+=ln('M'+(x+24)+' '+(y+211)+'H'+(x+cw-24),color,'class="signal"');});
return wrap(w,h,'Engineering focus: reconnect interrupted deployments, recover from UI changes, and preserve state through updates.',b);
}
function section(key,m){
const config={stack:['07','THE TOOLCHAIN','CODE / INFRA / CREATIVE',C.cyan],roadmap:['08','NEXT TO SHIP','SETUP / RECOVERY / RELEASES',C.lime],arcade:['09','AFTER THE BUILD','GITHUB ACTIVITY / PAC-MAN',C.purple]}[key];
const [n,title,sub,color]=config,w=m?720:1440,h=m?252:240;
let b=mono(42,48,n+' / JPEG111',19,color)+tx(42,m?129:145,title,m?59:76,C.ink,'font-weight="800" letter-spacing="-2"')+mono(46,m?195:196,sub,m?22:24,color);
b+=ln('M'+(m?570:1130)+' 40V'+(h-34)+'M'+(m?610:1210)+' 40V'+(h-34),C.border);
b+='<g class="scan">'+ln('M'+(m?565:1130)+' 55V'+(h-50),color,'stroke-width="4"')+'</g>';
return wrap(w,h,title+'. '+sub,b);
}
const labProjects={
jarvis:{name:'JARVIS',n:'04',color:C.cyan,sub:['A voice assistant with tools,','vision and a shared GPU budget.'],rows:[['LISTEN','Wake word / VAD / Whisper'],['ROUTE','LangGraph / local + cloud models'],['SPEAK','Sentence chunks / TTS / playback']]},
lumina:{name:'Lumina',n:'05',color:C.lime,sub:['Structured text becomes an','editable, printable document.'],rows:[['MODEL','One typed ResumeData object'],['EDIT','Template-scoped layout overrides'],['PRINT','A4 pagination / browser print']]},
luminal:{name:'Luminal',n:'06',color:C.purple,sub:['Camera controls meet','multi-step image generation.'],rows:[['POSE','Named camera angles / orbit UI'],['ROUTE','Single-shot or six-stage pipeline'],['CACHE','Reuse source and subject analysis']]}
};
function lab(key,m){
const p=labProjects[key],w=m?720:1440,h=m?1100:760;
let b=head(w,p.n,'LOCAL BUILD / LAB');
b+=tx(42,m?180:222,p.name,m?104:136,p.color,'font-weight="800" letter-spacing="-4"');
p.sub.forEach((s,i)=>b+=tx(46,(m?248:300)+i*45,s,m?31:34,C.muted));
p.rows.forEach(([a,z],i)=>{let y=(m?401:433)+i*79;b+=mono(48,y,a,19,p.color)+tx(48,y+36,z,m?27:29);});
let x=m?42:850,y=m?682:179,dw=m?636:540,dh=m?340:430;
b+=box(x,y,dw,dh,'#09111e',C.border,20);
if(key==='jarvis'){
 let wave='';for(let i=0;i<36;i++){let hh=12+Math.abs(Math.sin(i*.81)*Math.cos(i*.22))*95;wave+=ln('M'+(x+35+i*(dw-70)/35)+' '+(y+98-hh/2)+'v'+hh,p.color,'class="pulse" style="animation-delay:'+(-i*.14)+'s"');}b+=wave;
 b+=mono(x+30,y+200,'AUDIO → TEXT → TOOL LOOP',m?23:22,p.color);
 b+=mono(x+30,y+243,'TOKENS → TTS → PLAYBACK',m?23:22,C.ink);
 b+=ln('M'+(x+30)+' '+(y+280)+'H'+(x+dw-30),p.color,'class="signal"');
 if(!m)b+=mono(x+30,y+365,'WHISPER / OLLAMA / CHATTERBOX',18,C.muted);
}else if(key==='lumina'){
 let px=x+dw/2-99,py=y+25;b+=box(px,py,198,m?275:360,'#152235',C.muted,5);
 b+=box(px+21,py+29,156,53,'#263e43',p.color,2)+tx(px+32,py+62,'A4 / LAYOUT',17,p.color,'class="mono"');
 for(let i=0;i<5;i++)b+=ln('M'+(px+23)+' '+(py+111+i*28)+'h'+(i%2?110:150),'#6e819d');
 b+='<g class="float">'+box(px-35,py+125,264,73,'#152b28',p.color,0)+dot(px-35,py+125,5,p.color)+dot(px+229,py+198,5,p.color)+'</g>';
 b+=mono(x+20,y+dh-17,'DATA / TEMPLATE / POINTER / PRINT',m?19:18,p.color);
}else{
 let cx=x+dw/2,cy=y+(m?148:190),r=m?110:140;
 b+='<g class="orbit"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+p.color+'" stroke-dasharray="3 14"/>';
 for(let i=0;i<12;i++){const a=i*Math.PI/6;b+=dot(cx+Math.cos(a)*r,cy+Math.sin(a)*r,i===3?8:4,i===3?C.lime:p.color);}b+='</g>';
 b+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+r+'" ry="'+r*.42+'" fill="none" stroke="'+C.border+'"/>'+ln('M'+cx+' '+(cy-r)+'V'+(cy+r),C.border)+tx(cx,cy+9,'CAMERA',26,C.ink,'text-anchor="middle" class="mono"');
 b+=mono(x+24,y+dh-40,'SOURCE → SUBJECT → SCENE',m?22:21,p.color);
}
b+=ln('M42 '+(h-42)+'H'+(w-42))+mono(42,h-15,'ARCHITECTURE STUDY / IMPLEMENTED SOURCE',m?17:18,C.muted);
return wrap(w,h,p.name+'. '+p.sub.join(' '),b);
}
for(const m of [false,true]){
const suffix=m?'-mobile':'';
await writeFile(out+'system-hero'+suffix+'.svg',hero(m));
for(const key of Object.keys(projects))await writeFile(out+'system-'+key+suffix+'.svg',project(key,m));
await writeFile(out+'system-engineering'+suffix+'.svg',engineering(m));
for(const key of ['stack','roadmap','arcade'])await writeFile(out+'system-'+key+suffix+'.svg',section(key,m));
for(const key of Object.keys(labProjects))await writeFile(out+'system-'+key+suffix+'.svg',lab(key,m));
}
console.log('Rendered 22 dark system panels.');
