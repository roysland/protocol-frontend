import "./app.postcss";
import App from "./App.svelte";
/* import '@skeletonlabs/skeleton/themes/theme-modern.css'; */
import '@skeletonlabs/skeleton/styles/all.css';
import { api, user } from "./store/api";
import axios from "axios";
const storedUser = localStorage.getItem('user')
if (storedUser) {
  user.set(JSON.parse(storedUser))
  
}
let app
api.user.refreshToken().catch(() => {
  localStorage.removeItem('user')
}).finally(() => {
  app = new App({
    target: document.getElementById("app"),
  });
})

export default app;
