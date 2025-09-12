const CACHE_NAME = "tmjmt-cache-v1";
const urlsToCache = [
  "/",
  "/index.js",
  "/styles/global.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/offline.html" // new offline fallback page
];

// Install event – cache all required assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event – clean up old caches if any
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event – serve cached files first, fallback to network, then offline page
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});