import Router from 'svelte-spa-router'
import Home from './views/Home.svelte'
import Diary from './views/Diary.svelte'
import DiaryInput from './lib/diary/DiaryInput.svelte'
import Login from './views/Login.svelte'
const routes = {
    '/': Home,
    '/diary': Diary,
    '/form/:type': DiaryInput,
    '/login': Login
}

export {
    Router, routes
}