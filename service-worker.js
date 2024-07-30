const CACHE_NAME = 'your-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/offline.html',
  '/welcome.html',
  '/weekendtrip.html',
  '/places.html',
  '/culinary.html',
  '/audio.html',
  '/getaways/alibaug.html',
  '/getaways/kamshet.html',
  '/getaways/kolad.html',
  '/getaways/lonavala.html',
  '/getaways/pawna.html',
  '/culinary/bastian.html',
  '/culinary/borabora.html',
  '/culinary/hurrems.html',
  '/culinary/leopold.html',
  '/culinary/mitron.html',
  '/culinary/yauatcha.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
  '/offline.html',
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
      .catch(() => caches.match('/offline.html'))
  );
});