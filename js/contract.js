// Hợp đồng
let ctSel=[];
function renderCt(){ctSel=ctSel.filter(id=>st.inv.some(x=>x.id===id));const s=st.inv.filter(x=>ctSel.includes(x.id)).reduce((a,x)=>a+x.p,0);
 $('ctN').textContent=ctSel.length+' / 10';$('ctSum').textContent=money(s);$('ctRange').textContent=ctSel.length?money(s*.25)+' – '+money(s*4):'—';$('ctBtn').disabled=ctSel.length<3;
 $('ctHint').textContent=ctSel.length<3?`Chọn thêm ${3-ctSel.length} vật phẩm bên dưới để ký hợp đồng.`:`Sẵn sàng: ${ctSel.length} vật phẩm sẽ đổi lấy 1 món ngẫu nhiên.`;
 $('ctInv').innerHTML=st.inv.length?st.inv.map(x=>card(x,{pick:ctSel.includes(x.id),attr:`data-u="${x.id}" tabindex="0"`})).join(''):'<div class="empty">Cần ít nhất 3 vật phẩm trong kho để ký hợp đồng.<a class="btn pri sm" href="index.html">Mở hòm</a></div>'}
$('ctInv').onclick=e=>{const b=e.target.closest('[data-u]');if(!b)return;const id=+b.dataset.u;ctSel=ctSel.includes(id)?ctSel.filter(x=>x!==id):ctSel.length<10?[...ctSel,id]:(toast('Tối đa 10 vật phẩm'),ctSel);renderCt()};
$('ctBtn').onclick=()=>{const used=st.inv.filter(x=>ctSel.includes(x.id)),s=used.reduce((a,x)=>a+x.p,0);
 const sg=.8,g=Math.sqrt(-2*Math.log(1-rnd()))*Math.cos(2*Math.PI*rnd()),m=Math.min(4,Math.max(.25,Math.exp(Math.log(.9)-sg*sg/2+sg*g))),want=s*m;
 const pool=CAT.filter(x=>x.p>=s*.25&&x.p<=s*4);const base=(pool.length?pool:CAT).reduce((b,x)=>!b||Math.abs(x.p-want)<Math.abs(b.p-want)?x:b,null);
 const it={id:st.uid++,k:base.k,w:base.w,st:false,p:base.p};st.inv=st.inv.filter(x=>!ctSel.includes(x.id));st.inv.unshift(it);st.best=Math.max(st.best,it.p);ctSel=[];save();renderCt();
 showWin([it],'Hợp đồng hoàn tất','Từ '+used.length+' vật phẩm trị giá '+money(s)+' · x'+(it.p/s).toFixed(2))};
renderCt();
