<script>
import { AppBar, Drawer, drawerStore, LightSwitch } from '@skeletonlabs/skeleton';
import { user, api} from '../store/api'
import axios from 'axios'
import { onMount } from 'svelte';
import UserSettings from './settings/UserSettings.svelte';
const openDrawer = () => {
    drawerStore.open({
        id: 'bottom-drawer'
    })
}
const openSettingsDrawer = () => {
    const settings = { id: 'user-settings'}
    drawerStore.open(settings)
}


</script>

<AppBar>
    <svelte:fragment slot="lead">
        <span on:click={openDrawer} class="cursor-pointer">
            <svg id="menu-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 302 302" xml:space="preserve" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="4.228"></g><g id="SVGRepo_iconCarrier"> <g> <rect y="31"  width="302" height="40"></rect> <rect y="231"  width="302" height="40"></rect> <rect y="131"  width="302" height="40"></rect> </g> </g></svg>
        </span>
    </svelte:fragment>
    <svelte:fragment slot="trail">
    {#if $user}
    <LightSwitch />
    <button class="btn btn-sm text-xl" on:click={openSettingsDrawer}>⚙️</button>
    {:else}
        <a href="#/login" class="btn btn-filled-primary btn-sm">Logg inn</a>
    {/if}
    </svelte:fragment>
</AppBar>

{#if $drawerStore.id === 'user-settings'}
<Drawer position="right" id="user-settings">
    <UserSettings></UserSettings>
</Drawer>
{/if}
<style lang="scss">
    #menu-icon {
        width: 24px;
        height: 24px;
        fill: rgb(var(--on-surface));
    }
</style>