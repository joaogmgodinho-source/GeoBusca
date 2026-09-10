const CACHE_NAME = 'geobusca-v1';

// Liste aqui todos os arquivos que devem ser armazenados em cache
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon_192x192.png',
  './icons/icon_512x512.png',
  './style.css',
  './index.js',
  './resultado.js',
  './resultado.html',
  './script.js',
  // Adicione aqui seus arquivos CSS, JS ou imagens (ex: './style.css', './script.js')
];

// Instalação do Service Worker e salvamento no Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cache aberto com sucesso');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Apagando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta requisições de rede (Carrega do cache primeiro, depois rede)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});