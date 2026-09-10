const CACHE_NAME = 'GeoBusca';
const ARQUIVOS_PARA_CACHE = [
  './',
  './index.html',
  './resultado.html',
  './index.js',
  './resultado.js',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon_192x192.png',
  './icons/icon_512x512.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );
});

self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      return respostaCache || fetch(evento.request);
    })
  );
});