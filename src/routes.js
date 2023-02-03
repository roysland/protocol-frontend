import Router from 'svelte-spa-router'
import { user } from './store/api.js'
import Home from './views/Home.svelte'
import Login from './views/Login.svelte'
import Medicine__SvelteComponent_ from './views/Medicine.svelte'
import Stool__SvelteComponent_ from './views/Stool.svelte'
import Supplements__SvelteComponent_ from './views/Supplements.svelte'
let userdata
user.subscribe(val => {
    userdata = val
})
const routes = {
    '/': Home,
    '/login': Login,
    '/medicine': Medicine__SvelteComponent_,
    '/stool': Stool__SvelteComponent_,
    '/supplements': Supplements__SvelteComponent_
}

export {
    Router, routes
}