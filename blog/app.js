import { html, render } from './node_modules/lit-html/lit-html.js';
import { movies } from './movieSeeder.js';
import page from './node_modules/page/page.mjs';

const listTemplate = html`
  <ul>1</ul>
`;

const root = document.getElementById("all");

function showList() {
  console.log(movies);
  render(listTemplate, root);
}

page(showList);

page.start();
