import './home.css';
import edelweiss from './edelweiss.svg';
import { html } from '@prostory/edelweiss';

export function home(): string {
  return html`
    <main class="main">
      <img class="logo" src="${edelweiss}" alt="Logo" />
      <nav class="links">
        <a class="link" href="https://yevhenkap.github.io/">Documentation</a>
        <a class="link" href="https://github.com/YevhenKap/edelweiss">GitHub</a>
      </nav>
    </main>
  `;
}
