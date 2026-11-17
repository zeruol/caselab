// Hàm tiện ích dùng chung
const $=id=>document.getElementById(id);
const money=v=>(v<0?'-$':'$')+Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const r2=v=>Math.round(v*100)/100; // làm tròn tiền về cent, tránh sai số kiểu 49.879999…
const rnd=Math.random;
const shortN=n=>n.split(' | ');
const shade=(h,a)=>{const n=parseInt(h.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(a<0?v*(1+a):v+(255-v)*a)));return'#'+[n>>16,n>>8&255,n&255].map(v=>f(v).toString(16).padStart(2,'0')).join('')};
