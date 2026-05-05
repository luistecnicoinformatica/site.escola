const CACHE_NAME = 'site-v2';

const urlsToCache = [
  '/site.escola/',
  '/site.escola/index.html',
  '/site.escola/sobre.html',
  '/site.escola/contatos.html',
  '/site.escola/imagens.html',
  '/site.escola/index.css',
  '/site.escola/index.js',
  '/site.escola/img.logodiva.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
