// Trang chủ: banner, thống kê, danh sách hòm
function renderHero(){$('heroStats').innerHTML=`<div><small>Hòm đã mở</small><b>${st.opened}</b></div><div><small>Drop tốt nhất</small><b>${money(st.best)}</b></div><div><small>Lãi / lỗ</small><b class="${st.won-st.spent<0?'neg':'pos'}">${money(st.won-st.spent)}</b></div><div><small>Kho đồ</small><b>${st.inv.length} món</b></div>`}
const BN=[
 {t:'Săn Rồng Huyền Thoại',d:'AWP Dragon Lore đang chờ trong hòm Huyền thoại.',b:'Mở hòm Huyền thoại',img:[30,25],c:'#eb4b4b',go:()=>goPage('case','?id=8')},
 {t:'Nâng cấp lên ×20',d:'Đặt skin rẻ, chọn mục tiêu đắt gấp nhiều lần và thử vận may.',b:'Thử nâng cấp',img:[33,32],c:'#8847ff',go:()=>goPage('upgrade')},
 {t:'Hợp đồng đổi đồ',d:'Gộp 3–10 skin thừa để nhận một món trị giá tới 4 lần.',b:'Ký hợp đồng',img:[37,38],c:'#4b69ff',go:()=>goPage('contract')}];
let bi=0,bt;
$('bnTrack').innerHTML=BN.map((x,i)=>`<div class="bn-s" style="--c:${x.c}"><div class="bn-txt"><h1>${x.t}</h1><p>${x.d}</p><button class="btn pri sk big" data-bn="${i}">${x.b}</button></div><div class="bn-art">${x.img.map(k=>gun(S[k])).join('')}</div></div>`).join('');
$('bnDots').innerHTML=BN.map((_,i)=>`<button aria-label="Banner ${i+1}" data-d="${i}"></button>`).join('');
function bnGo(i){bi=(i+BN.length)%BN.length;$('bnTrack').style.transform=`translateX(-${bi*100}%)`;[...$('bnDots').children].forEach((d,j)=>d.classList.toggle('on',j===bi));clearTimeout(bt);bt=setTimeout(()=>bnGo(bi+1),6000)}
$('bnPrev').onclick=()=>bnGo(bi-1);$('bnNext').onclick=()=>bnGo(bi+1);
$('bnDots').onclick=e=>{const d=e.target.closest('[data-d]');if(d)bnGo(+d.dataset.d)};
$('bnTrack').onclick=e=>{const b=e.target.closest('[data-bn]');if(b)BN[+b.dataset.bn].go()};
bnGo(0);
const GROUPS=[['Tăng tỉ lệ +1%',[14,15,16,17,18]],['Hòm mới',[9,10,11,12,13]],['Giá rẻ',[0,1,5,2]],['Phổ biến',[4,3,6]],['Cao cấp',[7,8]]];
let gSel='all';
const caseCard=c=>`<a class="case" style="--c:${c.c}" href="${PAGES.case}?id=${c.i}">${c.boost?'<span class="tag">▲ +1% đồ hiếm</span>':''}${caseArt(c)}<h3>${c.n}</h3><span class="price sk">${money(c.price)}</span></a>`;
function renderCases(){$('caseGroups').innerHTML=GROUPS.map((g,i)=>gSel==='all'||+gSel===i?`<div class="gh"><h2>${g[0]}</h2><span>${g[1].length} hòm</span></div><div class="grid">${g[1].map(k=>caseCard(CASES[k])).join('')}</div>`:'').join('')}
document.querySelector('.tabs2').onclick=e=>{const b=e.target.closest('[data-g]');if(!b)return;gSel=b.dataset.g;document.querySelectorAll('.tabs2 button').forEach(x=>x.classList.toggle('on',x===b));renderCases()};
renderCases();
renderHero();
