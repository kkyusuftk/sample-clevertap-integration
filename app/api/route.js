// proxy-service-worker.js

// Install and activate the service worker
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(interceptAndLogFetch(event));
});

async function interceptAndLogFetch(event) {
  const { request } = event;

  // Log the details of the fetch request
  console.log('Intercepted fetch:', { url: request.url, method: request.method });

  // Clone the request to avoid modifying the original
  const clonedRequest = request.clone();

  // Perform the original fetch request
  const response = await fetch(clonedRequest);

  // Log the response details
  console.log('Fetch response:', { status: response.status, statusText: response.statusText });

  // Clone the response to avoid modifying the original
  const clonedResponse = response.clone();

  // Pass the response back to the original requester
  return new Response(clonedResponse.body, {
    status: clonedResponse.status,
    statusText: clonedResponse.statusText,
    headers: clonedResponse.headers,
  });
}
