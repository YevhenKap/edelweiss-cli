import './routes';
import { Router } from '@prostory/edelweiss';
import { registerServiceWorker } from './service_worker/service_worker_controller';

Router.to(window.location.pathname);

/**
 * You may not register service worker, if you do not want to.
 * Simply delete or comment this line.
 */
registerServiceWorker();
