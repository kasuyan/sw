// Cacheの登録
var CACHE_NAME = "my-cache-v2";
var urlsToCache = ["/css/main.css", "/scripts/main.js"];

self.addEventListener("install", function(event) {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("caches", caches);
      console.log("Open Cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cacheを返却くする
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("caches", caches);
      console.log("event.request", event.request);
      console.log("response", response);
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// 更新時にキャッシュを消す１
self.addEventListener("activate", function(event) {
  console.log("activate");
});
