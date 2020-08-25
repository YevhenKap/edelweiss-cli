import './home.css';
import edelweiss from './edelweiss.svg';
import { html } from '@prostory/edelweiss';

export default function homePage() {
  return html`
    <main class="main">
      <img class="logo" src="${edelweiss}" />
      <nav class="links">
        <a class="link" href="https://github.com/YevhenKap/edelweiss#edelweiss"
          >Documentations</a
        >
        <a class="link" href="https://github.com/YevhenKap/edelweiss">GitHub</a>
      </nav>
    </main>
  `;
}
