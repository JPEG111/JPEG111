import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {stateCss,sceneDefs,hardwareScene,projectScene,labScene,sectionScene} from './profile-scenes.mjs';
const C={bg:'#05070d',panel:'#0b111d',border:'#243143',muted:'#9baac1',ink:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff',purple:'#9780ff'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const tx=(x,y,s,n=28,color=C.ink,extra='')=>'<text x="'+x+'" y="'+y+'" font-size="'+n+'" fill="'+color+'" '+extra+'>'+esc(s)+'</text>';
const mono=(x,y,s,n=19,color=C.muted,extra='')=>{const cls=extra.match(/class="([^"]*)"/);return tx(x,y,s,n,color,'class="mono'+(cls?' '+cls[1]:'')+'" letter-spacing="1.4" '+extra.replace(/class="[^"]*"/,''));};
const box=(x,y,w,h,fill=C.panel,stroke=C.border,rx=18)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'"/>';
const ln=(d,color=C.border,extra='')=>'<path d="'+d+'" fill="none" stroke="'+color+'" '+(extra.includes('stroke-width=')?'':'stroke-width="2" ')+extra+'/>';
const pill=(x,y,w,s,color=C.lime)=>box(x,y,w,42,'#101823',color,21)+mono(x+w/2,y+28,s,17,color,'text-anchor="middle"');
function wrap(w,h,title,body){
return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-labelledby="title desc"><title id="title">'+esc(title)+'</title><desc id="desc">Release and activity values are dated public GitHub snapshots. Animated project scenes are labelled example walkthroughs with coordinated input, processing and output states; they are not live application telemetry.</desc><defs><linearGradient id="border"><stop stop-color="#53617d"/><stop offset=".5" stop-color="#152239"/><stop offset="1" stop-color="#54d9ff" stop-opacity=".55"/></linearGradient><radialGradient id="halo"><stop stop-color="#54d9ff" stop-opacity=".18"/><stop offset="1" stop-color="#54d9ff" stop-opacity="0"/></radialGradient>'+sceneDefs+'<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#273950" stroke-opacity=".28"/></pattern><clipPath id="clip"><rect x="2" y="2" width="'+(w-4)+'" height="'+(h-4)+'" rx="28"/></clipPath></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}'+stateCss+'</style><g clip-path="url(#clip)"><rect width="'+w+'" height="'+h+'" fill="'+C.bg+'"/><rect width="'+w+'" height="'+h+'" fill="url(#grid)"/>'+body+'</g><rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="28" fill="none" stroke="url(#border)" stroke-width="2"/></svg>\n';
}
function head(w,num,tag){return mono(42,51,num+' / '+tag,19,C.cyan)+mono(w-42,51,'JPEG111',19,C.muted,'text-anchor="end"')+ln('M42 78H'+(w-42));}
function hero(m,summary){
const w=m?720:1440,h=m?1110:820;
let b=head(w,'00','SKANDAR / SOFTWARE SYSTEMS');
b+=tx(42,m?188:248,'FOLLOW THE',m?73:118,C.ink,'font-weight="850" letter-spacing="-3"');
b+=tx(42,m?285:400,'CONNECTIONS.',m?66:105,C.lime,'font-weight="850" letter-spacing="-3"');
b+=tx(46,m?363:476,'Infrastructure. Local AI. Visual tools.',m?28:34,C.muted);
b+=tx(46,m?410:526,'Built across the whole system.',m?29:34,C.muted);
b+=hardwareScene(m?42:830,m?470:150,m?636:555,m?430:440);
b+=mono(m?42:845,m?925:625,'EXAMPLE / SOURCE → BUILD → ROUTE → RUN',m?15:16,C.cyan);
const py=m?990:653;
if(m){b+=pill(42,py,285,summary.releases.length+' PUBLIC RELEASES')+pill(347,py,330,'MORE IN THE LAB',C.cyan);}
else b+=pill(46,py,302,summary.releases.length+' PUBLIC RELEASES')+pill(370,py,300,'VOICE + VISION',C.cyan)+pill(692,py,260,'VISUAL SYSTEMS',C.purple);
b+=ln('M42 '+(h-54)+'H'+(w-42))+mono(42,h-24,'WINDOWS / LINUX / YOUR HARDWARE',m?17:19)+mono(w-42,h-24,'EXPLORE ↓',m?17:19,C.lime,'text-anchor="end"');
return wrap(w,h,'Skandar / JPEG111. Infrastructure, local AI and visual software.',b);
}
const projects={
anydeploy:{n:'01',name:'anyDeploy',subtitle:'A deployment control plane for your own hardware.',mobileSub:['A deployment control plane','for your own hardware.'],color:C.lime,rows:[['PROVISION','nginx / PM2 / SSL'],['EXPOSE','Cloudflare Tunnel / DNS'],['RECOVER','Resume after Wi-Fi drops']],footer:['ANDROID / TERMUX','RASPBERRY PI','LINUX','WINDOWS / WSL2']},
orbs:{n:'02',name:'Orbs',subtitle:'Desktop automation built around changing state.',mobileSub:['Desktop automation built','around changing state.'],color:C.cyan,rows:[['OBSERVE','Client state / quest queue'],['RECOVER','Bounded retries / deadlines'],['PRESERVE','Queues / preferences / updates']],footer:['WINDOWS 10 / 11','EN / AR','SYSTEM TRAY','AUTO-UPDATES']},
instavault:{n:'03',name:'InstaVault',subtitle:'A searchable local library from scattered media.',mobileSub:['A searchable local library','from scattered media.'],color:C.purple,rows:[['INGEST','Saved posts / shared media'],['ENRICH','Local AI / OCR / embeddings'],['EXPLORE','Graph / fuzzy + semantic search']],footer:['ELECTRON / REACT','FASTAPI','LOCAL OLLAMA','OPTIONAL PACKS']}
};
function project(key,m,summary){
const p=projects[key],w=m?720:1440,h=m?1180:820;
let b=head(w,p.n,key==='instavault'?'LOCAL BUILD / CASE STUDY':'PUBLIC RELEASE');
b+=tx(42,m?180:222,p.name,m?(key==='instavault'?93:104):136,p.color,'font-weight="800" letter-spacing="-4"');
if(m)p.mobileSub.forEach((s,i)=>b+=tx(46,240+i*44,s,31,C.muted));else b+=tx(46,311,p.subtitle,34,C.muted);
p.rows.forEach(([a,z],i)=>{const y=(m?344:365)+i*(m?78:65);b+=mono(48,y,a,m?19:19,p.color)+tx(m?48:208,m?y+36:y,z,m?28:28);});
const release=summary.releases.find(r=>r.key===key);if(!release&&key!=='instavault')throw new Error('Missing project release');
if(m)b+=mono(48,585,release?release.tag+' / '+release.files+' RELEASE FILES':'LOCAL BUILD / IMPLEMENTATION NOTES',19,p.color);
if(!m){b+=box(46,565,680,137,'#090e17',C.border,14)+mono(67,597,release?'PUBLIC RELEASE / '+summary.date:'LOCAL BUILD / CASE STUDY',16,C.muted)+tx(67,643,release?release.tag:'Media → searchable library',release?Math.min(38,600/(release.tag.length*.65)):30,p.color,'font-weight="750"')+mono(67,678,release?release.files+' RELEASE FILES / '+release.published:'IMPLEMENTATION NOTES BELOW',18,C.muted);}
b+=projectScene(key,m?42:820,m?610:200,m?636:580,m?355:450);
b+=mono(m?42:842,m?981:677,{anydeploy:'EXAMPLE / RECONNECT AND RESUME',orbs:'EXAMPLE / VERIFY BEFORE ADVANCING',instavault:'EXAMPLE / MEDIA TO SEARCH'}[key],m?16:17,p.color);
const foot=m?1001:740;
p.footer.forEach((s,i)=>{const x=m?42+(i%2)*330:46+i*340;const y=m?foot+Math.floor(i/2)*56:foot;b+=pill(x,y,m?305:320,s,i%2?C.muted:p.color);});
b+=mono(w-42,m?1150:798,key==='instavault'?'READ IMPLEMENTATION NOTES ↓':'OPEN PROJECT / RELEASES ↗',17,p.color,'text-anchor="end"');
return wrap(w,h,p.name+'. '+p.subtitle,b);
}
function engineering(m,summary){
const w=m?720:1440,h=m?1150:620;
let b=head(w,'03','ENGINEERING NOTES');
b+=tx(42,m?162:164,'THE FAILURE PATH',m?59:80,C.ink,'font-weight="800" letter-spacing="-2"');
b+=tx(42,m?233:275,'IS PART OF THE PRODUCT.',m?44:70,C.lime,'font-weight="800" letter-spacing="-2"');
const data=[['01','NETWORK DROPS',['Reconnect and resume builds.','anyDeploy / '+summary.releases.find(r=>r.key==='anydeploy').tag],C.lime],['02','INTERFACES MOVE',['Bound retries. Keep deadlines.','Orbs / '+summary.releases.find(r=>r.key==='orbs').tag],C.cyan],['03','RELEASES CHANGE',['Retain queues and preferences.','Windows / Linux distribution'],C.purple]];
data.forEach(([n,s,lines,color],i)=>{const x=m?42:42+i*460,y=m?290+i*270:320,cw=m?636:434;b+=box(x,y,cw,m?240:248,'#0b121f',C.border,18)+mono(x+24,y+36,n+' / RECOVERY',17,color)+tx(x+24,y+93,s,m?32:29,C.ink,'font-weight="750"');lines.forEach((line,j)=>b+=tx(x+24,y+140+j*35,line,m?28:22,j===0?C.ink:C.muted));b+=ln('M'+(x+24)+' '+(y+211)+'H'+(x+cw-24),color,'');});
return wrap(w,h,'Engineering focus: reconnect interrupted deployments, recover from UI changes, and preserve state through updates.',b);
}
function section(key,m,summary){
const config={stack:['07','THE TOOLCHAIN','CODE / INFRA / CREATIVE',C.cyan],roadmap:['08','NEXT TO SHIP','SETUP / RECOVERY / RELEASES',C.lime],arcade:['09','AFTER THE BUILD','GITHUB ACTIVITY / PAC-MAN',C.purple]}[key];
const [n,title,sub,color]=config,w=m?720:1440,h=m?252:240;
let b=mono(42,48,n+' / JPEG111',19,color)+tx(42,m?129:145,title,m?59:76,C.ink,'font-weight="800" letter-spacing="-2"')+mono(46,m?195:196,sub,m?22:24,color);
if(!m)b+=sectionScene(key,1055,68,summary);
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
b+=labScene(key,x,y,dw,dh);
b+=mono(x+20,y+dh+30,'EXAMPLE / INPUT TO OUTPUT',m?16:17,p.color);
b+=ln('M42 '+(h-42)+'H'+(w-42))+mono(42,h-15,'ARCHITECTURE STUDY / IMPLEMENTED SOURCE',m?17:18,C.muted);
return wrap(w,h,p.name+'. '+p.sub.join(' '),b);
}
export function renderProfile(summary){
if(!Array.isArray(summary?.releases)||summary.releases.length!==2||!['anydeploy','orbs'].every(key=>summary.releases.some(r=>r.key===key&&typeof r.tag==='string'&&r.tag.length>0&&r.tag.length<=30&&Number.isSafeInteger(r.files)&&r.files>0&&/^\d{4}-\d{2}-\d{2}$/.test(r.published)))||!Array.isArray(summary.recentDays)||!Array.isArray(summary.languages))throw new Error('Missing profile snapshot');
const files={};
for(const m of [false,true]){
const suffix=m?'-mobile':'';
files['system-hero'+suffix+'.svg']=hero(m,summary);
for(const key of Object.keys(projects))files['system-'+key+suffix+'.svg']=project(key,m,summary);
files['system-engineering'+suffix+'.svg']=engineering(m,summary);
for(const key of ['stack','roadmap','arcade'])files['system-'+key+suffix+'.svg']=section(key,m,summary);
for(const key of Object.keys(labProjects))files['system-'+key+suffix+'.svg']=lab(key,m);
}
return files;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
const input=process.argv.indexOf('--input');
const snapshot=JSON.parse(await readFile(input===-1?new URL('../.local/generated-activity/summary.json',import.meta.url):process.argv[input+1],'utf8'));
const oi=process.argv.indexOf('--out');const out=oi===-1?fileURLToPath(new URL('../assets/profile/',import.meta.url)):process.argv[oi+1];
await mkdir(out,{recursive:true});
for(const [name,content] of Object.entries(renderProfile(snapshot)))await writeFile(resolve(out,name),content);
console.log('Rendered 22 profile panels with release snapshots and example state sequences.');
}
