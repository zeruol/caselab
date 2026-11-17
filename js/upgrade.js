// Nâng cấp
const MAXU=10;
let upSel=[],upT=null,ang=0,upM=null,upIdx=0,upPos=0,rush={id:null,until:0,n:0},rushT=null;
const upItems=()=>st.inv.filter(x=>upSel.includes(x.id));
const upSum=()=>upItems().reduce((a,x)=>a+x.p,0);
const upCh=()=>upT&&upSel.length?Math.min(.75,upSum()/upT.p*.95):0;
// Vòng quay kiểu bát giác. Vùng thắng chạy dọc theo cạnh bát giác (vạch đứt), tính đúng theo góc kim.
const RO=121,AP=RO*Math.cos(Math.PI/8);
const GP=(r,a)=>[150+r*Math.sin(a*Math.PI/180),150-r*Math.cos(a*Math.PI/180)];
// điểm mà tia từ tâm theo góc a (độ, chiều kim đồng hồ từ đỉnh) cắt cạnh bát giác
const octPt=a=>{const e=Math.round(a/45)*45;return GP(AP/Math.cos((a-e)*Math.PI/180),a)};
function zonePath(a0,span){if(span<=0)return'';const f=p=>p[0].toFixed(1)+' '+p[1].toFixed(1);let d='M'+f(octPt(a0));
 for(let v=Math.ceil((a0-22.5)/45)*45+22.5;v<a0+span;v+=45)if(v>a0)d+='L'+f(GP(RO,v));return d+'L'+f(octPt(a0+span))}
{const P=GP,f1=v=>v.toFixed(1);
 const oct=r=>Array.from({length:8},(_,i)=>P(r,i*45+22.5).map(f1).join(',')).join(' ');
 const edge=(r,i,k)=>{const a=P(r,i*45+22.5),b=P(r,i*45+67.5),m=(1-k)/2;return`<line x1="${f1(a[0]+(b[0]-a[0])*m)}" y1="${f1(a[1]+(b[1]-a[1])*m)}" x2="${f1(b[0]-(b[0]-a[0])*m)}" y2="${f1(b[1]-(b[1]-a[1])*m)}"/>`};
 const diag=[0,2,4,6].map(i=>edge(143,i,.6)).join('');
 const ticks=Array.from({length:120},(_,i)=>{const a=P(i%10?95:91,i*3),b=P(101,i*3);return`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}"/>`}).join('');
 const dots=y=>[-2,-1,0,1,2].map(i=>`<circle cx="${150+i*7}" cy="${y}" r="1.8"/>`).join('');
 $('gauge').innerHTML=`<defs>
 <radialGradient id="gIn" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#5d40d6"/><stop offset=".65" stop-color="#3b2a93"/><stop offset="1" stop-color="#23195a"/></radialGradient>
 <linearGradient id="gArc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3d9bff"/><stop offset="1" stop-color="#b05cff"/></linearGradient>
 <linearGradient id="gArcO" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb35c"/><stop offset=".55" stop-color="#ff8a3c"/><stop offset="1" stop-color="#b05cff"/></linearGradient>
 <linearGradient id="gNd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff2d6f"/><stop offset=".7" stop-color="#ff2d6f"/><stop offset="1" stop-color="#ff2d6f" stop-opacity=".55"/></linearGradient>
 <radialGradient id="gTrail" gradientUnits="userSpaceOnUse" cx="150" cy="150" r="118"><stop offset=".15" stop-color="#ff2d6f" stop-opacity="0"/><stop offset=".6" stop-color="#ff2d6f" stop-opacity=".25"/><stop offset="1" stop-color="#ff4d85" stop-opacity=".95"/></radialGradient>
 <filter id="gGlow" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="3"/></filter></defs>
 <polygon points="${oct(147)}" fill="#110d25" stroke="#2c2560" stroke-width="2"/>
 <polygon points="${oct(139)}" fill="#17122f" stroke="#3a2f78" stroke-width="1.5"/>
 <g class="gd-glow" stroke="#9a7dff" stroke-width="7" stroke-linecap="round" opacity=".55" filter="url(#gGlow)">${diag}</g>
 <g class="gd" stroke="#a58bff" stroke-width="2.6" stroke-linecap="round">${diag}</g>
 <polygon points="${oct(128)}" fill="url(#gIn)" stroke="#5a44c0" stroke-width="2"/>
 <g stroke="#cbbcff" stroke-opacity=".16" stroke-width="1">${ticks}</g>
 <g fill="#8f80e0">${dots(18)}${dots(282)}</g>
 <path id="arcG" class="zone" d="" fill="none" stroke="url(#gArc)" stroke-width="7" opacity=".5" filter="url(#gGlow)"/>
 <path id="arc" class="zone" d="" fill="none" stroke="url(#gArc)" stroke-width="4.5" stroke-dasharray="13 5"/>`;
 // Kim nằm ở một SVG riêng chồng lên đồng hồ: khi quay, trình duyệt chỉ xoay lớp này trên GPU
 // thay vì vẽ lại cả đồng hồ (120 vạch, vệt sáng mờ) ở mỗi khung hình.
 // kim to, thon dần: đầu ngoài rộng sát mép bát giác, nhọn dần về phía tâm
 const nd='M144 35L156 35L151.5 110Q150 112.5 148.5 110Z';
 // vệt sáng kéo đuôi phía sau kim: 14 lát quạt mờ dần
 const fP=a=>P(116,a).map(f1).join(' ');
 const trail=Array.from({length:16},(_,k)=>`<path d="M150 150L${fP(-(k+1)*3)}A116 116 0 0 1 ${fP(-k*3)}Z" fill="url(#gTrail)" opacity="${(Math.pow(1-k/16,1.5)*.95).toFixed(3)}"/>`).join('');
 $('gauge').insertAdjacentHTML('afterend',`<svg id="ndl" class="ndl" viewBox="0 0 300 300" aria-hidden="true"><g class="trail">${trail}</g>
  <path d="${nd}" fill="#ff2d6f" filter="url(#gGlow)"/><path d="${nd}" fill="url(#gNd)"/>
  <path d="M150 38L150 96" stroke="#ffd3e0" stroke-width="2" stroke-linecap="round" opacity=".85"/></svg>
  <div class="g-win" id="gWin" aria-live="polite"></div>`)}
