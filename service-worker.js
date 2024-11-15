const CACHE_NAME = 'athena-pdf-viewer-cache-v2'; 
const urlsToCache = [
  '/',
  'index.html',
  'athena-logo.png', 
  '1044_Market.pdf',
  'Speed_Cushions.pdf',
  'HCC3.pdf',
  'https://documentcloud.adobe.com/view-sdk/main.js', 
  // Consider downloading Roboto font files and caching them locally
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
    fetch(event.request) // Try network first
      .then(function(response) {
        // Cache the new response (for next time)
        const responseToCache = response.clone(); 
        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(function() {
        // Network request failed, try to get it from the cache.
        return caches.match(event.request);
      })
  );
});
