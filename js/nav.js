// Điều hướng giữa các trang (mỗi trang là một file HTML riêng)
const PAGES={cases:'index.html',case:'html/case.html',upgrade:'html/upgrade.html',contract:'html/contract.html',inv:'html/inventory.html'};
const tab=document.body.dataset.page;
const pageUrl=(t,q='')=>new URL(PAGES[t]+q,document.baseURI).href;
function goPage(t,q){location.href=pageUrl(t,q)}
// Hộp kết quả mở hòm -> "Nâng cấp tất cả": mang danh sách id sang trang nâng cấp
const sendToUp=ids=>goPage('upgrade','?sel='+ids.join(','));

document.querySelectorAll('#nav a').forEach(a=>{
  const on=a.dataset.t===tab||(tab==='case'&&a.dataset.t==='cases');
  a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');
});
// Đang quay thì không cho rời trang: tiền đã trừ nhưng vật phẩm chưa vào kho
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a&&busy){e.preventDefault();toast('Đợi lượt quay kết thúc đã')}});
addEventListener('beforeunload',e=>{if(busy){e.preventDefault();e.returnValue=''}});
