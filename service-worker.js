/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'mudanzas-miranda-cache-v1';
const ASSETS_TO_CACHE = [
  '/', // Cache the main page
  '/index.html',
  '/css/styles.min.css',
  '/js/bundle.min.js',
  '/img/brand-light.png',
  '/img/favicon.png',
  '/img/og-image.jpg', // Open Graph image
  // Hero images (preload and responsive)
  '/img/camiones-mudanzas-miranda-1200.webp',
  '/img/camiones-mudanzas-miranda-1200.jpg',
  '/img/camiones-mudanzas-miranda-800.webp',
  '/img/camiones-mudanzas-miranda-800.jpg',
  '/img/camiones-mudanzas-miranda-600.webp',
  '/img/camiones-mudanzas-miranda-600.jpg',
  // Service images (lazy loaded, but good to cache)
  '/img/mudanza-residencial-800.jpg',
  '/img/mudanza-residencial-400.webp',
  '/img/mudanza-residencial-800.webp',
  '/img/mudanza-oficina-800.jpg',
  '/img/mudanza-oficina-400.webp',
  '/img/mudanza-oficina-800.webp',
  '/img/mudanza-combinada-800.jpg',
  '/img/mudanza-combinada-400.webp',
  '/img/mudanza-combinada-800.webp',
  '/img/logistica-integral.jpg',
  '/img/logistica-integral.webp',
  '/img/servicio-embalaje-800.jpg',
  '/img/servicio-embalaje-800.webp',
  '/img/servicio-guardamuebles-800.jpg',
  '/img/servicio-guardamuebles-800.webp',
  // Route images
  '/img/ruta-gran-mendoza-600.jpg',
  '/img/ruta-gran-mendoza-400.webp',
  '/img/ruta-gran-mendoza-600.webp',
  '/img/ruta-valle-uco-600.jpg',
  '/img/ruta-valle-uco-400.webp',
  '/img/ruta-valle-uco-600.webp',
  '/img/ruta-sur-600.jpg',
  '/img/ruta-sur-400.webp',
  '/img/ruta-sur-600.webp',
  // Font Awesome (CDN)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  // Google Fonts (CDN)
  'https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Raleway:wght@400;500;600;700&display=swap',
  // All local SEO pages
  '/mudanzas-mendoza/mudanzas-ciudad-mendoza.html',
  '/mudanzas-mendoza/mudanzas-general-alvear.html',
  '/mudanzas-mendoza/mudanzas-godoy-cruz.html',
  '/mudanzas-mendoza/mudanzas-guaymallen.html',
  '/mudanzas-mendoza/mudanzas-junin.html',
  '/mudanzas-mendoza/mudanzas-las-heras.html',
  '/mudanzas-mendoza/mudanzas-lujan-de-cuyo.html',
  '/mudanzas-mendoza/mudanzas-maipu.html',
  '/mudanzas-mendoza/mudanzas-malargue.html',
  '/mudanzas-mendoza/mudanzas-rivadavia.html',
  '/mudanzas-mendoza/mudanzas-san-carlos.html',
  '/mudanzas-mendoza/mudanzas-san-martin.html',
  '/mudanzas-mendoza/mudanzas-san-rafael.html',
  '/mudanzas-mendoza/mudanzas-santa-rosa.html',
  '/mudanzas-mendoza/mudanzas-tunuyan.html',
  '/mudanzas-mendoza/mudanzas-tupungato.html',
  '/mudanzas-mendoza/mudanzas-la-paz.html',
];

// Install event: caches the static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch(() => {
        // Caching can fail if the user is offline during the first visit. This is not critical.
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      )),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request)
        .then((networkResponse) => caches.open(CACHE_NAME)
          .then((cache) => {
            if (networkResponse.ok && networkResponse.type === 'basic') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }))
        .catch(() => {
          // Fallback for offline requests not in cache.
        })),
  );
});
