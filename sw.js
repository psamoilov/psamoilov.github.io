const CACHE_NAME='esp-v1';
const urlsToCache=['./pwa.html','./manifest.json','./icon-152.png','./icon-192.png'];

self.addEventListener('install',event=>{
event.waitUntil(
caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))
);
});

self.addEventListener('fetch',event=>{
if(event.request.url.includes('192.168.11.1')){
event.respondWith(
fetch(event.request).catch(()=>
new Response(`
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ESP Offline</title></head>
<body style="font-family:Arial;text-align:center;padding:50px 20px">
<div style="font-size:60px">📡</div>
<h2>Device Offline</h2>
<p>Check device power & WiFi connection</p>
<button onclick="location.reload()" style="background:#07f;color:#fff;border:0;padding:15px 30px;border-radius:8px;font-size:16px">🔄 Retry</button>
</body>
</html>`,{headers:{'Content-Type':'text/html'}})
)
);
}else{
event.respondWith(
caches.match(event.request).then(response=>response||fetch(event.request))
);
}
});
