// eslint-disable-next-line import/unambiguous
self.addEventListener('fetch' as any, (event: FetchEvent) => {
  // Your fetch event handling logic here
  if (
    event.request.url === 'https://execution.consensys.io/aztec3-circuits.wasm'
  ) {
    // Respond with the local wasm file
    event.respondWith(
      fetch('/node_modules/@aztec/circuits.js/resources/aztec3-circuits.wasm'),
    );
  }
});
