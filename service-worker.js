const CACHE_NAME = 'welcome-cache-v1';
const urlsToCache = [
  '/welcome/',
  '/welcome/index.html',
  '/welcome/styles.css',
  '/welcome/details.css',
  '/welcome/script.js',
  '/welcome/support.html',
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
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/welcome/offline.html'))
  );
});