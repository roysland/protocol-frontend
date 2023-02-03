<script>
import { AppBar,drawerStore } from '@skeletonlabs/skeleton';
import { push } from 'svelte-spa-router';
import { user, api} from '../store/api'
const goto = (url) => {
    drawerStore.close()
    push(url)
  }
const openSettingsDrawer = () => {
    const settings = { id: 'user-settings'}
    drawerStore.open(settings)
}


</script>

<AppBar>
    <a href="#/stool" on:click={() => goto('#/stool')} class="btn-icon menu-icon btn-xl">🚽</a>
    <a href="#/medicine" on:click={() => goto('#/medicine')} class="btn-icon menu-icon btn-xl">💊</a>
    <a href="#/supplement" on:click={() => goto('#/supplement')} class="btn-icon menu-icon btn-xl">🌿</a>
    <svelte:fragment slot="trail">
    {#if $user}
    <!-- <LightSwitch /> -->
    <button class="btn btn-sm text-xl" on:click={openSettingsDrawer}>⚙️</button>
    {:else}
        <a href="#/login" class="btn btn-filled-primary btn-sm">Logg inn</a>
    {/if}
    </svelte:fragment>
</AppBar>
<style lang="scss">
    .btn-icon {
        font-size: 2rem;
    }
</style>