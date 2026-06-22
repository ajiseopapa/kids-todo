// ==========================================================
// 일과매니저 - 서비스 워커 (오프라인에서도 앱처럼 실행되게 해줌)
// ==========================================================
const CACHE_NAME = 'ilgwa-manager-v1';

// 우리 앱 자체 파일들(같은 출처)만 캐싱합니다.
// 외부 CDN(tailwind, fontawesome 등)은 캐싱 대상에서 빼서
// 설치 단계에서 실패할 가능성을 없앴습니다. (정상 인터넷 환경에선 그대로 로드됨)
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './favicon.ico',
  './icons/icon-16.png',
  './icons/icon-32.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 캐시 우선, 없으면 네트워크 (네트워크 응답은 다음을 위해 캐시에 저장)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // 같은 출처(우리 파일)만 캐시에 추가 (CDN 등 외부 리소스는 건드리지 않음)
          if (event.request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // 오프라인이고 캐시도 없으면 그냥 실패
    })
  );
});
