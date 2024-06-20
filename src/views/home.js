import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
 <h1>Welcome to the Blog</h1>`;

export async function homePage(ctx) {
    ctx.render(homeTemplate());
}