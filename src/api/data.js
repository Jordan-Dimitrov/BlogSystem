import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getPosts() {
    return await api.get(host + '/jsonstore/blog/posts/');
}

export async function getPostById(id){
    return await api.get(host + `/jsonstore/blog/posts/${id}`);
}

export async function deletePost(id){
    return await api.del(host +  `/jsonstore/blog/posts/${id}`);
}

export async function createPost(data){
    return await api.post(host + `/jsonstore/blog/posts/${id}`, data );
}