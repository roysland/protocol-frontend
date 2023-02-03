import "./app.postcss";
import App from "./App.svelte";
import { api } from "./store/api.js";
import '@skeletonlabs/skeleton/themes/theme-modern.css';
import '@skeletonlabs/skeleton/styles/all.css';
let app
api.user.renew().finally(() => {
  app = new App({
    target: document.getElementById("app"),
  });
})



export default app;
