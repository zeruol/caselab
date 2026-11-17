// Thành phần giao diện dùng chung: thẻ vật phẩm, hòm, toast, modal
const gun=s=>`<img class="gi" src="${s.img}" alt="${s.n}" loading="lazy" decoding="async">`;
function card(it,o={}){const s=S[it.k],[a,b]=shortN(s.n);return`<div class="it${o.pick?' pick':''}" style="--rc:${RAR[s.r][1]}" ${o.attr||''}>${it.st?'<span class="st">ST™</span>':''}${o.ch!=null?`<span class="ch">${o.ch}</span>`:''}${gun(s)}<div class="nm"><small>${a}</small>${b}</div><span class="pr">${money(it.p)}</span><span class="wr">${it.w!=null?WEAR[it.w][0]:''}</span>${o.sell?`<button class="sell" data-sell="${it.id}">Bán</button>`:''}</div>`}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove('on'),2200)}
let caseUid=0;
const caseArt=c=>{if(c.img)return`<div class="cv cv-img" style="--c:${c.c}"><img class="ci" src="${c.img}" alt="${c.n}" loading="lazy" decoding="async"></div>`;const id='k'+c.i+'_'+(caseUid++),top=c.items.reduce((a,x)=>S[x.k].p>S[a.k].p?x:a).k,second=[...c.items].sort((a,b)=>S[b.k].p-S[a.k].p)[1].k,d=shade(c.c,-.55),m=shade(c.c,-.25),l=shade(c.c,.25);
 const cap=(x,y,fx,fy)=>`<path d="M${x} ${y}h${16*fx}v${6*fy}h${-10*fx}v${10*fy}h${-6*fx}z" fill="url(#mt${id})" stroke="#0007" stroke-width=".6"/>`;
 return`<div class="cv" style="--c:${c.c}"><svg viewBox="0 0 200 150" aria-hidden="true"><defs>
 <linearGradient id="fr${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient>
 <linearGradient id="lt${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${l}"/><stop offset="1" stop-color="${c.c}"/></linearGradient>
 <linearGradient id="mt${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f3f7"/><stop offset=".5" stop-color="#9aa0ad"/><stop offset="1" stop-color="#4b505c"/></linearGradient>
 <radialGradient id="gl${id}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="${c.c}" stop-opacity=".55"/><stop offset="1" stop-color="${c.c}" stop-opacity="0"/></radialGradient></defs>
 <ellipse cx="100" cy="78" rx="98" ry="74" fill="url(#gl${id})"/>
 <ellipse cx="100" cy="137" rx="82" ry="8" fill="#000" opacity=".55"/>
 <path d="M24 64H176Q183 64 183 71V125Q183 134 174 134H26Q17 134 17 125V71Q17 64 24 64Z" fill="url(#fr${id})" stroke="#0009"/>
 <path d="M34 38H166L183 64H17Z" fill="url(#lt${id})" stroke="#0008"/>
 <path d="M34 38H166" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>
 <rect x="17" y="62" width="166" height="11" fill="${d}" opacity=".9"/><path d="M17 73H183" stroke="#fff" stroke-opacity=".18"/>
 <path d="M88 38H112L114 64V134H86V64Z" fill="#fff" opacity=".12"/>
 <path d="M30 84H170M30 120H170" stroke="#000" stroke-opacity=".25"/><path d="M30 85H170M30 121H170" stroke="#fff" stroke-opacity=".08"/>
 ${cap(17,64,1,1)}${cap(183,64,-1,1)}${cap(17,134,1,-1)}${cap(183,134,-1,-1)}
 <rect x="89" y="68" width="22" height="18" rx="3" fill="url(#mt${id})" stroke="#0008"/><rect x="96" y="75" width="8" height="6" rx="1.5" fill="#1a1c22"/>
 <path d="M100 96l13 7.5v15L100 126l-13-7.5v-15z" fill="${d}" stroke="${l}" stroke-width="1.5"/><path d="M100 103l6 3.5v7l-6 3.5-6-3.5v-7z" fill="${l}"/>
 ${[40,60,140,160].map(x=>`<circle cx="${x}" cy="68" r="1.6" fill="url(#mt${id})"/>`).join('')}
 </svg><img class="g2" src="${S[second].img}" alt=""><img class="g1" src="${S[top].img}" alt=""></div>`};

