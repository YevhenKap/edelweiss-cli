import { html, render } from '@prostory/edelweiss';

const home = html`
  <h1>Welcome to Edelweiss</h1>
  <nav>
    <a href="https://github.com/YevhenKap/edelweiss">Edelweiss</a>
    <a href="https://github.com/YevhenKap/edelweiss-ssr">Edelweiss SSR</a>
    <a href="https://github.com/YevhenKap/edelweiss-cli">Edelweiss CLI</a>
  </nav>
`;

render(document.body, home);
