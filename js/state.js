// Trạng thái người chơi (localStorage) và logic tạo vật phẩm
let st={bal:0,inv:[],opened:0,best:0,spent:0,won:0,uid:1,bonus:0};
try{const s=JSON.parse(localStorage.getItem('caselab_v1'));if(s)st=Object.assign(st,s)}catch(e){}
if(!st.inv.length&&!st.opened&&!st.bal)st.bal=50;
st.uid=Math.max(st.uid,...st.inv.map(x=>x.id+1),1);
let busy=false; // đang quay hòm / quay nâng cấp
const save=()=>{try{localStorage.setItem('caselab_v1',JSON.stringify(st))}catch(e){}};
const price=(k,w,stt)=>Math.round(S[k].p*WEAR[w][2]*(stt?1.6:1)*100)/100;
const make=k=>{let x=rnd(),w=0;for(;w<4;w++){x-=WEAR[w][3];if(x<0)break}const stt=S[k].t!=='gloves'&&rnd()<.1;return{id:st.uid++,k,w,st:stt,p:price(k,w,stt)}};
// danh mục mọi skin × độ mòn, dùng cho nâng cấp và hợp đồng
const CAT=S.flatMap(s=>[0,1,2,3,4].map(w=>({k:s.i,w,st:false,p:price(s.i,w,false),id:'c'+s.i+'_'+w}))).sort((a,b)=>a.p-b.p);
const roll=c=>{let x=rnd();for(const it of c.items){x-=it.ch;if(x<0)return it.k}return c.items.at(-1).k};
function bal(){st.bal=r2(st.bal);st.spent=r2(st.spent);st.won=r2(st.won);$('bal').textContent=money(st.bal);save()}
// Nhiều tab cùng mở: tab khác lưu thay đổi thì nạp lại dữ liệu ở tab này, tránh hai tab ghi đè nhau
addEventListener('storage',e=>{if(e.key!=='caselab_v1'||!e.newValue||busy)return;
  try{st=Object.assign(st,JSON.parse(e.newValue))}catch(_){return}
  $('bal').textContent=money(st.bal);refresh()});
