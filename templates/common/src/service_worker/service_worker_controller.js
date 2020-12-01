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

/** Unregister service worker, if it is supported by browser. */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations.map((registration) => registration.unregister())
        )
      )
      .then((succeeds) =>
        succeeds.every((value) => value === true)
          ? console.log(
              `Service worker from scope: "${location.href}" is successfully deleted.`
            )
          : console.log(
              `Service worker from scope: "${location.href}" is not deleted.`
            )
      );
  }
}
