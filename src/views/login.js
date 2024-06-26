import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="password" name="password">
        <input type="submit" value="Login">
        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
    </form>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if (!email || !password) {
                throw new Error('Login or password don\'t match!');
            }

            await login(email, password);

            ctx.setUserNav();
            ctx.page.redirect('/posts');
        } catch (error) {
            alert(error.message);
        }
    }
}