const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const C={bg:'#05070d',ink:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff',line:'#233448',muted:'#96a8be'};
const tx=(x,y,s,n=22,fill=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const mono=(x,y,s,n=20,fill=C.muted,extra='')=>tx(x,y,s,n,fill,`class="mono" letter-spacing="1.2" ${extra}`);
const iso=d=>d.toISOString().slice(0,10);

export function historyBuckets(date) {
  const now=new Date(date+'T00:00:00Z');
  if(!Number.isFinite(+now)||iso(now)!==date)throw new Error('Invalid history date');
  return Array.from({length:12},(_,i)=>{
    const start=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-11+i,1));
    const end=i===11?now:new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,0));
    return {start:iso(start),end:iso(end)};
  });
}

export function buildCommitHistory(total,date,before,counts) {
  const buckets=historyBuckets(date);
  if(!Array.isArray(counts)||counts.length!==12||![total,before,...counts].every(n=>Number.isSafeInteger(n)&&n>=0))throw new Error('Invalid commit history');
  let value=before;
  const baselineDate=new Date(buckets[0].start+'T00:00:00Z');
  baselineDate.setUTCDate(baselineDate.getUTCDate()-1);
  const points=[{date:iso(baselineDate),value}];
  buckets.forEach((bucket,i)=>points.push({date:bucket.end,value:value+=counts[i]}));
  if(value!==total)throw new Error('Commit history and total disagree; keeping previous images');
  return {buckets:buckets.map((b,i)=>({...b,count:counts[i]})),points};
}

export function renderCommitCounter(count,date,mobile=false,history) {
  if(!Number.isSafeInteger(count)||count<0)throw new Error('Invalid commit count');
  if(!history?.points?.length||history.points.at(-1).value!==count)throw new Error('Missing matching commit history');
  const w=mobile?720:1440,h=mobile?790:730,pad=mobile?36:52;
  const value=count.toLocaleString('en-US');
  const numberSize=Math.min(mobile?286:360,(mobile?w-pad*2:840)/(value.length*.67));
  const numberY=mobile?378:405;
  let b=mono(pad,46,'JPEG111 / COMMIT ARCHIVE',mobile?17:20,C.cyan);
  if(!mobile)b+=mono(w-pad,46,date+' / UTC',18,C.muted,'text-anchor="end"');
  b+=tx(pad,mobile?111:125,'TOTAL COMMITS',mobile?51:76,C.ink,'font-weight="850" letter-spacing="-2"');
  b+=`<g class="number">${tx(pad-6,numberY,value,numberSize,'url(#number)','font-weight="900" letter-spacing="-14"')}</g>`;
  if(mobile)b+=mono(pad,435,'PUBLIC / ALL YEARS',22,C.lime);
  else {
    b+=`<path d="M1000 215v180" stroke="${C.line}"/>`;
    b+=mono(1042,250,'PUBLIC COMMITS',23,C.lime)+mono(1042,289,'ACROSS ALL YEARS',19);
    const growth='+'+(count-history.points[0].value).toLocaleString('en-US');
    b+=tx(1042,359,growth,Math.min(60,(w-pad-1042)/(growth.length*.65)),C.ink,'font-weight="750"');
    b+=mono(1042,394,'IN THIS WINDOW',18);
  }
  const gx=pad,gy=mobile?520:500,gw=w-pad*2,gh=mobile?113:112;
  const max=Math.max(1,count);
  const firstDate=Date.parse(history.points[0].date),span=Math.max(1,Date.parse(date)-firstDate);
  const coords=history.points.map(p=>[gx+(Date.parse(p.date)-firstDate)/span*gw,gy+gh-p.value/max*gh]);
  const path=coords.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  b+=mono(pad,gy-25,'CUMULATIVE PUBLIC COMMITS',mobile?18:20,C.cyan);
  if(!mobile)b+=mono(w-pad,gy-25,'12 MONTHS / MONTHLY POINTS',17,C.muted,'text-anchor="end"');
  for(let i=0;i<3;i++)b+=`<path d="M${gx} ${gy+i*gh/2}h${gw}" stroke="${C.line}" stroke-dasharray="3 10" opacity=".65"/>`;
  b+=`<path d="${path}L${gx+gw} ${gy+gh}H${gx}Z" fill="url(#area)"/>`;
  b+=`<path id="history-line" d="${path}" fill="none" stroke="${C.lime}" stroke-width="4" stroke-linejoin="round"/>`;
  coords.forEach(([x,y],i)=>{b+=`<circle cx="${x}" cy="${y}" r="${i===coords.length-1?6:3}" fill="${i===coords.length-1?C.lime:C.bg}" stroke="${C.lime}" stroke-width="2"><title>${history.points[i].date}: ${history.points[i].value} cumulative commits</title></circle>`;});
  b+=mono(pad,gy+gh+30,history.points[0].date.slice(0,7),16)+mono(w-pad,gy+gh+30,date.slice(0,7),16,C.muted,'text-anchor="end"');
  b+=`<path d="M${pad} ${h-67}H${w-pad}" stroke="${C.line}"/>`;
  b+=mono(pad,h-35,mobile?'DEFAULT BRANCHES':'PUBLIC DEFAULT BRANCHES',mobile?16:19,C.muted);
  b+=mono(w-pad,h-35,'VIEW COMMITS ↗',mobile?17:20,C.lime,'text-anchor="end"');
  const desc=`${count} public commits attributed to JPEG111 across all years on indexed repository default branches. Updated ${date} UTC. The line shows cumulative public commits at monthly intervals over the last twelve calendar months, using commit author dates. Its shape is generated from actual counts and changes when those counts change. Refreshed every twelve hours, not a live ticker. Private and local-only work is outside this count.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">JPEG111 / ${value} total public commits</title><desc id="desc">${esc(desc)}</desc><defs><linearGradient id="number" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f3f7ff"/><stop offset=".72" stop-color="#e5ffd1"/><stop offset="1" stop-color="#c5ff5c"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c5ff5c" stop-opacity=".17"/><stop offset="1" stop-color="#c5ff5c" stop-opacity="0"/></linearGradient><linearGradient id="edge"><stop stop-color="#324c65"/><stop offset=".65" stop-color="#192b3d"/><stop offset="1" stop-color="#c5ff5c" stop-opacity=".6"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#21334b" stroke-opacity=".19"/></pattern></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}</style><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="22" fill="${C.bg}" stroke="url(#edge)"/><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="22" fill="url(#grid)"/>${b}</svg>\n`;
}
