const CACHE_NAME = 'ezikcet-v2'; // bump version!
const ASSETS = [
  '/EziKCET/',           // ← if your repo is github.com/you/EziKCET
  '/EziKCET/index.html',
  '/EziKCET/manifest.json',
  '/EziKCET/icon-192.png',
  '/EziKCET/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
