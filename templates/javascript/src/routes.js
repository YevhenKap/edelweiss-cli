import { home } from './pages/home';
import { router } from '@prostory/edelweiss';

router.add({
  path: '/',
  container: '#app',
  view() {
    return home();
  }
});
