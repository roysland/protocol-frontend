<script>
  import { Router, routes } from './routes'
  import { push } from 'svelte-spa-router';
  import AppBar from './lib/AppBar.svelte'
  import { Toast, drawerStore } from '@skeletonlabs/skeleton'
  import { api, user } from './store/api';
  import Login from './views/Login.svelte'

  const goto = (url) => {
    drawerStore.close()
    push(url)
  }

</script>


<AppBar></AppBar>
<Router {routes}></Router>


<Toast />
