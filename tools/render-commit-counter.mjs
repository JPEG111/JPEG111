const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const C={bg:'#05070d',ink:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff',line:'#233448',muted:'#96a8be'};
const tx=(x,y,s,n=22,fill=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const mono=(x,y,s,n=20,fill=C.muted,extra='')=>tx(x,y,s,n,fill,`class="mono" letter-spacing="1.5" ${extra}`);

export function renderCommitCounter(count,date,mobile=false) {
  if(!Number.isSafeInteger(count)||count<0)throw new Error('Invalid commit count');
  const raw=String(count),digits=raw.padStart(6,'0'),len=digits.length;
  const w=mobile?720:1440,h=mobile?650:690,pad=mobile?32:48;
  const gap=mobile?12:14,tw=(w-pad*2-gap*(len-1))/len;
  const y=mobile?180:210,th=mobile?190:280;
  const numberSize=Math.min(mobile?132:200,tw*1.08);
  let b=mono(pad,43,'JPEG111 / COMMIT ARCHIVE',mobile?17:22,C.cyan);
  if(!mobile)b+=mono(w-pad,43,date+' / UTC',19,C.muted,'text-anchor="end"');
  b+=tx(pad,mobile?133:151,'TOTAL COMMITS',mobile?63:92,C.ink,'font-weight="850" letter-spacing="-2.8"');
  if(!mobile)b+=mono(w-pad,145,'PUBLIC / ALL YEARS',23,C.lime,'text-anchor="end"');
  for(let i=0;i<len;i++){
    const x=pad+i*(tw+gap),leading=i<len-raw.length;
    b+=`<rect x="${x}" y="${y+7}" width="${tw}" height="${th}" rx="12" fill="#02040a"/>`;
    b+=`<rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="12" fill="url(#tile)" stroke="${leading?'#1b293a':'#3b553a'}"/>`;
    b+=`<path d="M${x+13} ${y+1}h${tw-26}" stroke="${leading?'#3b4b60':C.lime}" stroke-opacity=".7"/>`;
    b+=`<g class="digit" style="animation-delay:${i*.11}s;transform-origin:${x+tw/2}px ${y+th/2}px">`;
    b+=tx(x+tw/2,y+th*.79,digits[i],numberSize,leading?'#405368':C.lime,'class="mono" text-anchor="middle" font-weight="800" letter-spacing="-7"');
    b+='</g>';
    b+=`<path d="M${x+1} ${y+th*.52}h${tw-2}" stroke="#05070d" stroke-width="3"/><path d="M${x+1} ${y+th*.52+3}h${tw-2}" stroke="#6c8b72" stroke-opacity=".11"/>`;
    b+=`<rect x="${x-2}" y="${y+th*.52-8}" width="5" height="17" rx="2" fill="#3e5164"/><rect x="${x+tw-3}" y="${y+th*.52-8}" width="5" height="17" rx="2" fill="#3e5164"/>`;
  }
  if(mobile){b+=mono(pad,419,'PUBLIC / ALL YEARS',25,C.lime)+mono(pad,457,'DEFAULT BRANCHES',21,C.muted);}
  const rail=mobile?524:553;
  const path=`M${pad} ${rail}H${w*.38}Q${w*.42} ${rail} ${w*.44} ${rail-25}T${w*.51} ${rail-25}H${w*.67}Q${w*.7} ${rail-25} ${w*.73} ${rail}H${w-pad}`;
  b+=`<path d="${path}" fill="none" stroke="#203549" stroke-width="3"/><path d="${path}" class="branch" fill="none" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="3 29"/>`;
  for(const [x,yy] of [[pad,rail],[w*.28,rail],[w*.55,rail-25],[w*.81,rail],[w-pad,rail]])b+=`<circle cx="${x}" cy="${yy}" r="7" fill="#05070d" stroke="${C.lime}" stroke-width="2"/>`;
  b+=`<circle cx="${w-pad}" cy="${rail}" r="15" fill="none" stroke="${C.lime}" class="pulse"/>`;
  b+=`<path d="M${pad} ${h-91}H${w-pad}" stroke="${C.line}"/>`;
  if(mobile){b+=mono(pad,h-55,date+' / UTC',18)+mono(w-pad,h-55,'VIEW COMMITS ↗',18,C.lime,'text-anchor="end"')+mono(pad,h-22,'GITHUB SEARCH / AUTHOR: JPEG111',16);}
  else {b+=mono(pad,h-48,'PUBLIC DEFAULT BRANCHES',23,C.cyan)+mono(w-pad,h-48,'OPEN THE COMMIT ARCHIVE ↗',23,C.lime,'text-anchor="end"')+mono(pad,h-17,'GITHUB SEARCH / AUTHOR: JPEG111 / UPDATED EVERY 12 HOURS',16);}
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">JPEG111 / ${count.toLocaleString('en-US')} total public commits</title><desc id="desc">${count} public commits attributed to JPEG111 across all years, as indexed by GitHub commit search on repository default branches. Updated ${esc(date)} UTC. Private and local-only work is outside this count. Leading zeroes are display padding. The branch line is decorative; the number is a snapshot, not an artificial live increment.</desc><defs><linearGradient id="tile" x2="0" y2="1"><stop stop-color="#102033"/><stop offset=".51" stop-color="#09111c"/><stop offset=".52" stop-color="#070d16"/><stop offset="1" stop-color="#0e1a28"/></linearGradient><linearGradient id="edge"><stop stop-color="#324c65"/><stop offset=".65" stop-color="#192b3d"/><stop offset="1" stop-color="#c5ff5c" stop-opacity=".6"/></linearGradient><pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#21334b" stroke-opacity=".25"/></pattern></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}.digit{animation:reveal .8s both cubic-bezier(.2,.7,.2,1)}.branch{animation:travel 11s linear infinite}.pulse{animation:pulse 3s ease-in-out infinite}@keyframes reveal{from{opacity:0;transform:translateY(-18px) scaleY(.65)}to{opacity:1;transform:translateY(0) scaleY(1)}}@keyframes travel{to{stroke-dashoffset:-384}}@keyframes pulse{50%{opacity:.15;r:23px}}@media(prefers-reduced-motion:reduce){.digit,.branch,.pulse{animation:none!important}}</style><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="22" fill="${C.bg}" stroke="url(#edge)"/><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="22" fill="url(#grid)"/>${b}</svg>\n`;
}
