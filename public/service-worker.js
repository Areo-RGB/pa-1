// Cache name
const CACHE_NAME = 'shadcn-admin-cache-v1';

// Assets to cache initially
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon.png',
  '/images/favicon_light.png',
  '/images/favicon.svg',
  '/images/favicon_light.svg'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with controlled caching
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) return;
  
  // Skip API requests to prevent caching dynamic data unless offline
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // For assets and static content, use cache-first approach
  if (event.request.url.includes('/assets/') || 
      event.request.url.includes('/images/') ||
      PRECACHE_ASSETS.some(asset => event.request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            });
        })
    );
    return;
  }
  
  // For all other requests, use network-first approach
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Fall back to cache if network fails
        return caches.match(event.request);
      })
  );
}); 