const HEX='<svg class="hex" viewBox="0 0 100 116" aria-hidden="true"><polygon points="50,3 97,30 97,86 50,113 3,86 3,30"/></svg>';
const ghost=t=>`<img class="ghost" src="img/17.webp" alt=""><p class="hint">${t}</p>`;
const big=(it,n,i)=>{const s=S[it.k],[w,k]=shortN(s.n);return`<div class="si" style="--rc:${RAR[s.r][1]}"><div class="glow"></div>${HEX}
 ${n>1?`<span class="more">${i+1} / ${n}</span><div class="cyc"><button data-cy="-1" aria-label="Món trước">▲</button><button data-cy="1" aria-label="Món sau">▼</button></div>`:''}
 <button class="x" data-x aria-label="Bỏ chọn">×</button><img class="big" src="${s.img}" alt="${s.n}">
 <p class="nm">${it.st?'<i>ST™</i>':''}${k?`<span>${k}</span>`:''}<b>${w}</b><small>${WEAR[it.w][1]}</small></p><span class="pz">${money(it.p)}</span></div>`};
// Phần nhẹ: vòng cung, tỉ lệ, thanh kéo. Gọi riêng khi kéo thanh để không dựng lại ảnh hai bên.
function drawArc(){const c=upCh();
 const d=zonePath(upPos*3.6,c*360);$('arc').setAttribute('d',d);$('arcG').setAttribute('d',d);
 $('upGet').textContent=upT?'+'+money(upT.p):'—';
 $('gaugeBox').classList.toggle('rushy',rush.id!=null&&upSel.includes(rush.id)&&rush.until>Date.now());
 $('upChance').textContent=(c*100).toFixed(3)+' %';$('upLbl').textContent=!c?'Chưa có tỉ lệ':c>=.5?'Cơ hội cao':c>=.2?'Cơ hội vừa':'Cơ hội nhiều rủi ro';
 $('chs').value=upPos;$('chsBox').style.setProperty('--p',upPos/100);
 $('chsV').textContent=c?`Vùng thắng ${Math.round(upPos*3.6)%360}°–${Math.round((upPos*3.6+c*360)%360)}°`:'Kéo để dời vùng thắng';
 return c}
function drawWheel(){const c=drawArc(),items=upItems(),sm=upSum();
 const srt=[...items].sort((a,b)=>b.p-a.p);upIdx=srt.length?(upIdx%srt.length+srt.length)%srt.length:0;
 $('upL').innerHTML=items.length?big(srt[upIdx],items.length,upIdx):ghost('Chọn vật phẩm bạn muốn nâng cấp');
 $('upPick').hidden=!!items.length;$('upClr').hidden=!items.length;$('upClr').disabled=busy;
 $('chs').disabled=busy||!c;
 $('upR').innerHTML=upT?big(upT,1,0):ghost('Chọn vật phẩm bạn muốn nhận');
 $('upIn').innerHTML=items.length?`<span>${items.length} vật phẩm</span><b>${money(sm)}</b>`:'<span>Chưa chọn gì</span><b>$0.00</b>';
 $('upInvN').textContent=st.inv.length+' món';
 [...$('mults').children].forEach(b=>b.classList.toggle('on',+b.dataset.m===upM));
 $('upBtn').disabled=busy||!(upSel.length&&upT&&c>0)}
