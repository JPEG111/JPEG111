const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const C={bg:'#05070d',ink:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff',line:'#233448',muted:'#96a8be'};
const tx=(x,y,s,n=22,fill=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const mono=(x,y,s,n=20,fill=C.muted,extra='')=>tx(x,y,s,n,fill,`class="mono" letter-spacing="1.2" ${extra}`);
const iso=d=>d.toISOString().slice(0,10);
const symbols={JavaScript:'JS',TypeScript:'TS',Python:'Py',Go:'Go',Rust:'Rs',Java:'Jv',HTML:'<>',CSS:'CSS',Shell:'sh',PowerShell:'PS',Ruby:'Rb',PHP:'php',Dart:'Da',Swift:'Sw',Kotlin:'Kt','C++':'C++','C#':'C#',C:'C'};

function languageBadge(language,x,y,w,h,mobile){
  const color=/^#[0-9a-f]{6}$/i.test(language?.color||'')?language.color:C.cyan;
  const name=language?.name||'Unclassified',symbol=symbols[name]||name.slice(0,2);
  let b=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#101b2a" stroke="${C.line}"/>`;
  b+=mono(x+16,y+23,'MOST-USED PUBLIC LANGUAGE',mobile?12:14,C.muted);
  b+=`<rect x="${x+16}" y="${y+38}" width="48" height="48" rx="10" fill="${color}"/>`;
  b+=tx(x+40,y+70,symbol,Math.min(23,42/(symbol.length*.7)),name==='JavaScript'?'#161b22':C.ink,'class="mono" font-weight="850" text-anchor="middle"');
  b+=tx(x+80,y+62,name,Math.min(24,(w-96)/(name.length*.6)),C.ink,'font-weight="700"');
  b+=mono(x+80,y+85,language?language.share.toFixed(1)+'% OF CODE BYTES':'NO CLASSIFIED CODE',mobile?11:12,C.muted);
  return b;
}

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

export function renderCommitCounter(count,date,mobile=false,history,metrics) {
  if(!Number.isSafeInteger(count)||count<0)throw new Error('Invalid commit count');
  if(!history?.points?.length||history.points.at(-1).value!==count)throw new Error('Missing matching commit history');
  const account=metrics?.accountMetrics,language=metrics?.topLanguage;
  if(!Number.isSafeInteger(account?.totalPrivateCommits)||account.totalPrivateCommits<0||!Number.isFinite(Date.parse(account.updatedAt)))throw new Error('Missing private commit aggregate');
  const total=count+account.totalPrivateCommits;
  if(!Number.isSafeInteger(total))throw new Error('Combined commit count exceeds the safe integer range');
  if(language&&(!Number.isFinite(language.share)||language.share<0||language.share>100||typeof language.name!=='string'))throw new Error('Invalid language leader');
  const w=mobile?720:1440,h=mobile?1110:730,pad=mobile?36:52;
  const value=total.toLocaleString('en-US');
  const numberSize=Math.min(mobile?286:360,(mobile?w-pad*2:790)/(value.length*.67));
  const numberY=mobile?378:405;
  let b=mono(pad,46,'JPEG111 / COMMIT ARCHIVE',mobile?17:20,C.cyan);
  if(!mobile)b+=mono(w-pad,46,date+' / UTC',18,C.muted,'text-anchor="end"');
  b+=tx(pad,mobile?111:125,'TOTAL COMMITS',mobile?51:76,C.ink,'font-weight="850" letter-spacing="-2"');
  b+=`<g class="number">${tx(pad-6,numberY,value,numberSize,'url(#number)','font-weight="900" letter-spacing="-14"')}</g>`;
  const privateValue=account.totalPrivateCommits.toLocaleString('en-US');
  const publicValue=count.toLocaleString('en-US');
  const stamp=account.updatedAt.slice(0,16).replace('T',' ')+' UTC';
  const scopeCard=(x,y,width,label,number,color)=>`<rect x="${x}" y="${y}" width="${width}" height="124" rx="12" fill="#0d1929" stroke="${C.line}"/>`+mono(x+16,y+26,label,14,color)+tx(x+16,y+99,number,Math.min(76,(width-32)/(number.length*.65)),color,'font-weight="800" letter-spacing="-3"');
  if(mobile){
    b+=mono(pad,435,'PUBLIC + PRIVATE / ALL YEARS',20,C.lime);
    b+=scopeCard(36,468,314,'PUBLIC COMMITS',publicValue,C.lime);
    b+=scopeCard(370,468,314,'PRIVATE COMMITS',privateValue,C.cyan);
    b+=mono(36,618,'PUBLIC: '+date+' UTC',13,C.muted);
    b+=mono(36,640,'PRIVATE: '+stamp,13,C.muted);
    b+=languageBadge(language,36,662,648,96,true);
  }
  else {
    b+=`<path d="M864 180v264" stroke="${C.line}"/>`;
    b+=scopeCard(900,181,234,'PUBLIC COMMITS',publicValue,C.lime);
    b+=scopeCard(1154,181,234,'PRIVATE COMMITS',privateValue,C.cyan);
    b+=mono(900,331,'PRIVATE VERIFIED: '+stamp,13,C.muted);
    b+=languageBadge(language,900,347,488,96,false);
    b+=mono(pad,445,'PUBLIC + PRIVATE / ALL YEARS',19,C.lime);
  }
  const gx=pad,gy=mobile?840:500,gw=w-pad*2,gh=mobile?113:112;
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
  b+=mono(pad,h-35,mobile?'INDEXED DEFAULT BRANCHES':'PUBLIC + PRIVATE / INDEXED DEFAULT BRANCHES',mobile?14:17,C.muted);
  b+=mono(w-pad,h-35,'VIEW COMMITS ↗',mobile?17:20,C.lime,'text-anchor="end"');
  const desc=`${total} total indexed commits across all years: ${count} public plus ${account.totalPrivateCommits} private. The large number is the sum of these two GitHub search snapshots, not a unique-SHA union across repositories or all branches. Public snapshot ${date} UTC; private verified ${account.updatedAt}. Search covers indexed default-branch commits attributed to JPEG111, with private matches limited to those accessible to the owner. Only the private aggregate is published. ${language?'Most-used public language: '+language.name+', '+language.share.toFixed(1)+' percent of GitHub-classified language bytes in public owned non-fork repositories.':'No classified public language data.'} The line shows cumulative PUBLIC commits at monthly author-date points over twelve calendar months; private history is not available to the public job. The public job refreshes every twelve hours; private updates are collected on the owner computer and retain their own verification timestamp. Local-only and unindexed commits are excluded.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">JPEG111 / ${value} total indexed commits</title><desc id="desc">${esc(desc)}</desc><defs><linearGradient id="number" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f3f7ff"/><stop offset=".72" stop-color="#e5ffd1"/><stop offset="1" stop-color="#c5ff5c"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c5ff5c" stop-opacity=".17"/><stop offset="1" stop-color="#c5ff5c" stop-opacity="0"/></linearGradient><linearGradient id="edge"><stop stop-color="#324c65"/><stop offset=".65" stop-color="#192b3d"/><stop offset="1" stop-color="#c5ff5c" stop-opacity=".6"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#21334b" stroke-opacity=".19"/></pattern></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}</style><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="22" fill="${C.bg}" stroke="url(#edge)"/><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="22" fill="url(#grid)"/>${b}</svg>\n`;
}
