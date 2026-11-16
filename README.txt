CaseLab - web mô phỏng mở hòm CS2 (tiền ảo)

Cấu trúc:
  index.html          trang chủ: danh sách hòm (phải nằm ở thư mục gốc)
  html/               các trang còn lại
    case.html         mở hòm, gọi bằng html/case.html?id=<số hòm 0-8>
    upgrade.html      nâng cấp (?sel=<id,id,...> để chọn sẵn vật phẩm)
    contract.html     hợp đồng
    inventory.html    kho đồ
    (các trang này có <base href="../"> nên mọi đường dẫn css/ js/ img/ tính từ thư mục gốc)
  css/style.css       toàn bộ giao diện
  js/                 mã nguồn
    Dùng chung, trang nào cũng nạp theo thứ tự:
      data.js         dữ liệu tĩnh: độ hiếm, skin, độ mòn, hòm
      utils.js        hàm tiện ích ($, money, shade...)
      state.js        trạng thái người chơi (localStorage), tạo vật phẩm
      ui.js           thẻ vật phẩm, hình hòm, toast, modal nạp tiền/kết quả
      nav.js          đường dẫn giữa các trang, chặn rời trang khi đang quay
      feed.js         dải drop trực tiếp (giả lập)
    Riêng từng trang (nạp trước main.js):
      home.js         index.html
      case.js         html/case.html
      upgrade.js      html/upgrade.html
      contract.js     html/contract.html
      inventory.js    html/inventory.html
    main.js           khởi động phần chung (feed, số dư), luôn nạp cuối
  img/                42 ảnh skin (.webp)
    cases/            ảnh hòm mới 1-10.webp (đã tách nền từ thư mục case/, dùng trong js/data.js)
  server.js    server Node.js tùy chọn, không cần cài thư viện

Cách 1 - Hosting tĩnh (cPanel, Nginx, Apache, GitHub Pages, Netlify, Vercel...):
  Upload index.html cùng các thư mục html/, css/, js/, img/ vào thư mục gốc web (public_html, www...). Không cần server.js.

Cách 2 - VPS có Node.js:
  node server.js            -> http://IP:3000
  PORT=80 node server.js    -> chạy cổng 80 (Linux cần quyền root)
  Chạy nền lâu dài: npm i -g pm2 && pm2 start server.js --name caselab

Lưu ý: số dư và kho đồ lưu trong localStorage trình duyệt của từng người chơi, không có cơ sở dữ liệu trên server.
