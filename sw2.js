const expectedCaches = ["static-v2"];

self.addEventListener("install", event => {
  console.log("V2 installing…");
  event.waitUntil(
    caches.open("static-v2").then(cache => cache.add("/images/cat.png"))
  );
});

self.addEventListener("activate", event => {
  console.log("activate");
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            console.log("key", key);
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        console.log("V2 now ready to handle fetches!");
      })
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == "/images/dog.png") {
    event.respondWith(caches.match("/images/cat.png"));
  }
});
