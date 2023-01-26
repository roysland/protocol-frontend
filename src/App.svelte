<script>
  import { Router, routes } from './routes'
  import { push } from 'svelte-spa-router';
  import AppBar from './lib/AppBar.svelte'
  import { Toast, Drawer, drawerStore } from '@skeletonlabs/skeleton'
  import { user } from './store/api';
  import Login from './views/Login.svelte'
  const goto = (url) => {
    drawerStore.close()
    push(url)
  }
</script>
<AppBar></AppBar>
{#if $user}
<Router {routes}></Router>
{:else}
<Login></Login>
{/if}
{#if $drawerStore.id === 'bottom-drawer'}
<Drawer position="bottom" id="bottom-drawer">
  <div class="flex justify-center items-center w-100 p-4">
    <div class="shortcuts">
      <a href="#/form/poop" on:click={() => goto('#/form/poop')} class="btn-icon btn-filled-primary btn-xl">🚽</a>
      <!-- <a href="#/form/period" on:click={() => goto('#/form/period')} class="btn-icon btn-filled-secondary btn-xl">🩸</a> -->
      <a href="#/form/food" on:click={() => goto('#/form/food')} class="btn-icon btn-filled-tertiary btn-xl">🍽</a>
      <a href="#/form/medicine" on:click={() => goto('#/form/medicine')} class="btn-icon btn-filled-error btn-xl">💊</a>
      <a href="#/form/supplement" on:click={() => goto('#/form/supplement')} class="btn-icon btn-filled-success btn-xl">🌿</a>
      <a href="#/form/sleep" on:click={() => goto('#/form/sleep')} class="btn-icon btn-filled-success btn-xl">🛏️</a>
    </div>
  </div>

</Drawer>
{/if}
<Toast />

<style lang="scss">
	.shortcuts {
		display: flex;
    flex-wrap: wrap;
		justify-content: flex-start;
		gap: 1rem;
		margin-top: 1rem;
	}
	.btn-icon {
		font-size: 2rem;
		padding: 0.75rem;
		width: 4rem;
	}
</style>