import homePage from './pages/home';
import { Router } from '@prostory/edelweiss';

Router.add({
  path: '/',
  container: '#app',
  view() {
    return homePage();
  }
});
