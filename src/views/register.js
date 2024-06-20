import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="password" name="repeatPass">
        <input type="submit" value="Register">
        <p>Already have an account?<a href="/login">Sign in</a>.</p>
    </form>
</section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();

        try {
            if (!username || !email || !password) {
                throw new Error('All fields are required!');
            }

            if (password != repeatPass) {
                throw new Error('Passwords don\'t match!');
            }

            await register(email, password, username);

            ctx.setUserNav();
            ctx.page.redirect('/all-memes');
        } catch (error) {
            alert(error.message)
        }
    }
}