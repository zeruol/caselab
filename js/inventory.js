// Kho đồ
let sortHi=true;
function renderInv(){const a=[...st.inv].sort((x,y)=>sortHi?y.p-x.p:y.id-x.id);const tot=st.inv.reduce((s,x)=>s+x.p,0);
 $('invSum').innerHTML=`<div><small>Vật phẩm</small><b>${st.inv.length}</b></div><div><small>Tổng giá trị</small><b>${money(tot)}</b></div><div><small>Đã mở</small><b>${st.opened}</b></div><div><small>Drop tốt nhất</small><b>${money(st.best)}</b></div>`;
 $('invGrid').innerHTML=a.length?a.map(x=>card(x,{sell:1})).join(''):'<div class="empty" style="grid-column:1/-1">Kho đồ trống. Mở vài hòm để có vật phẩm.</div>';
 $('sellAll').disabled=!a.length;$('sortBtn').textContent='Sắp xếp: '+(sortHi?'giá cao':'mới nhất')}
$('invGrid').onclick=e=>{const b=e.target.closest('[data-sell]');if(b)sellIds([+b.dataset.sell])};
$('sortBtn').onclick=()=>{sortHi=!sortHi;renderInv()};
$('sellAll').onclick=()=>{const t=st.inv.reduce((s,x)=>s+x.p,0);confirmBox('Bán tất cả?',`${st.inv.length} vật phẩm, nhận ${money(t)}`,()=>sellIds(st.inv.map(x=>x.id)))};
$('resetBtn').onclick=()=>confirmBox('Đặt lại dữ liệu?','Số dư về $50, kho đồ và thống kê bị xóa.',()=>{st={bal:50,inv:[],opened:0,best:0,spent:0,won:0,uid:1};bal();renderInv();toast('Đã đặt lại')});
renderInv();