function renderUp(){upSel=upSel.filter(id=>st.inv.some(x=>x.id===id));const s=upSum();if(upT&&upT.p<=s){upT=null;upM=null}
 $('upInv').innerHTML=st.inv.length?st.inv.map(x=>card(x,{pick:upSel.includes(x.id),attr:`data-u="${x.id}" tabindex="0"`})).join(''):'<div class="empty">Chưa có vật phẩm để nâng cấp.<a class="btn pri sm" href="index.html">Mở hòm</a></div>';
 const q=$('upQ').value.trim().toLowerCase();
 const list=CAT.filter(x=>x.p>s&&(!q||S[x.k].n.toLowerCase().includes(q))).slice(0,240);
 $('upCat').innerHTML=list.length?list.map(x=>card(x,{pick:upT&&upT.id===x.id,attr:`data-t="${x.id}" tabindex="0"`})).join(''):'<div class="empty">Không có skin nào khớp, thử từ khóa khác.</div>';drawWheel()}
const pickMult=m=>{const s=upSum();if(!s){toast('Chọn vật phẩm trước');return}const want=s*m;upM=m;upT=CAT.filter(x=>x.p>s).reduce((b,x)=>!b||Math.abs(x.p-want)<Math.abs(b.p-want)?x:b,null);renderUp()};
$('upInv').onclick=e=>{const b=e.target.closest('[data-u]');if(!b||busy)return;const id=+b.dataset.u;upSel=upSel.includes(id)?upSel.filter(x=>x!==id):upSel.length<MAXU?[...upSel,id]:(toast('Tối đa '+MAXU+' vật phẩm'),upSel);if(upM)pickMult(upM);else renderUp()};
$('upCat').onclick=e=>{const b=e.target.closest('[data-t]');if(!b||busy)return;upT=CAT.find(x=>x.id===b.dataset.t);upM=null;renderUp()};
$('mults').onclick=e=>{const b=e.target.closest('[data-m]');if(b&&!busy)pickMult(+b.dataset.m)};
$('upRand').onclick=()=>{if(busy)return;if(!st.inv.length){toast('Kho đồ trống');return}upSel=[st.inv[Math.floor(rnd()*st.inv.length)].id];upM?pickMult(upM):renderUp()};
$('upAll').onclick=()=>{if(busy)return;if(!st.inv.length){toast('Kho đồ trống');return}upSel=[...st.inv].sort((a,b)=>b.p-a.p).slice(0,MAXU).map(x=>x.id);upM?pickMult(upM):renderUp()};
// Tìm skin: chờ ngừng gõ 120ms mới dựng lại danh sách (tới 240 thẻ)
let qT;$('upQ').oninput=()=>{clearTimeout(qT);qT=setTimeout(renderUp,120)};
$('upClr').onclick=()=>{if(busy)return;upSel=[];upT=null;upM=null;upIdx=0;renderUp()};
$('upL').onclick=e=>{if(busy)return;const b=e.target.closest('[data-cy]');if(b){upIdx+=+b.dataset.cy;drawWheel()}else if(e.target.closest('[data-x]')){upSel=[];upT=null;upM=null;upIdx=0;renderUp()}};
$('upR').onclick=e=>{if(!busy&&e.target.closest('[data-x]')){upT=null;upM=null;renderUp()}};
// Thanh kéo: dời vùng thắng (khu vực kim phải rơi vào), tỉ lệ không đổi
// gộp các sự kiện kéo vào một lần vẽ mỗi khung hình
let arcRaf=0;$('chs').oninput=e=>{upPos=+e.target.value;if(!arcRaf)arcRaf=requestAnimationFrame(()=>{arcRaf=0;drawArc()})};
// RUSH: thắng xong có 30 giây để nâng tiếp món vừa nhận
function rushTick(){if(rush.until===Infinity)return;const it=st.inv.find(x=>x.id===rush.id),left=rush.until-Date.now();
 if(!it||left<=0){rush={id:null,until:0,n:0};clearInterval(rushT);rushT=null;$('rush').hidden=true;$('gaugeBox').classList.remove('rushy');return}
 const s=Math.ceil(left/1000),key=it.id+'|'+rush.n;
 // chỉ dựng lại khung RUSH khi đổi món/chuỗi; mỗi giây chỉ cập nhật chữ đồng hồ
 if($('rush').dataset.key!==key){$('rush').dataset.key=key;
  $('rush').innerHTML=`<b class="rt"></b><img src="${S[it.k].img}" alt=""><div><small>Nâng cấp ${S[it.k].n}</small><span>${rush.n>1?`<em>🔥RUSH x${rush.n}</em> · nâng tiếp để giữ chuỗi!`:'Để bắt đầu <em>🔥RUSH!</em>'}</span></div>`}
 const rt=$('rush').querySelector('.rt'),txt=`00:${String(s).padStart(2,'0')}`;if(rt.textContent!==txt)rt.textContent=txt;
 $('rush').hidden=false}
