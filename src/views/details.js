import { html } from '../../node_modules/lit-html/lit-html.js';
import { deletePost, getPostById } from '../api/data.js';

const detailsTemplate = (post, onDelete) => html`
<section id="post-details">
    <h1>Post Title: ${post.title}</h1>
    <h2>Post Description</h2>
    <p>${post.body}</p>
    <a href="/edit/${post.id}">Edit </a> 
    <button @click=${onDelete}>Delete</button>
</section>`;

export async function detailsPage(ctx) {
    const post = await getPostById(ctx.params.id);

    ctx.render(detailsTemplate(post, onDelete));

    async function onDelete() {
        await deletePost(post.id);
        ctx.page.redirect('/posts');
    }
}