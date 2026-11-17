// Phần khung dùng chung cho mọi trang: header, dải drop, hộp thoại, toast, footer.
// Nạp ĐỒNG BỘ ngay sau <body> (không defer) để header có mặt trước lần vẽ đầu tiên, không bị nháy.
// Sửa header/hộp thoại ở đây là áp dụng cho cả 5 trang.
(()=>{
const top=`
<header>
  <a class="logo" href="index.html"><i></i>CaseLab</a>
  <nav id="nav">
    <a href="index.html" data-t="cases">Mở hòm</a>
    <a href="html/upgrade.html" data-t="upgrade">Nâng cấp</a>
    <a href="html/contract.html" data-t="contract">Hợp đồng</a>
    <a href="html/inventory.html" data-t="inv">Kho đồ</a>
  </nav>
  <div class="wallet">
    <div class="bal" id="bal">$0.00</div>
    <button class="btn pri" id="depBtn">+ Nạp tiền</button>
  </div>
</header>
<div class="feed" id="feed" aria-label="Drop trực tiếp (mô phỏng)"></div>
<div class="modal" id="mDep" role="dialog" aria-modal="true" aria-labelledby="depT"><form class="box" id="depForm">
  <h2 id="depT">Nạp tiền ảo</h2><p class="note">Chọn mức nạp hoặc nhập số tùy ý.</p>
  <div class="amts" id="amts"><button type="button">5</button><button type="button">10</button><button type="button" class="on">25</button><button type="button">50</button><button type="button">100</button><button type="button">500</button></div>
  <input type="number" id="amtIn" min="0.01" step="0.01" value="25" aria-label="Số tiền">
  <div class="row actions mt16"><button type="button" class="btn" data-close>Hủy</button><button class="btn pri" id="depOk">Nạp</button></div>
</form></div>
<div class="modal" id="mWin" role="dialog" aria-modal="true" aria-labelledby="winT"><div class="box">
  <h2 id="winT">Bạn nhận được</h2><p class="note" id="winS"></p>
  <div class="items" id="winItems"></div>
  <div class="row actions" id="winBtns"></div>
</div></div>
<div class="modal" id="mConf" role="dialog" aria-modal="true" aria-labelledby="confT"><div class="box box-sm">
  <h2 id="confT"></h2><p class="note" id="confS"></p>
  <div class="row actions mt14"><button class="btn" data-close>Hủy</button><button class="btn pri" id="confOk">Đồng ý</button></div>
</div></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
document.currentScript.insertAdjacentHTML('afterend',top);
// footer nằm sau <main>, nên chèn khi trang đã đọc xong
addEventListener('DOMContentLoaded',()=>document.body.insertAdjacentHTML('beforeend',
  '<footer>Trang mô phỏng giải trí, không liên kết với Valve hay bất kỳ trang mở hòm nào. Tiền và vật phẩm đều ảo; dải drop phía trên là dữ liệu giả lập.</footer>'));
})();
