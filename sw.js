const CACHE_NAME = 'kcet-pwa-v2';  // Changed version to force update
const BASE = '/ezikcet/';

const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'biology.html',
  BASE + 'biologytest.html',
  BASE + 'chemistry.html',
  BASE + 'chemistrytest.html',
  BASE + 'maths.html',
  BASE + 'mathtest.html',
  BASE + 'physics.html',
  BASE + 'physicstest.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Cache addAll failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
