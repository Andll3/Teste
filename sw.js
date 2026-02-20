const CACHE_NAME = 'agenda-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o Service Worker e limpa caches antigos se necessário
self.addEventListener('activate', (e) => {
  console.log('Service Worker Ativado');
});

// Intercepta as chamadas de rede: tenta o Cache primeiro, depois a Internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});