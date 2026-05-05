const CACHE_NAME = 'site-v2';

const urlsToCache = [
  '/site.escola/',
  '/site.escola/index.html',
  '/site.escola/sobre.html',
  '/site.escola/contatos.html',
  '/site.escola/imagens.html',
  '/site.escola/index.css',
  '/site.escola/index.js',
  '/site.escola/img/logodiva.jpg'
];

// INSTALL - cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );

  // ativa imediatamente sem precisar recarregar várias vezes
  self.skipWaiting();
});

// FETCH - funcionamento offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // se existir no cache, usa
      if (response) return response;

      // senão tenta buscar na internet
      return fetch(event.request).catch(() => {
        // fallback: se for navegação, volta para home
        if (event.request.mode === 'navigate') {
          return caches.match('/site.escola/index.html');
        }
      });
    })
  );
});

// ACTIVATE - limpa versões antigas do cache
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

  // força controle imediato do site
  self.clients.claim();
});
