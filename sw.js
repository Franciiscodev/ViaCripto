const CACHE_NAME = 'viacripto-cache-v5'; // Bump version to activate new SW and clear old caches
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json'
];

const API_HOSTS_NETWORK_FIRST = [
    'api.frankfurter.app',
    'api.wise.com'
];

// Clean up old caches
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


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Network-first for other API calls (charts, comparison)
  if (API_HOSTS_NETWORK_FIRST.some(host => requestUrl.hostname === host)) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(networkResponse => {
          // If the fetch is successful, cache it for offline use.
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If the network fails, try to get it from the cache.
          return caches.match(event.request).then(response => {
            return response || new Response(JSON.stringify({ error: 'offline' }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Cache-first for all other assets
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Otherwise, fetch from network and cache it
      return fetch(event.request).then(networkResponse => {
        // Don't cache chrome-extension requests
        if (event.request.url.startsWith('chrome-extension://')) {
            return networkResponse;
        }
        
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});