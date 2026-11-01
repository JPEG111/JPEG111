import {execFileSync} from 'node:child_process';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {renderCommitCounter,historyBuckets,buildCommitHistory} from './render-commit-counter.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const login = process.env.PROFILE_LOGIN || 'JPEG111';
if (!/^[a-zA-Z0-9-]+$/.test(login)) throw new Error('Invalid GitHub login');
const api = (method, path, body) => JSON.parse(execFileSync('gh', ['api', '--method', method, path, ...(body ? ['--input', '-'] : [])], {encoding:'utf8', input:body ? JSON.stringify(body) : undefined}));
const fixture = args.indexOf('--input');
let response;
if (fixture !== -1) response = JSON.parse(await readFile(args[fixture + 1], 'utf8'));
else {
  const query = `query($cursor:String){user(login:"${login}"){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}} repositories(first:100,after:$cursor,privacy:PUBLIC,ownerAffiliations:OWNER,isFork:false){pageInfo{hasNextPage endCursor} nodes{primaryLanguage{name color}}}}}`;
  const nodes = [];
  let cursor = null;
  for (let page=0; page<100; page++) {
    response = api('POST', 'graphql', {query, variables:{cursor}});
    if (response.errors || !response.data?.user) throw new Error('GitHub activity query failed');
    const repos = response.data.user.repositories;
    nodes.push(...repos.nodes);
    if (!repos.pageInfo.hasNextPage) break;
    if (page === 99) throw new Error('Repository pagination exceeded limit');
    cursor = repos.pageInfo.endCursor;
  }
  response.data.user.repositories.nodes = nodes;
}
const user = response.data?.user;
if (!user?.contributionsCollection?.contributionCalendar || !Array.isArray(user.repositories?.nodes)) throw new Error('Incomplete activity data');
const calendar = user.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap(w => w.contributionDays);
if (!days.length || days.some(d => !/^\d{4}-\d{2}-\d{2}$/.test(d.date) || !Number.isInteger(d.contributionCount) || d.contributionCount<0)) throw new Error('Invalid calendar');
let best=0, run=0, current=0;
for (const d of days) { run=d.contributionCount ? run+1 : 0; best=Math.max(best,run); }
let end=days.length-1;
if (days[end].contributionCount===0) end--; // Today may still receive a contribution.
for (let i=end; i>=0 && days[i].contributionCount>0; i--) current++;
const languages = new Map();
for (const repo of user.repositories.nodes) if (repo.primaryLanguage) {
  const {name,color}=repo.primaryLanguage;
  const old=languages.get(name) || {name,color,count:0}; old.count++; languages.set(name,old);
}
const ranked=[...languages.values()].sort((a,b)=>b.count-a.count || a.name.localeCompare(b.name));
const commitQuery=`author:${login} is:public`;
const commitSearch=fixture!==-1 ? response.commitSearch : api('GET',`search/commits?q=${encodeURIComponent(commitQuery)}&per_page=1`);
if(commitSearch?.incomplete_results!==false || !Number.isSafeInteger(commitSearch.total_count) || commitSearch.total_count<0)throw new Error('Public commit search incomplete; keeping the previous counter');
const totalPublicCommits=commitSearch.total_count;
const date=days.at(-1).date;
const buckets=historyBuckets(date);
const searchCount=query=>{
  const result=api('GET',`search/commits?q=${encodeURIComponent(query)}&per_page=1`);
  if(result.incomplete_results!==false||!Number.isSafeInteger(result.total_count)||result.total_count<0)throw new Error('Public history search incomplete; keeping previous images');
  return result.total_count;
};
let historyInput=response.commitHistory;
if(fixture===-1){
  const before=searchCount(`${commitQuery} author-date:<${buckets[0].start}`);
  const counts=[];
  // Sequential requests stay within the authenticated search quota.
  for(const b of buckets)counts.push(searchCount(`${commitQuery} author-date:${b.start}..${b.end}`));
  historyInput={before,counts};
}
if(!historyInput)throw new Error('Missing commit history');
const commitHistory=buildCommitHistory(totalPublicCommits,date,historyInput.before,historyInput.counts);
const summary={date,total:calendar.totalContributions,current,best,languages:ranked,totalPublicCommits,commitQuery,commitHistory};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const C={bg:'#05070d',line:'#243143',muted:'#94a6bd',white:'#f3f7ff',lime:'#c5ff5c',cyan:'#54d9ff'};
const text=(x,y,s,size=20,color=C.white,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(s)}</text>`;
const mono=(x,y,s,size=17,color=C.muted,extra='')=>text(x,y,s,size,color,`class="mono" letter-spacing="1.2" ${extra}`);
function render(mobile) {
  const w=mobile?720:1440,h=mobile?420:320;
  let b=mono(32,38,'JPEG111 / ACTIVITY',18,C.cyan)+mono(w-32,38,summary.date,17,C.muted,'text-anchor="end"');
  const values=[[summary.total,'CONTRIBUTIONS','LAST 12 MONTHS',C.white],[current,'DAY STREAK','CURRENT',C.lime],[best,'DAY STREAK','BEST / 12 MONTHS',C.cyan]];
  values.forEach(([v,label,scope,color],i)=>{
    const x=32+i*(mobile?226:255);
    b+=text(x,mobile?132:155,String(v).padStart(2,'0'),mobile?72:90,color,'font-weight="800" letter-spacing="-4"');
    b+=mono(x,mobile?173:199,label,mobile?18:19,C.white)+mono(x,mobile?202:229,scope,mobile?14:15);
    if(i<2)b+=`<path d="M${x+(mobile?200:220)} 77v${mobile?110:145}" stroke="${C.line}"/>`;
  });
  const x=mobile?32:850,y=mobile?250:98,gw=mobile?656:558,gh=mobile?69:120;
  b+=mono(x,y-13,'56 DAYS / CONTRIBUTION SIGNAL',mobile?16:17);
  const recent=days.slice(-56),max=Math.max(1,...recent.map(d=>d.contributionCount));
  recent.forEach((d,i)=>{
    const bw=gw/56-3,bh=d.contributionCount?Math.max(5,d.contributionCount/max*gh):3;
    b+=`<rect x="${x+i*gw/56}" y="${y+gh-bh}" width="${bw}" height="${bh}" rx="2" fill="${d.contributionCount?C.lime:C.line}"><title>${d.date}: ${d.contributionCount} contributions</title></rect>`;
  });
  b+=`<path class="signal" d="M${x} ${y+gh+7}h${gw}" stroke="${C.cyan}" stroke-dasharray="5 18"/>`;
  const fy=mobile?368:278;
  b+=`<path d="M32 ${fy-27}H${w-32}" stroke="${C.line}"/>`;
  const names=ranked.slice(0,3).map(l=>l.name).join(' / ') || 'NO CLASSIFIED CODE YET';
  b+=mono(32,fy,'PUBLIC CODE',mobile?16:17,C.cyan)+text(mobile?188:207,fy,names,mobile?22:24,C.white,'font-weight="650"');
  if(!mobile)b+=mono(w-32,fy,'PRIMARY LANGUAGES / OWN REPOS',15,C.muted,'text-anchor="end"');
  b+=mono(32,h-13,mobile?'REPOSITORY LANGUAGES ≠ FULL TOOLCHAIN':'REPOSITORY LANGUAGES ≠ FULL TOOLCHAIN · CALENDAR SNAPSHOT · UTC',mobile?12:13);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${login} / GitHub activity</title><desc id="desc">${summary.total} contributions in the calendar period. Current streak ${current} days. Best streak in that period ${best} days. Public original repository languages: ${esc(names)}. Updated ${summary.date} UTC. Language labels describe repositories, not the full toolchain.</desc><defs><linearGradient id="edge"><stop stop-color="#315660"/><stop offset=".5" stop-color="#243143"/><stop offset="1" stop-color="#c5ff5c" stop-opacity=".5"/></linearGradient></defs><style>text{font-family:Inter,"Segoe UI",Arial,sans-serif}.mono{font-family:"Cascadia Code",Consolas,monospace}.signal{animation:travel 8s linear infinite}@keyframes travel{to{stroke-dashoffset:-184}}@media(prefers-reduced-motion:reduce){.signal{animation:none}}</style><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="18" fill="${C.bg}" stroke="url(#edge)"/>${b}</svg>\n`;
}
const out=root+'.local/generated-activity/';
await mkdir(out,{recursive:true});
for (const m of [false,true]) await writeFile(out+`activity${m?'-mobile':''}.svg`,render(m));
for (const m of [false,true]) await writeFile(out+`commit-counter${m?'-mobile':''}.svg`,renderCommitCounter(totalPublicCommits,summary.date,m,commitHistory));
await writeFile(out+'summary.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary));

if (args.includes('--publish')) {
  const repo=process.env.GITHUB_REPOSITORY;
  if (repo!==`${login}/${login}`) throw new Error('Publishing is limited to the profile repository');
  const branch='profile-activity';
  let parent;
  try { parent=api('GET',`repos/${repo}/git/ref/heads/${branch}`).object.sha; }
  catch { throw new Error('Activity branch missing; initialize it before running the publisher'); }
  const old=api('GET',`repos/${repo}/git/commits/${parent}`);
  const entries=await Promise.all(['activity.svg','activity-mobile.svg','commit-counter.svg','commit-counter-mobile.svg','summary.json'].map(async path=>({path,mode:'100644',type:'blob',content:await readFile(out+path,'utf8')})));
  const tree=api('POST',`repos/${repo}/git/trees`,{base_tree:old.tree.sha,tree:entries});
  if(tree.sha!==old.tree.sha){
    const commit=api('POST',`repos/${repo}/git/commits`,{message:'Refresh profile activity',tree:tree.sha,parents:[parent]});
    api('PATCH',`repos/${repo}/git/refs/heads/${branch}`,{sha:commit.sha,force:false});
  }
}
