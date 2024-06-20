import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
 <h1>Welcome to the Blog</h1>
 <h2>Login and register to see posts</h2>`;

export async function homePage(ctx) {
    ctx.render(homeTemplate());
}