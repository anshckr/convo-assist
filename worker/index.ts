import { Queue } from 'workbox-background-sync';
import { clientsClaim } from 'workbox-core';

const queue = new Queue('sync-queue');

declare let self: ServiceWorkerGlobalScope;

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
clientsClaim();

self.addEventListener('fetch', (event) => {
  // Add in your own criteria here to return early if this
  // isn't a request that should use background sync.
  if (event!.request.method !== 'POST') {
    return;
  }

  const bgSyncLogic = async () => {
    try {
      const response = await fetch(event!.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({ request: event!.request });
      return error;
    }
  };

  event!.respondWith(bgSyncLogic());
});
