const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache files using Workbox manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache for HTML pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Warm up cache with essential pages
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigation requests (HTML pages)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache CSS and JS files using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => {
    return (
      // CSS
      request.destination === 'style' ||
      // JavaScript
      request.destination === 'script'
    );
  },
  new StaleWhileRevalidate({
    cacheName: 'static-resources', // Cache for static assets
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Limit the number of cached assets
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days
      }),
    ],
  })
);

// Cache images using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'my-image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Limit cache entries
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
      }),
    ],
  })
);

// Implement offline fallback
offlineFallback({
  pageFallback: '/offline.html', // Fallback page when offline
});
