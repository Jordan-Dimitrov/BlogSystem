import { html } from '../../node_modules/lit-html/lit-html.js';
import { createPost } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-post">
    <form @submit=${onSubmit} id="create-form">
            <h1>Create Post</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Title" name="title">
            <label for="body">Body</label>
            <textarea id="body" placeholder="Enter body" name="body"></textarea>
            <input type="submit" value="Create">
    </form>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const body = formData.get('body').trim();
        
        try {
            if (!title || !body) {
                throw new Error('All fields are required!');
            }

            await createPost({body, title });

            event.target.reset();

            ctx.page.redirect('/posts');
        } catch (error) {
            alert(error.message);
        }
    }
}