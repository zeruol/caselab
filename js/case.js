// Trang mở hòm
let cur=null,n=1;
function openCase(i){cur=CASES[i];document.title=cur.n+' – CaseLab';$('caseName').textContent=cur.n;updPrice();$('reelBox').innerHTML=`<div class="idle">${caseArt(cur)}</div>`;
 $('odds').innerHTML=[...cur.items].sort((a,b)=>S[b.k].p-S[a.k].p).map(x=>card({k:x.k,p:S[x.k].p},{ch:(x.ch*100).toFixed(x.ch<.01?3:2)+'%'+(x.b?' <b class="up">▲+1%</b>':'')})).join('')}
function updPrice(){$('casePrice').textContent=money(cur.price);$('openBtn').textContent=`Mở ${n>1?n+' hòm · ':''}${money(cur.price*n)}`}
$('cnt').onclick=e=>{const b=e.target.closest('button');if(!b||busy)return;n=+b.textContent;[...$('cnt').children].forEach(x=>x.classList.toggle('on',x===b));updPrice()};
$('openBtn').onclick=()=>{
 const cost=Math.round(cur.price*n*100)/100;
 if(st.bal<cost){toast('Không đủ số dư, hãy nạp thêm');openDep();return}
 busy=true;$('openBtn').disabled=true;st.bal-=cost;st.spent+=cost;bal();
 const wins=Array.from({length:n},()=>make(roll(cur)));
 const fast=$('fast').checked,dur=fast?1.4:6;
 const box=$('reelBox');box.innerHTML=`<div class="reels n${n}">${wins.map(()=>'<div class="reel"><div class="strip"></div></div>').join('')}</div>`;
 const reels=[...box.querySelectorAll('.reel')];
 reels.forEach((r,j)=>{const arr=Array.from({length:60},(_,q)=>q===50?wins[j]:make(roll(cur)));const strip=r.firstChild;strip.innerHTML=arr.map(x=>card(x)).join('');
  requestAnimationFrame(()=>{const c=strip.children[50],step=c.offsetWidth+6,w=c.offsetWidth;strip.style.top=(r.clientHeight-c.offsetHeight)/2+'px';
   const target=50*step-r.clientWidth/2+w/2+(rnd()-.5)*w*.8;
   strip.style.transition='none';strip.style.transform='translateX(0)';strip.offsetWidth;
   strip.style.transition=`transform ${dur+j*.15}s cubic-bezier(.08,.6,.12,1)`;strip.style.transform=`translateX(${-target}px)`})});
 setTimeout(()=>{wins.forEach(w=>{st.inv.unshift(w);st.won+=w.p;st.best=Math.max(st.best,w.p)});st.opened+=n;save();busy=false;$('openBtn').disabled=false;showWin(wins,'Bạn nhận được',cur.n);},(dur+n*.15)*1000+300);
};
// Trang được mở bằng html/case.html?id=<số hòm>
{const q=new URLSearchParams(location.search).get('id'),i=q===null?-1:+q;if(CASES[i])openCase(i);else location.replace(pageUrl('cases'))}
