const CACHE_NAME = 'pwa-app-cache-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(['/']);
      cache.add('offline.html');
      cache.add('output.css');
      // cache.add('../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const fetchResponse = await fetch(event.request);

        if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
          cache.put(event.request, fetchResponse.clone());
        }

        return fetchResponse;
      } catch (e) {
        // const cachedResponse = await cache.match(event.request);
        const cachedResponse = await cache.match('offline.html');

        return cachedResponse;
      }
    })()
  );
});