function showWin(items,title,sub,again=true){
 const tot=items.reduce((a,x)=>a+x.p,0),m=$('mWin'),box=m.querySelector('.box');
 // tô màu hộp theo kết quả: thua (không có món nào) / thắng / trúng đồ hiếm (dao, găng, Bí mật)
 const top=items.reduce((b,x)=>!b||x.p>b.p?x:b,null);
 box.classList.toggle('lose',!items.length);box.classList.toggle('rare',!!top&&['gold','covert'].includes(S[top.k].r));
 box.style.setProperty('--rc',top?RAR[S[top.k].r][1]:'#ff4d6d');
 $('winT').textContent=title;$('winS').textContent=items.length?sub+' · tổng '+money(tot):sub;
 $('winItems').innerHTML=items.map(x=>card(x)).join('');
 $('winBtns').innerHTML=(items.length?`<button class="btn" id="wSell">Bán ${items.length>1?'tất cả ':''}+${money(tot)}</button>`:'')+(items.length&&tab==='case'&&again?`<button class="btn" id="wUp">⇈ Nâng cấp tất cả</button>`:'')+`<button class="btn pri" id="wKeep">${tab==='case'&&again?'Mở lại':items.length?'Giữ lại':'Đóng'}</button>`;
 openModal('mWin');
 if(items.length)$('wSell').onclick=()=>{closeModal(m);sellIds(items.map(x=>x.id))};
 if($('wUp'))$('wUp').onclick=()=>{closeModal(m);sendToUp(items.map(x=>x.id))};
 $('wKeep').onclick=()=>{closeModal(m);if(tab==='case'&&again)$('openBtn').click()};
}
// Vẽ lại phần phụ thuộc kho đồ của trang hiện tại (sau khi bán, hoặc khi tab khác đổi dữ liệu).
// Mỗi hàm chỉ tồn tại trên trang của nó, nên chỉ gọi đúng hàm của trang đang mở.
function refresh(){({cases:()=>renderHero(),inv:()=>renderInv(),upgrade:()=>renderUp(),contract:()=>renderCt()})[tab]?.()}
function sellIds(ids){let g=0;st.inv=st.inv.filter(x=>{if(ids.includes(x.id)){g+=x.p;return false}return true});st.bal+=g;bal();toast('Đã bán được '+money(g));refresh()}

// Hộp thoại: mở/đóng, Esc để đóng, trả focus về chỗ cũ
let lastFocus=null;
function openModal(id){lastFocus=document.activeElement;const m=$(id);m.classList.add('on');(m.querySelector('[autofocus],.btn.pri,input')||m).focus?.()}
function closeModal(m){m.classList.remove('on');if(lastFocus&&document.contains(lastFocus))lastFocus.focus?.()}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!busy){const m=document.querySelector('.modal.on');if(m)closeModal(m)}
  // Enter / Space trên thẻ vật phẩm chọn được (tabindex) = bấm chọn
  if((e.key==='Enter'||e.key===' ')&&e.target.matches?.('.sel .it[tabindex]')){e.preventDefault();e.target.click()}
});

// deposit
function openDep(){openModal('mDep')}
$('depBtn').onclick=openDep;
$('amts').onclick=e=>{const b=e.target.closest('button');if(!b)return;[...$('amts').children].forEach(x=>x.classList.toggle('on',x===b));$('amtIn').value=b.textContent};
// form: bấm Nạp hoặc Enter trong ô số tiền đều nạp
$('depForm').onsubmit=e=>{e.preventDefault();const v=r2(parseFloat($('amtIn').value));if(!(v>0)||v>1e6){toast('Nhập số từ 0.01 đến 1,000,000');return}st.bal+=v;bal();closeModal($('mDep'));toast('Đã nạp '+money(v));refresh()};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.closest('.modal')));
document.querySelectorAll('.modal').forEach(m=>m.onclick=e=>{if(e.target===m&&!busy)closeModal(m)});
function confirmBox(t,s,fn){$('confT').textContent=t;$('confS').textContent=s;openModal('mConf');$('confOk').onclick=()=>{closeModal($('mConf'));fn()}}
