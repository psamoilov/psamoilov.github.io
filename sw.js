const c='esp-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(c).then(cache=>cache.addAll(['/','/manifest.json']))));
self.addEventListener('fetch',e=>{
if(e.request.url.includes('192.168.11.1')){
e.respondWith(fetch(e.request).catch(()=>new Response('<h2>Device Offline</h2><button onclick="location.reload()">Retry</button>',{headers:{'Content-Type':'text/html'}})))
}else{
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))
}});