function startRush(it,cont){rush={id:it.id,until:Date.now()+30000,n:cont?rush.n+1:1};clearInterval(rushT);rushT=setInterval(rushTick,250);rushTick()}
// Các kiểu giảm tốc của kim: lao nhanh rồi phanh gấp / chậm đều / phanh dài, hồi hộp ở cuối
const SPIN_EASE=['cubic-bezier(.12,.75,.1,1)','cubic-bezier(.2,.6,.25,1)','cubic-bezier(.05,.9,.15,1)','cubic-bezier(.3,.4,.1,1)'];
$('upBtn').onclick=()=>{const c=upCh(),win=rnd()<c,g=$('gaugeBox'),inRush=rush.id!=null&&upSel.includes(rush.id)&&rush.until>Date.now();if(inRush)rush.until=Infinity;busy=true;$('upBtn').disabled=true;g.classList.remove('win','lose');g.classList.add('spin');
 const stop=(upPos*3.6+(win?rnd()*c*360:c*360+rnd()*(360-c*360)))%360,fast=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // Tốc độ xoay ngẫu nhiên mỗi lượt: số vòng, thời gian và kiểu giảm tốc (không ảnh hưởng kết quả thắng/thua)
 const spin=fast?{turns:1,dur:1,ease:'ease-out'}:{turns:4+Math.floor(rnd()*6),dur:3.2+rnd()*3.3,ease:SPIN_EASE[Math.floor(rnd()*SPIN_EASE.length)]};
 ang=ang-ang%360+360*spin.turns+stop;const nd=$('ndl');nd.style.transitionDuration=spin.dur.toFixed(2)+'s';nd.style.transitionTimingFunction=spin.ease;nd.style.transform=`rotate(${ang}deg)`;
 // Ghi kết quả vào kho NGAY khi bấm: tải lại trang giữa lúc quay không thể "chơi lại" hay giữ lại đồ đã đặt
 const lost=upItems(),it=win?{id:st.uid++,k:upT.k,w:upT.w,st:false,p:upT.p}:null;
 st.inv=st.inv.filter(x=>!upSel.includes(x.id));if(it){st.inv.unshift(it);st.best=Math.max(st.best,it.p)}save();
 setTimeout(()=>{g.classList.remove('spin');
  if(win){const s=S[it.k],[w,k]=shortN(s.n);$('gWin').innerHTML=`<span class="gw-p">+${money(it.p)}</span><img src="${s.img}" alt="${s.n}"><small>${w}</small><b>${k||''}</b><em>${WEAR[it.w][1]}</em>`}
  g.classList.add(win?'win':'lose');upSel=[];
  setTimeout(()=>{busy=false;g.classList.remove('win','lose');
   if(win){upSel=[it.id];upIdx=0;startRush(it,inRush);showWin([it],'Nâng cấp thành công!','Đổi '+lost.length+' vật phẩm · cơ hội '+(c*100).toFixed(3)+'%')}
   else{if(inRush)rush.until=0;rushTick();showWin([],'Nâng cấp thất bại','Mất '+money(lost.reduce((a,x)=>a+x.p,0))+' · cơ hội '+(c*100).toFixed(3)+'%')}
   upT=null;upM=null;renderUp()},win?1700:1100)},(spin.dur+.1)*1000)};
// Khởi động trang. ?sel=1,2,3 là các món được gửi từ hộp kết quả mở hòm (nút "Nâng cấp tất cả")
{const q=new URLSearchParams(location.search).get('sel');if(q){upSel=q.split(',').map(Number).filter(id=>st.inv.some(x=>x.id===id)).slice(0,MAXU);history.replaceState(null,'',location.pathname)}}
renderUp();
