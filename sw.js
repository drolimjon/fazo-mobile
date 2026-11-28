/* Fazo Mobile — service worker: офлайн-оболочка приложения и уведомления алертов */
const CACHE = "fazo-m-v11";
const SHELL = ["./", "index.html", "app.js", "trade.js", "draw.js", "lightweight-charts.js", "manifest.webmanifest", "logo.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/icon-180.png", "icons/favicon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// свои файлы: сначала сеть (чтобы обновления приходили сразу), без сети — из кэша; котировки (чужие домены) — только сеть
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(c =>
    fetch(e.request, {cache: "no-cache"}).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })
      .catch(() => c.match(e.request, {ignoreSearch: true}))));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: "window", includeUncontrolled: true}).then(cs => {
    for (const c of cs) if ("focus" in c) return c.focus();
    return self.clients.openWindow("./");
  }));
});
