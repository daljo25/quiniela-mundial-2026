// Minimal service worker for Quiniela PWA.
// Goal: make the app installable and keep the shell navigable when the
// network flakes. Intentionally conservative — we don't want to cache
// prediction data or live scores because staleness there is worse than
// a spinner.

const CACHE = 'quiniela-shell-v3'
const SHELL = ['/']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL)).catch(() => undefined)
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // Never cache API calls — scores, predictions, and auth must be fresh.
  if (url.pathname.startsWith('/api/')) return

  // Exclude static assets from being intercepted as 'navigate' or cached as HTML
  if (
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg')
  ) {
    return
  }

  // Network-first for navigations with a cached-shell fallback, so users get
  // at least a working page when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/').then(r => r || Response.error()))
    )
    return
  }

  // Stale-while-revalidate for same-origin static assets, but do not cache
  // framework assets or chunks. Those can change between deploys and stale
  // versions can break hydration / RSC loading in Next 16.
  if (url.origin === self.location.origin) {
    if (
      url.pathname.startsWith('/_next/') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.json') ||
      url.pathname.endsWith('.map')
    ) {
      return
    }

    event.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(req)
        const fetchPromise = fetch(req)
          .then(res => {
            if (res.ok) cache.put(req, res.clone())
            return res
          })
          .catch(() => cached || Response.error())
        return cached || fetchPromise
      })
    )
  }
})
