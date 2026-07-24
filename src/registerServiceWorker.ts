export function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] ServiceWorker registered with scope:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[SW] New content is available; please refresh.');
                } else {
                  console.log('[SW] Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('[SW] Error during service worker registration:', error);
        });
    });
  } else if ('serviceWorker' in navigator) {
    // In dev mode, still attempt registration for testing if sw.js exists
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW Dev] ServiceWorker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.warn('[SW Dev] Registration skipped or failed:', err);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
