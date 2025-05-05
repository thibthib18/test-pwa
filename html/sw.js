// Service worker for VSD PWA Test
const CACHE_NAME = "vsd-pwa-test-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Install event - cache initial assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files");
      return cache.addAll(ASSETS);
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// Fetch event - return cached assets or fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise try to fetch from network
      return fetch(event.request).then((response) => {
        // Make copy of response
        const responseClone = response.clone();
        // Open cache
        caches.open(CACHE_NAME).then((cache) => {
          // Add new response to cache
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }),
  );
});
