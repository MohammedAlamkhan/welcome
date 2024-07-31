const CACHE_NAME = 'welcome-cache-v1';
const urlsToCache = [
  '/welcome/',
  '/welcome/index.html',
  '/welcome/styles.css',
  '/welcome/script.js',
  '/welcome/icon-192x192.png',
  '/welcome/icon-512x512.png',
  '/welcome/offline.html',
  '/welcome/welcome.html',
  '/welcome/weekendtrip.html',
  '/welcome/places.html',
  '/welcome/culinary.html',
  '/welcome/audio.html',
  '/welcome/getaways/alibaug.html',
  '/welcome/getaways/kamshet.html',
  '/welcome/getaways/kolad.html',
  '/welcome/getaways/lonavala.html',
  '/welcome/getaways/pawna.html',
  '/welcome/culinary/bastian.html',
  '/welcome/culinary/borabora.html',
  '/welcome/culinary/hurrems.html',
  '/welcome/culinary/leopold.html',
  '/welcome/culinary/mitron.html',
  '/welcome/culinary/yauatcha.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .then(() => {
            return cache.addAll([
              // Cache asset folder
              '/welcome/assets/',
              // Cache sounds folder
              '/welcome/sounds/'
            ]);
          });
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // For asset and sound requests, cache on-the-fly
        if (event.request.url.includes('/assets/') || event.request.url.includes('/sounds/')) {
          return fetch(event.request).then(
            (response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        }
        
        return fetch(event.request);
      })
      .catch(() => caches.match('/welcome/offline.html'))
  );
});