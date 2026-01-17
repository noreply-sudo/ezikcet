const CACHE_NAME = 'kcet-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/biology.html',
  '/biologytest.html',
  '/chemistry.html',
  '/chemistrytest.html',
  '/maths.html',
  '/mathtest.html',
  '/physics.html',
  '/physicstest.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // Add any other assets like CSS/JS if you extract them later
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
