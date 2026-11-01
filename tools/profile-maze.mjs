// A real, seeded perfect maze. Display states follow a valid search and backtrack.
export function createMaze(columns=13,rows=9,seed=0x111c0de){
  let random=seed>>>0;
  const next=()=>{random^=random<<13;random^=random>>>17;random^=random<<5;return (random>>>0)/4294967296;};
  const directions=[[0,-1],[1,0],[0,1],[-1,0]];
  const walls=Array.from({length:columns*rows},()=>[true,true,true,true]);
  const seen=new Set([0]),stack=[0];
  while(stack.length){
    const cell=stack.at(-1),x=cell%columns,y=Math.floor(cell/columns);
    const options=directions.map(([dx,dy],d)=>({x:x+dx,y:y+dy,d})).filter(p=>p.x>=0&&p.x<columns&&p.y>=0&&p.y<rows&&!seen.has(p.y*columns+p.x));
    if(!options.length){stack.pop();continue;}
    const p=options[Math.floor(next()*options.length)],target=p.y*columns+p.x;
    walls[cell][p.d]=false;walls[target][(p.d+2)%4]=false;seen.add(target);stack.push(target);
  }
  const adjacent=cell=>directions.flatMap(([dx,dy],d)=>walls[cell][d]?[]:[cell+dx+dy*columns]);
  const walk=[0],visited=new Set([0]),route=[0],goal=columns*rows-1;
  function search(cell){
    if(cell===goal)return true;
    for(const target of adjacent(cell)){
      if(visited.has(target))continue;
      visited.add(target);walk.push(target);route.push(target);
      if(search(target))return true;
      route.pop();walk.push(cell);
    }
    return false;
  }
  if(!search(0))throw new Error('Maze has no route');
  const reversal=walk.findIndex((cell,i)=>i>1&&cell===walk[i-2]);
  const endOfBranch=reversal>1?reversal:Math.max(2,Math.floor(walk.length/3));
  const frames=[[0],walk.slice(0,endOfBranch),walk.slice(0,Math.min(walk.length,endOfBranch+10)),route.slice()];
  return {columns,rows,walls,walk,route,frames};
}

export const mazeModel=createMaze();
const colour={cyan:'#54d9ff',lime:'#c5ff5c',muted:'#93a9c2',amber:'#ffc776'};
const point=(x,y,h=0)=>[252+(x-y)*24,94+(x+y)*12-h];
const polygon=(points,fill,stroke='#2d5367')=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}"/>`;
const text=(x,y,s,size=17,c=colour.muted,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${c}" class="mono" ${extra}>${s}</text>`;
const pathFor=cells=>cells.map((cell,i)=>`${i?'L':'M'}${point(cell%mazeModel.columns+.5,Math.floor(cell/mazeModel.columns)+.5).join(' ')}`).join(' ');

export function renderMaze(){
  const {columns,rows,walls,frames}=mazeModel;
  const floor=[point(0,0),point(columns,0),point(columns,rows),point(0,rows)];
  let b='<defs><linearGradient id="maze-floor" x2="0" y2="1"><stop stop-color="#142b3e"/><stop offset="1" stop-color="#071321"/></linearGradient></defs>';
  b+=polygon([floor[1],floor[2],point(columns,rows,-13),point(columns,0,-13)],'#07101c');
  b+=polygon([floor[2],floor[3],point(0,rows,-13),point(columns,rows,-13)],'#0d1f30');
  b+=polygon(floor,'url(#maze-floor)','#3d6073');
  const labels=['ASK THE NEXT QUESTION','FOLLOW THE THREAD','RECONSIDER THE ROUTE','BUILD FROM THE CONNECTION'];
  frames.forEach((cells,i)=>{
    const c=i===1?colour.amber:i===3?colour.lime:colour.cyan;
    let s=`<rect x="20" y="8" width="560" height="47" rx="9" fill="#0a1624" stroke="${c}"/>`+text(36,38,labels[i],20,c);
    const trail=pathFor(cells);
    if(cells.length>1)s+=`<path d="${trail}" fill="none" stroke="${c}" stroke-width="13" opacity=".13" stroke-linejoin="round"/><path d="${trail}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>`;
    const last=cells.at(-1),p=point(last%columns+.5,Math.floor(last/columns)+.5);
    s+=`<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${c}" stroke="#eafcff" stroke-width="1.5"/>`;
    ['ASK','TRACE','RETHINK','BUILD'].forEach((label,k)=>s+=text(27+k*147,405,label,16,k===i?c:'#526a80'));
    b+=`<g class="state state-${i}${i===3?' final':''}" data-state="${i}" aria-label="${labels[i]}">${s}</g>`;
  });
  const segments=[];
  for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
    const wall=walls[y*columns+x];
    if(wall[0]&&!(x===0&&y===0))segments.push([x,y,x+1,y]);
    if(wall[3])segments.push([x,y,x,y+1]);
    if(y===rows-1&&wall[2])segments.push([x,y+1,x+1,y+1]);
    if(x===columns-1&&wall[1]&&y!==rows-1)segments.push([x+1,y,x+1,y+1]);
  }
  segments.sort((a,z)=>(a[0]+a[1]+a[2]+a[3])-(z[0]+z[1]+z[2]+z[3]));
  for(const [x1,y1,x2,y2] of segments){
    const a=point(x1,y1),z=point(x2,y2),at=point(x1,y1,17),zt=point(x2,y2,17);
    b+=polygon([a,z,zt,at],x1===x2?'#18364b':'#294b60','#37596c');
    b+=`<path d="M${at.join(' ')}L${zt.join(' ')}" fill="none" stroke="#66869b" stroke-width="2.5"/>`;
  }
  return b;
}
