import { html } from '../../node_modules/lit-html/lit-html.js';
import { getPosts } from '../api/data.js';

const allPostsTemplate = (data) => {
    const postsArray = Object.values(data).filter(x => x.hasOwnProperty('_id'));
    
    let postsHtml = html``;
    
    postsArray.forEach(post => {
      postsHtml = html`${postsHtml}${postTemplate(post)}`;
    });
  
    return html`
      <section id="post-feed">
        <h1>Posts</h1>
        <div id="posts">
          ${postsArray.length !== 0 ? postsHtml : html`<p>No posts available.</p>`}
        </div>
      </section>
    `;
  };

const postTemplate = (post) => html`
  <div class="post">
    <p class="post-title">${post.title}</p>
    <a class="button" href="/details/${post._id}">Details</a>
  </div>
`;

export async function allPostsPage(ctx) {
    const data = await getPosts();

    console.log(data);

    ctx.render(allPostsTemplate(data));
}