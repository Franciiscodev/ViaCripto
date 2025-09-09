const CACHE_NAME = 'viacripto-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.1.1/',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/@google/genai@^1.17.0',
  'https://aistudiocdn.com/react-dom@^19.1.1/'
];

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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});