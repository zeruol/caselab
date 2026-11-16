// Dữ liệu tĩnh: độ hiếm, skin, độ mòn, danh sách hòm
const RAR={consumer:['Phổ thông','#b0c3d9'],industrial:['Công nghiệp','#5e98d9'],milspec:['Quân dụng','#4b69ff'],restricted:['Hạn chế','#8847ff'],classified:['Tuyệt mật','#d32ce6'],covert:['Bí mật','#eb4b4b'],gold:['Cực hiếm','#e4ae39']};
const S=[
['P250 | Sand Dune','pistol','consumer',.05],['Nova | Predator','rifle','consumer',.06],['MP9 | Storm','smg','industrial',.09],['Glock-18 | Sand Dune','pistol','industrial',.12],
['MP7 | Mischief','smg','milspec',.25],['P90 | Elite Build','smg','milspec',.3],['Tec-9 | Isaac','pistol','milspec',.35],['Galil AR | Rocket Pop','rifle','milspec',.4],['MAC-10 | Pipe Down','smg','milspec',.45],['FAMAS | Valence','rifle','milspec',.5],['USP-S | Torque','pistol','milspec',.6],
['P2000 | Fire Elemental','pistol','restricted',2.1],['M4A1-S | Basilisk','rifle','restricted',2.6],['AWP | Atheris','awp','restricted',3.2],['Desert Eagle | Kumicho Dragon','pistol','restricted',3.8],['AK-47 | Elite Build','rifle','restricted',1.6],['UMP-45 | Primal Saber','smg','restricted',1.9],
['AK-47 | Redline','rifle','classified',12],['M4A4 | Desolate Space','rifle','classified',9],['AWP | Hyper Beast','awp','classified',18],['USP-S | Kill Confirmed','pistol','classified',22],['Glock-18 | Water Elemental','pistol','classified',7],['Desert Eagle | Code Red','pistol','classified',15],
['AK-47 | Vulcan','rifle','covert',95],['M4A4 | The Emperor','rifle','covert',45],['AWP | Asiimov','awp','covert',120],['M4A1-S | Hyper Beast','rifle','covert',28],['AK-47 | Fire Serpent','rifle','covert',650],['AWP | Lightning Strike','awp','covert',210],['Desert Eagle | Blaze','pistol','covert',480],['AWP | Dragon Lore','awp','covert',9500],['AK-47 | Wild Lotus','rifle','covert',4200],
['★ Karambit | Doppler','knife','gold',1100],['★ Butterfly Knife | Fade','knife','gold',2600],['★ M9 Bayonet | Tiger Tooth','knife','gold',900],['★ Huntsman Knife | Slaughter','knife','gold',280],['★ Navaja Knife | Case Hardened','knife','gold',110],['★ Sport Gloves | Vice','gloves','gold',3200],['★ Driver Gloves | King Snake','gloves','gold',650],['★ Hand Wraps | Overprint','gloves','gold',160],['★ Karambit | Gamma Doppler','knife','gold',2100],['★ Shadow Daggers | Ultraviolet','knife','gold',95]
].map(([n,t,r,p],i)=>({i,n,t,r,p}));
const WEAR=[['FN','Factory New',1,.15],['MW','Minimal Wear',.85,.25],['FT','Field-Tested',.65,.35],['WW','Well-Worn',.55,.1],['BS','Battle-Scarred',.45,.15]];
const EMUL=WEAR.reduce((a,w)=>a+w[2]*w[3],0)*(.9+.1*1.6);
const EDGE=.88;
const CASES=[
['Khởi đầu','#5e98d9',[0,1,2,3,4,5,6,7,15,17]],['Ngân sách','#4b69ff',[2,3,4,5,8,9,10,11,16,21,26]],['Rực lửa','#ff7a2a',[8,9,11,14,15,22,23,29,35]],
['Bắn tỉa','#3fd0c9',[10,12,13,19,25,28,30]],['Kalash','#d32ce6',[7,12,15,16,17,18,20,23,27,31]],['Bóng đêm','#8847ff',[6,10,14,20,21,22,26,24,36,41]],
['Găng tay','#b6f23a',[12,13,18,19,26,25,39,38,37]],['Dao vàng','#e4ae39',[17,19,20,23,25,36,35,34,32,40,33]],['Huyền thoại','#eb4b4b',[23,25,27,28,29,31,30,33,37,40]],
// Hòm mới có ảnh riêng (img/cases/)
['Rồng Vàng','#e4ae39',[13,14,19,22,25,28,29,30,34,40],'img/cases/1.webp'],['Samurai Anh Đào','#4fd8ff',[11,12,15,16,18,20,21,22,24,26],'img/cases/2.webp'],
['Băng Giá','#9fd4ff',[11,12,13,14,16,19,21,25,28,30],'img/cases/3.webp'],['Spartan Lục Bảo','#2fbf71',[11,14,15,16,17,18,20,23,27,31],'img/cases/4.webp'],
['Đấu Trường Spartan','#d4314b',[32,33,34,35,36,37,38,39,40,41],'img/cases/5.webp'],
// Hòm tăng tỉ lệ (tham số thứ 5 = 1): 3 món đắt nhất được +1% tỉ lệ rơi, phần cộng thêm lấy bớt đều từ các món còn lại
['Cổ Đại','#3fbf7f',[17,22,19,20,26,24,23,41,36,39],'img/cases/6.webp',1],['Kẹo Ngọt','#ff7ac8',[21,18,17,19,26,25,35,33],'img/cases/7.webp',1],
['Steampunk','#c9963d',[17,20,22,24,23,25,36,29,38,34],'img/cases/8.webp',1],['Hacker Lượng Tử','#3fe0d0',[18,19,26,24,25,28,41,21,40,37],'img/cases/9.webp',1],
['Arcane','#a35cff',[20,22,19,26,24,23,41,36,28,32,40,33],'img/cases/10.webp',1]
].map(([n,c,ids,img,boost],i)=>{const inv=ids.reduce((a,k)=>a+1/S[k].p,0);const items=ids.map(k=>({k,ch:(1/S[k].p)/inv}));
 if(boost){const top=[...items].sort((a,b)=>S[b.k].p-S[a.k].p).slice(0,3),rest=items.filter(x=>!top.includes(x)),rs=rest.reduce((a,x)=>a+x.ch,0);
  rest.forEach(x=>x.ch-=.01*top.length*x.ch/rs);top.forEach(x=>{x.ch+=.01;x.b=1})}
 const ev=items.reduce((a,x)=>a+x.ch*S[x.k].p,0)*EMUL;return{i,n,c,img,boost:!!boost,items,price:Math.max(.1,Math.round(ev/EDGE*100)/100)}});
