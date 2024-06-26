import { html } from '../../node_modules/lit-html/lit-html.js';
import { editPost, getPostById } from '../api/data.js';

const editTemplate = (onSubmit, post) => html`
    <section id="edit-post">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Post</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Title" name="title" .value=${post.title}>
            <label for="body">Body</label>
            <textarea id="body" placeholder="Body" name="body">${post.body}</textarea>
            <input type="submit" value="Edit">
        </form>
    </section>
`;

export async function editPage(ctx) {
    const post = await getPostById(ctx.params.id);

    ctx.render(editTemplate(onSubmit, post));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        
        const title = formData.get('title').trim();
        const body = formData.get('body').trim();
        const _id = post._id;

        try {
            if (title == '' || body == '') {
                throw new Error('All fields are required!');
            }

            await editPost(post._id, { title, body, _id });

            ctx.page.redirect(`/details/${post._id}`);
        } catch (error) {
            alert(error.message);
        }
    }
}
