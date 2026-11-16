// Dải drop trực tiếp (giả lập)
function feed(loop=true){const c=CASES[Math.floor(rnd()**1.6*CASES.length)],it=make(roll(c)),s=S[it.k],f=$('feed');
 f.insertAdjacentHTML('afterbegin',`<div class="mini" style="--rc:${RAR[s.r][1]}" title="${s.n} · ${c.n}">${gun(s)}<span>${shortN(s.n)[1]}</span><b style="background:${RAR[s.r][1]}"></b></div>`);
 while(f.children.length>16)f.lastChild.remove();if(loop)setTimeout(feed,1500+rnd()*2500)}
