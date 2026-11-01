// Run only on the owner's signed-in computer. No credential is exported to Actions.
import {execFileSync} from 'node:child_process';
import {writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const owner='JPEG111',repository='JPEG111/JPEG111',branch='profile-activity';
const gh=(args,input)=>execFileSync('gh',args[0]==='api'?['api','--hostname','github.com',...args.slice(1)]:args,{encoding:'utf8',input,stdio:['pipe','pipe','pipe'],env:{...process.env,GH_DEBUG:''}});
const api=(method,path,body)=>{
  const result=gh(['api','--method',method,path,...(body?['--input','-']:[])],body?JSON.stringify(body):undefined);
  return result.trim()?JSON.parse(result):null;
};

export function validateAccountMetrics(input){
  if(input?.schemaVersion!==1||input.login!==owner||!Number.isSafeInteger(input.totalPrivateCommits)||input.totalPrivateCommits<0||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(input.updatedAt)||!Number.isFinite(Date.parse(input.updatedAt))||Date.parse(input.updatedAt)>Date.now()+300000)throw new Error('Invalid private aggregate');
  // Explicit output allowlist prevents private repository metadata entering public JSON.
  return {schemaVersion:1,login:owner,totalPrivateCommits:input.totalPrivateCommits,updatedAt:input.updatedAt,scope:'Indexed private default-branch commits accessible to the authenticated owner'};
}

export function collectAccountMetrics(){
  if(gh(['api','user','--jq','.login']).trim()!==owner)throw new Error('Owner sign-in required');
  const result=JSON.parse(gh(['api','search/commits','--method','GET','-f',`q=author:${owner} is:private`,'-f','per_page=1','--jq','{total_count,incomplete_results}']));
  if(result.incomplete_results!==false)throw new Error('Incomplete private count; keeping previous aggregate');
  return validateAccountMetrics({schemaVersion:1,login:owner,totalPrivateCommits:result.total_count,updatedAt:new Date().toISOString()});
}

export function publishAccountMetrics(input){
  const content=JSON.stringify(validateAccountMetrics(input),null,2)+'\n';
  // A concurrent public refresh may advance the branch; retry from its new head once.
  for(let attempt=0;attempt<2;attempt++){
    const parent=api('GET',`repos/${repository}/git/ref/heads/${branch}`).object.sha;
    const base=api('GET',`repos/${repository}/git/commits/${parent}`);
    const tree=api('POST',`repos/${repository}/git/trees`,{base_tree:base.tree.sha,tree:[{path:'private-metrics.json',mode:'100644',type:'blob',content}]});
    const commit=api('POST',`repos/${repository}/git/commits`,{message:'Refresh aggregate private commit count',tree:tree.sha,parents:[parent]});
    try {api('PATCH',`repos/${repository}/git/refs/heads/${branch}`,{sha:commit.sha,force:false});return commit.sha;}
    catch {if(attempt===1)throw new Error('Aggregate publication did not advance safely');}
  }
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const args=process.argv.slice(2),oi=args.indexOf('--out');
    const output=oi===-1?fileURLToPath(new URL('../.local/generated-activity/private-metrics.json',import.meta.url)):resolve(args[oi+1]);
    const metrics=collectAccountMetrics();
    await mkdir(dirname(output),{recursive:true});
    await writeFile(output,JSON.stringify(metrics,null,2)+'\n');
    const published=args.includes('--publish')?publishAccountMetrics(metrics):null;
    if(args.includes('--dispatch')){
      if(!published)throw new Error('Dispatch requires a published aggregate');
      api('POST',`repos/${repository}/actions/workflows/profile-activity.yml/dispatches`,{ref:'main'});
    }
    console.log(JSON.stringify({updatedAt:metrics.updatedAt,totalPrivateCommits:metrics.totalPrivateCommits,published,dispatched:args.includes('--dispatch')}));
  }catch{
    console.error('Private aggregate refresh failed; previous published values remain available. Check the owner GitHub sign-in and retry.');
    process.exitCode=1;
  }
}
