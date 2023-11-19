// eslint-disable-next-line import/unambiguous
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  // Code that references navigator here

  if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker
      .register('../service-worker.ts')
      .then((registration: ServiceWorkerRegistration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope,
        );
      })
      .catch((error: Error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
}
