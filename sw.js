const CACHE_NAME='gamir-v15';
const ASSETS=['/','index.html','/manifest.json','/icon-192x192.png','/icon-512x512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.url.includes('google.com')||e.request.url.includes('script.google.com')){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));}else{e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));}});
