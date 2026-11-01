import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const out=fileURLToPath(new URL('../assets/profile/',import.meta.url));
await mkdir(out,{recursive:true});
const colors={dark:{bg:'#0b1420',ink:'#ecf2ec',muted:'#a5b6bf',line:'#314652',accent:'#c9fc78',blue:'#83bdd1',panel:'#112330'},light:{bg:'#f3f5ef',ink:'#182e37',muted:'#51666f',line:'#b5c9c9',accent:'#426b19',blue:'#27677b',panel:'#e4ece8'}};
let c;
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const text=(x,y,s,size=24,key='ink',attrs='')=>`<text x="${x}" y="${y}" fill="${c[key]}" font-size="${size}" ${attrs}>${e(s)}</text>`;
const label=(x,y,s,size=17,key='muted',attrs='')=>text(x,y,s,size,key,`font-family="ui-monospace,Consolas,monospace" letter-spacing="1.5" ${attrs}`);
const path=(d,key='line',attrs='')=>`<path d="${d}" fill="none" stroke="${c[key]}" stroke-width="2" ${attrs}/>`;
const circle=(x,y,r,key='accent',attrs='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c[key]}" ${attrs}/>`;
const rect=(x,y,w,h,attrs='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c.panel}" stroke="${c.line}" ${attrs}/>`;
function svg(w,h,title,body){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d"><title id="t">${e(title)}</title><desc id="d">Original artwork for JPEG111's GitHub README. Moving signals are decorative.</desc><style>text{font-family:'Segoe UI',Arial,sans-serif}.signal{stroke-dasharray:4 15;animation:signal 16s linear infinite}.pulse{animation:pulse 5s ease-in-out infinite}@keyframes signal{to{stroke-dashoffset:-380}}@keyframes pulse{50%{opacity:.3}}@media(prefers-reduced-motion:reduce){.signal,.pulse{animation:none}}</style><rect width="${w}" height="${h}" fill="${c.bg}"/>${path(`M0 24 V0 H${w-24} L${w} 24 V${h} H24 L0 ${h-24} Z`)}${body}</svg>\n`;}
function intro(mobile){
 const w=mobile?720:1280,h=mobile?480:335;
 let b=label(42,43,'JPEG111 / INDEPENDENT SOFTWARE BUILDER',mobile?20:17,'accent')+label(w-42,43,'001',17,'muted','text-anchor="end"');
 b+=text(40,mobile?127:138,'Self-hosted tools.',mobile?51:72,'ink','font-weight="650" letter-spacing="-2"');
 b+=text(40,mobile?193:222,'Desktop software.',mobile?48:69,'accent','font-weight="600" letter-spacing="-2"');
 const ox=mobile?398:1090,oy=mobile?308:164;
 b+=path(`M${ox-113} ${oy+62} H${ox-65} V${oy-66} H${ox+74} V${oy+62} H${ox-20} V${oy-14} H${ox+22}`,'line');
 b+=path(`M${ox-113} ${oy+62} H${ox-65} V${oy-66} H${ox+74} V${oy+62} H${ox-20} V${oy-14} H${ox+22}`,'accent','class="signal"');
 b+=circle(ox-113,oy+62,5)+circle(ox+22,oy-14,5,'blue')+label(ox-48,oy-77,'BUILD',mobile?20:17,'muted')+label(ox+95,oy+64,'RUN',mobile?20:17,'muted');
 b+=path(`M42 ${h-61} H${w-42}`)+label(42,h-25,'SELF-HOSTING / DESKTOP / AUTOMATION',mobile?17:16)+label(w-42,h-25,'↳ RUN',mobile?18:16,'accent','text-anchor="end"');
 return svg(w,h,'JPEG111. Self-hosted tools. Desktop software.',b);
}
const projects={anydeploy:{n:'01',name:'anyDeploy',tag:'YOUR HARDWARE. YOUR DEPLOYMENT.',sub:'Deploy to hardware you own',nodes:['REPO','DEPLOY','HARDWARE']},orbs:{n:'02',name:'Orbs',tag:'MAKE THE WHOLE LIFECYCLE WORK.',sub:'Discord Quests desktop tool',nodes:['OBSERVE','QUEUE','RECOVER']}};
function project(key,mobile){
 const p=projects[key],w=mobile?720:1280,h=mobile?370:258;
 let b=label(34,39,mobile?`${p.n} / SOFTWARE I BUILD`:`${p.n} / ${p.tag}`,mobile?23:16,'accent')+text(34,106,p.name,mobile?53:57,'ink','font-weight="650" letter-spacing="-1.5"')+text(36,149,p.sub,mobile?28:24,'muted');
 const y=mobile?235:128,x=mobile?104:793,gap=mobile?253:177;
 b+=path(`M${x} ${y} H${x+gap*2}`,'line')+path(`M${x} ${y} H${x+gap*2}`,'accent','class="signal"');
 p.nodes.forEach((s,i)=>{let cx=x+i*gap;b+=rect(cx-(mobile?68:51),y-27,mobile?136:102,54)+label(cx,y+7,s,mobile?21:(s==='HARDWARE'?13:14),i===2?'accent':'ink','text-anchor="middle"');});
 b+=path(`M${x+gap*2} ${y+39} V${y+61} H${x} V${y+39}`)+circle(x+gap,y+61,3,'blue','class="pulse"');
 b+=label(34,h-27,mobile?'PUBLIC RELEASES':'DESKTOP SOFTWARE / PUBLIC RELEASES',mobile?23:15)+label(w-34,h-27,'OPEN PROJECT ↗',mobile?23:15,'accent','text-anchor="end"');
 return svg(w,h,`${p.name} — ${p.sub}`,b);
}
for(const [theme,values] of Object.entries(colors)){
 c=values;
 for(const mobile of [false,true]){
  await writeFile(`${out}/intro${mobile?'-mobile':''}-${theme}.svg`,intro(mobile));
  for(const key of Object.keys(projects))await writeFile(`${out}/${key}${mobile?'-mobile':''}-${theme}.svg`,project(key,mobile));
 }
}
console.log('Rendered 12 original profile assets.');
