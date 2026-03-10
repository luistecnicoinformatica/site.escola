// Service Worker - Cachear arquivos para funcionar offline
const CACHE_NAME = 'site-v1';
const urlsToCache = [
  '/',
  '/sobre.html',
  '/contatos.html',
  '/site.css',
  '/contatos.css',
  '/site.js',
  '/img/logo.jpg',
  '/img/fachada.jpg'
];

// Instalar e cachear arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Buscar do cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Limpar cache antigo
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