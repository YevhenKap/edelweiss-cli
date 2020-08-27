/** Register service worker, if it is supported by browser. */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service_worker.js')
        .then((registration) =>
          console.log(
            'Service worker is registered. Scope is ' + registration.scope
          )
        )
        .catch((error) =>
          console.error(
            'Registration of service worker is failed with ' + error
          )
        );
    });
  }
}
