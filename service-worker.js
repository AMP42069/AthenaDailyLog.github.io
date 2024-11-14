const CACHE_NAME = 'athena-pdf-viewer-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'athena-logo.png', 
  '1044_Market.pdf',
  'Speed_Cushions.pdf',
  'HCC3.pdf',
  'https://documentcloud.adobe.com/view-sdk/main.js',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});