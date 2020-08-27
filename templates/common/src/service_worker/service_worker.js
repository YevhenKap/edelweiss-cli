import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';

setCacheNameDetails({
  // Change as you want
  prefix: 'edelweiss-app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
});

// @ts-ignore
// Inject precached list of files from "public" folder.
// You can customize it in "rollup.config.mjs"
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  // Cache style and js files.
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

registerRoute(
  // Cache image and font files.
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font',
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-font-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /**
   * Assumes that all resources requests start from "/api" url.
   * Configure if requests of your app start with another url.
   */
  ({ request }) => request.url.search('/api') !== -1,
  new NetworkFirst({
    // Use a custom cache name.
    cacheName: 'api-cache',
  })
);

registerRoute(
  /** Load manifest from cache. */
  '/manifest.json',
  new CacheFirst({
    // Use a custom cache name.
    cacheName: 'manifest-cache',
  })
);
