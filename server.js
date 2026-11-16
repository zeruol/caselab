// Chạy: node server.js  (mặc định cổng 3000, đổi bằng PORT=8080 node server.js)
const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname,port=process.env.PORT||3000;
const types={'.html':'text/html; charset=utf-8','.webp':'image/webp','.js':'text/javascript','.css':'text/css'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';
  const f=path.join(root,path.normalize(p));
  if(!f.startsWith(root))return res.writeHead(403).end();
  fs.readFile(f,(e,d)=>{if(e)return res.writeHead(404).end('Not found');
    res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream','Cache-Control':p.startsWith('/img/')?'public,max-age=604800':'no-cache'});res.end(d)});
}).listen(port,()=>console.log('CaseLab chạy tại http://localhost:'+port));
